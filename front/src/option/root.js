/* 
 * @packet option.root;
 * @require blog.main;
 */
Option({
    name:"blog",
    option:{
        override_onendinit:function(){
            this.addChild({
                type:"@main.pagecontainer",
                option:{
                    url:"http://localhost:8080/blog/"
                }
            });
        }
    }
});

