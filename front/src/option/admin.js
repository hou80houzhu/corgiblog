/* 
 * @packet option.admin;
 * @include blog.main;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@main.adminhead"},
            {type:"@main.list"},
            {type:"@main.copyright"}
        ]
    }
});