!function(a,t,n){n.fn.tabs=function(t){var i=n.extend({tabPaginationClass:".tab-container__item",tabPaginationContainer:".tab-container",tabPaginationList:".tab-container__list",tabContent:".tab-content__item",tabContentWrapper:".tab-content-container",tabPaginationItems:6,tabActiveClass:"active",tabScrollClass:".tab-container__action"},t);return this.each(function(){var t=n(this),s=t.find(i.tabPaginationClass),e=t.find(i.tabPaginationList),o=t.find(i.tabContent),r=t.find(i.tabPaginationContainer),c=r.outerWidth()/i.tabPaginationItems,d=c*s.length;d>r.outerWidth()?(s.css("width",c),e.css("width",d),r.append('<div class="'+i.tabScrollClass.slice(1)+'"><span class="back">tilbage <</span><span class="forward">frem ></span>')):(s.css("width",r.outerWidth()/s.length),e.css("width",r.outerWidth())),o.parent().wrapInner('<div class="'+i.tabContentWrapper.slice(1)+'"></div>');var l=t.find(i.tabContentWrapper);if(o.css("width",l.outerWidth()),l.css({width:l.outerWidth()*o.length,marginLeft:0}),t.find(i.tabScrollClass).length&&t.find(i.tabScrollClass).on("click","span",function(){var a=parseInt(e.css("margin-left"));n(this).hasClass("back")?0!==a&&e.animate({marginLeft:a+c}):(s.length-i.tabPaginationItems)*c*-1!==a&&e.animate({marginLeft:a+c*-1})}),s.on("click change",function(){s.removeClass(i.tabActiveClass),n(this).addClass(i.tabActiveClass);var a=n(this).data("tabPagination");if(l.parents(".module-tabs__tab-container").css({height:t.find("[data-tab-content="+a+"]").outerHeight()+100}),l.animate({marginLeft:s.index(n(this))*o.outerWidth()*-1}),""===t.data("parentTab")||""===n(this).data("tabPagination")||t.hasClass("loading")||history.replaceState(void 0,void 0,"#"+t.data("parentTab")+"?"+n(this).data("tabPagination")),t.hasClass("loading")&&s.index(n(this))+1>i.tabPaginationItems){var r=parseInt(e.css("margin-left"));e.animate({marginLeft:(r+c*-1)*(s.index(n(this))-i.tabPaginationItems+1)})}}),t.addClass("loading").find(i.tabPaginationClass).first().click(),""!==a.location.hash){var b=a.location.hash.slice(1),h=b.slice(0,b.indexOf("?"));if(t.data("parentTab")==h){var g=b.slice(b.indexOf("?")+1);n("html, body").animate({scrollTop:n("[data-parent-tab="+h+"]").offset().top},500),t.find("[data-tab-pagination="+g+"]").click()}}t.removeClass("loading")})}}(window,document,jQuery,void 0);