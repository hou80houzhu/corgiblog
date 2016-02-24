/* 
 * @packet option.login;
 * @include blog.main;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@main.login"}
        ]
    }
});

