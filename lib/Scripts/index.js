!(function (window, document, $) {
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
                tabsItemWidth = tabPaginationContainer.outerWidth() / set.tabPaginationItems,
                tabsContainerWidth = tabsItemWidth * tabPaginationClass.length;

            tabPaginationClass.css('width', tabPaginationContainer.outerWidth() / tabPaginationClass.length);
            tabPaginationList.css('width', tabPaginationContainer.outerWidth());


            if(tabsContainerWidth > tabPaginationContainer.outerWidth() && !(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))) {
                tabsItemWidth = (tabPaginationContainer.outerWidth() - tabPaginationContainer.find(set.tabScrollClass).outerWidth()) / set.tabPaginationItems;
                tabsContainerWidth = tabsItemWidth * tabPaginationClass.length;
                var margin = tabPaginationContainer.find(set.tabScrollClass).outerWidth() / 2;

                tabPaginationClass.css('width', tabsItemWidth);
                tabPaginationList.css({'width': tabsContainerWidth});

                tabPaginationList.parents(set.tabPaginationContainer).css({'marginLeft': margin, 'marginRight': margin});
            } else {
                tabPaginationContainer.find(set.tabScrollClass).remove();
            }

            tabContent.parent().wrapInner('<div class="' + set.tabContentWrapper.slice(1) + '"></div>');
            var tabContentWrapper = elm.find(set.tabContentWrapper);
            tabContent.css('width', tabContentWrapper.outerWidth());
            tabContentWrapper.css({ 'width': tabContentWrapper.outerWidth() * tabContent.length, marginLeft: 0 });

            if (elm.find(set.tabScrollClass).length) {
                var ani = 0;
                elm.find(set.tabScrollClass).on('click', 'span', function () {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    if(ani === 1) return;

                    if ($(this).hasClass('back')) {
                        if (position !== 0 ) {
                            ani = 1;
                            tabPaginationList.animate({ marginLeft: position + tabsItemWidth }, function() {
                                ani = 0;
                            });
                        }
                    } else {
                        if ((tabPaginationClass.length - set.tabPaginationItems) * tabsItemWidth * -1 !== position) {
                            ani = 1;
                            tabPaginationList.animate({ marginLeft: position + tabsItemWidth * -1 }, function() {
                                ani = 0;
                            });
                        }
                    }
                });
            }

            tabPaginationList.on('change', function () {
                $(this).find('option:selected').each(function() {
                    if($(this).data('tabPagination') !== '') {
                        var childContent = $(this).data('tabPagination');

                        tabContentWrapper.parents('.module-tabs__tab-container').css({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                        tabContentWrapper.animate({ marginLeft: tabPaginationList.find('option[data-tab-pagination]').index($(this)) * tabContent.outerWidth() * -1});

                        if (elm.data('parentTab') !== '' && $(this).data('tabPagination') !== '' && !elm.hasClass('loading')) {
                            history.replaceState(undefined, undefined, '#' + elm.data('parentTab') + '?' + $(this).data('tabPagination'));
                        }
                    }
                });
            });

            tabPaginationClass.on('click', function () {
                tabPaginationClass.removeClass(set.tabActiveClass);
                $(this).addClass(set.tabActiveClass);
                var childContent = $(this).data('tabPagination');

                tabContentWrapper.parents('.module-tabs__tab-container').css({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                tabContentWrapper.animate({ marginLeft: tabPaginationClass.index($(this)) * tabContent.outerWidth() * -1});

                if (elm.data('parentTab') !== '' && $(this).data('tabPagination') !== '' && !elm.hasClass('loading')) {
                    history.replaceState(undefined, undefined, '#' + elm.data('parentTab') + '?' + $(this).data('tabPagination'));
                }
                if (elm.hasClass('loading') && tabPaginationClass.index($(this)) + 1 > set.tabPaginationItems) {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    tabPaginationList.animate({ marginLeft: (position + tabsItemWidth * -1) * (tabPaginationClass.index($(this)) - set.tabPaginationItems + 1) });
                }
            });

            elm.addClass('loading').find(set.tabPaginationClass).first().click();

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
})(window, document, jQuery, undefined);
