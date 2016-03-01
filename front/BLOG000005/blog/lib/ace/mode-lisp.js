ace.define("ace/mode/lisp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,r=function(){var e="case|do|let|loop|if|else|when",t="eq|neq|and|or",i="null|nil",n="cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn",o=this.createKeywordMapper({"keyword.control":e,"keyword.operator":t,"constant.language":i,"support.function":n},"identifier",!0);this.$rules={start:[{token:"comment",regex:";.*$"},{token:["storage.type.function-type.lisp","text","entity.name.function.lisp"],regex:"(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"},{token:["punctuation.definition.constant.character.lisp","constant.character.lisp"],regex:"(#)((?:\\w|[\\\\+-=<>'\"&#])+)"},{token:["punctuation.definition.variable.lisp","variable.other.global.lisp","punctuation.definition.variable.lisp"],regex:"(\\*)(\\S*)(\\*)"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:o,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"string",regex:'"(?=.)',next:"qqstring"}],qqstring:[{token:"constant.character.escape.lisp",regex:"\\\\."},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"}]}};n.inherits(r,o),t.LispHighlightRules=r}),ace.define("ace/mode/lisp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lisp_highlight_rules"],function(e,t,i){"use strict";var n=e("../lib/oop"),o=e("./text").Mode,r=e("./lisp_highlight_rules").LispHighlightRules,l=function(){this.HighlightRules=r};n.inherits(l,o),function(){this.lineCommentStart=";",this.$id="ace/mode/lisp"}.call(l.prototype),t.Mode=l});