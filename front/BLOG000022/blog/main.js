/* 
 * @packet blog.main;
 * @require blog.util.router;
 * @template blog.template.tmp;
 * @include blog.images;
 * @css blog.style.grid;
 * @css blog.style.main;
 * @css blog.style.style;
 * @json data.pagemapping;
 */bright.overrideRequest({doRequest:function(t,e){var i=this;bright.ajax(t).done(function(t){t.code&&"1"===t.code?e._data&&e._data.call(i,t.data):t.code&&"2"===t.code?i.dispatchEvent("openPage",{url:"login"}):e._bad&&e._bad.call(i,t)}).fail(function(t){e._error&&e._error.call(i,t)})}}),Module({name:"pagecontainer",extend:"viewgroup",option:{url:""},init:function(t){var e=this,i={},n=module.getJson("@pagemapping");for(var o in n){var a=o;"/"!==a[a.length-1]?i[a+"/"]=n[o]:i[a]=n[o]}t.router=i,this._router=$.router(t.url);for(var o in t.router)this._router.bind(o,function(i){e.openPage(t.router[i.action],i)});this._router.run()},openPage:function(t,e){$("body").scrollTop(0),this.children[0]&&this.children[0].remove(),this.addChild({type:"@.page",parameters:e,option:t})},event_openPage:function(t){this._router.open(t.data.url,t.data.data,t.data.title),t.stopPropagation()},event_redirectPage:function(t){this._router.edit(t.data.url,t.data.data,t.data.title),t.stopPropagation()}}),Module({name:"page",extend:"viewgroup",className:"page",option:{modules:[{type:"",option:{}}]},layout:module.getTemplate("@tmp","page")}),Module({name:"base",extend:"view",className:"base",template:module.getTemplate("@tmp","base"),init:function(){this.render()},find_bg:function(){var t=function(){var t=this.finders("bg");$("body").scrollTop()>t.height()?this.dom.addClass("show"):this.dom.removeClass("show")}.bind(this);$(window).bind("scroll",t),this.onunload=function(){$(window).unbind("scroll",t)}},find_link:function(t){var e=this;t.find("a").each(function(){$(this).click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href")}),t.preventDefault()})})},find_icon:function(t){var e=this;t.click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href")}),t.preventDefault()})},find_about:function(t){var e=this;t.click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href")}),t.preventDefault()})}}),Module({name:"list",extend:"view",className:"list",template:module.getTemplate("@tmp","list"),option:{url:basePath+"bas/articlelist",size:10},init:function(){this.current=0,this.isend=!1,this.isloading=!1,this.render(),this.getData();var t=function(){var t=this.finders("loading").get(0).offsetTop;t&&$("body").scrollTop()>this.finders("loading").get(0).offsetTop-$(window).height()&&this.getData()}.bind(this);$(window).bind("scroll",t),this.onunload=function(){$(window).unbind("scroll",t)}},onnodeinserted:function(t){var e=this;$(t).find("a").each(function(){$(this).click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href"),data:$(this).group().cache()}),t.preventDefault()})})},getData:function(){if(!this.isend&&!this.isloading){this.isloading=!0;var t=this.current*this.option.size,e=this.option.size;this.finders("loading").show(),this.postRequest(this.option.url,{from:t,size:e},{cache:!0}).data(function(t){this.current=this.current+1,$.template(module.getTemplate("@tmp","listitem")).renderAppendTo(this.finders("container"),t),this.delegate(),this.isloading=!1,(t.length<=0||t.length<this.option.size)&&(this.isend=!0,this.finders("loading").hide())}).bad(function(){this.finders("loading").hide()}).error(function(){this.finders("loading").hide()})}}}),Module({name:"copyright",extend:"view",className:"copyright",template:module.getTemplate("@tmp","copyright"),init:function(){this.render()}}),Module({name:"paperheader",extend:"view",className:"paperheader",template:module.getTemplate("@tmp","paperheader"),init:function(){this.dom.height($(window).height()),this.render()},find_bg:function(t){var e=this,i=function(){var i=$("body").scrollTop();t.css("opacity",1*(i/t.height())),i>t.height()?e.dom.addClass("show"):e.dom.removeClass("show")};$(window).bind("scroll",i),this.onunload=function(){$(window).unbind("scroll",i)}},find_arrow:function(t){t.click(function(){$("body").scrollingTop(2*$(window).height()/3)})},setContent:function(t){this.finders("title").html(t.title),this.finders("time").html($.showDate(t.time)),this.finders("subtitle").html(t.title),t.images&&this.dom.css("background-image","url("+basePath+t.images+")")}}),Module({name:"papercontent",extend:"view",className:"papercontent",template:module.getTemplate("@tmp","papercontent"),init:function(){this.render()},setContent:function(t){this.finders("con").html(t)}}),Module({name:"paperfooter",extend:"view",className:"paperfooter",template:module.getTemplate("@tmp","paperfooter"),init:function(){this.render()},find_home:function(t){var e=this;t.click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href")}),t.preventDefault()})}}),Module({name:"login",extend:"view",className:"login",template:module.getTemplate("@tmp","login"),init:function(){this.render()},find_submit:function(t){t.click(function(){var t=this.finders("username").val(),e=this.finders("password").val();t&&e&&this.postRequest(basePath+"bas/login",{username:t,password:e}).data(function(){this.dispatchEvent("redirectPage",{url:"admin"})}).bad(function(){$.toast("username or password is not matched")})}.bind(this))}}),Module({name:"adminhead",extend:"view",className:"adminhead",template:module.getTemplate("@tmp","adminhead"),init:function(){var t=this;this.render(),this.dom.find("a").each(function(){$(this).click(function(e){t.dispatchEvent("openPage",{url:$(this).attr("href")}),e.preventDefault()})})}}),Module({name:"articlelist",extend:"view",className:"list",template:module.getTemplate("@tmp","articlelist"),option:{url:basePath+"admin/api/articlelist",size:10},init:function(){this.current=0,this.isend=!1,this.isloading=!1,this.render(),this.getData(),this.data={list:[]},this.observe("data",this.data);var t=function(){var t=this.finders("loading").get(0).offsetTop;t&&$("body").scrollTop()>this.finders("loading").get(0).offsetTop-$(window).height()&&this.getData()}.bind(this);$(window).bind("scroll",t),this.onunload=function(){$(window).unbind("scroll",t)}},find_add:function(t){var e=this;t.click(function(){e.dispatchEvent("openPage",{url:$(this).attr("href")})})},onnodeinserted:function(t){var e=this;$(t).find("a").each(function(){$(this).click(function(t){e.dispatchEvent("openPage",{url:$(this).attr("href")}),t.preventDefault()})})},getData:function(){var t=this;if(!this.isend&&!this.isloading){this.isloading=!0;var e=this.current*this.option.size,i=this.option.size;this.finders("loading").show(),this.postRequest(this.option.url,{from:e,size:i}).data(function(e){this.current=this.current+1,e.forEach(function(e){t.data.list.push(e)}),this.isloading=!1,(e.length<=0||e.length<this.option.size)&&(this.isend=!0,this.finders("loading").hide())}).bad(function(){this.finders("loading").hide()}).error(function(){this.finders("loading").hide()})}},group_item:function(t){var e=this;t.items("remove").click(function(){var t=$(this).group().cache();e.postRequest(basePath+"admin/api/removearticle",{id:t.id}).data(function(){t.remove()})})},data_list_add:function(t){$.template(module.getTemplate("@tmp","articlelistitem")).renderAppendTo(this.finders("con"),t.value),this.delegate()},data_list_remove:function(t){this.groups().eq(t.value[0].getIndex()).remove(),this.delegate()}}),Module({name:"editarticle",extend:"viewgroup",className:"editarticle",layout:module.getTemplate("@tmp","editarticle"),option:{imageType:"@images.imagesuploader",url:basePath+"admin/api/addarticle"},find_editor:function(t){var e=this;$.loader().js(this.getStaticPath("js","blog.lib.ace.ace"),function(){var i=e.getUUID();$().create("pre").css({height:"600px"}).attr("id",i).appendTo(t);var n=window.ace.edit(i);n.setTheme("ace/theme/github"),n.getSession().setMode("ace/mode/markdown"),e.editor=n,e.dispatchEvent("editdone")})},find_submit:function(t){t.click(function(){var t=this.groups("title").items("input").val(),e=this.groups("desc").items("input").val(),i=this.editor.getValue(),n=!1;if(t?e?i?n=!0:$.toast("content can not empty"):$.toast("desc can not empty"):$.toast("title can not empty"),n){var o={title:t,descs:e,contentmd:i};this.onsubmit&&(o=this.onsubmit(o)),$.loadingbar().showLoading(),this.getChildAt(0).option.url=this.option.url,this.getChildAt(0).upload(o,function(){$.loadingbar().showSuccess()},function(){$.loadingbar().showError()})}}.bind(this))},setContent:function(t){this._data=t,this.groups("title").items("input").val(t.title),this.groups("desc").items("input").val(t.descs),t.images&&this.getChildAt(0).setImage(basePath+t.images),this.editor.setValue(t.contentmd)}}),Module({name:"edituserinfo",extend:"view",className:"editarticle",template:module.getTemplate("@tmp","edituserinfo"),option:{url:basePath+"admin/api/edituserinfo"},init:function(){this.render()},find_editor:function(t){var e=this;$.loader().js(this.getStaticPath("js","blog.lib.ace.ace"),function(){var i=e.getUUID();$().create("pre").css({height:"600px"}).attr("id",i).appendTo(t);var n=window.ace.edit(i);n.setTheme("ace/theme/github"),n.getSession().setMode("ace/mode/markdown"),e.editor=n,e.dispatchEvent("editdone")})},find_submit:function(t){t.click(function(){var t=this.editor.getValue(),e=!1;t?e=!0:$.toast("content can not empty"),e&&(this.info.userinfomd=t,$.loadingbar().showLoading(),this.postRequest(this.option.url,this.info).data(function(){$.loadingbar().showSuccess()}).bad(function(){$.loadingbar().showError()}).error(function(){$.loadingbar().showError()}))}.bind(this))},setContent:function(t){this.editor.setValue(t)},event_editdone:function(){this.postRequest(basePath+"admin/api/userinfo").data(function(t){this.info=t[0],this.editor.setValue(t[0].userinfomd)})}}),Module({name:"about",extend:"view",className:"about",template:module.getTemplate("@tmp","about"),init:function(){this.render(),this.postRequest(basePath+"bas/userinfo").data(function(t){this.finders("content").html(t[0].userinfohtml)})}}),Module({name:"resume",extend:"view",className:"resume",template:module.getTemplate("@tmp","resume"),init:function(){this.render(),this.getContent()},find_content:function(t){var e=this,i=function(){var t=$("body").scrollTop();t>$(window).height()?e.dom.addClass("show"):e.dom.removeClass("show")};$(window).bind("scroll",i),this.onunload=function(){$(window).unbind("scroll",i)}},find_icon:function(t){var e=this;t.click(function(){var t=$(this);e.finders("icon").each(function(){t.get(0)===$(this).get(0)?t.parent().toggleClass("hover"):$(this).parent().removeClass("hover")})})},find_go:function(t){var e=this;t.click(function(){var t=$(this).index();$("body").scrollingTop(e.dom.find("h2").eq(t).get(0).offsetTop-50)})},find_print:function(t){t.click(function(){0===$("#printiframe").length?$("<iframe id='printiframe' src='"+basePath+"download/resume.html' style='position:absolute;left:-10000px;top:-10000px;'></iframe>").bind("load",function(){$(this).get(0).contentWindow.print()}).appendTo("body"):$("#printiframe").get(0).contentWindow.print()})},find_download:function(t){t.click(function(){var t=$(this).attr("type");0===$("#downloadresume").length?$("a").attr({id:"downloadresume",download:"wangjlresume."+t,href:basePath+"download/resume."+t,target:"_blank"}).appendTo("body"):$("#downloadresume").attr({id:"downloadresume",download:"wangjlresume."+t,href:basePath+"download/resume."+t,target:"_blank"}),setTimeout(function(){$("#downloadresume").trigger("click")},0)})},getContent:function(){var t=this;$.loader().text(basePath+"download/resume.html",function(e){var i=e.match(/<body>[\S\s]*?<\/body>/);i&&(e="<div class='content-p-code'>"+i[0].substring(6,i[0].length-7)+"</div>"),t.finders("content").html(e)})}}),Module({name:"noadminhead",extend:"view",className:"adminhead",template:module.getTemplate("@tmp","noadminhead"),init:function(){this.render()}}),Module({name:"nofind",extend:"view",className:"nofind",template:module.getTemplate("@tmp","nofind"),init:function(){this.render()}}),$.showDate=function(t){var e=new Date(parseInt(t)),i=["Jan","Feb","Mar","Apr","May ","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return(e.getDate()||"")+" "+(i[e.getMonth()]||"")+" "+(e.getFullYear()||"")},$.toast=function(t){$("<div class='toast'><div class='toast_text'>"+t+"</div></div>").appendTo("body").transition().set("-all-transform").done(function(){this.transition().removeAll().set("opacity",{time:1e3}).delay(2e3).then(function(){this.css("opacity",0)}).delay(1e3).done(function(){this.remove()}).resolve()}).scope().transform().y(-150)},$.loadingbar=function(){var t=$("#loadingbar");return 0===t.length&&(t=$("<div id='loadingbar'><div class='loadingbar-bg'></div><div class='loadingbar-desc'></div></div>").appendTo("body")),new loadingbar(t)};var loadingbar=function(t){this.dom=t};loadingbar.prototype.showLoading=function(t){return this.dom.children(1).html("<i class='fa fa-repeat fa-spin'></i> "+(t||"Loading...")),this},loadingbar.prototype.showError=function(t){var e=$.promise(),i=this;return setTimeout(function(){i.close(),e.resolve()},2e3),this.dom.children(1).html("<i class='fa fa-circle-cross'></i> "+(t||"操作错误")),e},loadingbar.prototype.showSuccess=function(t){var e=$.promise(),i=this;return setTimeout(function(){i.close(),e.resolve()},2e3),this.dom.children(1).html("<i class='fa fa-circle-check'></i> "+(t||"操作成功")),e},loadingbar.prototype.close=function(){this.dom.remove()};