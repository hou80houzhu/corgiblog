/*
 * @packet option.userinfo; 
 * @include blog.main;
 */
Option({
    name: "page",
    option: {
        modules: [
            {type: "@main.adminhead"},
            {type: "@main.edituserinfo"},
            {type: "@main.copyright"}
        ]
    }
});

