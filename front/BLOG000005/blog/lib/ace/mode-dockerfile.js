ace.define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=t.reservedKeywords="!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set",s=t.languageConstructs="[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait",a=function(){var e=this.createKeywordMapper({keyword:o,"support.function.builtin":s,"invalid.deprecated":"debugger"},"identifier"),t="(?:(?:[1-9]\\d*)|(?:0))",n="(?:\\.\\d+)",r="(?:\\d+)",i="(?:(?:"+r+"?"+n+")|(?:"+r+"\\.))",a="(?:(?:"+i+"|"+r+"))",l="(?:"+a+"|"+i+")",u="(?:&"+r+")",c="[a-zA-Z_][a-zA-Z0-9_]*",g="(?:(?:\\$"+c+")|(?:"+c+"=))",d="(?:\\$(?:SHLVL|\\$|\\!|\\?))",h="(?:"+c+"\\s*\\(\\))";this.$rules={start:[{token:"constant",regex:/\\./},{token:["text","comment"],regex:/(^|\s)(#.*)$/},{token:"string",regex:'"',push:[{token:"constant.language.escape",regex:/\\(?:[$abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/},{token:"constant",regex:/\$\w+/},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{regex:"<<<",token:"keyword.operator"},{stateName:"heredoc",regex:"(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",onMatch:function(e,t,n){var r="-"==e[2]?"indentedHeredoc":"heredoc",i=e.split(this.splitRegex);return n.push(r,i[4]),[{type:"constant",value:i[1]},{type:"text",value:i[2]},{type:"string",value:i[3]},{type:"support.class",value:i[4]},{type:"string",value:i[5]}]},rules:{heredoc:[{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^	+"},{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){return"heredoc"===t[0]||"indentedHeredoc"===t[0]?t[0]:e}},{token:"variable.language",regex:d},{token:"variable",regex:g},{token:"support.function",regex:h},{token:"support.function",regex:u},{token:"string",start:"'",end:"'"},{token:"constant.numeric",regex:l},{token:"constant.numeric",regex:t+"\\b"},{token:e,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"}]},this.normalizeRules()};r.inherits(a,i),t.ShHighlightRules=a}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,o=e("./fold_mode").FoldMode,s=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(s,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(r)?"start":i},this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var o=i.match(this.foldingStartMarker);if(o){var s=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,s);var a=e.getCommentFoldRange(n,s+o[0].length,1);return a&&!a.isMultiLine()&&(r?a=this.getSectionRange(e,n):"all"!=t&&(a=null)),a}if("markbegin"!==t){var o=i.match(this.foldingStopMarker);if(o){var s=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,s):e.getCommentFoldRange(n,s,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),o=t,s=n.length;t+=1;for(var a=t,l=e.getLength();++t<l;){n=e.getLine(t);var u=n.search(/\S/);if(-1!==u){if(r>u)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=o)break;if(c.isMultiLine())t=c.end.row;else if(r==u)break}a=t}}return new i(o,s,a,e.getLine(a).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),o=e.getLength(),s=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<o;){t=e.getLine(n);var u=a.exec(t);if(u&&(u[1]?l--:l++,!l))break}var c=n;return c>s?new i(s,r,c,t.length):void 0}}.call(s.prototype)}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t,n){"use strict";var r,i=e("../../lib/oop"),o=e("../behaviour").Behaviour,s=e("../../token_iterator").TokenIterator,a=e("../../lib/lang"),l=["text","paren.rparen","punctuation.operator"],u=["text","paren.rparen","punctuation.operator","comment"],c={},g=function(e){var t=-1;return e.multiSelect&&(t=e.selection.index,c.rangeCount!=e.multiSelect.rangeCount&&(c={rangeCount:e.multiSelect.rangeCount})),c[t]?r=c[t]:void(r=c[t]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},d=function(e,t,n,r){var i=e.end.row-e.start.row;return{text:n+t+r,selection:[0,e.start.column+1,i,e.end.column+(i?0:1)]}},h=function(){this.add("braces","insertion",function(e,t,n,i,o){var s=n.getCursorPosition(),l=i.doc.getLine(s.row);if("{"==o){g(n);var u=n.getSelectionRange(),c=i.doc.getTextRange(u);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return d(u,c,"{","}");if(h.isSaneInsertion(n,i))return/[\]\}\)]/.test(l[s.column])||n.inMultiSelectMode?(h.recordAutoInsert(n,i,"}"),{text:"{}",selection:[1,1]}):(h.recordMaybeInsert(n,i,"{"),{text:"{",selection:[1,1]})}else if("}"==o){g(n);var f=l.substring(s.column,s.column+1);if("}"==f){var m=i.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==m&&h.isAutoInsertedClosing(s,l,o))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){g(n);var p="";h.isMaybeInsertedClosing(s,l)&&(p=a.stringRepeat("}",r.maybeInsertedBrackets),h.clearMaybeInsertedClosing());var f=l.substring(s.column,s.column+1);if("}"===f){var k=i.findMatchingBracket({row:s.row,column:s.column+1},"}");if(!k)return null;var v=this.$getIndent(i.getLine(k.row))}else{if(!p)return void h.clearMaybeInsertedClosing();var v=this.$getIndent(l)}var b=v+i.getTabString();return{text:"\n"+b+"\n"+v+p,selection:[1,b.length,1,b.length]}}h.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,i,o){var s=i.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==s){g(n);var a=i.doc.getLine(o.start.row),l=a.substring(o.end.column,o.end.column+1);if("}"==l)return o.end.column++,o;r.maybeInsertedBrackets--}}),this.add("parens","insertion",function(e,t,n,r,i){if("("==i){g(n);var o=n.getSelectionRange(),s=r.doc.getTextRange(o);if(""!==s&&n.getWrapBehavioursEnabled())return d(o,s,"(",")");if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==i){g(n);var a=n.getCursorPosition(),l=r.doc.getLine(a.row),u=l.substring(a.column,a.column+1);if(")"==u){var c=r.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==c&&h.isAutoInsertedClosing(a,l,i))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&"("==o){g(n);var s=r.doc.getLine(i.start.row),a=s.substring(i.start.column+1,i.start.column+2);if(")"==a)return i.end.column++,i}}),this.add("brackets","insertion",function(e,t,n,r,i){if("["==i){g(n);var o=n.getSelectionRange(),s=r.doc.getTextRange(o);if(""!==s&&n.getWrapBehavioursEnabled())return d(o,s,"[","]");if(h.isSaneInsertion(n,r))return h.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==i){g(n);var a=n.getCursorPosition(),l=r.doc.getLine(a.row),u=l.substring(a.column,a.column+1);if("]"==u){var c=r.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==c&&h.isAutoInsertedClosing(a,l,i))return h.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&"["==o){g(n);var s=r.doc.getLine(i.start.row),a=s.substring(i.start.column+1,i.start.column+2);if("]"==a)return i.end.column++,i}}),this.add("string_dquotes","insertion",function(e,t,n,r,i){if('"'==i||"'"==i){g(n);var o=i,s=n.getSelectionRange(),a=r.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return d(s,a,o,o);if(!a){var l=n.getCursorPosition(),u=r.doc.getLine(l.row),c=u.substring(l.column-1,l.column),h=u.substring(l.column,l.column+1),f=r.getTokenAt(l.row,l.column),m=r.getTokenAt(l.row,l.column+1);if("\\"==c&&f&&/escape/.test(f.type))return null;var p,k=f&&/string/.test(f.type),v=!m||/string/.test(m.type);if(h==o)p=k!==v;else{if(k&&!v)return null;if(k&&v)return null;var b=r.$mode.tokenRe;b.lastIndex=0;var x=b.test(c);b.lastIndex=0;var I=b.test(c);if(x||I)return null;if(h&&!/[\s;,.})\]\\]/.test(h))return null;p=!0}return{text:p?o+o:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&('"'==o||"'"==o)){g(n);var s=r.doc.getLine(i.start.row),a=s.substring(i.start.column+1,i.start.column+2);if(a==o)return i.end.column++,i}})};h.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new s(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",l)){var i=new s(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",l))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",u)},h.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},h.recordAutoInsert=function(e,t,n){var i=e.getCursorPosition(),o=t.doc.getLine(i.row);this.isAutoInsertedClosing(i,o,r.autoInsertedLineEnd[0])||(r.autoInsertedBrackets=0),r.autoInsertedRow=i.row,r.autoInsertedLineEnd=n+o.substr(i.column),r.autoInsertedBrackets++},h.recordMaybeInsert=function(e,t,n){var i=e.getCursorPosition(),o=t.doc.getLine(i.row);this.isMaybeInsertedClosing(i,o)||(r.maybeInsertedBrackets=0),r.maybeInsertedRow=i.row,r.maybeInsertedLineStart=o.substr(0,i.column)+n,r.maybeInsertedLineEnd=o.substr(i.column),r.maybeInsertedBrackets++},h.isAutoInsertedClosing=function(e,t,n){return r.autoInsertedBrackets>0&&e.row===r.autoInsertedRow&&n===r.autoInsertedLineEnd[0]&&t.substr(e.column)===r.autoInsertedLineEnd},h.isMaybeInsertedClosing=function(e,t){return r.maybeInsertedBrackets>0&&e.row===r.maybeInsertedRow&&t.substr(e.column)===r.maybeInsertedLineEnd&&t.substr(0,e.column)==r.maybeInsertedLineStart},h.popAutoInsertedClosing=function(){r.autoInsertedLineEnd=r.autoInsertedLineEnd.substr(1),r.autoInsertedBrackets--},h.clearMaybeInsertedClosing=function(){r&&(r.maybeInsertedBrackets=0,r.maybeInsertedRow=-1)},i.inherits(h,o),t.CstyleBehaviour=h}),ace.define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sh_highlight_rules","ace/range","ace/mode/folding/cstyle","ace/mode/behaviour/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,o=e("./sh_highlight_rules").ShHighlightRules,s=e("../range").Range,a=e("./folding/cstyle").FoldMode,l=e("./behaviour/cstyle").CstyleBehaviour,u=function(){this.HighlightRules=o,this.foldingRules=new a,this.$behaviour=new l};r.inherits(u,i),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e),o=i.tokens;if(o.length&&"comment"==o[o.length-1].type)return r;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(r+=n)}return r};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,r){if("\r\n"!==r&&"\r"!==r&&"\n"!==r)return!1;var i=this.getTokenizer().getLineTokens(n.trim(),t).tokens;if(!i)return!1;do var o=i.pop();while(o&&("comment"==o.type||"text"==o.type&&o.value.match(/^\s+$/)));return o?"keyword"==o.type&&e[o.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var r=this.$getIndent(t.getLine(n)),i=t.getTabString();r.slice(-i.length)==i&&t.remove(new s(n,r.length-i.length,n,r.length))},this.$id="ace/mode/sh"}.call(u.prototype),t.Mode=u}),ace.define("ace/mode/dockerfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/sh_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./sh_highlight_rules").ShHighlightRules,o=function(){i.call(this);for(var e=this.$rules.start,t=0;t<e.length;t++)if("variable.language"==e[t].token){e.splice(t,0,{token:"constant.language",regex:"(?:^(?:FROM|MAINTAINER|RUN|CMD|EXPOSE|ENV|ADD|ENTRYPOINT|VOLUME|USER|WORKDIR|ONBUILD|COPY)\\b)",caseInsensitive:!0});break}};r.inherits(o,i),t.DockerfileHighlightRules=o}),ace.define("ace/mode/dockerfile",["require","exports","module","ace/lib/oop","ace/mode/sh","ace/mode/dockerfile_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./sh").Mode,o=e("./dockerfile_highlight_rules").DockerfileHighlightRules,s=e("./folding/cstyle").FoldMode,a=function(){i.call(this),this.HighlightRules=o,this.foldingRules=new s};r.inherits(a,i),function(){this.$id="ace/mode/dockerfile"}.call(a.prototype),t.Mode=a});