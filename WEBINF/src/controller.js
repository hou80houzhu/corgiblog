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
    }
});
Module({
    name: "test",
    extend: "controller",
    path: "/test",
    dao: "mysql",
    "/test": function (done) {
        this.request.setAttr("desc", "this is thr desc of the url:/test/test");
        done(this.getCspView("index.csp", {data: "this is data"}));
    },
    "/mark": function (done) {
        var md = require("/node-markdown").Markdown;
        var html = md("**markdown** string");
        done(this.getStringView(html));
    }
});
Module({
    name: "testp",
    extend: "@.base",
    path: "/admin/api",
    dao: "mysql",
    "/addarticle": function (done) {
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
        var article = this.getTable("articles").with(this.request);
        article.set("contenthtml", marked(article.get("contentmd")));
        this.dao.transaction().then(function () {
            return this.add(article);
        }).done(function (data) {
            done(this.success());
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/articlelist": function (done) {
        this.dao.find(this.getTable("articles")).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    },
    "/removearticle":function(done){
        this.dao.remove(this.getTable("articles").with(this.request)).done(function () {
            done(this.success());
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
    "/article": function (done) {
        this.dao.find(this.getTable("articles").with(this.request)).done(function (a) {
            done(this.success(a));
        }.bind(this)).fail(function () {
            done(this.error());
        }.bind(this));
    }
});