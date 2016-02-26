/*! testnode 2016-02-26 */
String.prototype.format=function(){var a=arguments;return this.replace(/\{(\d+)\}/g,function(b,c){return a[c]})};