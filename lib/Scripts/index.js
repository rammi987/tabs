!function (window, document, $) {
    $.fn.tabs = function (options) {
        var set = $.extend({
            tabPaginationClass: '.tab-container__item',
            tabPaginationContainer: '.tab-container',
            tabPaginationList: '.tab-container__list',
            tabContent: '.tab-content__item',
            tabContentWrapper: '.tab-content-container',
            tabPaginationItems: 6,
            tabActiveClass: 'active',
            tabScrollClass: '.tab-container__action'
        }, options);

        return this.each(function () {
            var elm = $(this),
                tabPaginationClass = elm.find(set.tabPaginationClass),
                tabPaginationList = elm.find(set.tabPaginationList),
                tabContent = elm.find(set.tabContent),
                tabPaginationContainer = elm.find(set.tabPaginationContainer),
                tabsItemWidth = tabPaginationContainer.width() / set.tabPaginationItems,
                tabsContainerWidth = tabsItemWidth * tabPaginationClass.length;

            if(tabsContainerWidth > tabPaginationContainer.width()) {
                tabPaginationClass.css('width', tabsItemWidth);
            } else {
                tabPaginationClass.css('width', tabPaginationContainer.width() / tabPaginationClass.length);
            }

            tabPaginationList.css('width', tabsContainerWidth);

            if (tabsContainerWidth > tabPaginationContainer.width()) {
                tabPaginationContainer.append('<div class="' + set.tabScrollClass.slice(1) + '"><span class="back">tilbage <</span><span class="forward">frem ></span>');
            }

            tabContent.parent().wrapInner('<div class="' + set.tabContentWrapper.slice(1) + '"></div>');

            var tabContentWrapper = elm.find(set.tabContentWrapper);
            tabContent.css('width', tabContentWrapper.width());
            tabContentWrapper.css({ 'width': tabContentWrapper.width() * tabContent.length, marginLeft: 0 });

            if (elm.find(set.tabScrollClass).length) {
                elm.find(set.tabScrollClass).on('click', 'span', function () {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    if ($(this).hasClass('back')) {
                        if (position !== 0 ) {
                            tabPaginationList.animate({ marginLeft: position + tabsItemWidth });
                        }
                    } else {
                        if ((tabPaginationClass.length - set.tabPaginationItems) * tabsItemWidth * -1 !== position) {
                            tabPaginationList.animate({ marginLeft: position + tabsItemWidth * -1 });
                        }
                    }
                });
            }

            tabPaginationClass.on('click', function () {
                tabPaginationClass.removeClass(set.tabActiveClass);
                $(this).addClass(set.tabActiveClass);

                tabContentWrapper.animate({ marginLeft: tabPaginationClass.index($(this)) * tabContent.width() * -1 });

                if (elm.data('parentTab') !== '' && $(this).data('tabPagination') !== '' && !elm.hasClass('loading')) {
                    history.replaceState(undefined, undefined, '#' + elm.data('parentTab') + '?' + $(this).data('tabPagination'));
                }
                if (elm.hasClass('loading') && tabPaginationClass.index($(this)) + 1 > set.tabPaginationItems) {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    tabPaginationList.animate({ marginLeft: (position + tabsItemWidth * -1) * (tabPaginationClass.index($(this)) - set.tabPaginationItems + 1) });
                }
            });

            elm.addClass('loading').find(set.tabPaginationClass).first().click();;

            if (window.location.hash !== '') {
                var deeplink = window.location.hash.slice(1);
                var findParent = deeplink.slice(0, deeplink.indexOf('?'));

                if (elm.data('parentTab') == findParent) {
                    var findChild = deeplink.slice(deeplink.indexOf('?') + 1);
                    $('html, body').animate({
                        scrollTop: $('[data-parent-tab=' + findParent + ']').offset().top
                    }, 500);

                    elm.find('[data-tab-pagination=' + findChild + ']').click();
                }
            }

            elm.removeClass('loading');
        });
    };
}(window, document, jQuery, undefined);
