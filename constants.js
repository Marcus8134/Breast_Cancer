import {o, b as r, d as _, q as g, K as C, z as p, f as x, n as u, r as h, t as v, g as l, L as z, e as i, w as k, J as L, M as w} from "./vendor-vue.5f1410ab.js";
import {_ as S} from "./vite.c27b6911.js";
const B = {
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 20 20"
}
  , j = _("path", {
    fill: "currentColor",
    d: "M10 1.6a8.4 8.4 0 1 0 0 16.8a8.4 8.4 0 0 0 0-16.8m4.789 11.461L13.06 14.79L10 11.729l-3.061 3.06L5.21 13.06L8.272 10L5.211 6.939L6.94 5.211L10 8.271l3.061-3.061l1.729 1.729L11.728 10z"
}, null, -1)
  , O = [j];
function N(t, a) {
    return o(),
    r("svg", B, [...O])
}
const M = {
    name: "entypo-circle-with-cross",
    render: N
};
const U = ["aria-label"]
  , y = {
    __name: "UiLoader",
    props: {
        iconColorClass: {
            type: String,
            default: "text-brand-primary"
        },
        textColorClass: {
            type: String,
            default: "text-slate-800 dark:text-white"
        },
        label: {
            type: String,
            default: "Loading..."
        },
        size: {
            type: String,
            default: "base"
        },
        delay: {
            type: Number,
            default: 300
        }
    },
    setup(t) {
        const a = t
          , e = g(!1)
          , c = C( () => ({
            [`ui-loader-${a.size}`]: a.size,
            [a.textColorClass]: a.textColorClass
        }));
        return p( () => {
            setTimeout( () => {
                e.value = !0
            }
            , a.delay)
        }
        ),
        (d, s) => {
            const n = M;
            return e.value ? (o(),
            r("div", {
                key: 0,
                class: u(["flex items-center font-black animate-pulse", c.value])
            }, [x(n, {
                class: u(["animate-spin ui-loader-icon", t.iconColorClass])
            }, null, 8, ["class"]), h(d.$slots, "default", {}, () => [t.label ? (o(),
            r("span", {
                key: 0,
                "aria-label": t.label
            }, v(t.label), 9, U)) : l("v-if", !0)])], 2)) : l("v-if", !0)
        }
    }
}
  , I = {
    components: {
        UiLoader: y
    },
    props: {
        backgroundColor: {
            type: String,
            default: ""
        },
        danger: {
            type: Boolean,
            default: !1
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        loading: {
            type: Boolean,
            default: !1
        },
        loadingLabel: {
            type: String,
            default: ""
        },
        loadingClass: {
            type: String,
            default: "text-white"
        },
        icon: {
            type: Object,
            default: void 0
        },
        openInNewTab: {
            type: Boolean,
            default: !1
        },
        size: {
            type: String,
            default: "base"
        },
        textColor: {
            type: String,
            default: ""
        },
        theme: {
            type: String,
            default: "primary"
        },
        to: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            loaderClassObject: {
                [`ui-loader-${this.theme}`]: this.theme
            }
        }
    },
    computed: {
        classObject() {
            return {
                "ui-button": !0,
                [`ui-button-${this.size}`]: this.size,
                [`ui-button-${this.theme}`]: this.theme && !this.backgroundColor,
                [`ui-button-${this.loading}`]: this.loading,
                "ui-button-danger": this.danger,
                "hover:scale-[102%]": !0,
                "transition-transform": !0
            }
        },
        iconClasses() {
            return {
                currentColor: this.textColor,
                "mr-1": this.size === "xs" || this.size === "sm",
                "mr-2": this.size === "base" || this.size === "md",
                "mr-3": this.size === "lg" || this.size === "xl"
            }
        },
        styleObject() {
            return {
                backgroundColor: this.backgroundColor,
                color: this.textColor
            }
        },
        is() {
            var t, a;
            return (t = this == null ? void 0 : this.$attrs) != null && t.href ? "a" : (a = this == null ? void 0 : this.$props) != null && a.to ? "router-link" : "button"
        },
        type() {
            var t, a;
            return (t = this == null ? void 0 : this.$attrs) != null && t.type ? (a = this == null ? void 0 : this.$attrs) == null ? void 0 : a.type : (this == null ? void 0 : this.is) === "button" ? "button" : null
        }
    }
};
function V(t, a, e, c, d, s) {
    const n = y
      , b = z("iconify-icon");
    return o(),
    i(w(s.is), L({
        to: e.to,
        class: ["ui-button", s.classObject],
        style: s.styleObject
    }, t.$attrs, {
        type: s.type,
        disabled: e.loading || e.disabled,
        target: e.openInNewTab ? "_blank" : void 0
    }), {
        default: k( () => {
            var f, m;
            return [e.loading ? (o(),
            i(n, {
                key: 0,
                textColorClass: e.loadingClass,
                iconColorClass: e.loadingClass,
                label: e.loadingLabel,
                size: e.size,
                class: "!font-semibold"
            }, null, 8, ["textColorClass", "iconColorClass", "label", "size"])) : l("v-if", !0), !e.loading && ((f = e.icon) != null && f.icon) ? (o(),
            i(b, {
                key: 1,
                icon: (m = e.icon) == null ? void 0 : m.icon,
                class: u(["w-auto h-auto", s.iconClasses])
            }, null, 8, ["icon", "class"])) : l("v-if", !0), e.loading ? l("v-if", !0) : h(t.$slots, "default", {
                key: 2
            })]
        }
        ),
        _: 3
    }, 16, ["to", "class", "style", "type", "disabled", "target"])
}
const E = S(I, [["render", V]]);
typeof window < "u" && (window == null || window.localStorage.getItem("mixo-admin"));
export {E as _};
