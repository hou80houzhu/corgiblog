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
        done(this.getFileView(this.getProjectInfo().getProjectPath() + "index.csp"));
    },
    "/index": function () {},
    "/detail": function () {},
    "/login": function () {},
    "/admin": function () {},
    "/about": function () {},
    "/resume": function () {},
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
        var file = this.request.getParameter("file");
        if (file) {
            var n = (new Date().getTime()) + ".png";
            var hp = this.request.getHttpPath() + "upload/" + n;
            bright.file(file.path).move(this.getProjectInfo().getProjectPath() + "upload/" + n).scope(this).done(function (a) {
                var article = this.getTable("articles").with(this.request);
                article.set("contenthtml", this.markd(article.get("contentmd")));
                var a = new Date().getTime();
                article.set("etime", a);
                article.set("ctime", a);
                article.set("images", hp);
                this.dao.transaction().then(function () {
                    return this.add(article);
                }).done(function (data) {
                    done(this.success());
                }.bind(this)).fail(function () {
                    done(this.error());
                }.bind(this));
            }).fail(function () {
                done(this.error());
            }.bind(this));
        } else {
            var article = this.getTable("articles").with(this.request);
            article.set("contenthtml", this.markd(article.get("contentmd")));
            var a = new Date().getTime();
            article.set("etime", a);
            article.set("ctime", a);
            article.set("images", hp);
            this.dao.transaction().then(function () {
                return this.add(article);
            }).done(function (data) {
                done(this.success());
            }.bind(this)).fail(function () {
                done(this.error());
            }.bind(this));
        }
    },
    "/removearticle": function (done) {
        this.dao.remove(this.getTable("articles").with(this.request)).done(function () {
            done(this.success());
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/editarticle": function (done) {
        var file = this.request.getParameter("file");
        if (file) {
            var n = (new Date().getTime()) + ".png";
            var hp = "upload/" + n;
            bright.file(file.path).move(this.getProjectInfo().getProjectPath() + "upload/" + n).scope(this).done(function (a) {
                var article = this.getTable("articles").with(this.request);
                article.set("contenthtml", this.markd(article.get("contentmd")));
                article.set("images", hp);
                var a = new Date().getTime();
                article.set("etime", a);
                this.dao.update(article).done(function () {
                    done(this.success());
                }.bind(this)).fail(function () {
                    done(this.error());
                }.bind(this));
            }).fail(function () {
                done(this.error());
            }.bind(this));
        } else {
            var article = this.getTable("articles").with(this.request);
            article.set("contenthtml", this.markd(article.get("contentmd")));
            var a = new Date().getTime();
            article.set("etime", a);
            this.dao.update(article).done(function () {
                done(this.success());
            }.bind(this)).fail(function () {
                done(this.error());
            }.bind(this));
        }
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
        this.dao.query("select id,title,contenthtml,etime,descs,images from articles order by etime DESC limit ?,?", [this.request.getParameter("from") / 1, this.request.getParameter("size") / 1]).done(function (a) {
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
    },
    "/mail": function (done) {
        var addr = this.request.getParameter("email"), ths = this;
        if (addr && /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(addr)) {
            var email = require("/emailjs/email");
            var server = email.server.connect({
                user: "398414000@qq.com",
                password: "xhbbqebxgxrjbheb",
                host: "smtp.qq.com",
                ssl: true
            });
            server.send({
                from: "hou80houzhu<398414000@qq.com>",
                to: addr,
                text: "王金良-简历-2016,请查看附件。OPS:请尽量不要使用chrome dev版本浏览器直接浏览pdf文件不然会有内容不清晰 :)",
                subject: "王金良-简历-2016",
                attachment: [
                    {path: ths.getProjectInfo().getProjectPath() + "download/resume.pdf", type: "application/pdf", name: "王金良-简历-2016.pdf"}
                ]
            }, function (err, message) {
                console.log(err);
                if (err) {
                    done(ths.error());
                } else {
                    done(ths.success());
                }
            });
        } else {
            done(this.error("email address is wrong."));
        }
    }
});