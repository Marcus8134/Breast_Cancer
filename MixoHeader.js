import {o, b as r, d as l, u as Ce, e as _, w as $, f as U, n as u, g, t as S, i as t, j as ue, r as Me, k as fe, F as me, G as $e, Y as ze, l as ie, m as Le, p as Be, q as w, s as re, v, x as Ie, y as Ue, z as We, A as Ae, B as Re, C as ce, D as De, E as de} from "./vendor-vue.5f1410ab.js";
import {_ as ge} from "./constants.f9cf7a64.js";
import "./vite.c27b6911.js";
const He = {
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 20 20"
}
  , Oe = l("path", {
    fill: "currentColor",
    "fill-rule": "evenodd",
    d: "M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z",
    "clip-rule": "evenodd"
}, null, -1)
  , je = [Oe];
function Te(a, e) {
    return o(),
    r("svg", He, [...je])
}
const Ye = {
    name: "heroicons-solid-bars3",
    render: Te
}
  , Ee = {
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 20 20"
}
  , Ze = l("path", {
    fill: "currentColor",
    d: "M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586"
}, null, -1)
  , Ge = [Ze];
function Ve(a, e) {
    return o(),
    r("svg", Ee, [...Ge])
}
const Fe = {
    name: "heroicons-solid-moon",
    render: Ve
}
  , Ke = {
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 20 20"
}
  , Qe = l("path", {
    fill: "currentColor",
    "fill-rule": "evenodd",
    d: "M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m4 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-.464 4.95l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414m2.12-10.607a1 1 0 0 1 0 1.414l-.706.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0M17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1M5.05 6.464A1 1 0 1 0 6.465 5.05l-.708-.707a1 1 0 0 0-1.414 1.414zm1.414 8.486l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414M4 11a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2z",
    "clip-rule": "evenodd"
}, null, -1)
  , qe = [Qe];
function Pe(a, e) {
    return o(),
    r("svg", Ke, [...qe])
}
const Xe = {
    name: "heroicons-solid-sun",
    render: Pe
}
  , Je = {
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 20 20"
}
  , et = l("path", {
    fill: "currentColor",
    "fill-rule": "evenodd",
    d: "M4.28 3.22a.75.75 0 0 0-1.06 1.06L8.94 10l-5.72 5.72a.75.75 0 1 0 1.06 1.06L10 11.06l5.72 5.72a.75.75 0 1 0 1.06-1.06L11.06 10l5.72-5.72a.75.75 0 0 0-1.06-1.06L10 8.94L4.28 3.22Z",
    "clip-rule": "evenodd"
}, null, -1)
  , tt = [et];
