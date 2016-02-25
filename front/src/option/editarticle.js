/*
 * @packet option.editarticle; 
 * @include blog.main;
 */
Option({
    name: "page",
    option: {
        modules: [
            {type: "@main.adminhead"},
            {type: "@main.editarticle"},
            {type: "@main.copyright"}
        ],
        override: {
            onendinit: function () {
                if (this.parameters.query) {
                    var ths = this;
                    this.getChildAt(1).option.url = basePath + "admin/api/editarticle";
                    this.getChildAt(1).onsubmit = function (a) {
                        a["id"] = ths.parameters.query.id;
                        return a;
                    }
                }
            },
            event_editdone: function () {
                if (this.parameters.query) {
                    this.postRequest(basePath + "bas/article", this.parameters.query).data(function (data) {
                        this.getChildAt(1).setContent(data[0]);
                    });
                }
            }
        }
    }
});

