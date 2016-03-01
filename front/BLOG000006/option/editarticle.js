/*
 * @packet option.editarticle; 
 * @include blog.main;
 */Option({name:"page",option:{modules:[{type:"@main.adminhead"},{type:"@main.editarticle"},{type:"@main.copyright"}],override:{onendinit:function(){if(this.parameters.query){var t=this;this.getChildAt(1).option.url=basePath+"admin/api/editarticle",this.getChildAt(1).onsubmit=function(e){return e.id=t.parameters.query.id,e}}},event_editdone:function(){this.parameters.query&&this.postRequest(basePath+"bas/article",this.parameters.query).data(function(t){this.getChildAt(1).setContent(t[0])})}}}});