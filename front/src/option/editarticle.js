/*
 * @packet option.editarticle; 
 * @include blog.main;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@main.adminhead"},
            {type:"@main.editarticle"},
            {type:"@main.copyright"}
        ]
    }
});

