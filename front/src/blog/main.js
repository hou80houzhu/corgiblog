/* 
 * @packet blog.main;
 * @require blog.util.router;
 * @template blog.template.tmp;
 * @include blog.images;
 * @css blog.style.grid;
 * @css blog.style.main;
 * @css blog.style.style;
 * @json data.pagemapping;
 */
bright.overrideRequest({
    doRequest: function (option, reqeustState) {
        var ths = this;
        bright.ajax(option).done(function (a) {
            if (a.code && a.code === "1") {
                reqeustState._data && reqeustState._data.call(ths, a.data);
            } else if (a.code && a.code === "2") {
                ths.dispatchEvent("openPage", {url: "login"});
            } else {
                reqeustState._bad && reqeustState._bad.call(ths, a);
            }
        }).fail(function (e) {
            reqeustState._error && reqeustState._error.call(ths, e);
        });
    }
});


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
    },
    find_link: function (dom) {
        var ths = this;
        dom.find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    },
    find_icon: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    },
    find_about: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    }
});
Module({
    name: "list",
    extend: "view",
    className: "list",
    template: module.getTemplate("@tmp", "list"),
    option: {
        url: basePath + "bas/articlelist",
        size: 10
    },
    init: function () {
        this.current = 0;
        this.isend = false;
        this.isloading = false;
        this.render();
        this.getData();
        var doscroll = function () {
            var a = this.finders("loading").get(0).offsetTop;
            if (a && $("body").scrollTop() > this.finders("loading").get(0).offsetTop - $(window).height()) {
                this.getData();
            }
        }.bind(this);
        $(window).bind("scroll", doscroll);
        this.onunload = function () {
            $(window).unbind("scroll", doscroll);
        };
    },
    onnodeinserted: function (dom) {
        var ths = this;
        $(dom).find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href"),
                    data: $(this).group().cache()
                });
                e.preventDefault();
            });
        });
    },
    getData: function () {
        if (!this.isend) {
            if (!this.isloading) {
                this.isloading = true;
                var from = this.current * this.option.size;
                var end = this.option.size;
                this.finders("loading").show();
                this.postRequest(this.option.url, {
                    from: from,
                    size: end
                }, {cache: true}).data(function (data) {
                    this.current = this.current + 1;
                    $.template(module.getTemplate("@tmp", "listitem")).renderAppendTo(this.finders("container"), data);
                    this.delegate();
                    this.isloading = false;
                    if (data.length <= 0 || data.length < this.option.size) {
                        this.isend = true;
                        this.finders("loading").hide();
                    }
                }).bad(function () {
                    this.finders("loading").hide();
                }).error(function () {
                    this.finders("loading").hide();
                });
            }
        }
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
            dom.css("opacity", 1 * (t / dom.height()));
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
        this.finders("time").html($.showDate(data.time));
        this.finders("subtitle").html(data.title);
        if (data.images) {
            this.dom.css("background-image", "url(" + basePath + data.images + ")");
        }
    }
});
Module({
    name: "papercontent",
    extend: "view",
    className: "papercontent",
    template: module.getTemplate("@tmp", "papercontent"),
    init: function () {
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
    },
    find_home: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    }
});

