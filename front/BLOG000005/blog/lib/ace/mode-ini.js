ace.define("ace/mode/ini_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,i,n){"use strict";var t=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,a="\\\\(?:[\\\\0abtrn;#=:]|x[a-fA-F\\d]{4})",r=function(){this.$rules={start:[{token:"punctuation.definition.comment.ini",regex:"#.*",push_:[{token:"comment.line.number-sign.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.number-sign.ini"}]},{token:"punctuation.definition.comment.ini",regex:";.*",push_:[{token:"comment.line.semicolon.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.semicolon.ini"}]},{token:["keyword.other.definition.ini","text","punctuation.separator.key-value.ini"],regex:"\\b([a-zA-Z0-9_.-]+)\\b(\\s*)(=)"},{token:["punctuation.definition.entity.ini","constant.section.group-title.ini","punctuation.definition.entity.ini"],regex:"^(\\[)(.*?)(\\])"},{token:"punctuation.definition.string.begin.ini",regex:"'",push:[{token:"punctuation.definition.string.end.ini",regex:"'",next:"pop"},{token:"constant.language.escape",regex:a},{defaultToken:"string.quoted.single.ini"}]},{token:"punctuation.definition.string.begin.ini",regex:'"',push:[{token:"constant.language.escape",regex:a},{token:"punctuation.definition.string.end.ini",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.ini"}]}]},this.normalizeRules()};r.metaData={fileTypes:["ini","conf"],keyEquivalent:"^~I",name:"Ini",scopeName:"source.ini"},t.inherits(r,o),i.IniHighlightRules=r}),ace.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,i,n){"use strict";var t=e("../../lib/oop"),o=e("../../range").Range,a=e("./fold_mode").FoldMode,r=i.FoldMode=function(){};t.inherits(r,a),function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(e,i,n){var t=this.foldingStartMarker,a=e.getLine(n),r=a.match(t);if(r){for(var l=r[1]+".",u=a.length,s=e.getLength(),g=n,c=n;++n<s;)if(a=e.getLine(n),!/^\s*$/.test(a)){if(r=a.match(t),r&&0!==r[1].lastIndexOf(l,0))break;c=n}if(c>g){var d=e.getLine(c).length;return new o(g,u,c,d)}}}}.call(r.prototype)}),ace.define("ace/mode/ini",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ini_highlight_rules","ace/mode/folding/ini"],function(e,i,n){"use strict";var t=e("../lib/oop"),o=e("./text").Mode,a=e("./ini_highlight_rules").IniHighlightRules,r=e("./folding/ini").FoldMode,l=function(){this.HighlightRules=a,this.foldingRules=new r};t.inherits(l,o),function(){this.lineCommentStart=";",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/ini"}.call(l.prototype),i.Mode=l});