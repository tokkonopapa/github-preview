/*
 * Facebox (for jQuery)
 * version: 1.2 (05/05/2008)
 * @requires jQuery v1.2 or later
 *
 * Examples at http://famspam.com/facebox/
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2007, 2008 Chris Wanstrath [ chris@ozmm.org ]
 *
 */
(function(a){function e(b){if(a.facebox.settings.inited)return!0;a.facebox.settings.inited=!0;a(document).trigger("init.facebox");j();var c=a.facebox.settings.imageTypes.join("|");a.facebox.settings.imageTypesRegexp=RegExp(".("+c+")$","i");b&&a.extend(a.facebox.settings,b);a("body").append(a.facebox.settings.faceboxHtml);var d=[new Image,new Image];d[0].src=a.facebox.settings.closeImage;d[1].src=a.facebox.settings.loadingImage;a("#facebox").find(".b:first, .bl").each(function(){d.push(new Image);
d.slice(-1).src=a(this).css("background-image").replace(/url\((.+)\)/,"$1")});a("#facebox .close").click(a.facebox.close);a("#facebox .close_image").attr("src",a.facebox.settings.closeImage)}function k(){var a,c;if(self.pageYOffset)c=self.pageYOffset,a=self.pageXOffset;else if(document.documentElement&&document.documentElement.scrollTop)c=document.documentElement.scrollTop,a=document.documentElement.scrollLeft;else if(document.body)c=document.body.scrollTop,a=document.body.scrollLeft;return[a,c]}
function l(){var a;if(self.innerHeight)a=self.innerHeight;else if(document.documentElement&&document.documentElement.clientHeight)a=document.documentElement.clientHeight;else if(document.body)a=document.body.clientHeight;return a}function j(){var b=a.facebox.settings;b.loadingImage=b.loading_image||b.loadingImage;b.closeImage=b.close_image||b.closeImage;b.imageTypes=b.image_types||b.imageTypes;b.faceboxHtml=b.facebox_html||b.faceboxHtml}function f(b,c){if(b.match(/#/)){var d=window.location.href.split("#")[0],
d=b.replace(d,"");"#"!=d&&a.facebox.reveal(a(d).html(),c)}else b.match(a.facebox.settings.imageTypesRegexp)?g(b,c):h(b,c)}function g(b,c){var d=new Image;d.onload=function(){a.facebox.reveal('<div class="image"><img src="'+d.src+'" /></div>',c)};d.src=b}function h(b,c){a.get(b,function(b){a.facebox.reveal(b,c)})}function i(){return!1==a.facebox.settings.overlay||null===a.facebox.settings.opacity}function m(){if(!i())return 0==a("#facebox_overlay").length&&a("body").append('<div id="facebox_overlay" class="facebox_hide"></div>'),
a("#facebox_overlay").hide().addClass("facebox_overlayBG").css("opacity",a.facebox.settings.opacity).click(function(){a(document).trigger("close.facebox")}).fadeIn(200),!1}function n(){if(!i())return a("#facebox_overlay").fadeOut(200,function(){a("#facebox_overlay").removeClass("facebox_overlayBG");a("#facebox_overlay").addClass("facebox_hide");a("#facebox_overlay").remove()}),!1}a.facebox=function(b,c){a.facebox.loading();b.ajax?h(b.ajax,c):b.image?g(b.image,c):b.div?f(b.div,c):a.isFunction(b)?b.call(a):
a.facebox.reveal(b,c)};a.extend(a.facebox,{settings:{opacity:0.2,overlay:!0,loadingImage:"/facebox/loading.gif",closeImage:"/facebox/closelabel.png",imageTypes:["png","jpg","jpeg","gif"],faceboxHtml:'<div id="facebox" style="display:none;"> <div class="popup"> <div class="content"> </div> <a href="#" class="close"><img src="/facebox/closelabel.png" title="close" class="close_image" /></a> </div> </div>'},loading:function(){e();if(1==a("#facebox .loading").length)return!0;m();a("#facebox .content").empty();
a("#facebox .body").children().hide().end().append('<div class="loading"><img src="'+a.facebox.settings.loadingImage+'"/></div>');a("#facebox").css({top:k()[1]+l()/10,left:a(window).width()/2-205}).show();a(document).bind("keydown.facebox",function(b){27==b.keyCode&&a.facebox.close();return!0});a(document).trigger("loading.facebox")},reveal:function(b,c){a(document).trigger("beforeReveal.facebox");c&&a("#facebox .content").addClass(c);a("#facebox .content").append(b);a("#facebox .loading").remove();
a("#facebox .body").children().fadeIn("normal");a("#facebox").css("left",a(window).width()/2-a("#facebox .popup").width()/2);a(document).trigger("reveal.facebox").trigger("afterReveal.facebox")},close:function(){a(document).trigger("close.facebox");return!1}});a.fn.facebox=function(b){if(0!=a(this).length)return e(b),this.bind("click.facebox",function(){a.facebox.loading(!0);var b=this.rel.match(/facebox\[?\.(\w+)\]?/);b&&(b=b[1]);f(this.href,b);return!1})};a(document).bind("close.facebox",function(){a(document).unbind("keydown.facebox");
a("#facebox").fadeOut(function(){a("#facebox .content").removeClass().addClass("content");a("#facebox .loading").remove();a(document).trigger("afterClose.facebox")});n()})})(jQuery);

//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
(function(a){function h(a,b){var c=a.length;while(c--)if(a[c]===b)return c;return-1}function i(a){var b,g,i,j,k,m;g=(a.target||a.srcElement).tagName,b=a.keyCode;if(b==93||b==224)b=91;if(b in d){d[b]=!0;for(j in f)f[j]==b&&(l[j]=!0);return}if(g=="INPUT"||g=="SELECT"||g=="TEXTAREA")return;if(!(b in c))return;for(k=0;k<c[b].length;k++){i=c[b][k];if(i.scope==e||i.scope=="all"){m=i.mods.length>0;for(j in d)if(!d[j]&&h(i.mods,+j)>-1||d[j]&&h(i.mods,+j)==-1)m=!1;(i.mods.length==0&&!d[16]&&!d[18]&&!d[17]&&!d[91]||m)&&i.method(a,i)===!1&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=!0))}}}function j(a){var b=a.keyCode,c;if(b==93||b==224)b=91;if(b in d){d[b]=!1;for(c in f)f[c]==b&&(l[c]=!1)}}function k(){for(b in d)d[b]=!1;for(b in f)l[b]=!1}function l(a,b,d){var e,h,i,j;d===undefined&&(d=b,b="all"),a=a.replace(/\s/g,""),e=a.split(","),e[e.length-1]==""&&(e[e.length-2]+=",");for(i=0;i<e.length;i++){h=[],a=e[i].split("+");if(a.length>1){h=a.slice(0,a.length-1);for(j=0;j<h.length;j++)h[j]=f[h[j]];a=[a[a.length-1]]}a=a[0],a=g[a]||a.toUpperCase().charCodeAt(0),a in c||(c[a]=[]),c[a].push({shortcut:e[i],scope:b,method:d,key:e[i],mods:h})}}function m(a){e=a||"all"}function n(){return e||"all"}function o(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){c(window.event)})}var b,c={},d={16:!1,18:!1,17:!1,91:!1},e="all",f={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},g={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220};for(b=1;b<20;b++)f["f"+b]=111+b;for(b in f)l[b]=!1;o(document,"keydown",i),o(document,"keyup",j),o(window,"focus",k),a.key=l,a.key.setScope=m,a.key.getScope=n,typeof module!="undefined"&&(module.exports=key)})(this);

//
// for Markdown Cheatsheet
//
var cheatsheet;
var toggleCheatSheet = function() {
	if ($('#facebox').css('display') === 'none') {
		if (!cheatsheet) {
			$.facebox(function() {
				$.get('/cheatsheets/markdown-help.html', function(data) {
					$.facebox(data);
					cheatsheet = data;
				});
			});
		}
		$.facebox(cheatsheet);
	} else {
		$(document).trigger('close.facebox');
	}
}
$(function () {
	$('a[rel*=facebox]').facebox({
		loadingImage : '/cheatsheets/loading.gif',
		closeImage   : '/cheatsheets/closelabel.png'
	});
	key('m', function() {
		toggleCheatSheet();
	});
});