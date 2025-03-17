import {z as B, o as d, b as m, H as A, I as N, l as V, i as E, d as f, t as y, f as w, w as p, j as q, g as r, q as D, J as K, e as u, F as R} from "./vendor-vue.5f1410ab.js";
import {_ as F} from "./constants.f9cf7a64.js";
const H = {
    __name: "MetaPixel",
    props: {
        metaPixelId: {
            type: String,
            default: ""
        }
    },
    setup(n) {
        const e = n;
        return B( () => {
            (function(t, i, s, a, o, c, l) {
                t.fbq || (o = t.fbq = function() {
                    o.callMethod ? o.callMethod.apply(o, arguments) : o.queue.push(arguments)
                }
                ,
                t._fbq || (t._fbq = o),
                o.push = o,
                o.loaded = !0,
                o.version = "2.0",
                o.queue = [],
                c = i.createElement(s),
                c.async = !0,
                c.src = a,
                l = i.getElementsByTagName(s)[0],
                l.parentNode.insertBefore(c, l))
            }
            )(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"),
            fbq("init", e == null ? void 0 : e.metaPixelId),
            fbq("track", "PageView")
        }
        ),
        (t, i) => (d(),
        m("noscript", null, `<img
      height="1"
      width="1"
      style="display: none"
      :src="\`https://www.facebook.com/tr?id=\${metaPixelId}&ev=PageView&noscript=1\`"
  />`))
    }
}
  , J = {
    __name: "GoogleAdsense",
    props: {
        adsenseId: {
            type: String,
            default: ""
        }
    },
    setup(n) {
        const e = n;
        return A({
            script: {
                src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${e == null ? void 0 : e.adsenseId}`,
                async: !0,
                crossorigin: "anonymous"
            }
        }),
        (t, i) => null
    }
}
  , O = ["src"]
  , Q = {
    __name: "GoogleTagManager",
    props: {
        gtmId: {
            type: String,
            default: ""
        }
    },
    setup(n) {
        const e = n;
        if (B( () => {
            (function(t, i, s, a, o) {
                t[a] = t[a] || [],
                t[a].push({
                    "gtm.start": new Date().getTime(),
                    event: "gtm.js"
                });
                var c = i.getElementsByTagName(s)[0]
                  , l = i.createElement(s)
                  , g = a != "dataLayer" ? "&l=" + a : "";
                l.async = !0,
                l.src = "https://www.googletagmanager.com/gtm.js?id=" + o + g,
                c.parentNode.insertBefore(l, c)
            }
            )(window, document, "script", "dataLayer", e == null ? void 0 : e.gtmId)
        }
        ),
        e != null && e.gtmId) {
            let t = function() {
                window != null && window.dataLayer && dataLayer.push(arguments)
            };
            window.dataLayer = window.dataLayer || [],
            t("js", new Date),
            t("config", e == null ? void 0 : e.gtmId)
        }
        return (t, i) => (d(),
        m("iframe", {
            src: `https://www.googletagmanager.com/ns.html?id=${e == null ? void 0 : e.gtmId}`,
            height: "0",
            width: "0",
            style: {
                display: "none",
                visibility: "hidden"
            }
        }, null, 8, O))
    }
}
  , W = {
    __name: "GoogleAnalytics",
    props: {
        g4aId: {
            type: String,
            default: ""
        }
    },
    setup(n) {
        const e = n;
        A({
            script: {
                src: `https://www.googletagmanager.com/gtag/js?id=${e == null ? void 0 : e.g4aId});`,
                async: !0
            }
        }),
        window.dataLayer = window.dataLayer || [];
        function t() {
            window != null && window.dataLayer && dataLayer.push(arguments)
        }
        return e != null && e.g4aId && (t("js", new Date),
        t("config", e == null ? void 0 : e.g4aId)),
        (i, s) => null
    }
}
  , X = {
    key: 0,
    class: "pointer-events-none fixed inset-x-0 bottom-0 z-50 px-6 pb-6"
}
  , Y = {
    class: "pointer-events-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10"
}
  , Z = {
    class: "text-sm leading-6 text-gray-900"
}
  , ee = {
    class: "mt-4 flex items-center gap-x-4"
}
  , te = N({
    __name: "CookieConsent",
    props: {
        buttonLabel: {
            type: String,
            default: "Accept all"
        },
        content: {
            type: String,
            default: ""
        },
        policyLabel: {
            type: String,
            default: ""
        },
        policyLink: {
            type: String,
            default: ""
        },
        storageKey: {
            type: String,
            required: !0
        },
        visible: {
            type: Boolean,
            default: !1
        }
    },
    emits: ["consent"],
    setup(n, {emit: e}) {
        const t = n
          , i = e
          , [s] = V();
        let a = null;
        a = window == null ? void 0 : window.localStorage.getItem(t == null ? void 0 : t.storageKey),
        t != null && t.visible && a === null && (s.value = !0);
        const o = () => {
            s.value = !1,
            window == null || window.localStorage.setItem(t == null ? void 0 : t.storageKey, "true"),
            i("consent", !0)
        }
        ;
        return (c, l) => {
            const g = F;
            return E(s) ? (d(),
            m("div", X, [f("div", Y, [f("p", Z, y(n.content), 1), f("div", ee, [w(g, {
                theme: "primary",
                onClick: o
            }, {
                default: p( () => [q(y(n.buttonLabel), 1)]),
                _: 1
            }), w(g, {
                theme: "link",
                href: n.policyLink,
                class: "text-secondary"
            }, {
                default: p( () => [q(y(n.policyLabel), 1)]),
                _: 1
            }, 8, ["href"]), r(` <button
          @click="onReject"
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Reject all
        </button> `)])])])) : r("v-if", !0)
        }
    }
})
  , ie = N({
    __name: "ScriptLoader",
    props: {
        siteConfig: {
            type: Object,
            default() {
                return {}
            }
        },
        siteUrl: {
            type: String,
            default: ""
        }
    },
    setup(n) {
        var c, l, g, _, h, I;
        const e = n;
        window != null && window.zaraz && window.zaraz.set("ignore_gtm", !0);
        const t = (e == null ? void 0 : e.siteUrl) && new URL(e == null ? void 0 : e.siteUrl)
          , i = `${(c = t == null ? void 0 : t.hostname) == null ? void 0 : c.replace("www.", "")}${t == null ? void 0 : t.pathname}-cookie-accept`;
        let s = null;
        s = window == null ? void 0 : window.localStorage.getItem(i);
        const a = D(!1);
        (g = (l = e == null ? void 0 : e.siteConfig) == null ? void 0 : l.cookieConsent) != null && g.visible && s === "true" || ((_ = e == null ? void 0 : e.siteConfig) == null ? void 0 : _.cookieConsent) === void 0 ? a.value = !0 : (I = (h = e == null ? void 0 : e.siteConfig) == null ? void 0 : h.cookieConsent) != null && I.visible ? a.value = !1 : a.value = !0;
        const o = x => {
            x === !0 && (a.value = !0)
        }
        ;
        return (x, ne) => {
            var v, C, b, k, L, S, j, P, $;
            const M = te
              , T = W
              , z = Q
              , G = J
              , U = H;
            return d(),
            m(R, null, [w(M, K((v = n.siteConfig) == null ? void 0 : v.cookieConsent, {
                onConsent: o,
                storageKey: i
            }), null, 16), a.value && ((C = n.siteConfig) != null && C.g4aId) ? (d(),
            u(T, {
                key: 0,
                g4aId: (b = n.siteConfig) == null ? void 0 : b.g4aId
            }, null, 8, ["g4aId"])) : r("v-if", !0), a.value && ((k = n.siteConfig) != null && k.gtmId) ? (d(),
            u(z, {
                key: 1,
                gtmId: (L = n.siteConfig) == null ? void 0 : L.gtmId
            }, null, 8, ["gtmId"])) : r("v-if", !0), a.value && ((S = n.siteConfig) != null && S.adsenseId) ? (d(),
            u(G, {
                key: 2,
                adsenseId: (j = n.siteConfig) == null ? void 0 : j.adsenseId
            }, null, 8, ["adsenseId"])) : r("v-if", !0), a.value && ((P = n.siteConfig) != null && P.metaPixelId) ? (d(),
            u(U, {
                key: 3,
                metaPixelId: ($ = n.siteConfig) == null ? void 0 : $.metaPixelId
            }, null, 8, ["metaPixelId"])) : r("v-if", !0)], 64)
        }
    }
});
export {ie as _};