Module({
    name: "login",
    extend: "view",
    className: "login",
    template: module.getTemplate("@tmp", "login"),
    init: function () {
        this.render();
    },
    find_submit: function (dom) {
        dom.click(function () {
            var un = this.finders("username").val();
            var pw = this.finders("password").val();
            if (un && pw) {
                this.postRequest(basePath + "bas/login", {username: un, password: pw}).data(function () {
                    this.dispatchEvent("redirectPage", {
                        url: "admin"
                    });
                }).bad(function () {
                    $.toast("username or password is not matched");
                });
            }
        }.bind(this));
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
    option: {
        url: basePath + "admin/api/articlelist",
        size: 10
    },
    init: function () {
        this.current = 0;
        this.isend = false;
        this.isloading = false;
        this.render();
        this.getData();
        this.data = {
            list: []
        };
        this.observe("data", this.data);
        var doscroll = function () {
            var a = this.finders("loading").get(0).offsetTop;
            if (a && $("body").scrollTop() > this.finders("loading").get(0).offsetTop - $(window).height()) {
                this.getData();
            }
        }.bind(this);
        $(window).bind("scroll", doscroll);
        this.onunload = function () {
            $(window).unbind("scroll", doscroll);
        };
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
    },
    getData: function () {
        var ths = this;
        if (!this.isend) {
            if (!this.isloading) {
                this.isloading = true;
                var from = this.current * this.option.size;
                var end = this.option.size;
                this.finders("loading").show();
                this.postRequest(this.option.url, {
                    from: from,
                    size: end
                }).data(function (data) {
                    this.current = this.current + 1;
                    data.forEach(function (a) {
                        ths.data.list.push(a);
                    });
                    this.isloading = false;
                    if (data.length <= 0 || data.length < this.option.size) {
                        this.isend = true;
                        this.finders("loading").hide();
                    }
                }).bad(function () {
                    this.finders("loading").hide();
                }).error(function () {
                    this.finders("loading").hide();
                });
            }
        }
    },
    group_item: function (dom) {
        var ths = this;
        dom.items("remove").click(function () {
            var t = $(this).group().cache();
            ths.postRequest(basePath + "admin/api/removearticle", {id: t.id}).data(function () {
                t.remove();
            });
        });
    },
    "data_list_add": function (data) {
        $.template(module.getTemplate("@tmp", "articlelistitem")).renderAppendTo(this.finders("con"), data.value);
        this.delegate();
    },
    "data_list_remove": function (e) {
        this.groups().eq(e.value[0].getIndex()).remove();
        this.delegate();
    }
});
Module({
    name: "editarticle",
    extend: "viewgroup",
    className: "editarticle",
    layout: module.getTemplate("@tmp", "editarticle"),
    option: {
        imageType: "@images.imagesuploader",
        url: basePath + "admin/api/addarticle"
    },
    find_editor: function (dom) {
        var ths = this;
        $.loader().js(this.getStaticPath("js", "blog.lib.ace.ace"), function () {
            var id = ths.getUUID();
            $().create("pre").css({height: "600px"}).attr("id", id).appendTo(dom);
            var editor = window.ace.edit(id);
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/markdown");
            ths.editor = editor;
            ths.dispatchEvent("editdone");
        });
    },
    find_submit: function (dom) {
        dom.click(function () {
            var title = this.groups("title").items("input").val();
            var desc = this.groups("desc").items("input").val();
            var content = this.editor.getValue();
            var checked = false;
            if (title) {
                if (desc) {
                    if (content) {
                        checked = true;
                    } else {
                        $.toast("content can not empty");
                    }
                } else {
                    $.toast("desc can not empty");
                }
            } else {
                $.toast("title can not empty");
            }
            if (checked) {
                var t = {
                    title: title,
                    descs: desc,
                    contentmd: content
                };
                if (this.onsubmit) {
                    t = this.onsubmit(t);
                }
                $.loadingbar().showLoading();
                this.getChildAt(0).option.url = this.option.url;
                this.getChildAt(0).upload(t, function () {
                    $.loadingbar().showSuccess();
                }, function () {
                    $.loadingbar().showError();
                });
            }
        }.bind(this));
    },
    setContent: function (data) {
        this._data = data;
        this.groups("title").items("input").val(data.title);
        this.groups("desc").items("input").val(data.descs);
        if (data.images) {
            this.getChildAt(0).setImage(basePath + data.images);
        }
        this.editor.setValue(data.contentmd);
    }
});
Module({
    name: "edituserinfo",
    extend: "view",
    className: "editarticle",
    template: module.getTemplate("@tmp", "edituserinfo"),
    option: {
        url: basePath + "admin/api/edituserinfo"
    },
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
            ths.editor = editor;
            ths.dispatchEvent("editdone");
        });
    },
    find_submit: function (dom) {
        dom.click(function () {
            var content = this.editor.getValue();
            var checked = false;
            if (content) {
                checked = true;
            } else {
                $.toast("content can not empty");
            }
            if (checked) {
                this.info.userinfomd = content;
                $.loadingbar().showLoading();
                this.postRequest(this.option.url, this.info).data(function () {
                    $.loadingbar().showSuccess();
                }).bad(function () {
                    $.loadingbar().showError();
                }).error(function () {
                    $.loadingbar().showError();
                });
            }
        }.bind(this));
    },
    setContent: function (data) {
        this.editor.setValue(data);
    },
    event_editdone: function () {
        this.postRequest(basePath + "admin/api/userinfo").data(function (data) {
            this.info = data[0];
            this.editor.setValue(data[0].userinfomd);
        });
    }
});

