/* 
 * @packet blog.main;
 * @require blog.util.router;
 * @template blog.template.tmp;
 * @css blog.style.grid;
 * @css blog.style.main;
 * @css blog.style.style;
 * @json data.pagemapping;
 */
Module({
    name: "pagecontainer",
    extend: "viewgroup",
    option: {
        url: ""
    },
    init: function (option) {
        var ths = this;
        var c = {};
        var mapping = module.getJson("@pagemapping");
        for (var i in mapping) {
            var url = i;
            if (url[url.length - 1] !== "/") {
                c[url + "/"] = mapping[i];
            } else {
                c[url] = mapping[i];
            }
        }
        option.router = c;
        this._router = $.router(option.url);
        for (var i in option.router) {
            this._router.bind(i, function (e) {
                ths.openPage(option.router[e.action], e);
            });
        }
        this._router.run();
    },
    openPage: function (pageoption, data) {
        $("body").scrollTop(0);
        if (this.children[0]) {
            this.children[0].remove();
        }
        this.addChild({
            type: "@.page",
            parameters: data,
            option: pageoption
        });
    },
    event_openPage: function (e) {
        this._router.open(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    },
    event_redirectPage: function (e) {
        this._router.edit(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    }
});
Module({
    name: "page",
    extend: "viewgroup",
    className: "page",
    option: {
        modules: [{type: "", option: {}}]
    },
    layout: module.getTemplate("@tmp", "page")
});
Module({
    name: "base",
    extend: "view",
    className: "base",
    template: module.getTemplate("@tmp", "base"),
    init: function () {
        this.render();
    },
    find_bg: function () {
        var doscroll = function () {
            var dom = this.finders("bg");
            if ($("body").scrollTop() > dom.height()) {
                this.dom.addClass("show");
            } else {
                this.dom.removeClass("show");
            }
        }.bind(this);
        $(window).bind("scroll", doscroll);
        this.onunload = function () {
            $(window).unbind("scroll", doscroll);
        };
    }
});
Module({
    name: "list",
    extend: "view",
    className: "list",
    template: module.getTemplate("@tmp", "list"),
    init: function () {
        this.render();
        this.getData();
    },
    onnodeinserted: function (dom) {
        var ths = this;
        $(dom).find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    },
    getData: function () {
        this.postRequest(basePath + "admin/api/articlelist").data(function (data) {
            $($.template(module.getTemplate("@tmp", "listitem")).render(data)).appendTo(this.finders("container"));
        });
    }
});
Module({
    name: "copyright",
    extend: "view",
    className: "copyright",
    template: module.getTemplate("@tmp", "copyright"),
    init: function () {
        this.render();
    }
});

Module({
    name: "paperheader",
    extend: "view",
    className: "paperheader",
    template: module.getTemplate("@tmp", "paperheader"),
    init: function () {
        this.dom.height($(window).height());
        this.render();
    },
    find_bg: function (dom) {
        var ths = this;
        var t = function () {
            var t = $("body").scrollTop();
            dom.css("opacity", 1.5 * (t / dom.height()));
            if (t > dom.height()) {
                ths.dom.addClass("show");
            } else {
                ths.dom.removeClass("show");
            }
        };
        $(window).bind("scroll", t);
        this.onunload = function () {
            $(window).unbind("scroll", t);
        };
    },
    find_arrow: function (dom) {
        dom.click(function () {
            $("body").scrollingTop($(window).height() * 2 / 3);
        });
    },
    setContent: function (data) {
        this.finders("title").html(data.title);
        this.finders("time").html(data.time);
    }
});
Module({
    name: "papercontent",
    extend: "view",
    className: "papercontent",
    template: module.getTemplate("@tmp", "papercontent"),
    init:function(){
        this.render();
    },
    setContent: function (data) {
        this.finders("con").html(data);
    }
});
Module({
    name: "paperfooter",
    extend: "view",
    className: "paperfooter",
    template: module.getTemplate("@tmp", "paperfooter"),
    init: function () {
        this.render();
    }
});

Module({
    name: "login",
    extend: "view",
    className: "login",
    template: module.getTemplate("@tmp", "login"),
    init: function () {
        this.render();
    }
});
Module({
    name: "adminhead",
    extend: "view",
    className: "adminhead",
    template: module.getTemplate("@tmp", "adminhead"),
    init: function () {
        var ths = this;
        this.render();
        this.dom.find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    }
});
Module({
    name: "articlelist",
    extend: "view",
    className: "list",
    template: module.getTemplate("@tmp", "articlelist"),
    init: function () {
        this.render();
    },
    find_add: function (dom) {
        var ths = this;
        dom.click(function () {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
        });
    },
    onnodeinserted: function (dom) {
        var ths = this;
        $(dom).find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    }
});
Module({
    name: "editarticle",
    extend: "view",
    className: "editarticle",
    template: module.getTemplate("@tmp", "editarticle"),
    init: function () {
        this.render();
    },
    find_editor: function (dom) {
        var ths = this;
        $.loader().js(this.getStaticPath("js", "blog.lib.ace.ace"), function () {
            var id = ths.getUUID();
            $().create("pre").css({height: "600px"}).attr("id", id).appendTo(dom);
            var editor = window.ace.edit(id);
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/markdown");
            editor.focus();
            ths.editor = editor;
        });
    },
    find_submit: function (dom) {
        dom.click(function () {
            var title = this.groups("title").items("input").val();
            var desc = this.groups("desc").items("input").val();
            var content = this.editor.getValue();
            this.postRequest(basePath + "admin/api/addarticle", {
                title: title,
                descs: desc,
                contentmd: content
            }).data(function () {
            });
        }.bind(this));
    }
});