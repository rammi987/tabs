!function(a,t,i){i.fn.tabs=function(t){var n=i.extend({tabPaginationClass:".tab-container__item",tabPaginationContainer:".tab-container",tabPaginationList:".tab-container__list",tabContent:".tab-content__item",tabContentWrapper:".tab-content-container",tabPaginationItems:6,tabActiveClass:"active",tabScrollClass:".tab-container__action"},t);return this.each(function(){var t=i(this),s=t.find(n.tabPaginationClass),e=t.find(n.tabPaginationList),o=t.find(n.tabContent),d=t.find(n.tabPaginationContainer),r=d.outerWidth()/n.tabPaginationItems,c=r*s.length;c>d.outerWidth()?(s.css("width",r),e.css("width",c),d.append('<div class="'+n.tabScrollClass.slice(1)+'"><span class="back">tilbage <</span><span class="forward">frem ></span>')):(s.css("width",d.outerWidth()/s.length),e.css("width",d.outerWidth())),o.parent().wrapInner('<div class="'+n.tabContentWrapper.slice(1)+'"></div>');var l=t.find(n.tabContentWrapper);if(o.css("width",l.outerWidth()),l.css({width:l.outerWidth()*o.length,marginLeft:0}),t.find(n.tabScrollClass).length&&t.find(n.tabScrollClass).on("click","span",function(){var a=parseInt(e.css("margin-left"));i(this).hasClass("back")?0!==a&&e.animate({marginLeft:a+r}):(s.length-n.tabPaginationItems)*r*-1!==a&&e.animate({marginLeft:a+r*-1})}),e.on("change",function(){i(this).find("option:selected").each(function(){if(""!==i(this).data("tabPagination")){var a=i(this).data("tabPagination");l.parents(".module-tabs__tab-container").css({height:t.find("[data-tab-content="+a+"]").outerHeight()+100}),l.animate({marginLeft:e.find("option[data-tab-pagination]").index(i(this))*o.outerWidth()*-1}),""===t.data("parentTab")||""===i(this).data("tabPagination")||t.hasClass("loading")||history.replaceState(void 0,void 0,"#"+t.data("parentTab")+"?"+i(this).data("tabPagination"))}})}),s.on("click",function(){s.removeClass(n.tabActiveClass),i(this).addClass(n.tabActiveClass);var a=i(this).data("tabPagination");if(l.parents(".module-tabs__tab-container").css({height:t.find("[data-tab-content="+a+"]").outerHeight()+100}),l.animate({marginLeft:s.index(i(this))*o.outerWidth()*-1}),""===t.data("parentTab")||""===i(this).data("tabPagination")||t.hasClass("loading")||history.replaceState(void 0,void 0,"#"+t.data("parentTab")+"?"+i(this).data("tabPagination")),t.hasClass("loading")&&s.index(i(this))+1>n.tabPaginationItems){var d=parseInt(e.css("margin-left"));e.animate({marginLeft:(d+r*-1)*(s.index(i(this))-n.tabPaginationItems+1)})}}),t.addClass("loading").find(n.tabPaginationClass).first().click(),""!==a.location.hash){var b=a.location.hash.slice(1),h=b.slice(0,b.indexOf("?"));if(t.data("parentTab")==h){var g=b.slice(b.indexOf("?")+1);i("html, body").animate({scrollTop:i("[data-parent-tab="+h+"]").offset().top},500),t.find("[data-tab-pagination="+g+"]").click()}}t.removeClass("loading")})}}(window,document,jQuery,void 0);