Module({
    name: "about",
    extend: "view",
    className: "about",
    template: module.getTemplate("@tmp", "about"),
    init: function () {
        this.render();
        this.postRequest(basePath + "bas/userinfo").data(function (a) {
            this.finders("content").html(a[0].userinfohtml);
        });
    }
});
Module({
    name: "resume",
    extend: "view",
    className: "resume",
    template: module.getTemplate("@tmp", "resume"),
    init: function () {
        this.render();
        this.getContent();
    },
    find_content: function (dom) {
        var ths = this;
        var t = function () {
            var t = $("body").scrollTop();
            if (t > $(window).height()) {
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
    find_icon: function (dom) {
        var ths = this;
//        dom.click(function () {
//            var q = $(this);
//            ths.finders("icon").each(function () {
//                if (q.get(0) === $(this).get(0)) {
//                    q.parent().toggleClass("hover");
//                } else {
//                    $(this).parent().removeClass("hover");
//                }
//            });
//        });
    },
    find_go: function (dom) {
        var ths = this;
        dom.click(function () {
            var index = $(this).index();
            $("body").scrollingTop(ths.dom.find("h2").eq(index).get(0).offsetTop - 50);
        });
    },
    find_print: function (dom) {
        dom.click(function () {
            if ($("#printiframe").length === 0) {
                $("<iframe id='printiframe' src='" + basePath + "download/resume.html' style='position:absolute;left:-10000px;top:-10000px;'></iframe>").bind("load", function () {
                    $(this).get(0).contentWindow.print();
                }).appendTo("body");
            } else {
                $("#printiframe").get(0).contentWindow.print();
            }
        });
    },
    find_download: function (dom) {
        dom.click(function () {
            var type = $(this).attr("type");
            if ($("#downloadresume").length === 0) {
                $("a").attr({
                    id: "downloadresume",
                    download: "wangjlresume." + type,
                    href: basePath + "download/resume." + type,
                    target: "_blank"
                }).appendTo("body");
            } else {
                $("#downloadresume").attr({
                    id: "downloadresume",
                    download: "wangjlresume." + type,
                    href: basePath + "download/resume." + type,
                    target: "_blank"
                });
            }
            setTimeout(function () {
                $("#downloadresume").trigger("click");
            }, 0);
        });
    },
    find_mail:function(dom){
        var ths=this;
        dom.click(function(){
            ths.popup();
        });
    },
    popup:function(){
        var bg=$($.template(module.getTemplate("@tmp","resumepopup")).render()).appendTo("body"),ths=this;
        bg.find("input").get(0).focus();
        bg.find(".close").click(function(){
            bg.remove();
        });
        bg.find(".sent").click(function(){
            var e=$(this).parent(2).find("input").val(),thss=$(this);
            if(e&&/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(e)){
                thss.html("<i class='fa fa-repeat fa-spin'></i>");
                ths.postRequest(basePath+"bas/mail",{
                    email:e
                }).data(function(){
                    thss.html("<i class='fa fa-circle-check'></i>");
                    thss.parent(2).find(".resume-input-tip").html("email has been sent successfully");
                    setTimeout(function(){
                        bg.remove();
                    },2000);
                }).bad(function(){
                    thss.parent(2).find(".resume-input-tip").html("send error,try again");
                    thss.html("send");
                }).error(function(){
                    thss.parent(2).find(".resume-input-tip").html("send error,try again");
                    thss.html("send");
                });
            }else{
                thss.parent(2).find(".resume-input-tip").html("email address is empty or error");
            }
        });
    },
    getContent: function () {
        var ths = this;
        $.loader().text(basePath + "download/resume.html", function (data) {
            var n = data.match(/<body>[\S\s]*?<\/body>/);
            if (n) {
                data = "<div class='content-p-code'>" + n[0].substring(6, n[0].length - 7) + "</div>";
            }
            ths.finders("content").html(data);
        });
    }
});

Module({
    name: "noadminhead",
    extend: "view",
    className: "adminhead",
    template: module.getTemplate("@tmp", "noadminhead"),
    init: function () {
        this.render();
    }
});
Module({
    name: "nofind",
    extend: "view",
    className: "nofind",
    template: module.getTemplate("@tmp", "nofind"),
    init: function () {
        this.render();
    }
});

$.showDate = function (time) {
    var a = new Date(parseInt(time));
    var b = ["Jan", "Feb", "Mar", "Apr", "May ", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (a.getDate() || "") + " " + (b[a.getMonth()] || "") + " " + (a.getFullYear() || "");
};
$.toast = function (text) {
    $("<div class='toast'><div class='toast_text'>" + text + "</div></div>").appendTo("body").transition().set("-all-transform").done(function () {
        this.transition().removeAll().set("opacity", {time: 1000}).delay(2000).then(function () {
            this.css("opacity", 0);
        }).delay(1000).done(function () {
            this.remove();
        }).resolve();
    }).scope().transform().y(-150);
};
$.loadingbar = function () {
    var a = $("#loadingbar");
    if (a.length === 0) {
        a = $("<div id='loadingbar'>" +
                "<div class='loadingbar-bg'></div>" +
                "<div class='loadingbar-desc'></div></div>").appendTo("body");
    }
    return new loadingbar(a);
};
var loadingbar = function (dom) {
    this.dom = dom;
};
loadingbar.prototype.showLoading = function (text) {
    this.dom.children(1).html("<i class='fa fa-repeat fa-spin'></i> " + (text || 'Loading...'));
    return this;
};
loadingbar.prototype.showError = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<i class='fa fa-circle-cross'></i> " + (text || '操作错误'));
    return ps;
};
loadingbar.prototype.showSuccess = function (text) {
    var ps = $.promise(), ths = this;
    setTimeout(function () {
        ths.close();
        ps.resolve();
    }, 2000);
    this.dom.children(1).html("<i class='fa fa-circle-check'></i> " + (text || '操作成功'));
    return ps;
};
loadingbar.prototype.close = function () {
    this.dom.remove();
};