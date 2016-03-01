/*
 * @packet controller;
 */
Module({
    name: "base",
    extend: "controller",
    success: function (a) {
        if (arguments.length === 0) {
            return this.getJsonView({code: "1"});
        } else {
            return this.getJsonView({code: "1", data: a});
        }
    },
    error: function (msg) {
        if (arguments.length === 0) {
            return this.getJsonView({code: "0"});
        } else {
            return this.getJsonView({code: "0", msg: msg});
        }
    },
    timeout: function () {
        return this.getJsonView({code: "2"});
    },
    markd: function (md) {
        var marked = require('/marked');
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        return marked(md);
    }
});
Module({
    name: "page",
    extend: "controller",
    path: "/",
    before: function (next, done) {
        done(this.getFileView(this.getProjectInfo().getProjectPath() + "index.html"));
    },
    "/index": function () {},
    "/detail": function () {},
    "/login": function () {},
    "/admin": function () {},
    "/about": function () {},
    "/admin/article": function () {},
    "/admin/addarticle": function () {},
    "/admin/editarticle": function () {},
    "/admin/userinfo": function () {}
});
Module({
    name: "admin",
    extend: "@.base",
    path: "/admin/api",
    dao: "mysql",
    before: function (next, end) {
        if (this.request.getSession().hasAttribute("user")) {
            next();
        } else {
            end(this.timeout());
        }
    },
    after: function (view, done) {
        done(view);
    },
    "/addarticle": function (done) {
        var article = this.getTable("articles").with(this.request);
        article.set("contenthtml", this.markd(article.get("contentmd")));
        var a = new Date().getTime();
        article.set("etime", a);
        article.set("ctime", a);
        this.dao.transaction().then(function () {
            return this.add(article);
        }).done(function (data) {
            done(this.success());
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/removearticle": function (done) {
        this.dao.remove(this.getTable("articles").with(this.request)).done(function () {
            done(this.success());
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/editarticle": function (done) {
        var article = this.getTable("articles").with(this.request);
        article.set("contenthtml", this.markd(article.get("contentmd")));
        var a = new Date().getTime();
        article.set("etime", a);
        this.dao.update(article).done(function () {
            done(this.success());
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/userinfo": function (done) {
        this.dao.query("select userinfohtml,userinfomd,username,id from user where username=?", ["admin"]).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/edituserinfo": function (done) {
        var user = this.getTable("user").with(this.request);
        user.set("userinfohtml", this.markd(user.get("userinfomd")));
        this.dao.update(user).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/articlelist": function (done) {
        this.dao.findPage(this.getTable("articles"), this.request.getParameter("from"), this.request.getParameter("size")).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    }
});
Module({
    name: "bas",
    extend: "@.base",
    path: "/bas",
    dao: "mysql",
    "/articlelist": function (done) {
        this.dao.query("select id,title,contenthtml,etime,descs from articles order by etime DESC limit ?,?",[this.request.getParameter("from")/1, this.request.getParameter("size")/1]).done(function (a) {
//        this.dao.findPage(this.getTable("articles"), this.request.getParameter("from"), this.request.getParameter("size")).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/article": function (done) {
        this.dao.find(this.getTable("articles").with(this.request)).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/userinfo": function (done) {
        this.dao.query("select userinfohtml,userinfomd,username,id from user where username=?", ["admin"]).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/login": function (done) {
        this.dao.find(this.getTable("user").with(this.request)).done(function (a) {
            if (a.length > 0) {
                this.request.getSession().setAttribute("user", a[0]);
                done(this.success(a));
            } else {
                done(this.error());
            }
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    }
});