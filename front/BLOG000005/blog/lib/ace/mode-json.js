ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"invalid.illegal",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"invalid.illegal",regex:"\\/\\/.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:'"',next:"start"},{token:"string",regex:"",next:"start"}]}};r.inherits(i,o),t.JsonHighlightRules=i}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var n=e.getLine(t),o=n.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,s=e.findMatchingBracket({row:t,column:i});if(!s||s.row==t)return 0;var a=this.$getIndent(e.getLine(s.row));e.replace(new r(t,0,t,i-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r,o=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),u=["text","paren.rparen","punctuation.operator"],c=["text","paren.rparen","punctuation.operator","comment"],l={},g=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,l.rangeCount!=e.multiSelect.rangeCount&&(l={rangeCount:e.multiSelect.rangeCount})),l[t]?r=l[t]:void(r=l[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var o=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,o,e.end.column+(o?0:1)]}},f=function(){this.add("braces","insertion",function(e,t,n,o,i){var s=n.getCursorPosition(),u=o.doc.getLine(s.row);if("{"==i){g(n);var c=n.getSelectionRange(),l=o.doc.getTextRange(c);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return d(c,l,"{","}");if(f.isSaneInsertion(n,o))return/[\]\}\)]/.test(u[s.column])||n.inMultiSelectMode?(f.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(f.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==i){g(n);var h=u.substring(s.column,s.column+1);if("}"==h){var m=o.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==m&&f.isAutoInsertedClosing(s,u,i))return f.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){g(n);var b="";f.isMaybeInsertedClosing(s,u)&&(b=a.stringRepeat("}",r.maybeInsertedBrackets),f.clearMaybeInsertedClosing());var h=u.substring(s.column,s.column+1);if("}"===h){var k=o.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!k)return null;var v=this.$getIndent(o.getLine(k.row))}else{if(!b)return void f.clearMaybeInsertedClosing();var v=this.$getIndent(u)}var p=v+o.getTabString();return{text:"\n"+p+"\n"+v+b,selection:[1,p.length,1,p.length]}}f.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,o,i){var s=o.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==s){g(n);var a=o.doc.getLine(i.start.row),u=a.substring(i.end.column,i.end.column+1);if("}"==u)return i.end.column++,i;r.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){g(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return d(i,s,"(",")");if(f.isSaneInsertion(n,r))return f.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){g(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if(")"==c){var l=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==l&&f.isAutoInsertedClosing(a,u,o))return f.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){g(n);var i=n.getSelectionRange(),s=r.doc.getTextRange(i);if(""!==s&&n.getWrapBehavioursEnabled())return d(i,s,"[","]");if(f.isSaneInsertion(n,r))return f.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){g(n);var a=n.getCursorPosition(),u=r.doc.getLine(a.row),c=u.substring(a.column,a.column+1);if("]"==c){var l=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==l&&f.isAutoInsertedClosing(a,u,o))return f.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){g(n);var i=o,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return d(s,a,i,i);if(!a){var u=n.getCursorPosition(),c=r.doc.getLine(u.row),l=c.substring(u.column-1,u.column),f=c.substring(u.column,u.column+1),h=r.getTokenAt(u.row,u.column),m=r.getTokenAt(u.row,u.column+1);if("\\"==l&&h&&/escape/.test(h.type))return null;var b,k=h&&/string/.test(h.type),v=!m||/string/.test(m.type);if(f==i)b=k!==v;else{if(k&&!v)return null;if(k&&v)return null;var p=r.$mode.tokenRe;p.lastIndex=0;var I=p.test(l);p.lastIndex=0;var x=p.test(l);if(I||x)return null;if(f&&!/[\s;,.})\]\\]/.test(f))return null;b=!0}return{text:b?i+i:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){g(n);var s=r.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==i)return o.end.column++,o}})};f.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",u)){var o=new s(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",u))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",c)},f.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},f.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,i,r.autoInsertedLineEnd[0])||(r.autoInsertedBrackets=0),r.autoInsertedRow=o.row,r.autoInsertedLineEnd=n+i.substr(o.column),r.autoInsertedBrackets++},f.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),i=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,i)||(r.maybeInsertedBrackets=0),r.maybeInsertedRow=o.row,r.maybeInsertedLineStart=i.substr(0,o.column)+n,r.maybeInsertedLineEnd=i.substr(o.column),r.maybeInsertedBrackets++},f.isAutoInsertedClosing=function(e,t,n){return r.autoInsertedBrackets>0&&e.row===r.autoInsertedRow&&n===r.autoInsertedLineEnd[0]&&t.substr(e.column)===r.autoInsertedLineEnd},f.isMaybeInsertedClosing=function(e,t){return r.maybeInsertedBrackets>0&&e.row===r.maybeInsertedRow&&t.substr(e.column)===r.maybeInsertedLineEnd&&t.substr(0,e.column)==r.maybeInsertedLineStart},f.popAutoInsertedClosing=function(){r.autoInsertedLineEnd=r.autoInsertedLineEnd.substr(1),r.autoInsertedBrackets--},f.clearMaybeInsertedClosing=function(){r&&(r.maybeInsertedBrackets=0,r.maybeInsertedRow=-1)},o.inherits(f,i),t.CstyleBehaviour=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("../../range").Range,i=e("./fold_mode").FoldMode,s=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(s,i),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(r)?"start":o},this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var s=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,s);var a=e.getCommentFoldRange(n,s+i[0].length,1);return a&&!a.isMultiLine()&&(r?a=this.getSectionRange(e,n):"all"!=t&&(a=null)),a}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),i=t,s=n.length;t+=1;for(var a=t,u=e.getLength();++t<u;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(r>c)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=i)break;if(l.isMultiLine())t=l.end.row;else if(r==c)break}a=t}}return new o(i,s,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),i=e.getLength(),s=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,u=1;++n<i;){t=e.getLine(n);var c=a.exec(t);if(c&&(c[1]?u--:u++,!u))break}var l=n;return l>s?new o(s,r,l,t.length):void 0}}.call(s.prototype)}),ace.define("ace/mode/json",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/worker/worker_client"],function(e,t,n){"use strict";var r=e("../lib/oop"),o=e("./text").Mode,i=e("./json_highlight_rules").JsonHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("./behaviour/cstyle").CstyleBehaviour,u=e("./folding/cstyle").FoldMode,c=e("../worker/worker_client").WorkerClient,l=function(){this.HighlightRules=i,this.$outdent=new s,this.$behaviour=new a,this.foldingRules=new u};r.inherits(l,o),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);if("start"==e){var o=t.match(/^.*[\{\(\[]\s*$/);o&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new c(["ace"],"ace/mode/json_worker","JsonWorker");return t.attachToDocument(e.getDocument()),t.on("annotate",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/json"}.call(l.prototype),t.Mode=l});