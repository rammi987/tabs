!function(t,a,i){i.fn.tabs=function(a){var n=i.extend({tabPaginationClass:".tab-container__item",tabPaginationContainer:".tab-container",tabPaginationList:".tab-container__list",tabContent:".tab-content__item",tabContentWrapper:".tab-content-container",tabPaginationItems:6,tabActiveClass:"active",tabScrollClass:".tab-container__action"},a);return this.each(function(){var a=i(this),e=a.find(n.tabPaginationClass),s=a.find(n.tabPaginationList),o=a.find(n.tabContent),r=a.find(n.tabPaginationContainer),d=r.outerWidth()/n.tabPaginationItems,c=d*e.length;if(e.css("width",r.outerWidth()/e.length),s.css("width",r.outerWidth()),c>r.outerWidth()&&!("ontouchstart"in t||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0)){d=(r.outerWidth()-r.find(n.tabScrollClass).outerWidth())/n.tabPaginationItems,c=d*e.length;var l=r.find(n.tabScrollClass).outerWidth()/2;e.css("width",d),s.css({width:c}),s.parents(n.tabPaginationContainer).css({marginLeft:l,marginRight:l})}else r.find(n.tabScrollClass).remove();o.parent().wrapInner('<div class="'+n.tabContentWrapper.slice(1)+'"></div>');var h=a.find(n.tabContentWrapper);if(o.css("width",h.outerWidth()),h.css({width:h.outerWidth()*o.length,marginLeft:0}),a.find(n.tabScrollClass).length){var b=0;a.find(n.tabScrollClass).on("click","span",function(){var t=parseInt(s.css("margin-left"));1!==b&&(i(this).hasClass("back")?0!==t&&(b=1,s.animate({marginLeft:t+d},function(){b=0})):(e.length-n.tabPaginationItems)*d*-1!==t&&(b=1,s.animate({marginLeft:t+d*-1},function(){b=0})))})}if(s.on("change",function(){i(this).find("option:selected").each(function(){if(""!==i(this).data("tabPagination")){var t=i(this).data("tabPagination");h.parents(".module-tabs__tab-container").css({height:a.find("[data-tab-content="+t+"]").outerHeight()+100}),h.animate({marginLeft:s.find("option[data-tab-pagination]").index(i(this))*o.outerWidth()*-1}),""===a.data("parentTab")||""===i(this).data("tabPagination")||a.hasClass("loading")||history.replaceState(void 0,void 0,"#"+a.data("parentTab")+"?"+i(this).data("tabPagination"))}})}),e.on("click",function(){e.removeClass(n.tabActiveClass),i(this).addClass(n.tabActiveClass);var t=i(this).data("tabPagination");if(h.parents(".module-tabs__tab-container").css({height:a.find("[data-tab-content="+t+"]").outerHeight()+100}),h.animate({marginLeft:e.index(i(this))*o.outerWidth()*-1}),""===a.data("parentTab")||""===i(this).data("tabPagination")||a.hasClass("loading")||history.replaceState(void 0,void 0,"#"+a.data("parentTab")+"?"+i(this).data("tabPagination")),a.hasClass("loading")&&e.index(i(this))+1>n.tabPaginationItems){var r=parseInt(s.css("margin-left"));s.animate({marginLeft:(r+d*-1)*(e.index(i(this))-n.tabPaginationItems+1)})}}),a.addClass("loading").find(n.tabPaginationClass).first().click(),""!==t.location.hash){var g=t.location.hash.slice(1),f=g.slice(0,g.indexOf("?"));if(a.data("parentTab")==f){var m=g.slice(g.indexOf("?")+1);i("html, body").animate({scrollTop:i("[data-parent-tab="+f+"]").offset().top},500),a.find("[data-tab-pagination="+m+"]").click()}}a.removeClass("loading")})}}(window,document,jQuery,void 0);