function at(a, e) {
    return o(),
    r("svg", Je, [...tt])
}
const st = {
    name: "heroicons-solid-x-mark",
    render: at
};
const he = () => ({
    isLargeScreen: Ce("(min-width: 1024px)")
})
  , nt = {
    class: "flex items-center justify-between"
}
  , ot = ["href"]
  , lt = ["src", "alt"]
  , it = {
    class: "flex items-center space-x-2"
}
  , rt = l("span", {
    class: "sr-only"
}, "Close menu", -1)
  , ct = {
    class: "mt-6 flow-root"
}
  , dt = {
    class: "-my-6 divide-y divide-gray-500/10"
}
  , ut = {
    class: "space-y-2 py-6"
}
  , ft = ["href"]
  , mt = {
    __name: "MobileNav",
    props: {
        logoSpacing: {
            type: String,
            default: ""
        },
        logoSize: {
            type: String,
            default: ""
        },
        navItems: {
            type: Array,
            default() {
                return []
            }
        },
        primaryButton: {
            type: Object,
            default() {
                return {}
            }
        },
        siteNameClasses: {
            type: Object,
            default() {
                return {}
            }
        },
        siteLogoUrl: {
            type: String,
            default: ""
        },
        siteName: {
            type: String,
            default: ""
        },
        siteUrl: {
            type: String,
            default: ""
        },
        navOpen: {
            type: Boolean,
            default: !1
        }
    },
    emits: ["close"],
    setup(a, {emit: e}) {
        const {isLargeScreen: p} = he()
          , z = e;
        return (W, h) => {
            const L = ge
              , d = st;
            return o(),
            _(t(ze), {
                as: "div",
                onClose: h[2] || (h[2] = b => z("close")),
                open: a.navOpen,
                "data-testid": "mobile-nav"
            }, {
                default: $( () => [U(t($e), {
                    focus: "true",
                    class: "fixed inset-0 z-20 overflow-y-auto bg-canvas dark:bg-slate-950 px-6 py-6"
                }, {
                    default: $( () => {
                        var b, B, y, x, N;
                        return [l("div", nt, [l("a", {
                            href: a.siteUrl,
                            class: u(["-m-1.5 p-1.5 flex items-center", a.logoSpacing])
                        }, [a.siteLogoUrl ? (o(),
                        r("img", {
                            key: 0,
                            class: u(["w-auto", a.logoSize]),
                            src: a.siteLogoUrl,
                            alt: `${a.siteName} logo`
                        }, null, 10, lt)) : g("v-if", !0), l("p", {
                            class: u(["font-sans font-bold text-gray-900 dark:text-white", a.siteNameClasses])
                        }, S(a.siteName), 3)], 10, ot), l("div", it, [(b = a.primaryButton) != null && b.visibleInNav ? (o(),
                        _(L, {
                            key: 0,
                            size: t(p) ? "sm" : "xs",
                            href: ((B = a.primaryButton) == null ? void 0 : B.link) === "other" ? (y = a.primaryButton) == null ? void 0 : y.externalLink : (x = a.primaryButton) == null ? void 0 : x.link,
                            "open-in-new-tab": (N = a.primaryButton) == null ? void 0 : N.openInNewTab,
                            theme: "primary",
                            class: "whitespace-nowrap"
                        }, {
                            default: $( () => {
                                var i;
                                return [ue(S((i = a.primaryButton) == null ? void 0 : i.label), 1)]
                            }
                            ),
                            _: 1
                        }, 8, ["size", "href", "open-in-new-tab"])) : g("v-if", !0), Me(W.$slots, "metaNav"), l("button", {
                            type: "button",
                            class: "-m-2.5 p-2.5 text-gray-700 dark:text-white",
                            onClick: h[0] || (h[0] = i => z("close"))
                        }, [rt, U(d, {
                            class: "h-6 w-6",
                            "aria-hidden": "true"
                        })])])]), l("div", ct, [l("div", dt, [l("div", ut, [(o(!0),
                        r(me, null, fe(a.navItems, i => (o(),
                        r("a", {
                            key: i == null ? void 0 : i.id,
                            href: i == null ? void 0 : i.link,
                            onClick: h[1] || (h[1] = A => z("close")),
                            class: "-mx-3 block rounded-lg py-2 px-3 text-base font-semibold font-sans capitalize leading-7 text-slate-800 dark:text-white hover:bg-gray-400/10"
                        }, S(i == null ? void 0 : i.label), 9, ft))), 128))])])])]
                    }
                    ),
                    _: 3
                })]),
                _: 3
            }, 8, ["open"])
        }
    }
}
  , gt = {
    class: "px-6 py-6 md:px-8 relative z-10"
}
  , ht = ["href"]
  , vt = ["src", "alt"]
  , yt = ["href"]
  , xt = ["title"]
  , _t = l("span", {
    class: "sr-only"
}, "Open main menu", -1)
  , bt = ["title"]
  , pt = {
    __name: "MixoHeader",
    props: {
        disableSiteNameWrap: {
            type: Boolean,
            default: !1
        },
        hideSiteName: {
            type: Boolean,
            default: !1
        },
        navItemsAlignment: {
            type: String,
            default: "center"
        },
        navItems: {
            type: Array,
            default() {
                return []
            }
        },
        links: {
            type: Array,
            default() {
                return []
            }
        },
        siteConfig: {
            type: Object,
            default() {
                return {}
            }
        },
        siteId: {
            type: String,
            default: ""
        },
        siteLogoSize: {
            type: String,
            default: "md"
        },
        siteLogoUrl: {
            type: String,
            default: ""
        },
        siteName: {
            type: String,
            default: ""
        },
        siteUrl: {
            type: String,
            default: ""
        },
        wrapperClasses: {
            type: String,
            default: ""
        },
        visible: {
            type: Boolean,
            default: !1
        }
    },
    setup(a) {
        var E, Z, G, V, F, K, Q, q;
        const e = a
          , [p,z] = ie(!1)
          , {isLargeScreen: W} = he()
          , h = `${e.siteId}-color-scheme`;
        let L = null;
        L = window == null ? void 0 : window.localStorage.getItem(h);
        let d = Le({
            storageKey: h
        });
        L || (d.value = ["dark", "auto"].includes((Z = (E = e == null ? void 0 : e.siteConfig) == null ? void 0 : E.theme) == null ? void 0 : Z.darkMode));
        const b = ie(d)
          , B = Be()
          , y = w(((V = (G = e == null ? void 0 : e.siteConfig) == null ? void 0 : G.theme) == null ? void 0 : V.darkMode) === "auto");
        ((K = (F = e == null ? void 0 : e.siteConfig) == null ? void 0 : F.theme) == null ? void 0 : K.darkMode) === "dark" && (d.value = !0),
        ((q = (Q = e == null ? void 0 : e.siteConfig) == null ? void 0 : Q.theme) == null ? void 0 : q.darkMode) === "light" && (d.value = !1),
        re( () => {
            var s, c;
            return (c = (s = e == null ? void 0 : e.siteConfig) == null ? void 0 : s.theme) == null ? void 0 : c.darkMode
        }
        , s => {
            s === "dark" ? (d.value = !0,
            y.value = !1) : s === "light" ? (d.value = !1,
            y.value = !1) : s === "auto" && (d.value = B.value,
            y.value = !0,
            localStorage.setItem(h, "auto"))
        }
        );
        const x = w(null)
          , N = w(null)
          , i = w(null)
          , A = w(null)
          , C = w(!1)
          , R = v( () => {
            var c, k;
            const s = [];
            return (c = e == null ? void 0 : e.navItems) == null || c.forEach(n => {
                s.push({
                    label: n == null ? void 0 : n.label,
                    link: `${e == null ? void 0 : e.siteUrl}${n == null ? void 0 : n.link}`
                })
            }
            ),
            (k = e == null ? void 0 : e.links) == null || k.forEach(n => {
                n != null && n.visible && (n != null && n.label) && (n != null && n.link) && s.push({
                    label: n == null ? void 0 : n.label,
                    link: n == null ? void 0 : n.link
                })
            }
            ),
            s
        }
        );
        let D = 1e4;
        const ve = v( () => {
            var s;
            return e.disableSiteNameWrap === !0 ? "" : ((s = e == null ? void 0 : e.siteName) == null ? void 0 : s.length) > 19 ? "flex-wrap" : "shrink-0"
        }
        )
          , H = v( () => ({
            sm: "h-5",
            md: "h-8",
            lg: "h-12",
            xl: "h-16"
        })[e == null ? void 0 : e.siteLogoSize])
          , O = v( () => ({
            sm: "gap-x-1.5",
            md: "gap-x-2",
            lg: "gap-x-3",
            xl: "gap-x-3"
        })[e == null ? void 0 : e.siteLogoSize])
          , j = v( () => {
            const s = {
                sm: "text-base md:text-lg",
                md: "text-xl md:text-2xl",
                lg: "text-2xl md:text-3xl",
                xl: "text-3xl md:text-4xl"
            };
            return {
                "sr-only": e == null ? void 0 : e.hideSiteName,
                [s[e == null ? void 0 : e.siteLogoSize]]: !0,
                "!leading-none": !0
            }
        }
        )
          , M = v( () => ({
            auto: "text-type-900 dark:text-white",
            dark: "text-type-900",
            light: "text-white"
        })[(e == null ? void 0 : e.textColor) || "auto"]);
        v( () => e != null && e.hideSiteName ? "hidden" : "w-[100px]");
        const f = v( () => {
            var s;
            return ((s = e == null ? void 0 : e.siteConfig) == null ? void 0 : s.primaryButton) || {}
        }
        )
          , ye = v( () => ({
            left: "mr-auto",
            center: "mx-auto",
            right: "ml-auto"
        })[e == null ? void 0 : e.navItemsAlignment])
          , xe = () => {
            p.value = !0
        }
          , _e = () => {
            p.value = !1
        }
          , be = () => {
            D = i.value.offsetWidth || D
        }
          , ke = s => {
            const {width: c} = s[0].contentRect;
            Y(c)
        }
          , T = async s => {
            C.value = !1,
            await de();
            const c = N.value.offsetWidth
              , k = A.value.offsetWidth + 75
              , n = C.value ? D : i.value.offsetWidth
              , I = c + n + k;
            C.value = I > s
        }
          , Y = Ie(s => {
            T(s)
        }
        , 100)
          , {stop: we} = Ue(x, ke);
        return re( () => e.navItems, async () => {
            await de(),
            Y(x.value.offsetWidth)
        }
        , {
            deep: !0
        }),
        We( () => {
            be(),
            T(x.value.offsetWidth)
        }
        ),
        Ae( () => {
            we()
        }
        ),
        (s, c) => {
            var P, X, J, ee, te, ae, se, ne, oe, le;
            const k = ge
              , n = Xe
              , I = Fe
              , Se = Ye
              , pe = Re("preview");
            return o(),
            r("div", {
                class: u(a.wrapperClasses)
            }, [ce((o(),
            r("div", gt, [l("nav", {
                ref_key: "navRef",
                ref: x,
                class: "flex items-center justify-between gap-x-4 md:gap-x-6",
                "aria-label": "Global"
            }, [g(" Logo & Site Name "), l("a", {
                ref_key: "logoRef",
                ref: N,
                href: a.siteUrl,
                class: u(["flex items-center", [t(O), t(ve)]])
            }, [a.siteLogoUrl ? (o(),
            r("img", {
                key: 0,
                class: u(["w-auto", t(H)]),
                src: a.siteLogoUrl,
                alt: `${a.siteName} logo`
            }, null, 10, vt)) : g("v-if", !0), l("p", {
                class: u(["font-sans font-bold", [t(j), t(M)]])
            }, S(a.siteName), 3)], 10, ht), g(" Nav Items "), ce(l("div", {
                ref_key: "navItemsRef",
                ref: i,
                class: u(["shrink-0 gap-x-4 md:gap-x-8 flex", t(ye)])
            }, [(o(!0),
            r(me, null, fe(t(R), (m, Ne) => (o(),
            r("a", {
                key: Ne,
                href: m == null ? void 0 : m.link,
                class: u(["nav-item text-sm shrink-0 font-sans font-semibold leading-6 capitalize", [t(M)]])
            }, S(m == null ? void 0 : m.label), 11, yt))), 128))], 2), [[De, !C.value]]), g(" Meta Nav Items "), l("div", {
                ref_key: "metaNavRef",
                ref: A,
                class: "flex font-sans items-center space-x-2"
            }, [(P = t(f)) != null && P.visibleInNav && ((X = t(f)) != null && X.label) ? (o(),
            _(k, {
                key: 0,
                size: t(W) ? "sm" : "xs",
                href: ((J = t(f)) == null ? void 0 : J.link) === "other" ? (ee = t(f)) == null ? void 0 : ee.externalLink : (te = t(f)) == null ? void 0 : te.link,
                theme: "primary",
                class: "whitespace-nowrap",
                icon: (ae = t(f)) == null ? void 0 : ae.icon,
                "background-color": (se = t(f)) == null ? void 0 : se.backgroundColor,
                "text-color": (ne = t(f)) == null ? void 0 : ne.textColor,
                "open-in-new-tab": (oe = t(f)) == null ? void 0 : oe.openInNewTab
            }, {
                default: $( () => {
                    var m;
                    return [ue(S((m = t(f)) == null ? void 0 : m.label), 1)]
                }
                ),
                _: 1
            }, 8, ["size", "href", "icon", "background-color", "text-color", "open-in-new-tab"])) : g("v-if", !0), y.value ? (o(),
            r("button", {
                key: 1,
                onClick: c[0] || (c[0] = m => t(b)()),
                title: t(d) ? "Light Mode" : "Dark Mode",
                class: "-my-2.5 py-2.5 pl-2.5"
            }, [t(d) ? (o(),
            _(n, {
                key: 0,
                class: u(["h-5 w-5", t(M)])
            }, null, 8, ["class"])) : (o(),
            _(I, {
                key: 1,
                class: "h-5 w-5"
            }))], 8, xt)) : g("v-if", !0), (le = t(R)) != null && le.length ? (o(),
            r("button", {
                key: 2,
                type: "button",
                class: u(["-m-2.5 inline-flex items-center justify-center rounded-md p-2.5", [C.value ? "block" : "hidden", t(M)]]),
                onClick: xe
            }, [_t, U(Se, {
                class: "h-6 w-6",
                "aria-hidden": "true"
            })], 2)) : g("v-if", !0)], 512)], 512), g(" Mobile Nav "), U(mt, {
                onClose: _e,
                "nav-open": t(p),
                "logo-spacing": t(O),
                "site-url": a.siteUrl,
                "site-logo-url": a.siteLogoUrl,
                "site-name-classes": t(j),
                "site-name": a.siteName,
                "primary-button": t(f),
                "nav-items": t(R),
                "logo-size": t(H)
            }, {
                metaNav: $( () => [y.value ? (o(),
                r("button", {
                    key: 0,
                    onClick: c[1] || (c[1] = m => t(b)()),
                    title: t(d) ? "Light Mode" : "Dark Mode",
                    class: "-my-2.5 py-2.5 pl-2.5"
                }, [t(d) ? (o(),
                _(n, {
                    key: 0,
                    class: u(["h-5 w-5", t(M)])
                }, null, 8, ["class"])) : (o(),
                _(I, {
                    key: 1,
                    class: "h-5 w-5"
                }))], 8, bt)) : g("v-if", !0)]),
                _: 1
            }, 8, ["nav-open", "logo-spacing", "site-url", "site-logo-url", "site-name-classes", "site-name", "primary-button", "nav-items", "logo-size"])])), [[pe, {
                editBrand: !0
            }]])], 2)
        }
    }
};
export {pt as _};
