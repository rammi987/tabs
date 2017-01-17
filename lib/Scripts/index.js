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

            if(tabsContainerWidth > tabPaginationContainer.outerWidth() && $(window).width() > 767) {
                tabsItemWidth = (tabPaginationContainer.outerWidth() - tabPaginationContainer.find(set.tabScrollClass).outerWidth()) / set.tabPaginationItems;
                tabsContainerWidth = tabsItemWidth * tabPaginationClass.length;
                var margin = tabPaginationContainer.find(set.tabScrollClass).outerWidth() / 2;

                tabPaginationClass.css('width', tabsItemWidth);
                tabPaginationList.css({'width': tabsContainerWidth});

                tabPaginationList.parents(set.tabPaginationContainer).css({'marginLeft': margin, 'marginRight': margin});
                tabPaginationContainer.find(set.tabScrollClass).show();
            } else {
                tabPaginationContainer.find(set.tabScrollClass).hide();
            }

            tabContent.first().parents('.container').wrapInner('<div class="' + set.tabContentWrapper.slice(1) + '"></div>');
            var tabContentWrapper = elm.find(set.tabContentWrapper);
            tabContent.css('width', tabContentWrapper.outerWidth());
            tabContentWrapper.css({ 'width': tabContentWrapper.outerWidth() * tabContent.length, marginLeft: 0 });

            $(window).on('resize', function() {

                tabPaginationClass.css('width', tabPaginationContainer.outerWidth() / tabPaginationClass.length);
                tabPaginationList.css('width', tabPaginationContainer.outerWidth());

                if ($(window).width() < 767) {
                    tabPaginationContainer.find(set.tabScrollClass).hide();
                    elm.find(set.tabPaginationContainer).attr({
                        style: ''
                    });
                } else if(set.tabPaginationItems < tabPaginationClass.length) {
                    tabsItemWidth = tabPaginationContainer.outerWidth() / set.tabPaginationItems;
                    tabsContainerWidth = tabsItemWidth * tabPaginationClass.length;

                    tabPaginationClass.css('width', tabsItemWidth);
                    tabPaginationList.css({'width': tabsContainerWidth});

                    var margin = tabPaginationContainer.find(set.tabScrollClass).outerWidth() / 2;
                    tabPaginationList.parents(set.tabPaginationContainer).css({'marginLeft': margin, 'marginRight': margin});

                    tabPaginationContainer.find(set.tabScrollClass).show();
                }

                tabContent.css('width', tabContentWrapper.parent().outerWidth());
                tabContentWrapper.css({ 'width': tabContentWrapper.parent().outerWidth() * tabContent.length });

                if ($(window).width() < 767) {
                    var currentitem = elm.find('select' + set.tabPaginationList).find('option:selected');
                    currentitem = (tabPaginationList.find('option[data-tab-pagination]').index(currentitem) === -1) ? elm.find('select' + set.tabPaginationList).find('option').eq(1) : currentitem;
                    var childContent = currentitem.data('tabPagination'),
                        newPos = tabPaginationList.find('option[data-tab-pagination]').index(currentitem) * tabContent.outerWidth() * -1;
                } else {
                    var currentitem = elm.find(set.tabPaginationClass + '.active'),
                        childContent = currentitem.data('tabPagination'),
                        newPos = tabPaginationClass.index(currentitem) * tabContent.outerWidth() * -1;

                }

                tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                tabContentWrapper.css({ marginLeft: newPos});
            });

            if (elm.find(set.tabScrollClass).length) {
                var ani = 0;
                var tabsNav = set.tabPaginationItems;
                elm.find(set.tabScrollClass).find('.back').hide();

                elm.find(set.tabScrollClass).on('click', 'div', function () {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    if(ani === 1) return;

                    if ($(this).hasClass('back')) {
                        if (position !== 0 && tabsNav !== set.tabPaginationItems ) {
                            ani = 1;
                            if(tabsNav !== set.tabPaginationItems + 1 ) {
                                tabPaginationList.animate({ marginLeft: position + tabsItemWidth }, function() {
                                    ani = 0;
                                });
                            }
                            else {
                                tabPaginationList.animate({ marginLeft: 0 }, function() {
                                    ani = 0;
                                });
                            }

                            tabsNav--;
                        }
                    } else {
                        if ((tabPaginationClass.length - set.tabPaginationItems) * tabsItemWidth * -1 !== position && tabsNav <= tabPaginationClass.length) {
                            ani = 1;
                            tabPaginationList.animate({ marginLeft: position + tabsItemWidth * -1 }, function() {
                                ani = 0;
                            });

                            tabsNav++;
                        }
                    }

                    if(tabsNav === set.tabPaginationItems) {
                        elm.find(set.tabScrollClass).find('.back').hide();
                        elm.find(set.tabScrollClass).find('.forward').show();
                    } else if(tabsNav === tabPaginationClass.length) {
                        elm.find(set.tabScrollClass).find('.forward').hide();
                        elm.find(set.tabScrollClass).find('.back').show();
                    } else {
                        elm.find(set.tabScrollClass).find('.forward').show();
                        elm.find(set.tabScrollClass).find('.back').show();
                    }


                });
            }

            tabPaginationList.on('change', function () {
                $(this).find('option:selected').each(function() {
                    if($(this).data('tabPagination') !== '') {
                        var childContent = $(this).data('tabPagination');

                        tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                        tabContentWrapper.animate({ marginLeft: tabPaginationList.find('option[data-tab-pagination]').index($(this)) * tabContent.outerWidth() * -1});

                        if (elm.data('parentTab') !== '' && $(this).data('tabPagination') !== '' && !elm.hasClass('loading')) {
                            history.replaceState(undefined, undefined, '#' + elm.data('parentTab') + '?' + $(this).data('tabPagination'));
                        }
                    } else if ($(this).val() !== '') {
                        var childContent = $(this).val();

                        tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
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

                    tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                    tabContentWrapper.animate({ marginLeft: tabPaginationClass.index($(this)) * tabContent.outerWidth() * -1});

                    if (elm.data('parentTab') !== '' && $(this).data('tabPagination') !== '' && !elm.hasClass('loading')) {
                        history.replaceState(undefined, undefined, '#' + elm.data('parentTab') + '?' + $(this).data('tabPagination'));
                    }
                    if (elm.hasClass('loading') && tabPaginationClass.index($(this)) + 1 > set.tabPaginationItems) {
                        var position = parseInt(tabPaginationList.css('margin-left'));
                        tabPaginationList.animate({ marginLeft: (position + tabsItemWidth * -1) * (tabPaginationClass.index($(this)) - set.tabPaginationItems + 1) });
                        tabsNav = tabsNav + (tabPaginationClass.index($(this)) - set.tabPaginationItems + 1);

                        if(tabsNav === set.tabPaginationItems) {
                            elm.find(set.tabScrollClass).find('.back').hide();
                            elm.find(set.tabScrollClass).find('.forward').show();
                        } else if(tabsNav === tabPaginationClass.length) {
                            elm.find(set.tabScrollClass).find('.forward').hide();
                            elm.find(set.tabScrollClass).find('.back').show();
                        } else {
                            elm.find(set.tabScrollClass).find('.forward').show();
                            elm.find(set.tabScrollClass).find('.back').show();
                        }

                    }
                });

            elm.find('.lazyload').each(function() {
                // create an observer instance
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.attributeName === 'src') {
                            var currentitem = undefined;

                            if ($(window).width() < 767) {
                                currentitem = elm.find('select' + set.tabPaginationList).find('option:selected');
                                currentitem = (tabPaginationList.find('option[data-tab-pagination]').index(currentitem) === -1) ? elm.find('select' + set.tabPaginationList).find('option').eq(1) : currentitem;
                            } else {
                                currentitem = elm.find(set.tabPaginationClass + '.active');
                            }

                            var childContent = currentitem.data('tabPagination');
                            tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });

                            observer.disconnect();
                        }
                    });
                });

            // pass in the target node, as well as the observer options
                observer.observe(this, { attributes: true});
            });

            if( elm.find(set.tabPaginationClass + '.active').length) {
               /* elm.addClass('loading').find(set.tabPaginationClass + '.active').click();*/
                var elemtChild = elm.addClass('loading').find(set.tabPaginationClass + '.active');

                tabPaginationClass.removeClass(set.tabActiveClass);
                elemtChild.addClass(set.tabActiveClass);
                    var childContent = elemtChild.data('tabPagination');

                tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
                tabContentWrapper.css({ marginLeft: tabPaginationClass.index(elemtChild) * tabContent.outerWidth() * -1});


                if (elm.hasClass('loading') && tabPaginationClass.index(elemtChild) + 1 > set.tabPaginationItems) {
                    var position = parseInt(tabPaginationList.css('margin-left'));
                    tabPaginationList.animate({ marginLeft: (position + tabsItemWidth * -1) * (tabPaginationClass.index(elemtChild) - set.tabPaginationItems + 1) });
                    tabsNav = tabsNav + (tabPaginationClass.index(elemtChild) - set.tabPaginationItems + 1);

                    if(tabsNav === set.tabPaginationItems) {
                        elm.find(set.tabScrollClass).find('.back').hide();
                        elm.find(set.tabScrollClass).find('.forward').show();
                    } else if(tabsNav === tabPaginationClass.length) {
                        elm.find(set.tabScrollClass).find('.forward').hide();
                        elm.find(set.tabScrollClass).find('.back').show();
                    } else {
                        elm.find(set.tabScrollClass).find('.forward').show();
                        elm.find(set.tabScrollClass).find('.back').show();
                    }

                }
            } else {
                elm.addClass('loading').find(set.tabPaginationClass).first().click();
            }

            tabContent.show();
            if (window.location.hash !== '') {
                var deeplink = window.location.hash.slice(1),
                    findParent = deeplink.slice(0, deeplink.indexOf('?'));

                if (elm.data('parentTab') == findParent) {
                    var findChild = deeplink.slice(deeplink.indexOf('?') + 1);
                    $('html, body').animate({
                        scrollTop: $('[data-parent-tab=' + findParent + ']').offset().top
                    }, 500);

                    elm.find('[data-tab-pagination=' + findChild + ']').click(); 
                }
            }
            elm.removeClass('loading');
            elm.addClass('tabsinit-loaded');
            elm.on('tabs:recalchight', function() {
                var elemtChild = elm.find(set.tabPaginationClass + '.active');
                var childContent = elemtChild.data('tabPagination');
                tabContentWrapper.parents('.module-tabs__tab-container').animate({ 'height': elm.find('[data-tab-content='+ childContent +']').outerHeight() + 100 });
            });
        });
    };
})(window, document, jQuery, undefined);
