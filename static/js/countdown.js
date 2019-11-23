!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){"use strict";function e(t){if(t instanceof Date)return t;if(String(t).match(a))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/\-/)&&(t=String(t).replace(/\-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}function s(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function i(t){return function(e){var i=e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(i)for(var o=0,a=i.length;o<a;++o){var r=i[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),l=s(r[0]),c=r[1]||"",f=r[3]||"",u=null;r=r[2],h.hasOwnProperty(r)&&(u=h[r],u=Number(t[u])),null!==u&&("!"===c&&(u=n(f,u)),""===c&&u<10&&(u="0"+u.toString()),e=e.replace(l,u.toString()))}return e=e.replace(/%%/,"%")}}function n(t,e){var s="s",i="";return t&&(t=t.replace(/(:|;|\s)/gi,"").split(/\,/),1===t.length?s=t[0]:(i=t[0],s=t[1])),Math.abs(e)>1?s:i}var o=[],a=[],r={precision:100,elapse:!1,defer:!1};a.push(/^[0-9]*$/.source),a.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),a.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),a=new RegExp(a.join("|"));var h={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},l=function(e,s,i){this.el=e,this.$el=t(e),this.interval=null,this.offset={},this.options=t.extend({},r),this.firstTick=!0,this.instanceNumber=o.length,o.push(this),this.$el.data("countdown-instance",this.instanceNumber),i&&("function"==typeof i?(this.$el.on("update.countdown",i),this.$el.on("stoped.countdown",i),this.$el.on("finish.countdown",i)):this.options=t.extend({},r,i)),this.setFinalDate(s),!1===this.options.defer&&this.start()};t.extend(l.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;this.update(),this.interval=setInterval(function(){t.update.call(t)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),o[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(t){this.finalDate=e(t)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var t,e=new Date;if(t=this.finalDate.getTime()-e.getTime(),t=Math.ceil(t/1e3),t=!this.options.elapse&&t<0?0:Math.abs(t),this.totalSecsLeft===t||this.firstTick)return void(this.firstTick=!1);this.totalSecsLeft=t,this.elapsed=e>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-e.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish"))},dispatchEvent:function(e){var s=t.Event(e+".countdown");s.finalDate=this.finalDate,s.elapsed=this.elapsed,s.offset=t.extend({},this.offset),s.strftime=i(this.offset),this.$el.trigger(s)}}),t.fn.countdown=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){var s=t(this).data("countdown-instance");if(void 0!==s){var i=o[s],n=e[0];l.prototype.hasOwnProperty(n)?i[n].apply(i,e.slice(1)):null===String(n).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(i.setFinalDate.call(i,n),i.start()):t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,n))}else new l(this,e[0],e[1])})}});