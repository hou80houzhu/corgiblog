/* 
 * @packet option.resume;
 * @include blog.main;
 */
Option({
    name: "page",
    option: {
        modules: [
            {type: "@main.paperheader"},
            {type: "@main.resume"},
            {type: "@main.paperfooter"}
        ],
        override: {
            onendinit: function () {
                this.getChildAt(0).setContent({
                    title: "王金良的简历",
                    time: "1458446592948"
                });
            }
        }
    }
});

