/* 
 * @packet option.detail;
 * @include blog.main;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@main.paperheader"},
            {type:"@main.papercontent"},
            {type:"@main.paperfooter"}
        ],
        override:{
            onendinit:function(){
                console.log(this.parameters);
                this.postRequest(basePath+"bas/article",this.parameters.query).data(function(t){
                    if(t.length>0){
                        t=t[0];
                        this.getChildAt(0).setContent({
                            title:t.title,
                            time:t.etime
                        });
                        this.getChildAt(1).setContent(t.contenthtml);
                    }else{
                        this.getChildAt(1).setContent("<div style='height:700px;text-align:center'>Article can not find.</div>");
                    }
                });
            }
        }
    }
});

