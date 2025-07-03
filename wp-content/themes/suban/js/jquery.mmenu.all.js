! function(a) {
    function b() {
        a[c].glbl || (h = {
            $wndw: a(window),
            $docu: a(document),
            $html: a("html"),
            $body: a("body")
        }, e = {}, f = {}, g = {}, a.each([e, f, g], function(a, b) {
            b.add = function(a) {
                a = a.split(" ");
                for (var c = 0, d = a.length; c < d; c++) b[a[c]] = b.mm(a[c])
            }
        }), e.mm = function(a) {
            return "mm-" + a
        }, e.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), e.umm = function(a) {
            return "mm-" == a.slice(0, 3) && (a = a.slice(3)), a
        }, f.mm = function(a) {
            return "mm-" + a
        }, f.add("parent child"), g.mm = function(a) {
            return a + ".mm"
        }, g.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"), a[c]._c = e, a[c]._d = f, a[c]._e = g, a[c].glbl = h)
    }
    var c = "mmenu",
        d = "5.7.8";
    if (!(a[c] && a[c].version > d)) {
        a[c] = function(a, b, c) {
            this.$menu = a, this._api = ["bind", "getInstance", "update", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.opts = b, this.conf = c, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
            var d = this.$pnls.children();
            return this._initAddons(), this.initPanels(d), "function" == typeof this.___debug && this.___debug(), this
        }, a[c].version = d, a[c].addons = {}, a[c].uniqueId = 0, a[c].defaults = {
            extensions: [],
            initMenu: function() {},
            initPanels: function() {},
            navbar: {
                add: !0,
                title: "Menu",
                titleLink: "panel"
            },
            onClick: {
                setSelected: !0
            },
            slidingSubmenus: !0
        }, a[c].configuration = {
            classNames: {
                divider: "Divider",
                inset: "Inset",
                panel: "Panel",
                selected: "Selected",
                spacer: "Spacer",
                vertical: "Vertical"
            },
            clone: !1,
            openingInterval: 25,
            panelNodetype: "ul, ol, div",
            transitionDuration: 400
        }, a[c].prototype = {
            init: function(a) {
                this.initPanels(a)
            },
            getInstance: function() {
                return this
            },
            update: function() {
                this.trigger("update")
            },
            initPanels: function(a) {
                a = a.not("." + e.nopanel), a = this._initPanels(a), this.opts.initPanels.call(this, a), this.trigger("initPanels", a), this.trigger("update")
            },
            openPanel: function(b) {
                var d = b.parent(),
                    f = this;
                if (d.hasClass(e.vertical)) {
                    var g = d.parents("." + e.subopened);
                    if (g.length) return void this.openPanel(g.first());
                    d.addClass(e.opened), this.trigger("openPanel", b), this.trigger("openingPanel", b), this.trigger("openedPanel", b)
                } else {
                    if (b.hasClass(e.current)) return;
                    var h = this.$pnls.children("." + e.panel),
                        i = h.filter("." + e.current);
                    h.removeClass(e.highest).removeClass(e.current).not(b).not(i).not("." + e.vertical).addClass(e.hidden), a[c].support.csstransitions || i.addClass(e.hidden), b.hasClass(e.opened) ? b.nextAll("." + e.opened).addClass(e.highest).removeClass(e.opened).removeClass(e.subopened) : (b.addClass(e.highest), i.addClass(e.subopened)), b.removeClass(e.hidden).addClass(e.current), f.trigger("openPanel", b), setTimeout(function() {
                        b.removeClass(e.subopened).addClass(e.opened), f.trigger("openingPanel", b), f.__transitionend(b, function() {
                            f.trigger("openedPanel", b)
                        }, f.conf.transitionDuration)
                    }, this.conf.openingInterval)
                }
            },
            closePanel: function(a) {
                var b = a.parent();
                b.hasClass(e.vertical) && (b.removeClass(e.opened), this.trigger("closePanel", a), this.trigger("closingPanel", a), this.trigger("closedPanel", a))
            },
            closeAllPanels: function() {
                this.$menu.find("." + e.listview).children().removeClass(e.selected).filter("." + e.vertical).removeClass(e.opened);
                var a = this.$pnls.children("." + e.panel),
                    b = a.first();
                this.$pnls.children("." + e.panel).not(b).removeClass(e.subopened).removeClass(e.opened).removeClass(e.current).removeClass(e.highest).addClass(e.hidden), this.openPanel(b)
            },
            togglePanel: function(a) {
                var b = a.parent();
                b.hasClass(e.vertical) && this[b.hasClass(e.opened) ? "closePanel" : "openPanel"](a)
            },
            setSelected: function(a) {
                this.$menu.find("." + e.listview).children("." + e.selected).removeClass(e.selected), a.addClass(e.selected), this.trigger("setSelected", a)
            },
            bind: function(a, b) {
                a = "init" == a ? "initPanels" : a, this.cbck[a] = this.cbck[a] || [], this.cbck[a].push(b)
            },
            trigger: function() {
                var a = this,
                    b = Array.prototype.slice.call(arguments),
                    c = b.shift();
                if (c = "init" == c ? "initPanels" : c, this.cbck[c])
                    for (var d = 0, e = this.cbck[c].length; d < e; d++) this.cbck[c][d].apply(a, b)
            },
            _initMenu: function() {
                this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                    a(this).attr("id", e.mm(a(this).attr("id")))
                })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = a('<div class="' + e.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(e.wrapper);
                var b = [e.menu];
                this.opts.slidingSubmenus || b.push(e.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && b.push(this.opts.extensions), this.$menu.addClass(b.join(" ")), this.trigger("_initMenu")
            },
            _initPanels: function(b) {
                var d = this,
                    g = this.__findAddBack(b, "ul, ol");
                this.__refactorClass(g, this.conf.classNames.inset, "inset").addClass(e.nolistview + " " + e.nopanel), g.not("." + e.nolistview).addClass(e.listview);
                var h = this.__findAddBack(b, "." + e.listview).children();
                this.__refactorClass(h, this.conf.classNames.selected, "selected"), this.__refactorClass(h, this.conf.classNames.divider, "divider"), this.__refactorClass(h, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(b, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                var i = a(),
                    j = b.add(b.find("." + e.panel)).add(this.__findAddBack(b, "." + e.listview).children().children(this.conf.panelNodetype)).not("." + e.nopanel);
                this.__refactorClass(j, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || j.addClass(e.vertical), j.each(function() {
                    var b = a(this),
                        c = b;
                    b.is("ul, ol") ? (b.wrap('<div class="' + e.panel + '" />'), c = b.parent()) : c.addClass(e.panel);
                    var f = b.attr("id");
                    b.removeAttr("id"), c.attr("id", f || d.__getUniqueId()), b.hasClass(e.vertical) && (b.removeClass(d.conf.classNames.vertical), c.add(c.parent()).addClass(e.vertical)), i = i.add(c)
                });
                var k = a("." + e.panel, this.$menu);
                i.each(function(b) {
                    var g, h, i = a(this),
                        j = i.parent(),
                        k = j.children("a, span").first();
                    if (j.is("." + e.panels) || (j.data(f.child, i), i.data(f.parent, j)), j.children("." + e.next).length || j.parent().is("." + e.listview) && (g = i.attr("id"), h = a('<a class="' + e.next + '" href="#' + g + '" data-target="#' + g + '" />').insertBefore(k), k.is("span") && h.addClass(e.fullsubopen)), !i.children("." + e.navbar).length && !j.hasClass(e.vertical)) {
                        j.parent().is("." + e.listview) ? j = j.closest("." + e.panel) : (k = j.closest("." + e.panel).find('a[href="#' + i.attr("id") + '"]').first(), j = k.closest("." + e.panel));
                        var l = !1,
                            m = a('<div class="' + e.navbar + '" />');
                        if (d.opts.navbar.add && i.addClass(e.hasnavbar), j.length) {
                            switch (g = j.attr("id"), d.opts.navbar.titleLink) {
                                case "anchor":
                                    l = k.attr("href");
                                    break;
                                case "panel":
                                case "parent":
                                    l = "#" + g;
                                    break;
                                default:
                                    l = !1
                            }
                            m.append('<a class="' + e.btn + " " + e.prev + '" href="#' + g + '" data-target="#' + g + '" />').append(a('<a class="' + e.title + '"' + (l ? ' href="' + l + '"' : "") + " />").text(k.text())).prependTo(i)
                        } else d.opts.navbar.title && m.append('<a class="' + e.title + '">' + a[c].i18n(d.opts.navbar.title) + "</a>").prependTo(i)
                    }
                });
                var l = this.__findAddBack(b, "." + e.listview).children("." + e.selected).removeClass(e.selected).last().addClass(e.selected);
                l.add(l.parentsUntil("." + e.menu, "li")).filter("." + e.vertical).addClass(e.opened).end().each(function() {
                    a(this).parentsUntil("." + e.menu, "." + e.panel).not("." + e.vertical).first().addClass(e.opened).parentsUntil("." + e.menu, "." + e.panel).not("." + e.vertical).first().addClass(e.opened).addClass(e.subopened)
                }), l.children("." + e.panel).not("." + e.vertical).addClass(e.opened).parentsUntil("." + e.menu, "." + e.panel).not("." + e.vertical).first().addClass(e.opened).addClass(e.subopened);
                var m = k.filter("." + e.opened);
                return m.length || (m = i.first()), m.addClass(e.opened).last().addClass(e.current), i.not("." + e.vertical).not(m.last()).addClass(e.hidden).end().filter(function() {
                    return !a(this).parent().hasClass(e.panels)
                }).appendTo(this.$pnls), this.trigger("_initPanels", i), i
            },
            _initAnchors: function() {
                var b = this;
                h.$body.on(g.click + "-oncanvas", "a[href]", function(d) {
                    var f = a(this),
                        g = !1,
                        h = b.$menu.find(f).length;
                    for (var i in a[c].addons)
                        if (a[c].addons[i].clickAnchor.call(b, f, h)) {
                            g = !0;
                            break
                        }
                    var j = f.attr("href");
                    if (!g && h && j.length > 1 && "#" == j.slice(0, 1)) try {
                        var k = a(j, b.$menu);
                        k.is("." + e.panel) && (g = !0, b[f.parent().hasClass(e.vertical) ? "togglePanel" : "openPanel"](k))
                    } catch (a) {}
                    if (g && d.preventDefault(), !g && h && f.is("." + e.listview + " > li > a") && !f.is('[rel="external"]') && !f.is('[target="_blank"]')) {
                        b.__valueOrFn(b.opts.onClick.setSelected, f) && b.setSelected(a(d.target).parent());
                        var l = b.__valueOrFn(b.opts.onClick.preventDefault, f, "#" == j.slice(0, 1));
                        l && d.preventDefault(), b.__valueOrFn(b.opts.onClick.close, f, l) && b.close()
                    }
                }), this.trigger("_initAnchors")
            },
            _initAddons: function() {
                var b;
                for (b in a[c].addons) a[c].addons[b].add.call(this), a[c].addons[b].add = function() {};
                for (b in a[c].addons) a[c].addons[b].setup.call(this);
                this.trigger("_initAddons")
            },
            _getOriginalMenuId: function() {
                var a = this.$menu.attr("id");
                return a && a.length && this.conf.clone && (a = e.umm(a)), a
            },
            __api: function() {
                var b = this,
                    c = {};
                return a.each(this._api, function(a) {
                    var d = this;
                    c[d] = function() {
                        var a = b[d].apply(b, arguments);
                        return "undefined" == typeof a ? c : a
                    }
                }), c
            },
            __valueOrFn: function(a, b, c) {
                return "function" == typeof a ? a.call(b[0]) : "undefined" == typeof a && "undefined" != typeof c ? c : a
            },
            __refactorClass: function(a, b, c) {
                return a.filter("." + b).removeClass(b).addClass(e[c])
            },
            __findAddBack: function(a, b) {
                return a.find(b).add(a.filter(b))
            },
            __filterListItems: function(a) {
                return a.not("." + e.divider).not("." + e.hidden)
            },
            __transitionend: function(b, c, d) {
                var e = !1,
                    f = function(d) {
                        if ("undefined" != typeof d) {
                            if (!a(d.target).is(b)) return !1;
                            b.unbind(g.transitionend), b.unbind(g.webkitTransitionEnd)
                        }
                        e || c.call(b[0]), e = !0
                    };
                b.on(g.transitionend, f), b.on(g.webkitTransitionEnd, f), setTimeout(f, 1.1 * d)
            },
            __getUniqueId: function() {
                return e.mm(a[c].uniqueId++)
            }
        }, a.fn[c] = function(d, e) {
            b(), d = a.extend(!0, {}, a[c].defaults, d), e = a.extend(!0, {}, a[c].configuration, e);
            var f = a();
            return this.each(function() {
                var b = a(this);
                if (!b.data(c)) {
                    var g = new a[c](b, d, e);
                    g.$menu.data(c, g.__api()), f = f.add(g.$menu)
                }
            }), f
        }, a[c].i18n = function() {
            var b = {};
            return function(c) {
                switch (typeof c) {
                    case "object":
                        return a.extend(b, c), b;
                    case "string":
                        return b[c] || c;
                    case "undefined":
                    default:
                        return b
                }
            }
        }(), a[c].support = {
            touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
            csstransitions: function() {
                if ("undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransitions) return Modernizr.csstransitions;
                var a = document.body || document.documentElement,
                    b = a.style,
                    c = "transition";
                if ("string" == typeof b[c]) return !0;
                var d = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                c = c.charAt(0).toUpperCase() + c.substr(1);
                for (var e = 0; e < d.length; e++)
                    if ("string" == typeof b[d[e] + c]) return !0;
                return !1
            }(),
            csstransforms: function() {
                return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms
            }(),
            csstransforms3d: function() {
                return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d
            }()
        };
        var e, f, g, h
    }
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "offCanvas";
    a[b].addons[c] = {
        setup: function() {
            if (this.opts[c]) {
                var e = this.opts[c],
                    f = this.conf[c];
                g = a[b].glbl, this._api = a.merge(this._api, ["open", "close", "setPage"]), "top" != e.position && "bottom" != e.position || (e.zposition = "front"), "string" != typeof f.pageSelector && (f.pageSelector = "> " + f.pageNodetype), g.$allMenus = (g.$allMenus || a()).add(this.$menu), this.vars.opened = !1;
                var h = [d.offcanvas];
                "left" != e.position && h.push(d.mm(e.position)), "back" != e.zposition && h.push(d.mm(e.zposition)), this.$menu.addClass(h.join(" ")).parent().removeClass(d.wrapper), a[b].support.csstransforms || this.$menu.addClass(d["no-csstransforms"]), a[b].support.csstransforms3d || this.$menu.addClass(d["no-csstransforms3d"]), this.setPage(g.$page), this._initBlocker(), this["_initWindow_" + c](), this.$menu[f.menuInjectMethod + "To"](f.menuWrapperSelector);
                var i = window.location.hash;
                if (i) {
                    var j = this._getOriginalMenuId();
                    j && j == i.slice(1) && this.open()
                }
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"), e.add("style"), f.add("resize")
        },
        clickAnchor: function(a, b) {
            var e = this;
            if (this.opts[c]) {
                var f = this._getOriginalMenuId();
                if (f && a.is('[href="#' + f + '"]')) {
                    if (b) return !0;
                    var h = a.closest("." + d.menu);
                    if (h.length) {
                        var i = h.data("mmenu");
                        if (i && i.close) return i.close(), e.__transitionend(h, function() {
                            e.open()
                        }, e.conf.transitionDuration), !0
                    }
                    return this.open(), !0
                }
                if (g.$page) return f = g.$page.first().attr("id"), f && a.is('[href="#' + f + '"]') ? (this.close(), !0) : void 0
            }
        }
    }, a[b].defaults[c] = {
        position: "left",
        zposition: "back",
        blockUI: !0,
        moveBackground: !0
    }, a[b].configuration[c] = {
        pageNodetype: "div",
        pageSelector: null,
        noPageSelector: [],
        wrapPageIfNeeded: !0,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, a[b].prototype.open = function() {
        if (!this.vars.opened) {
            var a = this;
            this._openSetup(), setTimeout(function() {
                a._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, a[b].prototype._openSetup = function() {
        var b = this,
            h = this.opts[c];
        this.closeAllOthers(), g.$page.each(function() {
            a(this).data(e.style, a(this).attr("style") || "")
        }), g.$wndw.trigger(f.resize + "-" + c, [!0]);
        var i = [d.opened];
        h.blockUI && i.push(d.blocking), "modal" == h.blockUI && i.push(d.modal), h.moveBackground && i.push(d.background), "left" != h.position && i.push(d.mm(this.opts[c].position)), "back" != h.zposition && i.push(d.mm(this.opts[c].zposition)), this.opts.extensions && i.push(this.opts.extensions), g.$html.addClass(i.join(" ")), setTimeout(function() {
            b.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(d.current + " " + d.opened)
    }, a[b].prototype._openFinish = function() {
        var a = this;
        this.__transitionend(g.$page.first(), function() {
            a.trigger("opened")
        }, this.conf.transitionDuration), g.$html.addClass(d.opening), this.trigger("opening")
    }, a[b].prototype.close = function() {
        if (this.vars.opened) {
            var b = this;
            this.__transitionend(g.$page.first(), function() {
                b.$menu.removeClass(d.current + " " + d.opened);
                var f = [d.opened, d.blocking, d.modal, d.background, d.mm(b.opts[c].position), d.mm(b.opts[c].zposition)];
                b.opts.extensions && f.push(b.opts.extensions), g.$html.removeClass(f.join(" ")), g.$page.each(function() {
                    a(this).attr("style", a(this).data(e.style))
                }), b.vars.opened = !1, b.trigger("closed")
            }, this.conf.transitionDuration), g.$html.removeClass(d.opening), this.trigger("close"), this.trigger("closing")
        }
    }, a[b].prototype.closeAllOthers = function() {
        g.$allMenus.not(this.$menu).each(function() {
            var c = a(this).data(b);
            c && c.close && c.close()
        })
    }, a[b].prototype.setPage = function(b) {
        var e = this,
            f = this.conf[c];
        b && b.length || (b = g.$body.find(f.pageSelector), f.noPageSelector.length && (b = b.not(f.noPageSelector.join(", "))), b.length > 1 && f.wrapPageIfNeeded && (b = b.wrapAll("<" + this.conf[c].pageNodetype + " />").parent())), b.each(function() {
            a(this).attr("id", a(this).attr("id") || e.__getUniqueId())
        }), b.addClass(d.page + " " + d.slideout), g.$page = b, this.trigger("setPage", b)
    }, a[b].prototype["_initWindow_" + c] = function() {
        g.$wndw.off(f.keydown + "-" + c).on(f.keydown + "-" + c, function(a) {
            if (g.$html.hasClass(d.opened) && 9 == a.keyCode) return a.preventDefault(), !1
        });
        var a = 0;
        g.$wndw.off(f.resize + "-" + c).on(f.resize + "-" + c, function(b, c) {
            if (1 == g.$page.length && (c || g.$html.hasClass(d.opened))) {
                var e = g.$wndw.height();
                (c || e != a) && (a = e, g.$page.css("minHeight", e))
            }
        })
    }, a[b].prototype._initBlocker = function() {
        var b = this;
        this.opts[c].blockUI && (g.$blck || (g.$blck = a('<div id="' + d.blocker + '" class="' + d.slideout + '" />')), g.$blck.appendTo(g.$body).off(f.touchstart + "-" + c + " " + f.touchmove + "-" + c).on(f.touchstart + "-" + c + " " + f.touchmove + "-" + c, function(a) {
            a.preventDefault(), a.stopPropagation(), g.$blck.trigger(f.mousedown + "-" + c)
        }).off(f.mousedown + "-" + c).on(f.mousedown + "-" + c, function(a) {
            a.preventDefault(), g.$html.hasClass(d.modal) || (b.closeAllOthers(), b.close())
        }))
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "scrollBugFix";
    a[b].addons[c] = {
        setup: function() {
            var e = this,
                h = this.opts[c];
            if (this.conf[c], g = a[b].glbl, a[b].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof h && (h = {
                    fix: h
                }), "object" != typeof h && (h = {}), h = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], h), h.fix)) {
                var i = this.$menu.attr("id"),
                    j = !1;
                this.bind("opening", function() {
                    this.$pnls.children("." + d.current).scrollTop(0)
                }), g.$docu.on(f.touchmove, function(a) {
                    e.vars.opened && a.preventDefault()
                }), g.$body.on(f.touchstart, "#" + i + "> ." + d.panels + "> ." + d.current, function(a) {
                    e.vars.opened && (j || (j = !0, 0 === a.currentTarget.scrollTop ? a.currentTarget.scrollTop = 1 : a.currentTarget.scrollHeight === a.currentTarget.scrollTop + a.currentTarget.offsetHeight && (a.currentTarget.scrollTop -= 1), j = !1))
                }).on(f.touchmove, "#" + i + "> ." + d.panels + "> ." + d.current, function(b) {
                    e.vars.opened && a(this)[0].scrollHeight > a(this).innerHeight() && b.stopPropagation()
                }), g.$wndw.on(f.orientationchange, function() {
                    e.$pnls.children("." + d.current).scrollTop(0).css({
                        "-webkit-overflow-scrolling": "auto"
                    }).css({
                        "-webkit-overflow-scrolling": "touch"
                    })
                })
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        fix: !0
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "autoHeight";
    a[b].addons[c] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var e = this.opts[c];
                if (this.conf[c], g = a[b].glbl, "boolean" == typeof e && e && (e = {
                        height: "auto"
                    }), "string" == typeof e && (e = {
                        height: e
                    }), "object" != typeof e && (e = {}), e = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], e), "auto" == e.height || "highest" == e.height) {
                    this.$menu.addClass(d.autoheight);
                    var f = function(b) {
                        if (this.vars.opened) {
                            var c = parseInt(this.$pnls.css("top"), 10) || 0,
                                f = parseInt(this.$pnls.css("bottom"), 10) || 0,
                                g = 0;
                            this.$menu.addClass(d.measureheight), "auto" == e.height ? (b = b || this.$pnls.children("." + d.current), b.is("." + d.vertical) && (b = b.parents("." + d.panel).not("." + d.vertical).first()), g = b.outerHeight()) : "highest" == e.height && this.$pnls.children().each(function() {
                                var b = a(this);
                                b.is("." + d.vertical) && (b = b.parents("." + d.panel).not("." + d.vertical).first()), g = Math.max(g, b.outerHeight())
                            }), this.$menu.height(g + c + f).removeClass(d.measureheight)
                        }
                    };
                    this.bind("opening", f), "highest" == e.height && this.bind("initPanels", f), "auto" == e.height && (this.bind("update", f), this.bind("openPanel", f), this.bind("closePanel", f))
                }
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("autoheight measureheight"), f.add("resize")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        height: "default"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "backButton";
    a[b].addons[c] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var e = this,
                    f = this.opts[c];
                if (this.conf[c], g = a[b].glbl, "boolean" == typeof f && (f = {
                        close: f
                    }), "object" != typeof f && (f = {}), f = a.extend(!0, {}, a[b].defaults[c], f), f.close) {
                    var h = "#" + e.$menu.attr("id");
                    this.bind("opened", function(a) {
                        location.hash != h && history.pushState(null, document.title, h)
                    }), a(window).on("popstate", function(a) {
                        g.$html.hasClass(d.opened) ? (a.stopPropagation(), e.close()) : location.hash == h && (a.stopPropagation(), e.open())
                    })
                }
            }
        },
        add: function() {
            return window.history && window.history.pushState ? (d = a[b]._c, e = a[b]._d, void(f = a[b]._e)) : void(a[b].addons[c].setup = function() {})
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        close: !1
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "columns";
    a[b].addons[c] = {
        setup: function() {
            var e = this.opts[c];
            if (this.conf[c], g = a[b].glbl, "boolean" == typeof e && (e = {
                    add: e
                }), "number" == typeof e && (e = {
                    add: !0,
                    visible: e
                }), "object" != typeof e && (e = {}), "number" == typeof e.visible && (e.visible = {
                    min: e.visible,
                    max: e.visible
                }), e = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], e), e.add) {
                e.visible.min = Math.max(1, Math.min(6, e.visible.min)), e.visible.max = Math.max(e.visible.min, Math.min(6, e.visible.max)), this.$menu.addClass(d.columns);
                for (var f = this.opts.offCanvas ? this.$menu.add(g.$html) : this.$menu, h = [], i = 0; i <= e.visible.max; i++) h.push(d.columns + "-" + i);
                h = h.join(" ");
                var j = function(a) {
                        m.call(this, this.$pnls.children("." + d.current))
                    },
                    k = function() {
                        var a = this.$pnls.children("." + d.panel).filter("." + d.opened).length;
                        a = Math.min(e.visible.max, Math.max(e.visible.min, a)), f.removeClass(h).addClass(d.columns + "-" + a)
                    },
                    l = function() {
                        this.opts.offCanvas && g.$html.removeClass(h)
                    },
                    m = function(b) {
                        this.$pnls.children("." + d.panel).removeClass(h).filter("." + d.subopened).removeClass(d.hidden).add(b).slice(-e.visible.max).each(function(b) {
                            a(this).addClass(d.columns + "-" + b)
                        })
                    };
                this.bind("open", k), this.bind("close", l), this.bind("initPanels", j), this.bind("openPanel", m), this.bind("openingPanel", k), this.bind("openedPanel", k), this.opts.offCanvas || k.call(this)
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("columns")
        },
        clickAnchor: function(b, e) {
            if (!this.opts[c].add) return !1;
            if (e) {
                var f = b.attr("href");
                if (f.length > 1 && "#" == f.slice(0, 1)) try {
                    var g = a(f, this.$menu);
                    if (g.is("." + d.panel))
                        for (var h = parseInt(b.closest("." + d.panel).attr("class").split(d.columns + "-")[1].split(" ")[0], 10) + 1; h !== !1;) {
                            var i = this.$pnls.children("." + d.columns + "-" + h);
                            if (!i.length) {
                                h = !1;
                                break
                            }
                            h++, i.removeClass(d.subopened).removeClass(d.opened).removeClass(d.current).removeClass(d.highest).addClass(d.hidden)
                        }
                } catch (a) {}
            }
        }
    }, a[b].defaults[c] = {
        add: !1,
        visible: {
            min: 1,
            max: 3
        }
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "counters";
    a[b].addons[c] = {
        setup: function() {
            var f = this,
                h = this.opts[c];
            this.conf[c], g = a[b].glbl, "boolean" == typeof h && (h = {
                add: h,
                update: h
            }), "object" != typeof h && (h = {}), h = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], h), this.bind("initPanels", function(b) {
                this.__refactorClass(a("em", b), this.conf.classNames[c].counter, "counter")
            }), h.add && this.bind("initPanels", function(b) {
                var c;
                switch (h.addTo) {
                    case "panels":
                        c = b;
                        break;
                    default:
                        c = b.filter(h.addTo)
                }
                c.each(function() {
                    var b = a(this).data(e.parent);
                    b && (b.children("em." + d.counter).length || b.prepend(a('<em class="' + d.counter + '" />')))
                })
            }), h.update && this.bind("update", function() {
                this.$pnls.find("." + d.panel).each(function() {
                    var b = a(this),
                        c = b.data(e.parent);
                    if (c) {
                        var g = c.children("em." + d.counter);
                        g.length && (b = b.children("." + d.listview), b.length && g.html(f.__filterListItems(b.children()).length))
                    }
                })
            })
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("counter search noresultsmsg")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        add: !1,
        addTo: "panels",
        update: !1
    }, a[b].configuration.classNames[c] = {
        counter: "Counter"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "dividers";
    a[b].addons[c] = {
        setup: function() {
            var e = this,
                h = this.opts[c];
            if (this.conf[c], g = a[b].glbl, "boolean" == typeof h && (h = {
                    add: h,
                    fixed: h
                }), "object" != typeof h && (h = {}), h = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], h), this.bind("initPanels", function(b) {
                    this.__refactorClass(a("li", this.$menu), this.conf.classNames[c].collapsed, "collapsed")
                }), h.add && this.bind("initPanels", function(b) {
                    var c;
                    switch (h.addTo) {
                        case "panels":
                            c = b;
                            break;
                        default:
                            c = b.filter(h.addTo)
                    }
                    a("." + d.divider, c).remove(), c.find("." + d.listview).not("." + d.vertical).each(function() {
                        var b = "";
                        e.__filterListItems(a(this).children()).each(function() {
                            var c = a.trim(a(this).children("a, span").text()).slice(0, 1).toLowerCase();
                            c != b && c.length && (b = c, a('<li class="' + d.divider + '">' + c + "</li>").insertBefore(this))
                        })
                    })
                }), h.collapse && this.bind("initPanels", function(b) {
                    a("." + d.divider, b).each(function() {
                        var b = a(this),
                            c = b.nextUntil("." + d.divider, "." + d.collapsed);
                        c.length && (b.children("." + d.subopen).length || (b.wrapInner("<span />"), b.prepend('<a href="#" class="' + d.subopen + " " + d.fullsubopen + '" />')))
                    })
                }), h.fixed) {
                var i = function(b) {
                    b = b || this.$pnls.children("." + d.current);
                    var c = b.find("." + d.divider).not("." + d.hidden);
                    if (c.length) {
                        this.$menu.addClass(d.hasdividers);
                        var e = b.scrollTop() || 0,
                            f = "";
                        b.is(":visible") && b.find("." + d.divider).not("." + d.hidden).each(function() {
                            a(this).position().top + e < e + 1 && (f = a(this).text())
                        }), this.$fixeddivider.text(f)
                    } else this.$menu.removeClass(d.hasdividers)
                };
                this.$fixeddivider = a('<ul class="' + d.listview + " " + d.fixeddivider + '"><li class="' + d.divider + '"></li></ul>').prependTo(this.$pnls).children(), this.bind("openPanel", i), this.bind("update", i), this.bind("initPanels", function(b) {
                    b.off(f.scroll + "-dividers " + f.touchmove + "-dividers").on(f.scroll + "-dividers " + f.touchmove + "-dividers", function(b) {
                        i.call(e, a(this))
                    })
                })
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("collapsed uncollapsed fixeddivider hasdividers"), f.add("scroll")
        },
        clickAnchor: function(a, b) {
            if (this.opts[c].collapse && b) {
                var e = a.parent();
                if (e.is("." + d.divider)) {
                    var f = e.nextUntil("." + d.divider, "." + d.collapsed);
                    return e.toggleClass(d.opened), f[e.hasClass(d.opened) ? "addClass" : "removeClass"](d.uncollapsed), !0
                }
            }
            return !1
        }
    }, a[b].defaults[c] = {
        add: !1,
        addTo: "panels",
        fixed: !1,
        collapse: !1
    }, a[b].configuration.classNames[c] = {
        collapsed: "Collapsed"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    function b(a, b, c) {
        return a < b && (a = b), a > c && (a = c), a
    }

    function c(c, d, e) {
        var h, i, j, k, l, m = this,
            n = {},
            o = 0,
            p = !1,
            q = !1,
            r = 0,
            s = 0;
        switch (this.opts.offCanvas.position) {
            case "left":
            case "right":
                n.events = "panleft panright", n.typeLower = "x", n.typeUpper = "X", q = "width";
                break;
            case "top":
            case "bottom":
                n.events = "panup pandown", n.typeLower = "y", n.typeUpper = "Y", q = "height"
        }
        switch (this.opts.offCanvas.position) {
            case "right":
            case "bottom":
                n.negative = !0, k = function(a) {
                    a >= e.$wndw[q]() - c.maxStartPos && (o = 1)
                };
                break;
            default:
                n.negative = !1, k = function(a) {
                    a <= c.maxStartPos && (o = 1)
                }
        }
        switch (this.opts.offCanvas.position) {
            case "left":
                n.open_dir = "right", n.close_dir = "left";
                break;
            case "right":
                n.open_dir = "left", n.close_dir = "right";
                break;
            case "top":
                n.open_dir = "down", n.close_dir = "up";
                break;
            case "bottom":
                n.open_dir = "up", n.close_dir = "down"
        }
        switch (this.opts.offCanvas.zposition) {
            case "front":
                l = function() {
                    return this.$menu
                };
                break;
            default:
                l = function() {
                    return a("." + g.slideout)
                }
        }
        var t = this.__valueOrFn(c.node, this.$menu, e.$page);
        "string" == typeof t && (t = a(t));
        var u = new Hammer(t[0], this.opts[f].vendors.hammer);
        u.on("panstart", function(a) {
            k(a.center[n.typeLower]), e.$slideOutNodes = l(), p = n.open_dir
        }).on(n.events + " panend", function(a) {
            o > 0 && a.preventDefault()
        }).on(n.events, function(a) {
            if (h = a["delta" + n.typeUpper], n.negative && (h = -h), h != r && (p = h >= r ? n.open_dir : n.close_dir), r = h, r > c.threshold && 1 == o) {
                if (e.$html.hasClass(g.opened)) return;
                o = 2, m._openSetup(), m.trigger("opening"), e.$html.addClass(g.dragging), s = b(e.$wndw[q]() * d[q].perc, d[q].min, d[q].max)
            }
            2 == o && (i = b(r, 10, s) - ("front" == m.opts.offCanvas.zposition ? s : 0), n.negative && (i = -i), j = "translate" + n.typeUpper + "(" + i + "px )", e.$slideOutNodes.css({
                "-webkit-transform": "-webkit-" + j,
                transform: j
            }))
        }).on("panend", function(a) {
            2 == o && (e.$html.removeClass(g.dragging), e.$slideOutNodes.css("transform", ""), m[p == n.open_dir ? "_openFinish" : "close"]()), o = 0
        })
    }

    function d(b, c, d, e) {
        var i = this;
        b.each(function() {
            var b = a(this),
                c = b.data(h.parent);
            if (c && (c = c.closest("." + g.panel), c.length)) {
                var d = new Hammer(b[0], i.opts[f].vendors.hammer);
                d.on("panright", function(a) {
                    i.openPanel(c)
                })
            }
        })
    }
    var e = "mmenu",
        f = "drag";
    a[e].addons[f] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var b = this.opts[f],
                    g = this.conf[f];
                j = a[e].glbl, "boolean" == typeof b && (b = {
                    menu: b,
                    panels: b
                }), "object" != typeof b && (b = {}), "boolean" == typeof b.menu && (b.menu = {
                    open: b.menu
                }), "object" != typeof b.menu && (b.menu = {}), "boolean" == typeof b.panels && (b.panels = {
                    close: b.panels
                }), "object" != typeof b.panels && (b.panels = {}), b = this.opts[f] = a.extend(!0, {}, a[e].defaults[f], b), b.menu.open && c.call(this, b.menu, g.menu, j), b.panels.close && this.bind("initPanels", function(a) {
                    d.call(this, a, b.panels, g.panels, j)
                })
            }
        },
        add: function() {
            return "function" != typeof Hammer || Hammer.VERSION < 2 ? void(a[e].addons[f].setup = function() {}) : (g = a[e]._c, h = a[e]._d, i = a[e]._e, void g.add("dragging"))
        },
        clickAnchor: function(a, b) {}
    }, a[e].defaults[f] = {
        menu: {
            open: !1,
            maxStartPos: 100,
            threshold: 50
        },
        panels: {
            close: !1
        },
        vendors: {
            hammer: {}
        }
    }, a[e].configuration[f] = {
        menu: {
            width: {
                perc: .8,
                min: 140,
                max: 440
            },
            height: {
                perc: .8,
                min: 140,
                max: 880
            }
        },
        panels: {}
    };
    var g, h, i, j
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "fixedElements";
    a[b].addons[c] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var d = this.opts[c];
                this.conf[c], g = a[b].glbl, d = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], d);
                var e = function(a) {
                    var b = this.conf.classNames[c].fixed;
                    this.__refactorClass(a.find("." + b), b, "slideout").appendTo(g.$body)
                };
                e.call(this, g.$page), this.bind("setPage", e)
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("fixed")
        },
        clickAnchor: function(a, b) {}
    }, a[b].configuration.classNames[c] = {
        fixed: "Fixed"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "dropdown";
    a[b].addons[c] = {
        setup: function() {
            if (this.opts.offCanvas) {
                var h = this,
                    i = this.opts[c],
                    j = this.conf[c];
                if (g = a[b].glbl, "boolean" == typeof i && i && (i = {
                        drop: i
                    }), "object" != typeof i && (i = {}), "string" == typeof i.position && (i.position = {
                        of: i.position
                    }), i = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], i), i.drop) {
                    if ("string" != typeof i.position.of) {
                        var k = this.$menu.attr("id");
                        k && k.length && (this.conf.clone && (k = d.umm(k)), i.position.of = '[href="#' + k + '"]')
                    }
                    if ("string" == typeof i.position.of) {
                        var l = a(i.position.of);
                        if (l.length) {
                            this.$menu.addClass(d.dropdown), i.tip && this.$menu.addClass(d.tip), i.event = i.event.split(" "), 1 == i.event.length && (i.event[1] = i.event[0]), "hover" == i.event[0] && l.on(f.mouseenter + "-dropdown", function() {
                                h.open()
                            }), "hover" == i.event[1] && this.$menu.on(f.mouseleave + "-dropdown", function() {
                                h.close()
                            }), this.bind("opening", function() {
                                this.$menu.data(e.style, this.$menu.attr("style") || ""), g.$html.addClass(d.dropdown)
                            }), this.bind("closed", function() {
                                this.$menu.attr("style", this.$menu.data(e.style)), g.$html.removeClass(d.dropdown)
                            });
                            var m = function(e, f) {
                                    var h = f[0],
                                        k = f[1],
                                        m = "x" == e ? "scrollLeft" : "scrollTop",
                                        n = "x" == e ? "outerWidth" : "outerHeight",
                                        o = "x" == e ? "left" : "top",
                                        p = "x" == e ? "right" : "bottom",
                                        q = "x" == e ? "width" : "height",
                                        r = "x" == e ? "maxWidth" : "maxHeight",
                                        s = null,
                                        t = g.$wndw[m](),
                                        u = l.offset()[o] -= t,
                                        v = u + l[n](),
                                        w = g.$wndw[q](),
                                        x = j.offset.button[e] + j.offset.viewport[e];
                                    if (i.position[e]) switch (i.position[e]) {
                                        case "left":
                                        case "bottom":
                                            s = "after";
                                            break;
                                        case "right":
                                        case "top":
                                            s = "before"
                                    }
                                    null === s && (s = u + (v - u) / 2 < w / 2 ? "after" : "before");
                                    var y, z;
                                    return "after" == s ? (y = "x" == e ? u : v, z = w - (y + x), h[o] = y + j.offset.button[e], h[p] = "auto", k.push(d["x" == e ? "tipleft" : "tiptop"])) : (y = "x" == e ? v : u, z = y - x, h[p] = "calc( 100% - " + (y - j.offset.button[e]) + "px )", h[o] = "auto", k.push(d["x" == e ? "tipright" : "tipbottom"])), h[r] = Math.min(a[b].configuration[c][q].max, z), [h, k]
                                },
                                n = function(a) {
                                    if (this.vars.opened) {
                                        this.$menu.attr("style", this.$menu.data(e.style));
                                        var b = [{},
                                            []
                                        ];
                                        b = m.call(this, "y", b), b = m.call(this, "x", b), this.$menu.css(b[0]), i.tip && this.$menu.removeClass(d.tipleft + " " + d.tipright + " " + d.tiptop + " " + d.tipbottom).addClass(b[1].join(" "))
                                    }
                                };
                            this.bind("opening", n), g.$wndw.on(f.resize + "-dropdown", function(a) {
                                n.call(h)
                            }), this.opts.offCanvas.blockUI || g.$wndw.on(f.scroll + "-dropdown", function(a) {
                                n.call(h)
                            })
                        }
                    }
                }
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("dropdown tip tipleft tipright tiptop tipbottom"), f.add("mouseenter mouseleave resize scroll")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        drop: !1,
        event: "click",
        position: {},
        tip: !0
    }, a[b].configuration[c] = {
        offset: {
            button: {
                x: -10,
                y: 10
            },
            viewport: {
                x: 20,
                y: 20
            }
        },
        height: {
            max: 880
        },
        width: {
            max: 440
        }
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "iconPanels";
    a[b].addons[c] = {
        setup: function() {
            var e = this,
                f = this.opts[c];
            if (this.conf[c], g = a[b].glbl, "boolean" == typeof f && (f = {
                    add: f
                }), "number" == typeof f && (f = {
                    add: !0,
                    visible: f
                }), "object" != typeof f && (f = {}), f = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], f), f.visible++, f.add) {
                this.$menu.addClass(d.iconpanel);
                for (var h = [], i = 0; i <= f.visible; i++) h.push(d.iconpanel + "-" + i);
                h = h.join(" ");
                var j = function(b) {
                    b.hasClass(d.vertical) || e.$pnls.children("." + d.panel).removeClass(h).filter("." + d.subopened).removeClass(d.hidden).add(b).not("." + d.vertical).slice(-f.visible).each(function(b) {
                        a(this).addClass(d.iconpanel + "-" + b)
                    })
                };
                this.bind("openPanel", j), this.bind("initPanels", function(b) {
                    j.call(e, e.$pnls.children("." + d.current)), b.not("." + d.vertical).each(function() {
                        a(this).children("." + d.subblocker).length || a(this).prepend('<a href="#' + a(this).closest("." + d.panel).attr("id") + '" class="' + d.subblocker + '" />')
                    })
                })
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("iconpanel subblocker")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        add: !1,
        visible: 3
    };
    var d, e, f, g
}(jQuery),
function(a) {
    function b(b, c) {
        b || (b = this.$pnls.children("." + f.current));
        var d = a();
        "default" == c && (d = b.children("." + f.listview).find("a[href]").not(":hidden"), d.length || (d = b.find(j).not(":hidden")), d.length || (d = this.$menu.children("." + f.navbar).find(j).not(":hidden"))), d.length || (d = this.$menu.children("." + f.tabstart)),
            d.first().focus()
    }

    function c(a) {
        a || (a = this.$pnls.children("." + f.current));
        var b = this.$pnls.children("." + f.panel),
            c = b.not(a);
        c.find(j).attr("tabindex", -1), a.find(j).attr("tabindex", 0), a.find("input.mm-toggle, input.mm-check").attr("tabindex", -1)
    }
    var d = "mmenu",
        e = "keyboardNavigation";
    a[d].addons[e] = {
        setup: function() {
            var g = this,
                h = this.opts[e];
            if (this.conf[e], i = a[d].glbl, "boolean" != typeof h && "string" != typeof h || (h = {
                    enable: h
                }), "object" != typeof h && (h = {}), h = this.opts[e] = a.extend(!0, {}, a[d].defaults[e], h), h.enable) {
                h.enhance && this.$menu.addClass(f.keyboardfocus);
                var k = a('<input class="' + f.tabstart + '" tabindex="0" type="text" />'),
                    l = a('<input class="' + f.tabend + '" tabindex="0" type="text" />');
                this.bind("initPanels", function() {
                    this.$menu.prepend(k).append(l).children("." + f.navbar).find(j).attr("tabindex", 0)
                }), this.bind("open", function() {
                    c.call(this), this.__transitionend(this.$menu, function() {
                        b.call(g, null, h.enable)
                    }, this.conf.transitionDuration)
                }), this.bind("openPanel", function(a) {
                    c.call(this, a), this.__transitionend(a, function() {
                        b.call(g, a, h.enable)
                    }, this.conf.transitionDuration)
                }), this["_initWindow_" + e](h.enhance)
            }
        },
        add: function() {
            f = a[d]._c, g = a[d]._d, h = a[d]._e, f.add("tabstart tabend keyboardfocus"), h.add("focusin keydown")
        },
        clickAnchor: function(a, b) {}
    }, a[d].defaults[e] = {
        enable: !1,
        enhance: !1
    }, a[d].configuration[e] = {}, a[d].prototype["_initWindow_" + e] = function(b) {
        i.$wndw.off(h.keydown + "-offCanvas"), i.$wndw.off(h.focusin + "-" + e).on(h.focusin + "-" + e, function(b) {
            if (i.$html.hasClass(f.opened)) {
                var c = a(b.target);
                c.is("." + f.tabend) && c.parent().find("." + f.tabstart).focus()
            }
        }), i.$wndw.off(h.keydown + "-" + e).on(h.keydown + "-" + e, function(b) {
            var c = a(b.target),
                d = c.closest("." + f.menu);
            if (d.length)
                if (d.data("mmenu"), c.is("input, textarea"));
                else switch (b.keyCode) {
                    case 13:
                        (c.is(".mm-toggle") || c.is(".mm-check")) && c.trigger(h.click);
                        break;
                    case 32:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        b.preventDefault()
                }
        }), b && i.$wndw.on(h.keydown + "-" + e, function(b) {
            var c = a(b.target),
                d = c.closest("." + f.menu);
            if (d.length) {
                var e = d.data("mmenu");
                if (c.is("input, textarea")) switch (b.keyCode) {
                    case 27:
                        c.val("")
                } else switch (b.keyCode) {
                    case 8:
                        var h = c.closest("." + f.panel).data(g.parent);
                        h && h.length && e.openPanel(h.closest("." + f.panel));
                        break;
                    case 27:
                        d.hasClass(f.offcanvas) && e.close()
                }
            }
        })
    };
    var f, g, h, i, j = "input, select, textarea, button, label, a[href]"
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "lazySubmenus";
    a[b].addons[c] = {
        setup: function() {
            var f = this.opts[c];
            this.conf[c], g = a[b].glbl, "boolean" == typeof f && (f = {
                load: f
            }), "object" != typeof f && (f = {}), f = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], f), f.load && (this.$menu.find("li").find("li").children(this.conf.panelNodetype).each(function() {
                a(this).parent().addClass(d.lazysubmenu).data(e.lazysubmenu, this).end().remove()
            }), this.bind("openingPanel", function(b) {
                var c = b.find("." + d.lazysubmenu);
                c.length && (c.each(function() {
                    a(this).append(a(this).data(e.lazysubmenu)).removeData(e.lazysubmenu).removeClass(d.lazysubmenu)
                }), this.initPanels(b))
            }))
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("lazysubmenu"), e.add("lazysubmenu")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        load: !1
    }, a[b].configuration[c] = {};
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars";
    a[b].addons[c] = {
        setup: function() {
            var e = this,
                f = this.opts[c],
                h = this.conf[c];
            if (g = a[b].glbl, "undefined" != typeof f) {
                f instanceof Array || (f = [f]);
                var i = {};
                if (f.length) {
                    a.each(f, function(g) {
                        var j = f[g];
                        "boolean" == typeof j && j && (j = {}), "object" != typeof j && (j = {}), "undefined" == typeof j.content && (j.content = ["prev", "title"]), j.content instanceof Array || (j.content = [j.content]), j = a.extend(!0, {}, e.opts.navbar, j);
                        var k = j.position,
                            l = j.height;
                        "number" != typeof l && (l = 1), l = Math.min(4, Math.max(1, l)), "bottom" != k && (k = "top"), i[k] || (i[k] = 0), i[k]++;
                        var m = a("<div />").addClass(d.navbar + " " + d.navbar + "-" + k + " " + d.navbar + "-" + k + "-" + i[k] + " " + d.navbar + "-size-" + l);
                        i[k] += l - 1;
                        for (var n = 0, o = 0, p = j.content.length; o < p; o++) {
                            var q = a[b].addons[c][j.content[o]] || !1;
                            q ? n += q.call(e, m, j, h) : (q = j.content[o], q instanceof a || (q = a(j.content[o])), m.append(q))
                        }
                        n += Math.ceil(m.children().not("." + d.btn).length / l), n > 1 && m.addClass(d.navbar + "-content-" + n), m.children("." + d.btn).length && m.addClass(d.hasbtns), m.prependTo(e.$menu)
                    });
                    for (var j in i) e.$menu.addClass(d.hasnavbar + "-" + j + "-" + i[j])
                }
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("close hasbtns")
        },
        clickAnchor: function(a, b) {}
    }, a[b].configuration[c] = {
        breadcrumbSeparator: "/"
    }, a[b].configuration.classNames[c] = {};
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "breadcrumbs";
    a[b].addons[c][d] = function(c, d, e) {
        var f = a[b]._c,
            g = a[b]._d;
        f.add("breadcrumbs separator");
        var h = a('<span class="' + f.breadcrumbs + '" />').appendTo(c);
        this.bind("initPanels", function(b) {
            b.removeClass(f.hasnavbar).each(function() {
                for (var b = [], c = a(this), d = a('<span class="' + f.breadcrumbs + '"></span>'), h = a(this).children().first(), i = !0; h && h.length;) {
                    h.is("." + f.panel) || (h = h.closest("." + f.panel));
                    var j = h.children("." + f.navbar).children("." + f.title).text();
                    b.unshift(i ? "<span>" + j + "</span>" : '<a href="#' + h.attr("id") + '">' + j + "</a>"), i = !1, h = h.data(g.parent)
                }
                d.append(b.join('<span class="' + f.separator + '">' + e.breadcrumbSeparator + "</span>")).appendTo(c.children("." + f.navbar))
            })
        });
        var i = function() {
            h.html(this.$pnls.children("." + f.current).children("." + f.navbar).children("." + f.breadcrumbs).html())
        };
        return this.bind("openPanel", i), this.bind("initPanels", i), 0
    }
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "close";
    a[b].addons[c][d] = function(c, d) {
        var e = a[b]._c,
            f = a[b].glbl,
            g = a('<a class="' + e.close + " " + e.btn + '" href="#" />').appendTo(c),
            h = function(a) {
                g.attr("href", "#" + a.attr("id"))
            };
        return h.call(this, f.$page), this.bind("setPage", h), -1
    }
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "next";
    a[b].addons[c][d] = function(d, e) {
        var f, g, h, i = a[b]._c,
            j = a('<a class="' + i.next + " " + i.btn + '" href="#" />').appendTo(d),
            k = function(a) {
                a = a || this.$pnls.children("." + i.current);
                var b = a.find("." + this.conf.classNames[c].panelNext);
                f = b.attr("href"), h = b.attr("aria-owns"), g = b.html(), j[f ? "attr" : "removeAttr"]("href", f), j[h ? "attr" : "removeAttr"]("aria-owns", h), j[f || g ? "removeClass" : "addClass"](i.hidden), j.html(g)
            };
        return this.bind("openPanel", k), this.bind("initPanels", function() {
            k.call(this)
        }), -1
    }, a[b].configuration.classNames[c].panelNext = "Next"
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "prev";
    a[b].addons[c][d] = function(d, e) {
        var f = a[b]._c,
            g = a('<a class="' + f.prev + " " + f.btn + '" href="#" />').appendTo(d);
        this.bind("initPanels", function(a) {
            a.removeClass(f.hasnavbar).children("." + f.navbar).addClass(f.hidden)
        });
        var h, i, j, k = function(a) {
            if (a = a || this.$pnls.children("." + f.current), !a.hasClass(f.vertical)) {
                var b = a.find("." + this.conf.classNames[c].panelPrev);
                b.length || (b = a.children("." + f.navbar).children("." + f.prev)), h = b.attr("href"), j = b.attr("aria-owns"), i = b.html(), g[h ? "attr" : "removeAttr"]("href", h), g[j ? "attr" : "removeAttr"]("aria-owns", j), g[h || i ? "removeClass" : "addClass"](f.hidden), g.html(i)
            }
        };
        return this.bind("openPanel", k), this.bind("initPanels", function() {
            k.call(this)
        }), -1
    }, a[b].configuration.classNames[c].panelPrev = "Prev"
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "searchfield";
    a[b].addons[c][d] = function(c, d) {
        var e = a[b]._c,
            f = a('<div class="' + e.search + '" />').appendTo(c);
        return "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}), this.opts.searchfield.add = !0, this.opts.searchfield.addTo = f, 0
    }
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "navbars",
        d = "title";
    a[b].addons[c][d] = function(d, e) {
        var f, g, h = a[b]._c,
            i = a('<a class="' + h.title + '" />').appendTo(d),
            j = function(a) {
                if (a = a || this.$pnls.children("." + h.current), !a.hasClass(h.vertical)) {
                    var b = a.find("." + this.conf.classNames[c].panelTitle);
                    b.length || (b = a.children("." + h.navbar).children("." + h.title)), f = b.attr("href"), g = b.html() || e.title, i[f ? "attr" : "removeAttr"]("href", f), i[f || g ? "removeClass" : "addClass"](h.hidden), i.html(g)
                }
            };
        return this.bind("openPanel", j), this.bind("initPanels", function(a) {
            j.call(this)
        }), 0
    }, a[b].configuration.classNames[c].panelTitle = "Title"
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "rtl";
    a[b].addons[c] = {
        setup: function() {
            var e = this.opts[c];
            this.conf[c], g = a[b].glbl, "object" != typeof e && (e = {
                use: e
            }), e = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], e), "boolean" != typeof e.use && (e.use = "rtl" == (g.$html.attr("dir") || "").toLowerCase()), e.use && this.$menu.addClass(d.rtl)
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("rtl")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        use: "detect"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    function b(a, b, c) {
        a.prop("aria-" + b, c)[c ? "attr" : "removeAttr"]("aria-" + b, c)
    }

    function c(a) {
        return '<span class="' + f.sronly + '">' + a + "</span>"
    }
    var d = "mmenu",
        e = "screenReader";
    a[d].addons[e] = {
        setup: function() {
            var g = this.opts[e],
                h = this.conf[e];
            if (i = a[d].glbl, "boolean" == typeof g && (g = {
                    aria: g,
                    text: g
                }), "object" != typeof g && (g = {}), g = this.opts[e] = a.extend(!0, {}, a[d].defaults[e], g), g.aria) {
                if (this.opts.offCanvas) {
                    var j = function() {
                            b(this.$menu, "hidden", !1)
                        },
                        k = function() {
                            b(this.$menu, "hidden", !0)
                        };
                    this.bind("open", j), this.bind("close", k), b(this.$menu, "hidden", !0)
                }
                var l = function() {},
                    m = function(a) {
                        var c = this.$menu.children("." + f.navbar),
                            d = c.children("." + f.prev),
                            e = c.children("." + f.next),
                            h = c.children("." + f.title);
                        b(d, "hidden", d.is("." + f.hidden)), b(e, "hidden", e.is("." + f.hidden)), g.text && b(h, "hidden", !d.is("." + f.hidden)), b(this.$pnls.children("." + f.panel).not(a), "hidden", !0), b(a, "hidden", !1)
                    };
                this.bind("update", l), this.bind("openPanel", l), this.bind("openPanel", m);
                var n = function(c) {
                    var d;
                    c = c || this.$menu;
                    var e = c.children("." + f.navbar),
                        h = e.children("." + f.prev),
                        i = e.children("." + f.next);
                    e.children("." + f.title), b(h, "haspopup", !0), b(i, "haspopup", !0), d = c.is("." + f.panel) ? c.find("." + f.prev + ", ." + f.next) : h.add(i), d.each(function() {
                        b(a(this), "owns", a(this).attr("href").replace("#", ""))
                    }), g.text && c.is("." + f.panel) && (d = c.find("." + f.listview).find("." + f.fullsubopen).parent().children("span"), b(d, "hidden", !0))
                };
                this.bind("initPanels", n), this.bind("_initAddons", n)
            }
            if (g.text) {
                var o = function(b) {
                    var e;
                    b = b || this.$menu;
                    var g = b.children("." + f.navbar);
                    g.each(function() {
                        var b = a(this),
                            g = a[d].i18n(h.text.closeSubmenu);
                        e = b.children("." + f.title), e.length && (g += " (" + e.text() + ")"), b.children("." + f.prev).html(c(g))
                    }), g.children("." + f.close).html(c(a[d].i18n(h.text.closeMenu))), b.is("." + f.panel) && b.find("." + f.listview).children("li").children("." + f.next).each(function() {
                        var b = a(this),
                            g = a[d].i18n(h.text[b.parent().is("." + f.vertical) ? "toggleSubmenu" : "openSubmenu"]);
                        e = b.nextAll("span, a").first(), e.length && (g += " (" + e.text() + ")"), b.html(c(g))
                    })
                };
                this.bind("initPanels", o), this.bind("_initAddons", o)
            }
        },
        add: function() {
            f = a[d]._c, g = a[d]._d, h = a[d]._e, f.add("sronly")
        },
        clickAnchor: function(a, b) {}
    }, a[d].defaults[e] = {
        aria: !1,
        text: !1
    }, a[d].configuration[e] = {
        text: {
            closeMenu: "Close menu",
            closeSubmenu: "Close submenu",
            openSubmenu: "Open submenu",
            toggleSubmenu: "Toggle submenu"
        }
    };
    var f, g, h, i
}(jQuery),
function(a) {
    function b(a) {
        switch (a) {
            case 9:
            case 16:
            case 17:
            case 18:
            case 37:
            case 38:
            case 39:
            case 40:
                return !0
        }
        return !1
    }
    var c = "mmenu",
        d = "searchfield";
    a[c].addons[d] = {
        setup: function() {
            var i = this,
                j = this.opts[d],
                k = this.conf[d];
            h = a[c].glbl, "boolean" == typeof j && (j = {
                add: j
            }), "object" != typeof j && (j = {}), "boolean" == typeof j.resultsPanel && (j.resultsPanel = {
                add: j.resultsPanel
            }), j = this.opts[d] = a.extend(!0, {}, a[c].defaults[d], j), k = this.conf[d] = a.extend(!0, {}, a[c].configuration[d], k), this.bind("close", function() {
                this.$menu.find("." + e.search).find("input").blur()
            }), this.bind("initPanels", function(h) {
                if (j.add) {
                    var l;
                    switch (j.addTo) {
                        case "panels":
                            l = h;
                            break;
                        default:
                            l = this.$menu.find(j.addTo)
                    }
                    if (l.each(function() {
                            var b = a(this);
                            if (!b.is("." + e.panel) || !b.is("." + e.vertical)) {
                                if (!b.children("." + e.search).length) {
                                    var d = i.__valueOrFn(k.clear, b),
                                        f = i.__valueOrFn(k.form, b),
                                        h = i.__valueOrFn(k.input, b),
                                        l = i.__valueOrFn(k.submit, b),
                                        m = a("<" + (f ? "form" : "div") + ' class="' + e.search + '" />'),
                                        n = a('<input placeholder="' + a[c].i18n(j.placeholder) + '" type="text" autocomplete="off" />');
                                    m.append(n);
                                    var o;
                                    if (h)
                                        for (o in h) n.attr(o, h[o]);
                                    if (d && a('<a class="' + e.btn + " " + e.clear + '" href="#" />').appendTo(m).on(g.click + "-searchfield", function(a) {
                                            a.preventDefault(), n.val("").trigger(g.keyup + "-searchfield")
                                        }), f) {
                                        for (o in f) m.attr(o, f[o]);
                                        l && !d && a('<a class="' + e.btn + " " + e.next + '" href="#" />').appendTo(m).on(g.click + "-searchfield", function(a) {
                                            a.preventDefault(), m.submit()
                                        })
                                    }
                                    b.hasClass(e.search) ? b.replaceWith(m) : b.prepend(m).addClass(e.hassearch)
                                }
                                if (j.noResults) {
                                    var p = b.closest("." + e.panel).length;
                                    if (p || (b = i.$pnls.children("." + e.panel).first()), !b.children("." + e.noresultsmsg).length) {
                                        var q = b.children("." + e.listview).first();
                                        a('<div class="' + e.noresultsmsg + " " + e.hidden + '" />').append(a[c].i18n(j.noResults))[q.length ? "insertAfter" : "prependTo"](q.length ? q : b)
                                    }
                                }
                            }
                        }), j.search) {
                        if (j.resultsPanel.add) {
                            j.showSubPanels = !1;
                            var m = this.$pnls.children("." + e.resultspanel);
                            m.length || (m = a('<div class="' + e.panel + " " + e.resultspanel + " " + e.hidden + '" />').appendTo(this.$pnls).append('<div class="' + e.navbar + " " + e.hidden + '"><a class="' + e.title + '">' + a[c].i18n(j.resultsPanel.title) + "</a></div>").append('<ul class="' + e.listview + '" />').append(this.$pnls.find("." + e.noresultsmsg).first().clone()), this.initPanels(m))
                        }
                        this.$menu.find("." + e.search).each(function() {
                            var c, h, k = a(this),
                                l = k.closest("." + e.panel).length;
                            l ? (c = k.closest("." + e.panel), h = c) : (c = a("." + e.panel, i.$menu), h = i.$menu), j.resultsPanel.add && (c = c.not(m));
                            var n = k.children("input"),
                                o = i.__findAddBack(c, "." + e.listview).children("li"),
                                p = o.filter("." + e.divider),
                                q = i.__filterListItems(o),
                                r = "a",
                                s = r + ", span",
                                t = "",
                                u = function() {
                                    var b = n.val().toLowerCase();
                                    if (b != t) {
                                        if (t = b, j.resultsPanel.add && m.children("." + e.listview).empty(), c.scrollTop(0), q.add(p).addClass(e.hidden).find("." + e.fullsubopensearch).removeClass(e.fullsubopen + " " + e.fullsubopensearch), q.each(function() {
                                                var b = a(this),
                                                    c = r;
                                                (j.showTextItems || j.showSubPanels && b.find("." + e.next)) && (c = s);
                                                var d = b.data(f.searchtext) || b.children(c).text();
                                                d.toLowerCase().indexOf(t) > -1 && b.add(b.prevAll("." + e.divider).first()).removeClass(e.hidden)
                                            }), j.showSubPanels && c.each(function(b) {
                                                var c = a(this);
                                                i.__filterListItems(c.find("." + e.listview).children()).each(function() {
                                                    var b = a(this),
                                                        c = b.data(f.child);
                                                    b.removeClass(e.nosubresults), c && c.find("." + e.listview).children().removeClass(e.hidden)
                                                })
                                            }), j.resultsPanel.add)
                                            if ("" === t) this.closeAllPanels(), this.openPanel(this.$pnls.children("." + e.subopened).last());
                                            else {
                                                var d = a();
                                                c.each(function() {
                                                    var b = i.__filterListItems(a(this).find("." + e.listview).children()).not("." + e.hidden).clone(!0);
                                                    b.length && (j.resultsPanel.dividers && (d = d.add('<li class="' + e.divider + '">' + a(this).children("." + e.navbar).text() + "</li>")), d = d.add(b))
                                                }), d.find("." + e.next).remove(), m.children("." + e.listview).append(d), this.openPanel(m)
                                            } else a(c.get().reverse()).each(function(b) {
                                            var c = a(this),
                                                d = c.data(f.parent);
                                            d && (i.__filterListItems(c.find("." + e.listview).children()).length ? (d.hasClass(e.hidden) && d.children("." + e.next).not("." + e.fullsubopen).addClass(e.fullsubopen).addClass(e.fullsubopensearch), d.removeClass(e.hidden).removeClass(e.nosubresults).prevAll("." + e.divider).first().removeClass(e.hidden)) : l || (c.hasClass(e.opened) && setTimeout(function() {
                                                i.openPanel(d.closest("." + e.panel))
                                            }, (b + 1) * (1.5 * i.conf.openingInterval)), d.addClass(e.nosubresults)))
                                        });
                                        h.find("." + e.noresultsmsg)[q.not("." + e.hidden).length ? "addClass" : "removeClass"](e.hidden), this.update()
                                    }
                                };
                            n.off(g.keyup + "-" + d + " " + g.change + "-" + d).on(g.keyup + "-" + d, function(a) {
                                b(a.keyCode) || u.call(i)
                            }).on(g.change + "-" + d, function(a) {
                                u.call(i)
                            });
                            var v = k.children("." + e.btn);
                            v.length && n.on(g.keyup + "-" + d, function(a) {
                                v[n.val().length ? "removeClass" : "addClass"](e.hidden)
                            }), n.trigger(g.keyup + "-" + d)
                        })
                    }
                }
            })
        },
        add: function() {
            e = a[c]._c, f = a[c]._d, g = a[c]._e, e.add("clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"), f.add("searchtext"), g.add("change keyup")
        },
        clickAnchor: function(a, b) {}
    }, a[c].defaults[d] = {
        add: !1,
        addTo: "panels",
        placeholder: "Search",
        noResults: "No results found.",
        resultsPanel: {
            add: !1,
            dividers: !0,
            title: "Search results"
        },
        search: !0,
        showTextItems: !1,
        showSubPanels: !0
    }, a[c].configuration[d] = {
        clear: !1,
        form: !1,
        input: !1,
        submit: !1
    };
    var e, f, g, h
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "sectionIndexer";
    a[b].addons[c] = {
        setup: function() {
            var e = this,
                h = this.opts[c];
            this.conf[c], g = a[b].glbl, "boolean" == typeof h && (h = {
                add: h
            }), "object" != typeof h && (h = {}), h = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], h), this.bind("initPanels", function(b) {
                if (h.add) {
                    var c;
                    switch (h.addTo) {
                        case "panels":
                            c = b;
                            break;
                        default:
                            c = a(h.addTo, this.$menu).filter("." + d.panel)
                    }
                    c.find("." + d.divider).closest("." + d.panel).addClass(d.hasindexer)
                }
                if (!this.$indexer && this.$pnls.children("." + d.hasindexer).length) {
                    this.$indexer = a('<div class="' + d.indexer + '" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'), this.$indexer.children().on(f.mouseover + "-sectionindexer " + d.touchstart + "-sectionindexer", function(b) {
                        var c = a(this).attr("href").slice(1),
                            f = e.$pnls.children("." + d.current),
                            g = f.find("." + d.listview),
                            h = !1,
                            i = f.scrollTop();
                        f.scrollTop(0), g.children("." + d.divider).not("." + d.hidden).each(function() {
                            h === !1 && c == a(this).text().slice(0, 1).toLowerCase() && (h = a(this).position().top)
                        }), f.scrollTop(h !== !1 ? h : i)
                    });
                    var g = function(a) {
                        e.$menu[(a.hasClass(d.hasindexer) ? "add" : "remove") + "Class"](d.hasindexer)
                    };
                    this.bind("openPanel", g), g.call(this, this.$pnls.children("." + d.current))
                }
            })
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("indexer hasindexer"), f.add("mouseover touchstart")
        },
        clickAnchor: function(a, b) {
            if (a.parent().is("." + d.indexer)) return !0
        }
    }, a[b].defaults[c] = {
        add: !1,
        addTo: "panels"
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "setSelected";
    a[b].addons[c] = {
        setup: function() {
            var f = this,
                h = this.opts[c];
            if (this.conf[c], g = a[b].glbl, "boolean" == typeof h && (h = {
                    hover: h,
                    parent: h
                }), "object" != typeof h && (h = {}), h = this.opts[c] = a.extend(!0, {}, a[b].defaults[c], h), "detect" == h.current) {
                var i = function(a) {
                    a = a.split("?")[0].split("#")[0];
                    var b = f.$menu.find('a[href="' + a + '"], a[href="' + a + '/"]');
                    b.length ? f.setSelected(b.parent(), !0) : (a = a.split("/").slice(0, -1), a.length && i(a.join("/")))
                };
                i(window.location.href)
            } else h.current || this.bind("initPanels", function(a) {
                a.find("." + d.listview).children("." + d.selected).removeClass(d.selected)
            });
            if (h.hover && this.$menu.addClass(d.hoverselected), h.parent) {
                this.$menu.addClass(d.parentselected);
                var j = function(a) {
                    this.$pnls.find("." + d.listview).find("." + d.next).removeClass(d.selected);
                    for (var b = a.data(e.parent); b && b.length;) b = b.not("." + d.vertical).children("." + d.next).addClass(d.selected).end().closest("." + d.panel).data(e.parent)
                };
                this.bind("openedPanel", j), this.bind("initPanels", function(a) {
                    j.call(this, this.$pnls.children("." + d.current))
                })
            }
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("hoverselected parentselected")
        },
        clickAnchor: function(a, b) {}
    }, a[b].defaults[c] = {
        current: !0,
        hover: !1,
        parent: !1
    };
    var d, e, f, g
}(jQuery),
function(a) {
    var b = "mmenu",
        c = "toggles";
    a[b].addons[c] = {
        setup: function() {
            var e = this;
            this.opts[c], this.conf[c], g = a[b].glbl, this.bind("initPanels", function(b) {
                this.__refactorClass(a("input", b), this.conf.classNames[c].toggle, "toggle"), this.__refactorClass(a("input", b), this.conf.classNames[c].check, "check"), a("input." + d.toggle + ", input." + d.check, b).each(function() {
                    var b = a(this),
                        c = b.closest("li"),
                        f = b.hasClass(d.toggle) ? "toggle" : "check",
                        g = b.attr("id") || e.__getUniqueId();
                    c.children('label[for="' + g + '"]').length || (b.attr("id", g), c.prepend(b), a('<label for="' + g + '" class="' + d[f] + '"></label>').insertBefore(c.children("a, span").last()))
                })
            })
        },
        add: function() {
            d = a[b]._c, e = a[b]._d, f = a[b]._e, d.add("toggle check")
        },
        clickAnchor: function(a, b) {}
    }, a[b].configuration.classNames[c] = {
        toggle: "Toggle",
        check: "Check"
    };
    var d, e, f, g
}(jQuery);