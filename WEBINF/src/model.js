/* 
 * @packet table.blog;
 */
Module({
    name: "user",
    extend: "table",
    tableName: "user",
    id:"id",
    cols: ["id", "username", "password","userinfomd","userinfohtml"]
});
Module({
    name: "articles",
    extend: "table",
    tableName: "articles",
    id:"id",
    cols: ["id", "title", "contentmd","contenthtml","ctime","etime","author","descs"]
});
