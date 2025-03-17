var Oc = Object.defineProperty;
var Ic = (e, t, n) => t in e ? Oc(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var qe = (e, t, n) => (Ic(e, typeof t != "symbol" ? t + "" : t, n),
n);
function vs(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let o = 0; o < r.length; o++)
        n[r[o]] = !0;
    return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
}
const ne = {}
  , Ct = []
  , Me = () => {}
  , Pc = () => !1
  , po = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
  , bs = e => e.startsWith("onUpdate:")
  , de = Object.assign
  , go = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , Mc = Object.prototype.hasOwnProperty
  , q = (e, t) => Mc.call(e, t)
  , R = Array.isArray
  , At = e => Zn(e) === "[object Map]"
  , ys = e => Zn(e) === "[object Set]"
  , k = e => typeof e == "function"
  , ue = e => typeof e == "string"
  , Nt = e => typeof e == "symbol"
  , re = e => e !== null && typeof e == "object"
  , ws = e => (re(e) || k(e)) && k(e.then) && k(e.catch)
  , _s = Object.prototype.toString
  , Zn = e => _s.call(e)
  , Nc = e => Zn(e).slice(8, -1)
  , Ts = e => Zn(e) === "[object Object]"
  , mo = e => ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , Nn = vs(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , er = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
}
  , jc = /-(\w)/g
  , $e = er(e => e.replace(jc, (t, n) => n ? n.toUpperCase() : ""))
  , Fc = /\B([A-Z])/g
  , tr = er(e => e.replace(Fc, "-$1").toLowerCase())
  , vo = er(e => e.charAt(0).toUpperCase() + e.slice(1))
  , _r = er(e => e ? `on${vo(e)}` : "")
  , pt = (e, t) => !Object.is(e, t)
  , Tr = (e, t) => {
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , $n = (e, t, n) => {
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , Dc = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let ri;
const Dr = () => ri || (ri = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bo(e) {
    if (R(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , o = ue(r) ? kc(r) : bo(r);
            if (o)
                for (const i in o)
                    t[i] = o[i]
        }
        return t
    } else if (ue(e) || re(e))
        return e
}
const Rc = /;(?![^(]*\))/g
  , Lc = /:([^]+)/
  , $c = /\/\*[^]*?\*\//g;
function kc(e) {
    const t = {};
    return e.replace($c, "").split(Rc).forEach(n => {
        if (n) {
            const r = n.split(Lc);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function yo(e) {
    let t = "";
    if (ue(e))
        t = e;
    else if (R(e))
        for (let n = 0; n < e.length; n++) {
            const r = yo(e[n]);
            r && (t += r + " ")
        }
    else if (re(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const fp = e => ue(e) ? e : e == null ? "" : R(e) || re(e) && (e.toString === _s || !k(e.toString)) ? JSON.stringify(e, Es, 2) : String(e)
  , Es = (e, t) => t && t.__v_isRef ? Es(e, t.value) : At(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce( (n, [r,o], i) => (n[Er(r, i) + " =>"] = o,
    n), {})
} : ys(t) ? {
    [`Set(${t.size})`]: [...t.values()].map(n => Er(n))
} : Nt(t) ? Er(t) : re(t) && !R(t) && !Ts(t) ? String(t) : t
  , Er = (e, t="") => {
    var n;
    return Nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
}
;
let Ee;
class Hc {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = Ee,
        !t && Ee && (this.index = (Ee.scopes || (Ee.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = Ee;
            try {
                return Ee = this,
                t()
            } finally {
                Ee = n
            }
        }
    }
    on() {
        Ee = this
    }
    off() {
        Ee = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0,
            r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0,
            r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o,
                o.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function Bc(e, t=Ee) {
    t && t.active && t.effects.push(e)
}
function xs() {
    return Ee
}
function Uc(e) {
    Ee && Ee.cleanups.push(e)
}
const wo = e => {
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Cs = e => (e.w & Xe) > 0
  , As = e => (e.n & Xe) > 0
  , Wc = ({deps: e}) => {
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= Xe
}
  , Kc = e => {
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const o = t[r];
            Cs(o) && !As(o) ? o.delete(e) : t[n++] = o,
            o.w &= ~Xe,
            o.n &= ~Xe
        }
        t.length = n
    }
}
  , kn = new WeakMap;
let Vt = 0
  , Xe = 1;
const Rr = 30;
let Ie;
const at = Symbol("")
  , Lr = Symbol("");
class _o {
    constructor(t, n=null, r) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Bc(this, r)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = Ie
          , n = Ge;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = Ie,
            Ie = this,
            Ge = !0,
            Xe = 1 << ++Vt,
            Vt <= Rr ? Wc(this) : oi(this),
            this.fn()
        } finally {
            Vt <= Rr && Kc(this),
            Xe = 1 << --Vt,
            Ie = this.parent,
            Ge = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        Ie === this ? this.deferStop = !0 : this.active && (oi(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function oi(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let Ge = !0;
const Ss = [];
function jt() {
    Ss.push(Ge),
    Ge = !1
}
function Ft() {
    const e = Ss.pop();
    Ge = e === void 0 ? !0 : e
}
function we(e, t, n) {
    if (Ge && Ie) {
        let r = kn.get(e);
        r || kn.set(e, r = new Map);
        let o = r.get(n);
        o || r.set(n, o = wo()),
        Os(o)
    }
}
function Os(e, t) {
    let n = !1;
    Vt <= Rr ? As(e) || (e.n |= Xe,
    n = !Cs(e)) : n = !e.has(Ie),
    n && (e.add(Ie),
    Ie.deps.push(e))
}
function We(e, t, n, r, o, i) {
    const s = kn.get(e);
    if (!s)
        return;
    let l = [];
    if (t === "clear")
        l = [...s.values()];
    else if (n === "length" && R(e)) {
        const c = Number(r);
        s.forEach( (u, a) => {
            (a === "length" || !Nt(a) && a >= c) && l.push(u)
        }
        )
    } else
        switch (n !== void 0 && l.push(s.get(n)),
        t) {
        case "add":
            R(e) ? mo(n) && l.push(s.get("length")) : (l.push(s.get(at)),
            At(e) && l.push(s.get(Lr)));
            break;
        case "delete":
            R(e) || (l.push(s.get(at)),
            At(e) && l.push(s.get(Lr)));
            break;
        case "set":
            At(e) && l.push(s.get(at));
            break
        }
    if (l.length === 1)
        l[0] && $r(l[0]);
    else {
        const c = [];
        for (const u of l)
            u && c.push(...u);
        $r(wo(c))
    }
}
function $r(e, t) {
    const n = R(e) ? e : [...e];
    for (const r of n)
        r.computed && ii(r);
    for (const r of n)
        r.computed || ii(r)
}
function ii(e, t) {
    (e !== Ie || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function Vc(e, t) {
    var n;
    return (n = kn.get(e)) == null ? void 0 : n.get(t)
}
const qc = vs("__proto__,__v_isRef,__isVue")
  , Is = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Nt))
  , si = zc();
function zc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const r = J(this);
            for (let i = 0, s = this.length; i < s; i++)
                we(r, "get", i + "");
            const o = r[t](...n);
            return o === -1 || o === !1 ? r[t](...n.map(J)) : o
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            jt();
            const r = J(this)[t].apply(this, n);
            return Ft(),
            r
        }
    }
    ),
    e
}
function Jc(e) {
    const t = J(this);
    return we(t, "has", e),
    t.hasOwnProperty(e)
}
class Ps {
    constructor(t=!1, n=!1) {
        this._isReadonly = t,
        this._shallow = n
    }
    get(t, n, r) {
        const o = this._isReadonly
          , i = this._shallow;
        if (n === "__v_isReactive")
            return !o;
        if (n === "__v_isReadonly")
            return o;
        if (n === "__v_isShallow")
            return i;
        if (n === "__v_raw")
            return r === (o ? i ? lu : Fs : i ? js : Ns).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const s = R(t);
        if (!o) {
            if (s && q(si, n))
                return Reflect.get(si, n, r);
            if (n === "hasOwnProperty")
                return Jc
        }
        const l = Reflect.get(t, n, r);
        return (Nt(n) ? Is.has(n) : qc(n)) || (o || we(t, "get", n),
        i) ? l : ae(l) ? s && mo(n) ? l : l.value : re(l) ? o ? fn(l) : rr(l) : l
    }
}
class Ms extends Ps {
    constructor(t=!1) {
        super(!1, t)
    }
    set(t, n, r, o) {
        let i = t[n];
        if (!this._shallow) {
            const c = It(i);
            if (!Hn(r) && !It(r) && (i = J(i),
            r = J(r)),
            !R(t) && ae(i) && !ae(r))
                return c ? !1 : (i.value = r,
                !0)
        }
        const s = R(t) && mo(n) ? Number(n) < t.length : q(t, n)
          , l = Reflect.set(t, n, r, o);
        return t === J(o) && (s ? pt(r, i) && We(t, "set", n, r) : We(t, "add", n, r)),
        l
    }
    deleteProperty(t, n) {
        const r = q(t, n);
        t[n];
        const o = Reflect.deleteProperty(t, n);
        return o && r && We(t, "delete", n, void 0),
        o
    }
    has(t, n) {
        const r = Reflect.has(t, n);
        return (!Nt(n) || !Is.has(n)) && we(t, "has", n),
        r
    }
    ownKeys(t) {
        return we(t, "iterate", R(t) ? "length" : at),
        Reflect.ownKeys(t)
    }
}
class Qc extends Ps {
    constructor(t=!1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const Gc = new Ms
  , Yc = new Qc
  , Xc = new Ms(!0)
  , To = e => e
  , nr = e => Reflect.getPrototypeOf(e);
function mn(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const o = J(e)
      , i = J(t);
    n || (pt(t, i) && we(o, "get", t),
    we(o, "get", i));
    const {has: s} = nr(o)
      , l = r ? To : n ? Co : nn;
    if (s.call(o, t))
        return l(e.get(t));
    if (s.call(o, i))
        return l(e.get(i));
    e !== o && e.get(t)
}
function vn(e, t=!1) {
    const n = this.__v_raw
      , r = J(n)
      , o = J(e);
    return t || (pt(e, o) && we(r, "has", e),
    we(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
}
function bn(e, t=!1) {
    return e = e.__v_raw,
    !t && we(J(e), "iterate", at),
    Reflect.get(e, "size", e)
}
function li(e) {
    e = J(e);
    const t = J(this);
    return nr(t).has.call(t, e) || (t.add(e),
    We(t, "add", e, e)),
    this
}
function ci(e, t) {
    t = J(t);
    const n = J(this)
      , {has: r, get: o} = nr(n);
    let i = r.call(n, e);
    i || (e = J(e),
    i = r.call(n, e));
    const s = o.call(n, e);
    return n.set(e, t),
    i ? pt(t, s) && We(n, "set", e, t) : We(n, "add", e, t),
    this
}
function ui(e) {
    const t = J(this)
      , {has: n, get: r} = nr(t);
    let o = n.call(t, e);
    o || (e = J(e),
    o = n.call(t, e)),
    r && r.call(t, e);
    const i = t.delete(e);
    return o && We(t, "delete", e, void 0),
    i
}
function ai() {
    const e = J(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && We(e, "clear", void 0, void 0),
    n
}
function yn(e, t) {
    return function(r, o) {
        const i = this
          , s = i.__v_raw
          , l = J(s)
          , c = t ? To : e ? Co : nn;
        return !e && we(l, "iterate", at),
        s.forEach( (u, a) => r.call(o, c(u), c(a), i))
    }
}
function wn(e, t, n) {
    return function(...r) {
        const o = this.__v_raw
          , i = J(o)
          , s = At(i)
          , l = e === "entries" || e === Symbol.iterator && s
          , c = e === "keys" && s
          , u = o[e](...r)
          , a = n ? To : t ? Co : nn;
        return !t && we(i, "iterate", c ? Lr : at),
        {
            next() {
                const {value: h, done: p} = u.next();
                return p ? {
                    value: h,
                    done: p
                } : {
                    value: l ? [a(h[0]), a(h[1])] : a(h),
                    done: p
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function ze(e) {
    return function(...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}
function Zc() {
    const e = {
        get(i) {
            return mn(this, i)
        },
        get size() {
            return bn(this)
        },
        has: vn,
        add: li,
        set: ci,
        delete: ui,
        clear: ai,
        forEach: yn(!1, !1)
    }
      , t = {
        get(i) {
            return mn(this, i, !1, !0)
        },
        get size() {
            return bn(this)
        },
        has: vn,
        add: li,
        set: ci,
        delete: ui,
        clear: ai,
        forEach: yn(!1, !0)
    }
      , n = {
        get(i) {
            return mn(this, i, !0)
        },
        get size() {
            return bn(this, !0)
        },
        has(i) {
            return vn.call(this, i, !0)
        },
        add: ze("add"),
        set: ze("set"),
        delete: ze("delete"),
        clear: ze("clear"),
        forEach: yn(!0, !1)
    }
      , r = {
        get(i) {
            return mn(this, i, !0, !0)
        },
        get size() {
            return bn(this, !0)
        },
        has(i) {
            return vn.call(this, i, !0)
        },
        add: ze("add"),
        set: ze("set"),
        delete: ze("delete"),
        clear: ze("clear"),
        forEach: yn(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        e[i] = wn(i, !1, !1),
        n[i] = wn(i, !0, !1),
        t[i] = wn(i, !1, !0),
        r[i] = wn(i, !0, !0)
    }
    ),
    [e, n, t, r]
}
const [eu,tu,nu,ru] = Zc();
function Eo(e, t) {
    const n = t ? e ? ru : nu : e ? tu : eu;
    return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(q(n, o) && o in r ? n : r, o, i)
}
const ou = {
    get: Eo(!1, !1)
}
  , iu = {
    get: Eo(!1, !0)
}
  , su = {
    get: Eo(!0, !1)
}
  , Ns = new WeakMap
  , js = new WeakMap
  , Fs = new WeakMap
  , lu = new WeakMap;
function cu(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function uu(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : cu(Nc(e))
}
function rr(e) {
    return It(e) ? e : xo(e, !1, Gc, ou, Ns)
}
function au(e) {
    return xo(e, !1, Xc, iu, js)
}
function fn(e) {
    return xo(e, !0, Yc, su, Fs)
}
function xo(e, t, n, r, o) {
    if (!re(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const i = o.get(e);
    if (i)
        return i;
    const s = uu(e);
    if (s === 0)
        return e;
    const l = new Proxy(e,s === 2 ? r : n);
    return o.set(e, l),
    l
}
function St(e) {
    return It(e) ? St(e.__v_raw) : !!(e && e.__v_isReactive)
}
function It(e) {
    return !!(e && e.__v_isReadonly)
}
function Hn(e) {
    return !!(e && e.__v_isShallow)
}
function Ds(e) {
    return St(e) || It(e)
}
function J(e) {
    const t = e && e.__v_raw;
    return t ? J(t) : e
}
function Rs(e) {
    return $n(e, "__v_skip", !0),
    e
}
const nn = e => re(e) ? rr(e) : e
  , Co = e => re(e) ? fn(e) : e;
function Ao(e) {
    Ge && Ie && (e = J(e),
    Os(e.dep || (e.dep = wo())))
}
function So(e, t) {
    e = J(e);
    const n = e.dep;
    n && $r(n)
}
function ae(e) {
    return !!(e && e.__v_isRef === !0)
}
function z(e) {
    return Ls(e, !1)
}
function Oo(e) {
    return Ls(e, !0)
}
function Ls(e, t) {
    return ae(e) ? e : new fu(e,t)
}
class fu {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : J(t),
        this._value = n ? t : nn(t)
    }
    get value() {
        return Ao(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || Hn(t) || It(t);
        t = n ? t : J(t),
        pt(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : nn(t),
        So(this))
    }
}
function or(e) {
    return ae(e) ? e.value : e
}
const du = {
    get: (e, t, n) => or(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const o = e[t];
        return ae(o) && !ae(n) ? (o.value = n,
        !0) : Reflect.set(e, t, n, r)
    }
};
function $s(e) {
    return St(e) ? e : new Proxy(e,du)
}
class hu {
    constructor(t) {
        this.dep = void 0,
        this.__v_isRef = !0;
        const {get: n, set: r} = t( () => Ao(this), () => So(this));
        this._get = n,
        this._set = r
    }
    get value() {
        return this._get()
    }
    set value(t) {
        this._set(t)
    }
}
function pu(e) {
    return new hu(e)
}
class gu {
    constructor(t, n, r) {
        this._object = t,
        this._key = n,
        this._defaultValue = r,
        this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return Vc(J(this._object), this._key)
    }
}
class mu {
    constructor(t) {
        this._getter = t,
        this.__v_isRef = !0,
        this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}
function vu(e, t, n) {
    return ae(e) ? e : k(e) ? new mu(e) : re(e) && arguments.length > 1 ? bu(e, t, n) : z(e)
}
function bu(e, t, n) {
    const r = e[t];
    return ae(r) ? r : new gu(e,t,n)
}
class yu {
    constructor(t, n, r, o) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this._dirty = !0,
        this.effect = new _o(t, () => {
            this._dirty || (this._dirty = !0,
            So(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !o,
        this.__v_isReadonly = r
    }
    get value() {
        const t = J(this);
        return Ao(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function wu(e, t, n=!1) {
    let r, o;
    const i = k(e);
    return i ? (r = e,
    o = Me) : (r = e.get,
    o = e.set),
    new yu(r,o,i || !o,n)
}
function Ye(e, t, n, r) {
    let o;
    try {
        o = r ? e(...r) : e()
    } catch (i) {
        ir(i, t, n)
    }
    return o
}
function Ne(e, t, n, r) {
    if (k(e)) {
        const i = Ye(e, t, n, r);
        return i && ws(i) && i.catch(s => {
            ir(s, t, n)
        }
        ),
        i
    }
    const o = [];
    for (let i = 0; i < e.length; i++)
        o.push(Ne(e[i], t, n, r));
    return o
}
function ir(e, t, n, r=!0) {
    const o = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const s = t.proxy
          , l = n;
        for (; i; ) {
            const u = i.ec;
            if (u) {
                for (let a = 0; a < u.length; a++)
                    if (u[a](e, s, l) === !1)
                        return
            }
            i = i.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            Ye(c, null, 10, [e, s, l]);
            return
        }
    }
    _u(e, n, o, r)
}
function _u(e, t, n, r=!0) {
    console.error(e)
}
let rn = !1
  , kr = !1;
const fe = [];
let Re = 0;
const Ot = [];
let Ue = null
  , it = 0;
const ks = Promise.resolve();
let Io = null;
function sr(e) {
    const t = Io || ks;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Tu(e) {
    let t = Re + 1
      , n = fe.length;
    for (; t < n; ) {
        const r = t + n >>> 1
          , o = fe[r]
          , i = on(o);
        i < e || i === e && o.pre ? t = r + 1 : n = r
    }
    return t
}
function Po(e) {
    (!fe.length || !fe.includes(e, rn && e.allowRecurse ? Re + 1 : Re)) && (e.id == null ? fe.push(e) : fe.splice(Tu(e.id), 0, e),
    Hs())
}
function Hs() {
    !rn && !kr && (kr = !0,
    Io = ks.then(Us))
}
function Eu(e) {
    const t = fe.indexOf(e);
    t > Re && fe.splice(t, 1)
}
function xu(e) {
    R(e) ? Ot.push(...e) : (!Ue || !Ue.includes(e, e.allowRecurse ? it + 1 : it)) && Ot.push(e),
    Hs()
}
function fi(e, t, n=rn ? Re + 1 : 0) {
    for (; n < fe.length; n++) {
        const r = fe[n];
        if (r && r.pre) {
            if (e && r.id !== e.uid)
                continue;
            fe.splice(n, 1),
            n--,
            r()
        }
    }
}
function Bs(e) {
    if (Ot.length) {
        const t = [...new Set(Ot)];
        if (Ot.length = 0,
        Ue) {
            Ue.push(...t);
            return
        }
        for (Ue = t,
        Ue.sort( (n, r) => on(n) - on(r)),
        it = 0; it < Ue.length; it++)
            Ue[it]();
        Ue = null,
        it = 0
    }
}
const on = e => e.id == null ? 1 / 0 : e.id
  , Cu = (e, t) => {
    const n = on(e) - on(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function Us(e) {
    kr = !1,
    rn = !0,
    fe.sort(Cu);
    const t = Me;
    try {
        for (Re = 0; Re < fe.length; Re++) {
            const n = fe[Re];
            n && n.active !== !1 && Ye(n, null, 14)
        }
    } finally {
        Re = 0,
        fe.length = 0,
        Bs(),
        rn = !1,
        Io = null,
        (fe.length || Ot.length) && Us()
    }
}
function Au(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || ne;
    let o = n;
    const i = t.startsWith("update:")
      , s = i && t.slice(7);
    if (s && s in r) {
        const a = `${s === "modelValue" ? "model" : s}Modifiers`
          , {number: h, trim: p} = r[a] || ne;
        p && (o = n.map(m => ue(m) ? m.trim() : m)),
        h && (o = n.map(Dc))
    }
    let l, c = r[l = _r(t)] || r[l = _r($e(t))];
    !c && i && (c = r[l = _r(tr(t))]),
    c && Ne(c, e, 6, o);
    const u = r[l + "Once"];
    if (u) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[l])
            return;
        e.emitted[l] = !0,
        Ne(u, e, 6, o)
    }
}
function Ws(e, t, n=!1) {
    const r = t.emitsCache
      , o = r.get(e);
    if (o !== void 0)
        return o;
    const i = e.emits;
    let s = {}
      , l = !1;
    if (!k(e)) {
        const c = u => {
            const a = Ws(u, t, !0);
            a && (l = !0,
            de(s, a))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(c),
        e.extends && c(e.extends),
        e.mixins && e.mixins.forEach(c)
    }
    return !i && !l ? (re(e) && r.set(e, null),
    null) : (R(i) ? i.forEach(c => s[c] = null) : de(s, i),
    re(e) && r.set(e, s),
    s)
}
function lr(e, t) {
    return !e || !po(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    q(e, t[0].toLowerCase() + t.slice(1)) || q(e, tr(t)) || q(e, t))
}
let ce = null
  , Ks = null;
function Bn(e) {
    const t = ce;
    return ce = e,
    Ks = e && e.type.__scopeId || null,
    t
}
function Su(e, t=ce, n) {
    if (!t || e._n)
        return e;
    const r = (...o) => {
        r._d && Ei(-1);
        const i = Bn(t);
        let s;
        try {
            s = e(...o)
        } finally {
            Bn(i),
            r._d && Ei(1)
        }
        return s
    }
    ;
    return r._n = !0,
    r._c = !0,
    r._d = !0,
    r
}
function xr(e) {
    const {type: t, vnode: n, proxy: r, withProxy: o, props: i, propsOptions: [s], slots: l, attrs: c, emit: u, render: a, renderCache: h, data: p, setupState: m, ctx: _, inheritAttrs: w} = e;
    let O, L;
    const j = Bn(e);
    try {
        if (n.shapeFlag & 4) {
            const C = o || r
              , K = C;
            O = De(a.call(K, C, h, i, m, p, _)),
            L = c
        } else {
            const C = t;
            O = De(C.length > 1 ? C(i, {
                attrs: c,
                slots: l,
                emit: u
            }) : C(i, null)),
            L = t.props ? c : Ou(c)
        }
    } catch (C) {
        Xt.length = 0,
        ir(C, e, 1),
        O = ge(Ze)
    }
    let H = O;
    if (L && w !== !1) {
        const C = Object.keys(L)
          , {shapeFlag: K} = H;
        C.length && K & 7 && (s && C.some(bs) && (L = Iu(L, s)),
        H = gt(H, L))
    }
    return n.dirs && (H = gt(H),
    H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs),
    n.transition && (H.transition = n.transition),
    O = H,
    Bn(j),
    O
}
const Ou = e => {
    let t;
    for (const n in e)
        (n === "class" || n === "style" || po(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Iu = (e, t) => {
    const n = {};
    for (const r in e)
        (!bs(r) || !(r.slice(9)in t)) && (n[r] = e[r]);
    return n
}
;
function Pu(e, t, n) {
    const {props: r, children: o, component: i} = e
      , {props: s, children: l, patchFlag: c} = t
      , u = i.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && c >= 0) {
        if (c & 1024)
            return !0;
        if (c & 16)
            return r ? di(r, s, u) : !!s;
        if (c & 8) {
            const a = t.dynamicProps;
            for (let h = 0; h < a.length; h++) {
                const p = a[h];
                if (s[p] !== r[p] && !lr(u, p))
                    return !0
            }
        }
    } else
        return (o || l) && (!l || !l.$stable) ? !0 : r === s ? !1 : r ? s ? di(r, s, u) : !0 : !!s;
    return !1
}
function di(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let o = 0; o < r.length; o++) {
        const i = r[o];
        if (t[i] !== e[i] && !lr(n, i))
            return !0
    }
    return !1
}
function Mu({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const Mo = "components"
  , Nu = "directives";
function dp(e, t) {
    return No(Mo, e, !0, t) || e
}
const Vs = Symbol.for("v-ndc");
function hp(e) {
    return ue(e) ? No(Mo, e, !1) || e : e || Vs
}
function pp(e) {
    return No(Nu, e)
}
function No(e, t, n=!0, r=!1) {
    const o = ce || se;
    if (o) {
        const i = o.type;
        if (e === Mo) {
            const l = Ea(i, !1);
            if (l && (l === t || l === $e(t) || l === vo($e(t))))
                return i
        }
        const s = hi(o[e] || i[e], t) || hi(o.appContext[e], t);
        return !s && r ? i : s
    }
}
function hi(e, t) {
    return e && (e[t] || e[$e(t)] || e[vo($e(t))])
}
const ju = e => e.__isSuspense;
function Fu(e, t) {
    t && t.pendingBranch ? R(e) ? t.effects.push(...e) : t.effects.push(e) : xu(e)
}
function He(e, t) {
    return jo(e, null, t)
}
const _n = {};
function Ae(e, t, n) {
    return jo(e, t, n)
}
function jo(e, t, {immediate: n, deep: r, flush: o, onTrack: i, onTrigger: s}=ne) {
    var l;
    const c = xs() === ((l = se) == null ? void 0 : l.scope) ? se : null;
    let u, a = !1, h = !1;
    if (ae(e) ? (u = () => e.value,
    a = Hn(e)) : St(e) ? (u = () => e,
    r = !0) : R(e) ? (h = !0,
    a = e.some(C => St(C) || Hn(C)),
    u = () => e.map(C => {
        if (ae(C))
            return C.value;
        if (St(C))
            return ct(C);
        if (k(C))
            return Ye(C, c, 2)
    }
    )) : k(e) ? t ? u = () => Ye(e, c, 2) : u = () => {
        if (!(c && c.isUnmounted))
            return p && p(),
            Ne(e, c, 3, [m])
    }
    : u = Me,
    t && r) {
        const C = u;
        u = () => ct(C())
    }
    let p, m = C => {
        p = j.onStop = () => {
            Ye(C, c, 4),
            p = j.onStop = void 0
        }
    }
    , _;
    if (ln)
        if (m = Me,
        t ? n && Ne(t, c, 3, [u(), h ? [] : void 0, m]) : u(),
        o === "sync") {
            const C = Aa();
            _ = C.__watcherHandles || (C.__watcherHandles = [])
        } else
            return Me;
    let w = h ? new Array(e.length).fill(_n) : _n;
    const O = () => {
        if (j.active)
            if (t) {
                const C = j.run();
                (r || a || (h ? C.some( (K, S) => pt(K, w[S])) : pt(C, w))) && (p && p(),
                Ne(t, c, 3, [C, w === _n ? void 0 : h && w[0] === _n ? [] : w, m]),
                w = C)
            } else
                j.run()
    }
    ;
    O.allowRecurse = !!t;
    let L;
    o === "sync" ? L = O : o === "post" ? L = () => ve(O, c && c.suspense) : (O.pre = !0,
    c && (O.id = c.uid),
    L = () => Po(O));
    const j = new _o(u,L);
    t ? n ? O() : w = j.run() : o === "post" ? ve(j.run.bind(j), c && c.suspense) : j.run();
    const H = () => {
        j.stop(),
        c && c.scope && go(c.scope.effects, j)
    }
    ;
    return _ && _.push(H),
    H
}
function Du(e, t, n) {
    const r = this.proxy
      , o = ue(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
    let i;
    k(t) ? i = t : (i = t.handler,
    n = t);
    const s = se;
    Pt(this);
    const l = jo(o, i.bind(r), n);
    return s ? Pt(s) : ft(),
    l
}
function qs(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let o = 0; o < n.length && r; o++)
            r = r[n[o]];
        return r
    }
}
function ct(e, t) {
    if (!re(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    ae(e))
        ct(e.value, t);
    else if (R(e))
        for (let n = 0; n < e.length; n++)
            ct(e[n], t);
    else if (ys(e) || At(e))
        e.forEach(n => {
            ct(n, t)
        }
        );
    else if (Ts(e))
        for (const n in e)
            ct(e[n], t);
    return e
}
function gp(e, t) {
    const n = ce;
    if (n === null)
        return e;
    const r = dr(n) || n.proxy
      , o = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let[s,l,c,u=ne] = t[i];
        s && (k(s) && (s = {
            mounted: s,
            updated: s
        }),
        s.deep && ct(l),
        o.push({
            dir: s,
            instance: r,
            value: l,
            oldValue: void 0,
            arg: c,
            modifiers: u
        }))
    }
    return e
}
function rt(e, t, n, r) {
    const o = e.dirs
      , i = t && t.dirs;
    for (let s = 0; s < o.length; s++) {
        const l = o[s];
        i && (l.oldValue = i[s].value);
        let c = l.dir[r];
        c && (jt(),
        Ne(c, n, 8, [e.el, l, e, t]),
        Ft())
    }
}
/*! #__NO_SIDE_EFFECTS__ */
function tt(e, t) {
    return k(e) ? ( () => de({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}
const Qt = e => !!e.type.__asyncLoader
  , zs = e => e.type.__isKeepAlive;
function Js(e, t) {
    Gs(e, "a", t)
}
function Qs(e, t) {
    Gs(e, "da", t)
}
function Gs(e, t, n=se) {
    const r = e.__wdc || (e.__wdc = () => {
        let o = n;
        for (; o; ) {
            if (o.isDeactivated)
                return;
            o = o.parent
        }
        return e()
    }
    );
    if (cr(t, r, n),
    n) {
        let o = n.parent;
        for (; o && o.parent; )
            zs(o.parent.vnode) && Ru(r, t, n, o),
            o = o.parent
    }
}
function Ru(e, t, n, r) {
    const o = cr(t, e, r, !0);
    Ke( () => {
        go(r[t], o)
    }
    , n)
}
function cr(e, t, n=se, r=!1) {
    if (n) {
        const o = n[e] || (n[e] = [])
          , i = t.__weh || (t.__weh = (...s) => {
            if (n.isUnmounted)
                return;
            jt(),
            Pt(n);
            const l = Ne(t, n, e, s);
            return ft(),
            Ft(),
            l
        }
        );
        return r ? o.unshift(i) : o.push(i),
        i
    }
}
const Ve = e => (t, n=se) => (!ln || e === "sp") && cr(e, (...r) => t(...r), n)
  , Lu = Ve("bm")
  , ke = Ve("m")
  , $u = Ve("bu")
  , ku = Ve("u")
  , Ys = Ve("bum")
  , Ke = Ve("um")
  , Hu = Ve("sp")
  , Bu = Ve("rtg")
  , Uu = Ve("rtc");
function Wu(e, t=se) {
    cr("ec", e, t)
}
function mp(e, t, n, r) {
    let o;
    const i = n && n[r];
    if (R(e) || ue(e)) {
        o = new Array(e.length);
        for (let s = 0, l = e.length; s < l; s++)
            o[s] = t(e[s], s, void 0, i && i[s])
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let s = 0; s < e; s++)
            o[s] = t(s + 1, s, void 0, i && i[s])
    } else if (re(e))
        if (e[Symbol.iterator])
            o = Array.from(e, (s, l) => t(s, l, void 0, i && i[l]));
        else {
            const s = Object.keys(e);
            o = new Array(s.length);
            for (let l = 0, c = s.length; l < c; l++) {
                const u = s[l];
                o[l] = t(e[u], u, l, i && i[l])
            }
        }
    else
        o = [];
    return n && (n[r] = o),
    o
}
function vp(e, t, n={}, r, o) {
    if (ce.isCE || ce.parent && Qt(ce.parent) && ce.parent.isCE)
        return t !== "default" && (n.name = t),
        ge("slot", n, r && r());
    let i = e[t];
    i && i._c && (i._d = !1),
    ll();
    const s = i && Xs(i(n))
      , l = ul(Ce, {
        key: n.key || s && s.key || `_${t}`
    }, s || (r ? r() : []), s && e._ === 1 ? 64 : -2);
    return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    l
}
function Xs(e) {
    return e.some(t => Kn(t) ? !(t.type === Ze || t.type === Ce && !Xs(t.children)) : !0) ? e : null
}
const Hr = e => e ? dl(e) ? dr(e) || e.proxy : Hr(e.parent) : null
  , Gt = de(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Hr(e.parent),
    $root: e => Hr(e.root),
    $emit: e => e.emit,
    $options: e => Fo(e),
    $forceUpdate: e => e.f || (e.f = () => Po(e.update)),
    $nextTick: e => e.n || (e.n = sr.bind(e.proxy)),
    $watch: e => Du.bind(e)
})
  , Cr = (e, t) => e !== ne && !e.__isScriptSetup && q(e, t)
  , Ku = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: o, props: i, accessCache: s, type: l, appContext: c} = e;
        let u;
        if (t[0] !== "$") {
            const m = s[t];
            if (m !== void 0)
                switch (m) {
                case 1:
                    return r[t];
                case 2:
                    return o[t];
                case 4:
                    return n[t];
                case 3:
                    return i[t]
                }
            else {
                if (Cr(r, t))
                    return s[t] = 1,
                    r[t];
                if (o !== ne && q(o, t))
                    return s[t] = 2,
                    o[t];
                if ((u = e.propsOptions[0]) && q(u, t))
                    return s[t] = 3,
                    i[t];
                if (n !== ne && q(n, t))
                    return s[t] = 4,
                    n[t];
                Br && (s[t] = 0)
            }
        }
        const a = Gt[t];
        let h, p;
        if (a)
            return t === "$attrs" && we(e, "get", t),
            a(e);
        if ((h = l.__cssModules) && (h = h[t]))
            return h;
        if (n !== ne && q(n, t))
            return s[t] = 4,
            n[t];
        if (p = c.config.globalProperties,
        q(p, t))
            return p[t]
    },
    set({_: e}, t, n) {
        const {data: r, setupState: o, ctx: i} = e;
        return Cr(o, t) ? (o[t] = n,
        !0) : r !== ne && q(r, t) ? (r[t] = n,
        !0) : q(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (i[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i}}, s) {
        let l;
        return !!n[s] || e !== ne && q(e, s) || Cr(t, s) || (l = i[0]) && q(l, s) || q(r, s) || q(Gt, s) || q(o.config.globalProperties, s)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : q(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
function pi(e) {
    return R(e) ? e.reduce( (t, n) => (t[n] = null,
    t), {}) : e
}
let Br = !0;
function Vu(e) {
    const t = Fo(e)
      , n = e.proxy
      , r = e.ctx;
    Br = !1,
    t.beforeCreate && gi(t.beforeCreate, e, "bc");
    const {data: o, computed: i, methods: s, watch: l, provide: c, inject: u, created: a, beforeMount: h, mounted: p, beforeUpdate: m, updated: _, activated: w, deactivated: O, beforeDestroy: L, beforeUnmount: j, destroyed: H, unmounted: C, render: K, renderTracked: S, renderTriggered: F, errorCaptured: $, serverPrefetch: te, expose: P, inheritAttrs: G, components: he, directives: wt, filters: Rt} = t;
    if (u && qu(u, r, null),
    s)
        for (const Y in s) {
            const X = s[Y];
            k(X) && (r[Y] = X.bind(n))
        }
    if (o) {
        const Y = o.call(n, n);
        re(Y) && (e.data = rr(Y))
    }
    if (Br = !0,
    i)
        for (const Y in i) {
            const X = i[Y]
              , Be = k(X) ? X.bind(n, n) : k(X.get) ? X.get.bind(n, n) : Me
              , _t = !k(X) && k(X.set) ? X.set.bind(n) : Me
              , V = W({
                get: Be,
                set: _t
            });
            Object.defineProperty(r, Y, {
                enumerable: !0,
                configurable: !0,
                get: () => V.value,
                set: Q => V.value = Q
            })
        }
    if (l)
        for (const Y in l)
            Zs(l[Y], r, n, Y);
    if (c) {
        const Y = k(c) ? c.call(n) : c;
        Reflect.ownKeys(Y).forEach(X => {
            bt(X, Y[X])
        }
        )
    }
    a && gi(a, e, "c");
    function oe(Y, X) {
        R(X) ? X.forEach(Be => Y(Be.bind(n))) : X && Y(X.bind(n))
    }
    if (oe(Lu, h),
    oe(ke, p),
    oe($u, m),
    oe(ku, _),
    oe(Js, w),
    oe(Qs, O),
    oe(Wu, $),
    oe(Uu, S),
    oe(Bu, F),
    oe(Ys, j),
    oe(Ke, C),
    oe(Hu, te),
    R(P))
        if (P.length) {
            const Y = e.exposed || (e.exposed = {});
            P.forEach(X => {
                Object.defineProperty(Y, X, {
                    get: () => n[X],
                    set: Be => n[X] = Be
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    K && e.render === Me && (e.render = K),
    G != null && (e.inheritAttrs = G),
    he && (e.components = he),
    wt && (e.directives = wt)
}
function qu(e, t, n=Me) {
    R(e) && (e = Ur(e));
    for (const r in e) {
        const o = e[r];
        let i;
        re(o) ? "default"in o ? i = be(o.from || r, o.default, !0) : i = be(o.from || r) : i = be(o),
        ae(i) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: s => i.value = s
        }) : t[r] = i
    }
}
function gi(e, t, n) {
    Ne(R(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Zs(e, t, n, r) {
    const o = r.includes(".") ? qs(n, r) : () => n[r];
    if (ue(e)) {
        const i = t[e];
        k(i) && Ae(o, i)
    } else if (k(e))
        Ae(o, e.bind(n));
    else if (re(e))
        if (R(e))
            e.forEach(i => Zs(i, t, n, r));
        else {
            const i = k(e.handler) ? e.handler.bind(n) : t[e.handler];
            k(i) && Ae(o, i, e)
        }
}
function Fo(e) {
    const t = e.type
      , {mixins: n, extends: r} = t
      , {mixins: o, optionsCache: i, config: {optionMergeStrategies: s}} = e.appContext
      , l = i.get(t);
    let c;
    return l ? c = l : !o.length && !n && !r ? c = t : (c = {},
    o.length && o.forEach(u => Un(c, u, s, !0)),
    Un(c, t, s)),
    re(t) && i.set(t, c),
    c
}
function Un(e, t, n, r=!1) {
    const {mixins: o, extends: i} = t;
    i && Un(e, i, n, !0),
    o && o.forEach(s => Un(e, s, n, !0));
    for (const s in t)
        if (!(r && s === "expose")) {
            const l = zu[s] || n && n[s];
            e[s] = l ? l(e[s], t[s]) : t[s]
        }
    return e
}
const zu = {
    data: mi,
    props: vi,
    emits: vi,
    methods: qt,
    computed: qt,
    beforeCreate: pe,
    created: pe,
    beforeMount: pe,
    mounted: pe,
    beforeUpdate: pe,
    updated: pe,
    beforeDestroy: pe,
    beforeUnmount: pe,
    destroyed: pe,
    unmounted: pe,
    activated: pe,
    deactivated: pe,
    errorCaptured: pe,
    serverPrefetch: pe,
    components: qt,
    directives: qt,
    watch: Qu,
    provide: mi,
    inject: Ju
};
function mi(e, t) {
    return t ? e ? function() {
        return de(k(e) ? e.call(this, this) : e, k(t) ? t.call(this, this) : t)
    }
    : t : e
}
function Ju(e, t) {
    return qt(Ur(e), Ur(t))
}
function Ur(e) {
    if (R(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function pe(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function qt(e, t) {
    return e ? de(Object.create(null), e, t) : t
}
function vi(e, t) {
    return e ? R(e) && R(t) ? [...new Set([...e, ...t])] : de(Object.create(null), pi(e), pi(t ?? {})) : t
}
function Qu(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = de(Object.create(null), e);
    for (const r in t)
        n[r] = pe(e[r], t[r]);
    return n
}
function el() {
    return {
        app: null,
        config: {
            isNativeTag: Pc,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Gu = 0;
function Yu(e, t) {
    return function(r, o=null) {
        k(r) || (r = de({}, r)),
        o != null && !re(o) && (o = null);
        const i = el()
          , s = new WeakSet;
        let l = !1;
        const c = i.app = {
            _uid: Gu++,
            _component: r,
            _props: o,
            _container: null,
            _context: i,
            _instance: null,
            version: Sa,
            get config() {
                return i.config
            },
            set config(u) {},
            use(u, ...a) {
                return s.has(u) || (u && k(u.install) ? (s.add(u),
                u.install(c, ...a)) : k(u) && (s.add(u),
                u(c, ...a))),
                c
            },
            mixin(u) {
                return i.mixins.includes(u) || i.mixins.push(u),
                c
            },
            component(u, a) {
                return a ? (i.components[u] = a,
                c) : i.components[u]
            },
            directive(u, a) {
                return a ? (i.directives[u] = a,
                c) : i.directives[u]
            },
            mount(u, a, h) {
                if (!l) {
                    const p = ge(r, o);
                    return p.appContext = i,
                    a && t ? t(p, u) : e(p, u, h),
                    l = !0,
                    c._container = u,
                    u.__vue_app__ = c,
                    dr(p.component) || p.component.proxy
                }
            },
            unmount() {
                l && (e(null, c._container),
                delete c._container.__vue_app__)
            },
            provide(u, a) {
                return i.provides[u] = a,
                c
            },
            runWithContext(u) {
                Wn = c;
                try {
                    return u()
                } finally {
                    Wn = null
                }
            }
        };
        return c
    }
}
let Wn = null;
function bt(e, t) {
    if (se) {
        let n = se.provides;
        const r = se.parent && se.parent.provides;
        r === n && (n = se.provides = Object.create(r)),
        n[e] = t
    }
}
function be(e, t, n=!1) {
    const r = se || ce;
    if (r || Wn) {
        const o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Wn._context.provides;
        if (o && e in o)
            return o[e];
        if (arguments.length > 1)
            return n && k(t) ? t.call(r && r.proxy) : t
    }
}
function Xu(e, t, n, r=!1) {
    const o = {}
      , i = {};
    $n(i, ar, 1),
    e.propsDefaults = Object.create(null),
    tl(e, t, o, i);
    for (const s in e.propsOptions[0])
        s in o || (o[s] = void 0);
    n ? e.props = r ? o : au(o) : e.type.props ? e.props = o : e.props = i,
    e.attrs = i
}
function Zu(e, t, n, r) {
    const {props: o, attrs: i, vnode: {patchFlag: s}} = e
      , l = J(o)
      , [c] = e.propsOptions;
    let u = !1;
    if ((r || s > 0) && !(s & 16)) {
        if (s & 8) {
            const a = e.vnode.dynamicProps;
            for (let h = 0; h < a.length; h++) {
                let p = a[h];
                if (lr(e.emitsOptions, p))
                    continue;
                const m = t[p];
                if (c)
                    if (q(i, p))
                        m !== i[p] && (i[p] = m,
                        u = !0);
                    else {
                        const _ = $e(p);
                        o[_] = Wr(c, l, _, m, e, !1)
                    }
                else
                    m !== i[p] && (i[p] = m,
                    u = !0)
            }
        }
    } else {
        tl(e, t, o, i) && (u = !0);
        let a;
        for (const h in l)
            (!t || !q(t, h) && ((a = tr(h)) === h || !q(t, a))) && (c ? n && (n[h] !== void 0 || n[a] !== void 0) && (o[h] = Wr(c, l, h, void 0, e, !0)) : delete o[h]);
        if (i !== l)
            for (const h in i)
                (!t || !q(t, h)) && (delete i[h],
                u = !0)
    }
    u && We(e, "set", "$attrs")
}
function tl(e, t, n, r) {
    const [o,i] = e.propsOptions;
    let s = !1, l;
    if (t)
        for (let c in t) {
            if (Nn(c))
                continue;
            const u = t[c];
            let a;
            o && q(o, a = $e(c)) ? !i || !i.includes(a) ? n[a] = u : (l || (l = {}))[a] = u : lr(e.emitsOptions, c) || (!(c in r) || u !== r[c]) && (r[c] = u,
            s = !0)
        }
    if (i) {
        const c = J(n)
          , u = l || ne;
        for (let a = 0; a < i.length; a++) {
            const h = i[a];
            n[h] = Wr(o, c, h, u[h], e, !q(u, h))
        }
    }
    return s
}
function Wr(e, t, n, r, o, i) {
    const s = e[n];
    if (s != null) {
        const l = q(s, "default");
        if (l && r === void 0) {
            const c = s.default;
            if (s.type !== Function && !s.skipFactory && k(c)) {
                const {propsDefaults: u} = o;
                n in u ? r = u[n] : (Pt(o),
                r = u[n] = c.call(null, t),
                ft())
            } else
                r = c
        }
        s[0] && (i && !l ? r = !1 : s[1] && (r === "" || r === tr(n)) && (r = !0))
    }
    return r
}
function nl(e, t, n=!1) {
    const r = t.propsCache
      , o = r.get(e);
    if (o)
        return o;
    const i = e.props
      , s = {}
      , l = [];
    let c = !1;
    if (!k(e)) {
        const a = h => {
            c = !0;
            const [p,m] = nl(h, t, !0);
            de(s, p),
            m && l.push(...m)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(a),
        e.extends && a(e.extends),
        e.mixins && e.mixins.forEach(a)
    }
    if (!i && !c)
        return re(e) && r.set(e, Ct),
        Ct;
    if (R(i))
        for (let a = 0; a < i.length; a++) {
            const h = $e(i[a]);
            bi(h) && (s[h] = ne)
        }
    else if (i)
        for (const a in i) {
            const h = $e(a);
            if (bi(h)) {
                const p = i[a]
                  , m = s[h] = R(p) || k(p) ? {
                    type: p
                } : de({}, p);
                if (m) {
                    const _ = _i(Boolean, m.type)
                      , w = _i(String, m.type);
                    m[0] = _ > -1,
                    m[1] = w < 0 || _ < w,
                    (_ > -1 || q(m, "default")) && l.push(h)
                }
            }
        }
    const u = [s, l];
    return re(e) && r.set(e, u),
    u
}
function bi(e) {
    return e[0] !== "$"
}
function yi(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function wi(e, t) {
    return yi(e) === yi(t)
}
function _i(e, t) {
    return R(t) ? t.findIndex(n => wi(n, e)) : k(t) && wi(t, e) ? 0 : -1
}
const rl = e => e[0] === "_" || e === "$stable"
  , Do = e => R(e) ? e.map(De) : [De(e)]
  , ea = (e, t, n) => {
    if (t._n)
        return t;
    const r = Su( (...o) => Do(t(...o)), n);
    return r._c = !1,
    r
}
  , ol = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
        if (rl(o))
            continue;
        const i = e[o];
        if (k(i))
            t[o] = ea(o, i, r);
        else if (i != null) {
            const s = Do(i);
            t[o] = () => s
        }
    }
}
  , il = (e, t) => {
    const n = Do(t);
    e.slots.default = () => n
}
  , ta = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = J(t),
        $n(t, "_", n)) : ol(t, e.slots = {})
    } else
        e.slots = {},
        t && il(e, t);
    $n(e.slots, ar, 1)
}
  , na = (e, t, n) => {
    const {vnode: r, slots: o} = e;
    let i = !0
      , s = ne;
    if (r.shapeFlag & 32) {
        const l = t._;
        l ? n && l === 1 ? i = !1 : (de(o, t),
        !n && l === 1 && delete o._) : (i = !t.$stable,
        ol(t, o)),
        s = t
    } else
        t && (il(e, t),
        s = {
            default: 1
        });
    if (i)
        for (const l in o)
            !rl(l) && s[l] == null && delete o[l]
}
;
function Kr(e, t, n, r, o=!1) {
    if (R(e)) {
        e.forEach( (p, m) => Kr(p, t && (R(t) ? t[m] : t), n, r, o));
        return
    }
    if (Qt(r) && !o)
        return;
    const i = r.shapeFlag & 4 ? dr(r.component) || r.component.proxy : r.el
      , s = o ? null : i
      , {i: l, r: c} = e
      , u = t && t.r
      , a = l.refs === ne ? l.refs = {} : l.refs
      , h = l.setupState;
    if (u != null && u !== c && (ue(u) ? (a[u] = null,
    q(h, u) && (h[u] = null)) : ae(u) && (u.value = null)),
    k(c))
        Ye(c, l, 12, [s, a]);
    else {
        const p = ue(c)
          , m = ae(c);
        if (p || m) {
            const _ = () => {
                if (e.f) {
                    const w = p ? q(h, c) ? h[c] : a[c] : c.value;
                    o ? R(w) && go(w, i) : R(w) ? w.includes(i) || w.push(i) : p ? (a[c] = [i],
                    q(h, c) && (h[c] = a[c])) : (c.value = [i],
                    e.k && (a[e.k] = c.value))
                } else
                    p ? (a[c] = s,
                    q(h, c) && (h[c] = s)) : m && (c.value = s,
                    e.k && (a[e.k] = s))
            }
            ;
            s ? (_.id = -1,
            ve(_, n)) : _()
        }
    }
}
const ve = Fu;
function ra(e) {
    return oa(e)
}
function oa(e, t) {
    const n = Dr();
    n.__VUE__ = !0;
    const {insert: r, remove: o, patchProp: i, createElement: s, createText: l, createComment: c, setText: u, setElementText: a, parentNode: h, nextSibling: p, setScopeId: m=Me, insertStaticContent: _} = e
      , w = (f, d, g, v=null, b=null, E=null, A=!1, T=null, x=!!d.dynamicChildren) => {
        if (f === d)
            return;
        f && !kt(f, d) && (v = gn(f),
        Q(f, b, E, !0),
        f = null),
        d.patchFlag === -2 && (x = !1,
        d.dynamicChildren = null);
        const {type: y, ref: M, shapeFlag: I} = d;
        switch (y) {
        case ur:
            O(f, d, g, v);
            break;
        case Ze:
            L(f, d, g, v);
            break;
        case jn:
            f == null && j(d, g, v, A);
            break;
        case Ce:
            he(f, d, g, v, b, E, A, T, x);
            break;
        default:
            I & 1 ? K(f, d, g, v, b, E, A, T, x) : I & 6 ? wt(f, d, g, v, b, E, A, T, x) : (I & 64 || I & 128) && y.process(f, d, g, v, b, E, A, T, x, Tt)
        }
        M != null && b && Kr(M, f && f.ref, E, d || f, !d)
    }
      , O = (f, d, g, v) => {
        if (f == null)
            r(d.el = l(d.children), g, v);
        else {
            const b = d.el = f.el;
            d.children !== f.children && u(b, d.children)
        }
    }
      , L = (f, d, g, v) => {
        f == null ? r(d.el = c(d.children || ""), g, v) : d.el = f.el
    }
      , j = (f, d, g, v) => {
        [f.el,f.anchor] = _(f.children, d, g, v, f.el, f.anchor)
    }
      , H = ({el: f, anchor: d}, g, v) => {
        let b;
        for (; f && f !== d; )
            b = p(f),
            r(f, g, v),
            f = b;
        r(d, g, v)
    }
      , C = ({el: f, anchor: d}) => {
        let g;
        for (; f && f !== d; )
            g = p(f),
            o(f),
            f = g;
        o(d)
    }
      , K = (f, d, g, v, b, E, A, T, x) => {
        A = A || d.type === "svg",
        f == null ? S(d, g, v, b, E, A, T, x) : te(f, d, b, E, A, T, x)
    }
      , S = (f, d, g, v, b, E, A, T) => {
        let x, y;
        const {type: M, props: I, shapeFlag: N, transition: D, dirs: U} = f;
        if (x = f.el = s(f.type, E, I && I.is, I),
        N & 8 ? a(x, f.children) : N & 16 && $(f.children, x, null, v, b, E && M !== "foreignObject", A, T),
        U && rt(f, null, v, "created"),
        F(x, f, f.scopeId, A, v),
        I) {
            for (const Z in I)
                Z !== "value" && !Nn(Z) && i(x, Z, null, I[Z], E, f.children, v, b, me);
            "value"in I && i(x, "value", null, I.value),
            (y = I.onVnodeBeforeMount) && Fe(y, v, f)
        }
        U && rt(f, null, v, "beforeMount");
        const ee = ia(b, D);
        ee && D.beforeEnter(x),
        r(x, d, g),
        ((y = I && I.onVnodeMounted) || ee || U) && ve( () => {
            y && Fe(y, v, f),
            ee && D.enter(x),
            U && rt(f, null, v, "mounted")
        }
        , b)
    }
      , F = (f, d, g, v, b) => {
        if (g && m(f, g),
        v)
            for (let E = 0; E < v.length; E++)
                m(f, v[E]);
        if (b) {
            let E = b.subTree;
            if (d === E) {
                const A = b.vnode;
                F(f, A, A.scopeId, A.slotScopeIds, b.parent)
            }
        }
    }
      , $ = (f, d, g, v, b, E, A, T, x=0) => {
        for (let y = x; y < f.length; y++) {
            const M = f[y] = T ? Je(f[y]) : De(f[y]);
            w(null, M, d, g, v, b, E, A, T)
        }
    }
      , te = (f, d, g, v, b, E, A) => {
        const T = d.el = f.el;
        let {patchFlag: x, dynamicChildren: y, dirs: M} = d;
        x |= f.patchFlag & 16;
        const I = f.props || ne
          , N = d.props || ne;
        let D;
        g && ot(g, !1),
        (D = N.onVnodeBeforeUpdate) && Fe(D, g, d, f),
        M && rt(d, f, g, "beforeUpdate"),
        g && ot(g, !0);
        const U = b && d.type !== "foreignObject";
        if (y ? P(f.dynamicChildren, y, T, g, v, U, E) : A || X(f, d, T, null, g, v, U, E, !1),
        x > 0) {
            if (x & 16)
                G(T, d, I, N, g, v, b);
            else if (x & 2 && I.class !== N.class && i(T, "class", null, N.class, b),
            x & 4 && i(T, "style", I.style, N.style, b),
            x & 8) {
                const ee = d.dynamicProps;
                for (let Z = 0; Z < ee.length; Z++) {
                    const ie = ee[Z]
                      , Oe = I[ie]
                      , Et = N[ie];
                    (Et !== Oe || ie === "value") && i(T, ie, Oe, Et, b, f.children, g, v, me)
                }
            }
            x & 1 && f.children !== d.children && a(T, d.children)
        } else
            !A && y == null && G(T, d, I, N, g, v, b);
        ((D = N.onVnodeUpdated) || M) && ve( () => {
            D && Fe(D, g, d, f),
            M && rt(d, f, g, "updated")
        }
        , v)
    }
      , P = (f, d, g, v, b, E, A) => {
        for (let T = 0; T < d.length; T++) {
            const x = f[T]
              , y = d[T]
              , M = x.el && (x.type === Ce || !kt(x, y) || x.shapeFlag & 70) ? h(x.el) : g;
            w(x, y, M, null, v, b, E, A, !0)
        }
    }
      , G = (f, d, g, v, b, E, A) => {
        if (g !== v) {
            if (g !== ne)
                for (const T in g)
                    !Nn(T) && !(T in v) && i(f, T, g[T], null, A, d.children, b, E, me);
            for (const T in v) {
                if (Nn(T))
                    continue;
                const x = v[T]
                  , y = g[T];
                x !== y && T !== "value" && i(f, T, y, x, A, d.children, b, E, me)
            }
            "value"in v && i(f, "value", g.value, v.value)
        }
    }
      , he = (f, d, g, v, b, E, A, T, x) => {
        const y = d.el = f ? f.el : l("")
          , M = d.anchor = f ? f.anchor : l("");
        let {patchFlag: I, dynamicChildren: N, slotScopeIds: D} = d;
        D && (T = T ? T.concat(D) : D),
        f == null ? (r(y, g, v),
        r(M, g, v),
        $(d.children, g, M, b, E, A, T, x)) : I > 0 && I & 64 && N && f.dynamicChildren ? (P(f.dynamicChildren, N, g, b, E, A, T),
        (d.key != null || b && d === b.subTree) && Ro(f, d, !0)) : X(f, d, g, M, b, E, A, T, x)
    }
      , wt = (f, d, g, v, b, E, A, T, x) => {
        d.slotScopeIds = T,
        f == null ? d.shapeFlag & 512 ? b.ctx.activate(d, g, v, A, x) : Rt(d, g, v, b, E, A, x) : pn(f, d, x)
    }
      , Rt = (f, d, g, v, b, E, A) => {
        const T = f.component = ba(f, v, b);
        if (zs(f) && (T.ctx.renderer = Tt),
        ya(T),
        T.asyncDep) {
            if (b && b.registerDep(T, oe),
            !f.el) {
                const x = T.subTree = ge(Ze);
                L(null, x, d, g)
            }
            return
        }
        oe(T, f, d, g, b, E, A)
    }
      , pn = (f, d, g) => {
        const v = d.component = f.component;
        if (Pu(f, d, g))
            if (v.asyncDep && !v.asyncResolved) {
                Y(v, d, g);
                return
            } else
                v.next = d,
                Eu(v.update),
                v.update();
        else
            d.el = f.el,
            v.vnode = d
    }
      , oe = (f, d, g, v, b, E, A) => {
        const T = () => {
            if (f.isMounted) {
                let {next: M, bu: I, u: N, parent: D, vnode: U} = f, ee = M, Z;
                ot(f, !1),
                M ? (M.el = U.el,
                Y(f, M, A)) : M = U,
                I && Tr(I),
                (Z = M.props && M.props.onVnodeBeforeUpdate) && Fe(Z, D, M, U),
                ot(f, !0);
                const ie = xr(f)
                  , Oe = f.subTree;
                f.subTree = ie,
                w(Oe, ie, h(Oe.el), gn(Oe), f, b, E),
                M.el = ie.el,
                ee === null && Mu(f, ie.el),
                N && ve(N, b),
                (Z = M.props && M.props.onVnodeUpdated) && ve( () => Fe(Z, D, M, U), b)
            } else {
                let M;
                const {el: I, props: N} = d
                  , {bm: D, m: U, parent: ee} = f
                  , Z = Qt(d);
                if (ot(f, !1),
                D && Tr(D),
                !Z && (M = N && N.onVnodeBeforeMount) && Fe(M, ee, d),
                ot(f, !0),
                I && wr) {
                    const ie = () => {
                        f.subTree = xr(f),
                        wr(I, f.subTree, f, b, null)
                    }
                    ;
                    Z ? d.type.__asyncLoader().then( () => !f.isUnmounted && ie()) : ie()
                } else {
                    const ie = f.subTree = xr(f);
                    w(null, ie, g, v, f, b, E),
                    d.el = ie.el
                }
                if (U && ve(U, b),
                !Z && (M = N && N.onVnodeMounted)) {
                    const ie = d;
                    ve( () => Fe(M, ee, ie), b)
                }
                (d.shapeFlag & 256 || ee && Qt(ee.vnode) && ee.vnode.shapeFlag & 256) && f.a && ve(f.a, b),
                f.isMounted = !0,
                d = g = v = null
            }
        }
          , x = f.effect = new _o(T, () => Po(y),f.scope)
          , y = f.update = () => x.run();
        y.id = f.uid,
        ot(f, !0),
        y()
    }
      , Y = (f, d, g) => {
        d.component = f;
        const v = f.vnode.props;
        f.vnode = d,
        f.next = null,
        Zu(f, d.props, v, g),
        na(f, d.children, g),
        jt(),
        fi(f),
        Ft()
    }
      , X = (f, d, g, v, b, E, A, T, x=!1) => {
        const y = f && f.children
          , M = f ? f.shapeFlag : 0
          , I = d.children
          , {patchFlag: N, shapeFlag: D} = d;
        if (N > 0) {
            if (N & 128) {
                _t(y, I, g, v, b, E, A, T, x);
                return
            } else if (N & 256) {
                Be(y, I, g, v, b, E, A, T, x);
                return
            }
        }
        D & 8 ? (M & 16 && me(y, b, E),
        I !== y && a(g, I)) : M & 16 ? D & 16 ? _t(y, I, g, v, b, E, A, T, x) : me(y, b, E, !0) : (M & 8 && a(g, ""),
        D & 16 && $(I, g, v, b, E, A, T, x))
    }
      , Be = (f, d, g, v, b, E, A, T, x) => {
        f = f || Ct,
        d = d || Ct;
        const y = f.length
          , M = d.length
          , I = Math.min(y, M);
        let N;
        for (N = 0; N < I; N++) {
            const D = d[N] = x ? Je(d[N]) : De(d[N]);
            w(f[N], D, g, null, b, E, A, T, x)
        }
        y > M ? me(f, b, E, !0, !1, I) : $(d, g, v, b, E, A, T, x, I)
    }
      , _t = (f, d, g, v, b, E, A, T, x) => {
        let y = 0;
        const M = d.length;
        let I = f.length - 1
          , N = M - 1;
        for (; y <= I && y <= N; ) {
            const D = f[y]
              , U = d[y] = x ? Je(d[y]) : De(d[y]);
            if (kt(D, U))
                w(D, U, g, null, b, E, A, T, x);
            else
                break;
            y++
        }
        for (; y <= I && y <= N; ) {
            const D = f[I]
              , U = d[N] = x ? Je(d[N]) : De(d[N]);
            if (kt(D, U))
                w(D, U, g, null, b, E, A, T, x);
            else
                break;
            I--,
            N--
        }
        if (y > I) {
            if (y <= N) {
                const D = N + 1
                  , U = D < M ? d[D].el : v;
                for (; y <= N; )
                    w(null, d[y] = x ? Je(d[y]) : De(d[y]), g, U, b, E, A, T, x),
                    y++
            }
        } else if (y > N)
            for (; y <= I; )
                Q(f[y], b, E, !0),
                y++;
        else {
            const D = y
              , U = y
              , ee = new Map;
            for (y = U; y <= N; y++) {
                const Te = d[y] = x ? Je(d[y]) : De(d[y]);
                Te.key != null && ee.set(Te.key, y)
            }
            let Z, ie = 0;
            const Oe = N - U + 1;
            let Et = !1
              , ei = 0;
            const $t = new Array(Oe);
            for (y = 0; y < Oe; y++)
                $t[y] = 0;
            for (y = D; y <= I; y++) {
                const Te = f[y];
                if (ie >= Oe) {
                    Q(Te, b, E, !0);
                    continue
                }
                let je;
                if (Te.key != null)
                    je = ee.get(Te.key);
                else
                    for (Z = U; Z <= N; Z++)
                        if ($t[Z - U] === 0 && kt(Te, d[Z])) {
                            je = Z;
                            break
                        }
                je === void 0 ? Q(Te, b, E, !0) : ($t[je - U] = y + 1,
                je >= ei ? ei = je : Et = !0,
                w(Te, d[je], g, null, b, E, A, T, x),
                ie++)
            }
            const ti = Et ? sa($t) : Ct;
            for (Z = ti.length - 1,
            y = Oe - 1; y >= 0; y--) {
                const Te = U + y
                  , je = d[Te]
                  , ni = Te + 1 < M ? d[Te + 1].el : v;
                $t[y] === 0 ? w(null, je, g, ni, b, E, A, T, x) : Et && (Z < 0 || y !== ti[Z] ? V(je, g, ni, 2) : Z--)
            }
        }
    }
      , V = (f, d, g, v, b=null) => {
        const {el: E, type: A, transition: T, children: x, shapeFlag: y} = f;
        if (y & 6) {
            V(f.component.subTree, d, g, v);
            return
        }
        if (y & 128) {
            f.suspense.move(d, g, v);
            return
        }
        if (y & 64) {
            A.move(f, d, g, Tt);
            return
        }
        if (A === Ce) {
            r(E, d, g);
            for (let I = 0; I < x.length; I++)
                V(x[I], d, g, v);
            r(f.anchor, d, g);
            return
        }
        if (A === jn) {
            H(f, d, g);
            return
        }
        if (v !== 2 && y & 1 && T)
            if (v === 0)
                T.beforeEnter(E),
                r(E, d, g),
                ve( () => T.enter(E), b);
            else {
                const {leave: I, delayLeave: N, afterLeave: D} = T
                  , U = () => r(E, d, g)
                  , ee = () => {
                    I(E, () => {
                        U(),
                        D && D()
                    }
                    )
                }
                ;
                N ? N(E, U, ee) : ee()
            }
        else
            r(E, d, g)
    }
      , Q = (f, d, g, v=!1, b=!1) => {
        const {type: E, props: A, ref: T, children: x, dynamicChildren: y, shapeFlag: M, patchFlag: I, dirs: N} = f;
        if (T != null && Kr(T, null, g, f, !0),
        M & 256) {
            d.ctx.deactivate(f);
            return
        }
        const D = M & 1 && N
          , U = !Qt(f);
        let ee;
        if (U && (ee = A && A.onVnodeBeforeUnmount) && Fe(ee, d, f),
        M & 6)
            Lt(f.component, g, v);
        else {
            if (M & 128) {
                f.suspense.unmount(g, v);
                return
            }
            D && rt(f, null, d, "beforeUnmount"),
            M & 64 ? f.type.remove(f, d, g, b, Tt, v) : y && (E !== Ce || I > 0 && I & 64) ? me(y, d, g, !1, !0) : (E === Ce && I & 384 || !b && M & 16) && me(x, d, g),
            v && _e(f)
        }
        (U && (ee = A && A.onVnodeUnmounted) || D) && ve( () => {
            ee && Fe(ee, d, f),
            D && rt(f, null, d, "unmounted")
        }
        , g)
    }
      , _e = f => {
        const {type: d, el: g, anchor: v, transition: b} = f;
        if (d === Ce) {
            Se(g, v);
            return
        }
        if (d === jn) {
            C(f);
            return
        }
        const E = () => {
            o(g),
            b && !b.persisted && b.afterLeave && b.afterLeave()
        }
        ;
        if (f.shapeFlag & 1 && b && !b.persisted) {
            const {leave: A, delayLeave: T} = b
              , x = () => A(g, E);
            T ? T(f.el, E, x) : x()
        } else
            E()
    }
      , Se = (f, d) => {
        let g;
        for (; f !== d; )
            g = p(f),
            o(f),
            f = g;
        o(d)
    }
      , Lt = (f, d, g) => {
        const {bum: v, scope: b, update: E, subTree: A, um: T} = f;
        v && Tr(v),
        b.stop(),
        E && (E.active = !1,
        Q(A, f, d, g)),
        T && ve(T, d),
        ve( () => {
            f.isUnmounted = !0
        }
        , d),
        d && d.pendingBranch && !d.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === d.pendingId && (d.deps--,
        d.deps === 0 && d.resolve())
    }
      , me = (f, d, g, v=!1, b=!1, E=0) => {
        for (let A = E; A < f.length; A++)
            Q(f[A], d, g, v, b)
    }
      , gn = f => f.shapeFlag & 6 ? gn(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : p(f.anchor || f.el)
      , Zo = (f, d, g) => {
        f == null ? d._vnode && Q(d._vnode, null, null, !0) : w(d._vnode || null, f, d, null, null, null, g),
        fi(),
        Bs(),
        d._vnode = f
    }
      , Tt = {
        p: w,
        um: Q,
        m: V,
        r: _e,
        mt: Rt,
        mc: $,
        pc: X,
        pbc: P,
        n: gn,
        o: e
    };
    let yr, wr;
    return t && ([yr,wr] = t(Tt)),
    {
        render: Zo,
        hydrate: yr,
        createApp: Yu(Zo, yr)
    }
}
function ot({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function ia(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}
function Ro(e, t, n=!1) {
    const r = e.children
      , o = t.children;
    if (R(r) && R(o))
        for (let i = 0; i < r.length; i++) {
            const s = r[i];
            let l = o[i];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = Je(o[i]),
            l.el = s.el),
            n || Ro(s, l)),
            l.type === ur && (l.el = s.el)
        }
}
function sa(e) {
    const t = e.slice()
      , n = [0];
    let r, o, i, s, l;
    const c = e.length;
    for (r = 0; r < c; r++) {
        const u = e[r];
        if (u !== 0) {
            if (o = n[n.length - 1],
            e[o] < u) {
                t[r] = o,
                n.push(r);
                continue
            }
            for (i = 0,
            s = n.length - 1; i < s; )
                l = i + s >> 1,
                e[n[l]] < u ? i = l + 1 : s = l;
            u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]),
            n[i] = r)
        }
    }
    for (i = n.length,
    s = n[i - 1]; i-- > 0; )
        n[i] = s,
        s = t[s];
    return n
}
const la = e => e.__isTeleport
  , Yt = e => e && (e.disabled || e.disabled === "")
  , Ti = e => typeof SVGElement < "u" && e instanceof SVGElement
  , Vr = (e, t) => {
    const n = e && e.to;
    return ue(n) ? t ? t(n) : null : n
}
  , ca = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, n, r, o, i, s, l, c, u) {
        const {mc: a, pc: h, pbc: p, o: {insert: m, querySelector: _, createText: w, createComment: O}} = u
          , L = Yt(t.props);
        let {shapeFlag: j, children: H, dynamicChildren: C} = t;
        if (e == null) {
            const K = t.el = w("")
              , S = t.anchor = w("");
            m(K, n, r),
            m(S, n, r);
            const F = t.target = Vr(t.props, _)
              , $ = t.targetAnchor = w("");
            F && (m($, F),
            s = s || Ti(F));
            const te = (P, G) => {
                j & 16 && a(H, P, G, o, i, s, l, c)
            }
            ;
            L ? te(n, S) : F && te(F, $)
        } else {
            t.el = e.el;
            const K = t.anchor = e.anchor
              , S = t.target = e.target
              , F = t.targetAnchor = e.targetAnchor
              , $ = Yt(e.props)
              , te = $ ? n : S
              , P = $ ? K : F;
            if (s = s || Ti(S),
            C ? (p(e.dynamicChildren, C, te, o, i, s, l),
            Ro(e, t, !0)) : c || h(e, t, te, P, o, i, s, l, !1),
            L)
                $ ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Tn(t, n, K, u, 1);
            else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                const G = t.target = Vr(t.props, _);
                G && Tn(t, G, null, u, 0)
            } else
                $ && Tn(t, S, F, u, 1)
        }
        sl(t)
    },
    remove(e, t, n, r, {um: o, o: {remove: i}}, s) {
        const {shapeFlag: l, children: c, anchor: u, targetAnchor: a, target: h, props: p} = e;
        if (h && i(a),
        s && i(u),
        l & 16) {
            const m = s || !Yt(p);
            for (let _ = 0; _ < c.length; _++) {
                const w = c[_];
                o(w, t, n, m, !!w.dynamicChildren)
            }
        }
    },
    move: Tn,
    hydrate: ua
};
function Tn(e, t, n, {o: {insert: r}, m: o}, i=2) {
    i === 0 && r(e.targetAnchor, t, n);
    const {el: s, anchor: l, shapeFlag: c, children: u, props: a} = e
      , h = i === 2;
    if (h && r(s, t, n),
    (!h || Yt(a)) && c & 16)
        for (let p = 0; p < u.length; p++)
            o(u[p], t, n, 2);
    h && r(l, t, n)
}
function ua(e, t, n, r, o, i, {o: {nextSibling: s, parentNode: l, querySelector: c}}, u) {
    const a = t.target = Vr(t.props, c);
    if (a) {
        const h = a._lpa || a.firstChild;
        if (t.shapeFlag & 16)
            if (Yt(t.props))
                t.anchor = u(s(e), t, l(e), n, r, o, i),
                t.targetAnchor = h;
            else {
                t.anchor = s(e);
                let p = h;
                for (; p; )
                    if (p = s(p),
                    p && p.nodeType === 8 && p.data === "teleport anchor") {
                        t.targetAnchor = p,
                        a._lpa = t.targetAnchor && s(t.targetAnchor);
                        break
                    }
                u(h, t, a, n, r, o, i)
            }
        sl(t)
    }
    return t.anchor && s(t.anchor)
}
const aa = ca;
function sl(e) {
    const t = e.ctx;
    if (t && t.ut) {
        let n = e.children[0].el;
        for (; n && n !== e.targetAnchor; )
            n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
            n = n.nextSibling;
        t.ut()
    }
}
const Ce = Symbol.for("v-fgt")
  , ur = Symbol.for("v-txt")
  , Ze = Symbol.for("v-cmt")
  , jn = Symbol.for("v-stc")
  , Xt = [];
let Pe = null;
function ll(e=!1) {
    Xt.push(Pe = e ? null : [])
}
function fa() {
    Xt.pop(),
    Pe = Xt[Xt.length - 1] || null
}
let sn = 1;
function Ei(e) {
    sn += e
}
function cl(e) {
    return e.dynamicChildren = sn > 0 ? Pe || Ct : null,
    fa(),
    sn > 0 && Pe && Pe.push(e),
    e
}
function bp(e, t, n, r, o, i) {
    return cl(fl(e, t, n, r, o, i, !0))
}
function ul(e, t, n, r, o) {
    return cl(ge(e, t, n, r, o, !0))
}
function Kn(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function kt(e, t) {
    return e.type === t.type && e.key === t.key
}
const ar = "__vInternal"
  , al = ({key: e}) => e ?? null
  , Fn = ({ref: e, ref_key: t, ref_for: n}) => (typeof e == "number" && (e = "" + e),
e != null ? ue(e) || ae(e) || k(e) ? {
    i: ce,
    r: e,
    k: t,
    f: !!n
} : e : null);
function fl(e, t=null, n=null, r=0, o=null, i=e === Ce ? 0 : 1, s=!1, l=!1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && al(t),
        ref: t && Fn(t),
        scopeId: Ks,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: ce
    };
    return l ? (Lo(c, n),
    i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ue(n) ? 8 : 16),
    sn > 0 && !s && Pe && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Pe.push(c),
    c
}
const ge = da;
function da(e, t=null, n=null, r=0, o=null, i=!1) {
    if ((!e || e === Vs) && (e = Ze),
    Kn(e)) {
        const l = gt(e, t, !0);
        return n && Lo(l, n),
        sn > 0 && !i && Pe && (l.shapeFlag & 6 ? Pe[Pe.indexOf(e)] = l : Pe.push(l)),
        l.patchFlag |= -2,
        l
    }
    if (xa(e) && (e = e.__vccOpts),
    t) {
        t = ha(t);
        let {class: l, style: c} = t;
        l && !ue(l) && (t.class = yo(l)),
        re(c) && (Ds(c) && !R(c) && (c = de({}, c)),
        t.style = bo(c))
    }
    const s = ue(e) ? 1 : ju(e) ? 128 : la(e) ? 64 : re(e) ? 4 : k(e) ? 2 : 0;
    return fl(e, t, n, r, o, s, i, !0)
}
function ha(e) {
    return e ? Ds(e) || ar in e ? de({}, e) : e : null
}
function gt(e, t, n=!1) {
    const {props: r, ref: o, patchFlag: i, children: s} = e
      , l = t ? ga(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && al(l),
        ref: t && t.ref ? n && o ? R(o) ? o.concat(Fn(t)) : [o, Fn(t)] : Fn(t) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: s,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Ce ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && gt(e.ssContent),
        ssFallback: e.ssFallback && gt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function pa(e=" ", t=0) {
    return ge(ur, null, e, t)
}
function yp(e, t) {
    const n = ge(jn, null, e);
    return n.staticCount = t,
    n
}
function wp(e="", t=!1) {
    return t ? (ll(),
    ul(Ze, null, e)) : ge(Ze, null, e)
}
function De(e) {
    return e == null || typeof e == "boolean" ? ge(Ze) : R(e) ? ge(Ce, null, e.slice()) : typeof e == "object" ? Je(e) : ge(ur, null, String(e))
}
function Je(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : gt(e)
}
function Lo(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (R(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1),
            Lo(e, o()),
            o._c && (o._d = !0));
            return
        } else {
            n = 32;
            const o = t._;
            !o && !(ar in t) ? t._ctx = ce : o === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        k(t) ? (t = {
            default: t,
            _ctx: ce
        },
        n = 32) : (t = String(t),
        r & 64 ? (n = 16,
        t = [pa(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function ga(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const o in r)
            if (o === "class")
                t.class !== r.class && (t.class = yo([t.class, r.class]));
            else if (o === "style")
                t.style = bo([t.style, r.style]);
            else if (po(o)) {
                const i = t[o]
                  , s = r[o];
                s && i !== s && !(R(i) && i.includes(s)) && (t[o] = i ? [].concat(i, s) : s)
            } else
                o !== "" && (t[o] = r[o])
    }
    return t
}
function Fe(e, t, n, r=null) {
    Ne(e, t, 7, [n, r])
}
const ma = el();
let va = 0;
function ba(e, t, n) {
    const r = e.type
      , o = (t ? t.appContext : e.appContext) || ma
      , i = {
        uid: va++,
        vnode: e,
        type: r,
        parent: t,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Hc(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(o.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: nl(r, o),
        emitsOptions: Ws(r, o),
        emit: null,
        emitted: null,
        propsDefaults: ne,
        inheritAttrs: r.inheritAttrs,
        ctx: ne,
        data: ne,
        props: ne,
        attrs: ne,
        slots: ne,
        refs: ne,
        setupState: ne,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return i.ctx = {
        _: i
    },
    i.root = t ? t.root : i,
    i.emit = Au.bind(null, i),
    e.ce && e.ce(i),
    i
}
let se = null;
const fr = () => se || ce;
let $o, xt, xi = "__VUE_INSTANCE_SETTERS__";
(xt = Dr()[xi]) || (xt = Dr()[xi] = []),
xt.push(e => se = e),
$o = e => {
    xt.length > 1 ? xt.forEach(t => t(e)) : xt[0](e)
}
;
const Pt = e => {
    $o(e),
    e.scope.on()
}
  , ft = () => {
    se && se.scope.off(),
    $o(null)
}
;
function dl(e) {
    return e.vnode.shapeFlag & 4
}
let ln = !1;
function ya(e, t=!1) {
    ln = t;
    const {props: n, children: r} = e.vnode
      , o = dl(e);
    Xu(e, n, o, t),
    ta(e, r);
    const i = o ? wa(e, t) : void 0;
    return ln = !1,
    i
}
function wa(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = Rs(new Proxy(e.ctx,Ku));
    const {setup: r} = n;
    if (r) {
        const o = e.setupContext = r.length > 1 ? Ta(e) : null;
        Pt(e),
        jt();
        const i = Ye(r, e, 0, [e.props, o]);
        if (Ft(),
        ft(),
        ws(i)) {
            if (i.then(ft, ft),
            t)
                return i.then(s => {
                    Ci(e, s, t)
                }
                ).catch(s => {
                    ir(s, e, 0)
                }
                );
            e.asyncDep = i
        } else
            Ci(e, i, t)
    } else
        hl(e, t)
}
function Ci(e, t, n) {
    k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = $s(t)),
    hl(e, n)
}
let Ai;
function hl(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Ai && !r.render) {
            const o = r.template || Fo(e).template;
            if (o) {
                const {isCustomElement: i, compilerOptions: s} = e.appContext.config
                  , {delimiters: l, compilerOptions: c} = r
                  , u = de(de({
                    isCustomElement: i,
                    delimiters: l
                }, s), c);
                r.render = Ai(o, u)
            }
        }
        e.render = r.render || Me
    }
    {
        Pt(e),
        jt();
        try {
            Vu(e)
        } finally {
            Ft(),
            ft()
        }
    }
}
function _a(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, n) {
            return we(e, "get", "$attrs"),
            t[n]
        }
    }))
}
function Ta(e) {
    const t = n => {
        e.exposed = n || {}
    }
    ;
    return {
        get attrs() {
            return _a(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function dr(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy($s(Rs(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in Gt)
                    return Gt[n](e)
            },
            has(t, n) {
                return n in t || n in Gt
            }
        }))
}
function Ea(e, t=!0) {
    return k(e) ? e.displayName || e.name : e.name || t && e.__name
}
function xa(e) {
    return k(e) && "__vccOpts"in e
}
const W = (e, t) => wu(e, t, ln);
function xe(e, t, n) {
    const r = arguments.length;
    return r === 2 ? re(t) && !R(t) ? Kn(t) ? ge(e, null, [t]) : ge(e, t) : ge(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Kn(n) && (n = [n]),
    ge(e, t, n))
}
const Ca = Symbol.for("v-scx")
  , Aa = () => be(Ca)
  , Sa = "3.3.13";
function Oa(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let o = 0; o < r.length; o++)
        n[r[o]] = !0;
    return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
}
const Ia = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
  , Pa = e => e.startsWith("onUpdate:")
  , Ma = Object.assign
  , pl = Array.isArray
  , gl = e => typeof e == "function"
  , Vn = e => typeof e == "string"
  , ml = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n))
}
  , Na = /\B([A-Z])/g
  , vl = ml(e => e.replace(Na, "-$1").toLowerCase())
  , ja = ml(e => e.charAt(0).toUpperCase() + e.slice(1))
  , Fa = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Da = Oa(Fa);
function bl(e) {
    return !!e || e === ""
}
const Ra = "http://www.w3.org/2000/svg"
  , st = typeof document < "u" ? document : null
  , Si = st && st.createElement("template")
  , La = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, n, r) => {
        const o = t ? st.createElementNS(Ra, e) : st.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple),
        o
    }
    ,
    createText: e => st.createTextNode(e),
    createComment: e => st.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => st.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, o, i) {
        const s = n ? n.previousSibling : t.lastChild;
        if (o && (o === i || o.nextSibling))
            for (; t.insertBefore(o.cloneNode(!0), n),
            !(o === i || !(o = o.nextSibling)); )
                ;
        else {
            Si.innerHTML = r ? `<svg>${e}</svg>` : e;
            const l = Si.content;
            if (r) {
                const c = l.firstChild;
                for (; c.firstChild; )
                    l.appendChild(c.firstChild);
                l.removeChild(c)
            }
            t.insertBefore(l, n)
        }
        return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
}
  , $a = Symbol("_vtc");
function ka(e, t, n) {
    const r = e[$a];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const ko = Symbol("_vod")
  , _p = {
    beforeMount(e, {value: t}, {transition: n}) {
        e[ko] = e.style.display === "none" ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : Ht(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e),
        Ht(e, !0),
        r.enter(e)) : r.leave(e, () => {
            Ht(e, !1)
        }
        ) : Ht(e, t))
    },
    beforeUnmount(e, {value: t}) {
        Ht(e, t)
    }
};
function Ht(e, t) {
    e.style.display = t ? e[ko] : "none"
}
const Ha = Symbol("");
function Ba(e, t, n) {
    const r = e.style
      , o = Vn(n);
    if (n && !o) {
        if (t && !Vn(t))
            for (const i in t)
                n[i] == null && qr(r, i, "");
        for (const i in n)
            qr(r, i, n[i])
    } else {
        const i = r.display;
        if (o) {
            if (t !== n) {
                const s = r[Ha];
                s && (n += ";" + s),
                r.cssText = n
            }
        } else
            t && e.removeAttribute("style");
        ko in e && (r.display = i)
    }
}
const Oi = /\s*!important$/;
function qr(e, t, n) {
    if (pl(n))
        n.forEach(r => qr(e, t, r));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = Ua(e, t);
        Oi.test(n) ? e.setProperty(vl(r), n.replace(Oi, ""), "important") : e[r] = n
    }
}
const Ii = ["Webkit", "Moz", "ms"]
  , Ar = {};
function Ua(e, t) {
    const n = Ar[t];
    if (n)
        return n;
    let r = $e(t);
    if (r !== "filter" && r in e)
        return Ar[t] = r;
    r = ja(r);
    for (let o = 0; o < Ii.length; o++) {
        const i = Ii[o] + r;
        if (i in e)
            return Ar[t] = i
    }
    return t
}
const Pi = "http://www.w3.org/1999/xlink";
function Wa(e, t, n, r, o) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(Pi, t.slice(6, t.length)) : e.setAttributeNS(Pi, t, n);
    else {
        const i = Da(t);
        n == null || i && !bl(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
    }
}
function Ka(e, t, n, r, o, i, s) {
    if (t === "innerHTML" || t === "textContent") {
        r && s(r, o, i),
        e[t] = n ?? "";
        return
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        e._value = n;
        const u = l === "OPTION" ? e.getAttribute("value") : e.value
          , a = n ?? "";
        u !== a && (e.value = a),
        n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean" ? n = bl(n) : n == null && u === "string" ? (n = "",
        c = !0) : u === "number" && (n = 0,
        c = !0)
    }
    try {
        e[t] = n
    } catch {}
    c && e.removeAttribute(t)
}
function Va(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function qa(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
const Mi = Symbol("_vei");
function za(e, t, n, r, o=null) {
    const i = e[Mi] || (e[Mi] = {})
      , s = i[t];
    if (r && s)
        s.value = r;
    else {
        const [l,c] = Ja(t);
        if (r) {
            const u = i[t] = Ya(r, o);
            Va(e, l, u, c)
        } else
            s && (qa(e, l, s, c),
            i[t] = void 0)
    }
}
const Ni = /(?:Once|Passive|Capture)$/;
function Ja(e) {
    let t;
    if (Ni.test(e)) {
        t = {};
        let r;
        for (; r = e.match(Ni); )
            e = e.slice(0, e.length - r[0].length),
            t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : vl(e.slice(2)), t]
}
let Sr = 0;
const Qa = Promise.resolve()
  , Ga = () => Sr || (Qa.then( () => Sr = 0),
Sr = Date.now());
function Ya(e, t) {
    const n = r => {
        if (!r._vts)
            r._vts = Date.now();
        else if (r._vts <= n.attached)
            return;
        Ne(Xa(r, n.value), t, 5, [r])
    }
    ;
    return n.value = e,
    n.attached = Ga(),
    n
}
function Xa(e, t) {
    if (pl(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(r => o => !o._stopped && r && r(o))
    } else
        return t
}
const ji = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
  , Za = (e, t, n, r, o=!1, i, s, l, c) => {
    t === "class" ? ka(e, r, o) : t === "style" ? Ba(e, n, r) : Ia(t) ? Pa(t) || za(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : ef(e, t, r, o)) ? Ka(e, t, r, i, s, l, c) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r),
    Wa(e, t, r, o))
}
;
function ef(e, t, n, r) {
    if (r)
        return !!(t === "innerHTML" || t === "textContent" || t in e && ji(t) && gl(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
        return !1;
    if (t === "width" || t === "height") {
        const o = e.tagName;
        if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
            return !1
    }
    return ji(t) && Vn(n) ? !1 : t in e
}
const tf = Ma({
    patchProp: Za
}, La);
let Fi;
function nf() {
    return Fi || (Fi = ra(tf))
}
const Tp = (...e) => {
    const t = nf().createApp(...e)
      , {mount: n} = t;
    return t.mount = r => {
        const o = rf(r);
        if (!o)
            return;
        const i = t._component;
        !gl(i) && !i.render && !i.template && (i.template = o.innerHTML),
        o.innerHTML = "";
        const s = n(o, !1, o instanceof SVGElement);
        return o instanceof Element && (o.removeAttribute("v-cloak"),
        o.setAttribute("data-v-app", "")),
        s
    }
    ,
    t
}
;
function rf(e) {
    return Vn(e) ? document.querySelector(e) : e
}
/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.1.0
*/
const yl = Object.freeze({
    left: 0,
    top: 0,
    width: 16,
    height: 16
})
  , qn = Object.freeze({
    rotate: 0,
    vFlip: !1,
    hFlip: !1
})
  , dn = Object.freeze({
    ...yl,
    ...qn
})
  , zr = Object.freeze({
    ...dn,
    body: "",
    hidden: !1
})
  , of = Object.freeze({
    width: null,
    height: null
})
  , wl = Object.freeze({
    ...of,
    ...qn
});
function sf(e, t=0) {
    const n = e.replace(/^-?[0-9.]*/, "");
    function r(o) {
        for (; o < 0; )
            o += 4;
        return o % 4
    }
    if (n === "") {
        const o = parseInt(e);
        return isNaN(o) ? 0 : r(o)
    } else if (n !== e) {
        let o = 0;
        switch (n) {
        case "%":
            o = 25;
            break;
        case "deg":
            o = 90
        }
        if (o) {
            let i = parseFloat(e.slice(0, e.length - n.length));
            return isNaN(i) ? 0 : (i = i / o,
            i % 1 === 0 ? r(i) : 0)
        }
    }
    return t
}
const lf = /[\s,]+/;
function cf(e, t) {
    t.split(lf).forEach(n => {
        switch (n.trim()) {
        case "horizontal":
            e.hFlip = !0;
            break;
        case "vertical":
            e.vFlip = !0;
            break
        }
    }
    )
}
const _l = {
    ...wl,
    preserveAspectRatio: ""
};
function Di(e) {
    const t = {
        ..._l
    }
      , n = (r, o) => e.getAttribute(r) || o;
    return t.width = n("width", null),
    t.height = n("height", null),
    t.rotate = sf(n("rotate", "")),
    cf(t, n("flip", "")),
    t.preserveAspectRatio = n("preserveAspectRatio", n("preserveaspectratio", "")),
    t
}
function uf(e, t) {
    for (const n in _l)
        if (e[n] !== t[n])
            return !0;
    return !1
}
const Zt = /^[a-z0-9]+(-[a-z0-9]+)*$/
  , hn = (e, t, n, r="") => {
    const o = e.split(":");
    if (e.slice(0, 1) === "@") {
        if (o.length < 2 || o.length > 3)
            return null;
        r = o.shift().slice(1)
    }
    if (o.length > 3 || !o.length)
        return null;
    if (o.length > 1) {
        const l = o.pop()
          , c = o.pop()
          , u = {
            provider: o.length > 0 ? o[0] : r,
            prefix: c,
            name: l
        };
        return t && !Dn(u) ? null : u
    }
    const i = o[0]
      , s = i.split("-");
    if (s.length > 1) {
        const l = {
            provider: r,
            prefix: s.shift(),
            name: s.join("-")
        };
        return t && !Dn(l) ? null : l
    }
    if (n && r === "") {
        const l = {
            provider: r,
            prefix: "",
            name: i
        };
        return t && !Dn(l, n) ? null : l
    }
    return null
}
  , Dn = (e, t) => e ? !!((e.provider === "" || e.provider.match(Zt)) && (t && e.prefix === "" || e.prefix.match(Zt)) && e.name.match(Zt)) : !1;
function af(e, t) {
    const n = {};
    !e.hFlip != !t.hFlip && (n.hFlip = !0),
    !e.vFlip != !t.vFlip && (n.vFlip = !0);
    const r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
    return r && (n.rotate = r),
    n
}
function Ri(e, t) {
    const n = af(e, t);
    for (const r in zr)
        r in qn ? r in e && !(r in n) && (n[r] = qn[r]) : r in t ? n[r] = t[r] : r in e && (n[r] = e[r]);
    return n
}
function ff(e, t) {
    const n = e.icons
      , r = e.aliases || Object.create(null)
      , o = Object.create(null);
    function i(s) {
        if (n[s])
            return o[s] = [];
        if (!(s in o)) {
            o[s] = null;
            const l = r[s] && r[s].parent
              , c = l && i(l);
            c && (o[s] = [l].concat(c))
        }
        return o[s]
    }
    return (t || Object.keys(n).concat(Object.keys(r))).forEach(i),
    o
}
function df(e, t, n) {
    const r = e.icons
      , o = e.aliases || Object.create(null);
    let i = {};
    function s(l) {
        i = Ri(r[l] || o[l], i)
    }
    return s(t),
    n.forEach(s),
    Ri(e, i)
}
function Tl(e, t) {
    const n = [];
    if (typeof e != "object" || typeof e.icons != "object")
        return n;
    e.not_found instanceof Array && e.not_found.forEach(o => {
        t(o, null),
        n.push(o)
    }
    );
    const r = ff(e);
    for (const o in r) {
        const i = r[o];
        i && (t(o, df(e, o, i)),
        n.push(o))
    }
    return n
}
const hf = {
    provider: "",
    aliases: {},
    not_found: {},
    ...yl
};
function Or(e, t) {
    for (const n in t)
        if (n in e && typeof e[n] != typeof t[n])
            return !1;
    return !0
}
function El(e) {
    if (typeof e != "object" || e === null)
        return null;
    const t = e;
    if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !Or(e, hf))
        return null;
    const n = t.icons;
    for (const o in n) {
        const i = n[o];
        if (!o.match(Zt) || typeof i.body != "string" || !Or(i, zr))
            return null
    }
    const r = t.aliases || Object.create(null);
    for (const o in r) {
        const i = r[o]
          , s = i.parent;
        if (!o.match(Zt) || typeof s != "string" || !n[s] && !r[s] || !Or(i, zr))
            return null
    }
    return t
}
const zn = Object.create(null);
function pf(e, t) {
    return {
        provider: e,
        prefix: t,
        icons: Object.create(null),
        missing: new Set
    }
}
function et(e, t) {
    const n = zn[e] || (zn[e] = Object.create(null));
    return n[t] || (n[t] = pf(e, t))
}
function Ho(e, t) {
    return El(t) ? Tl(t, (n, r) => {
        r ? e.icons[n] = r : e.missing.add(n)
    }
    ) : []
}
function gf(e, t, n) {
    try {
        if (typeof n.body == "string")
            return e.icons[t] = {
                ...n
            },
            !0
    } catch {}
    return !1
}
function mf(e, t) {
    let n = [];
    return (typeof e == "string" ? [e] : Object.keys(zn)).forEach(o => {
        (typeof o == "string" && typeof t == "string" ? [t] : Object.keys(zn[o] || {})).forEach(s => {
            const l = et(o, s);
            n = n.concat(Object.keys(l.icons).map(c => (o !== "" ? "@" + o + ":" : "") + s + ":" + c))
        }
        )
    }
    ),
    n
}
let cn = !1;
function xl(e) {
    return typeof e == "boolean" && (cn = e),
    cn
}
function un(e) {
    const t = typeof e == "string" ? hn(e, !0, cn) : e;
    if (t) {
        const n = et(t.provider, t.prefix)
          , r = t.name;
        return n.icons[r] || (n.missing.has(r) ? null : void 0)
    }
}
function Cl(e, t) {
    const n = hn(e, !0, cn);
    if (!n)
        return !1;
    const r = et(n.provider, n.prefix);
    return gf(r, n.name, t)
}
function Li(e, t) {
    if (typeof e != "object")
        return !1;
    if (typeof t != "string" && (t = e.provider || ""),
    cn && !t && !e.prefix) {
        let o = !1;
        return El(e) && (e.prefix = "",
        Tl(e, (i, s) => {
            s && Cl(i, s) && (o = !0)
        }
        )),
        o
    }
    const n = e.prefix;
    if (!Dn({
        provider: t,
        prefix: n,
        name: "a"
    }))
        return !1;
    const r = et(t, n);
    return !!Ho(r, e)
}
function $i(e) {
    return !!un(e)
}
function vf(e) {
    const t = un(e);
    return t ? {
        ...dn,
        ...t
    } : null
}
function bf(e) {
    const t = {
        loaded: [],
        missing: [],
        pending: []
    }
      , n = Object.create(null);
    e.sort( (o, i) => o.provider !== i.provider ? o.provider.localeCompare(i.provider) : o.prefix !== i.prefix ? o.prefix.localeCompare(i.prefix) : o.name.localeCompare(i.name));
    let r = {
        provider: "",
        prefix: "",
        name: ""
    };
    return e.forEach(o => {
        if (r.name === o.name && r.prefix === o.prefix && r.provider === o.provider)
            return;
        r = o;
        const i = o.provider
          , s = o.prefix
          , l = o.name
          , c = n[i] || (n[i] = Object.create(null))
          , u = c[s] || (c[s] = et(i, s));
        let a;
        l in u.icons ? a = t.loaded : s === "" || u.missing.has(l) ? a = t.missing : a = t.pending;
        const h = {
            provider: i,
            prefix: s,
            name: l
        };
        a.push(h)
    }
    ),
    t
}
function Al(e, t) {
    e.forEach(n => {
        const r = n.loaderCallbacks;
        r && (n.loaderCallbacks = r.filter(o => o.id !== t))
    }
    )
}
function yf(e) {
    e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0,
    setTimeout( () => {
        e.pendingCallbacksFlag = !1;
        const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
        if (!t.length)
            return;
        let n = !1;
        const r = e.provider
          , o = e.prefix;
        t.forEach(i => {
            const s = i.icons
              , l = s.pending.length;
            s.pending = s.pending.filter(c => {
                if (c.prefix !== o)
                    return !0;
                const u = c.name;
                if (e.icons[u])
                    s.loaded.push({
                        provider: r,
                        prefix: o,
                        name: u
                    });
                else if (e.missing.has(u))
                    s.missing.push({
                        provider: r,
                        prefix: o,
                        name: u
                    });
                else
                    return n = !0,
                    !0;
                return !1
            }
            ),
            s.pending.length !== l && (n || Al([e], i.id),
            i.callback(s.loaded.slice(0), s.missing.slice(0), s.pending.slice(0), i.abort))
        }
        )
    }
    ))
}
let wf = 0;
function _f(e, t, n) {
    const r = wf++
      , o = Al.bind(null, n, r);
    if (!t.pending.length)
        return o;
    const i = {
        id: r,
        icons: t,
        callback: e,
        abort: o
    };
    return n.forEach(s => {
        (s.loaderCallbacks || (s.loaderCallbacks = [])).push(i)
    }
    ),
    o
}
const Jr = Object.create(null);
function ki(e, t) {
    Jr[e] = t
}
function Qr(e) {
    return Jr[e] || Jr[""]
}
function Tf(e, t=!0, n=!1) {
    const r = [];
    return e.forEach(o => {
        const i = typeof o == "string" ? hn(o, t, n) : o;
        i && r.push(i)
    }
    ),
    r
}
var Ef = {
    resources: [],
    index: 0,
    timeout: 2e3,
    rotate: 750,
    random: !1,
    dataAfterTimeout: !1
};
function xf(e, t, n, r) {
    const o = e.resources.length
      , i = e.random ? Math.floor(Math.random() * o) : e.index;
    let s;
    if (e.random) {
        let S = e.resources.slice(0);
        for (s = []; S.length > 1; ) {
            const F = Math.floor(Math.random() * S.length);
            s.push(S[F]),
            S = S.slice(0, F).concat(S.slice(F + 1))
        }
        s = s.concat(S)
    } else
        s = e.resources.slice(i).concat(e.resources.slice(0, i));
    const l = Date.now();
    let c = "pending", u = 0, a, h = null, p = [], m = [];
    typeof r == "function" && m.push(r);
    function _() {
        h && (clearTimeout(h),
        h = null)
    }
    function w() {
        c === "pending" && (c = "aborted"),
        _(),
        p.forEach(S => {
            S.status === "pending" && (S.status = "aborted")
        }
        ),
        p = []
    }
    function O(S, F) {
        F && (m = []),
        typeof S == "function" && m.push(S)
    }
    function L() {
        return {
            startTime: l,
            payload: t,
            status: c,
            queriesSent: u,
            queriesPending: p.length,
            subscribe: O,
            abort: w
        }
    }
    function j() {
        c = "failed",
        m.forEach(S => {
            S(void 0, a)
        }
        )
    }
    function H() {
        p.forEach(S => {
            S.status === "pending" && (S.status = "aborted")
        }
        ),
        p = []
    }
    function C(S, F, $) {
        const te = F !== "success";
        switch (p = p.filter(P => P !== S),
        c) {
        case "pending":
            break;
        case "failed":
            if (te || !e.dataAfterTimeout)
                return;
            break;
        default:
            return
        }
        if (F === "abort") {
            a = $,
            j();
            return
        }
        if (te) {
            a = $,
            p.length || (s.length ? K() : j());
            return
        }
        if (_(),
        H(),
        !e.random) {
            const P = e.resources.indexOf(S.resource);
            P !== -1 && P !== e.index && (e.index = P)
        }
        c = "completed",
        m.forEach(P => {
            P($)
        }
        )
    }
    function K() {
        if (c !== "pending")
            return;
        _();
        const S = s.shift();
        if (S === void 0) {
            if (p.length) {
                h = setTimeout( () => {
                    _(),
                    c === "pending" && (H(),
                    j())
                }
                , e.timeout);
                return
            }
            j();
            return
        }
        const F = {
            status: "pending",
            resource: S,
            callback: ($, te) => {
                C(F, $, te)
            }
        };
        p.push(F),
        u++,
        h = setTimeout(K, e.rotate),
        n(S, t, F.callback)
    }
    return setTimeout(K),
    L
}
function Sl(e) {
    const t = {
        ...Ef,
        ...e
    };
    let n = [];
    function r() {
        n = n.filter(l => l().status === "pending")
    }
    function o(l, c, u) {
        const a = xf(t, l, c, (h, p) => {
            r(),
            u && u(h, p)
        }
        );
        return n.push(a),
        a
    }
    function i(l) {
        return n.find(c => l(c)) || null
    }
    return {
        query: o,
        find: i,
        setIndex: l => {
            t.index = l
        }
        ,
        getIndex: () => t.index,
        cleanup: r
    }
}
function Bo(e) {
    let t;
    if (typeof e.resources == "string")
        t = [e.resources];
    else if (t = e.resources,
    !(t instanceof Array) || !t.length)
        return null;
    return {
        resources: t,
        path: e.path || "/",
        maxURL: e.maxURL || 500,
        rotate: e.rotate || 750,
        timeout: e.timeout || 5e3,
        random: e.random === !0,
        index: e.index || 0,
        dataAfterTimeout: e.dataAfterTimeout !== !1
    }
}
const hr = Object.create(null)
  , Bt = ["https://api.simplesvg.com", "https://api.unisvg.com"]
  , Rn = [];
for (; Bt.length > 0; )
    Bt.length === 1 || Math.random() > .5 ? Rn.push(Bt.shift()) : Rn.push(Bt.pop());
hr[""] = Bo({
    resources: ["https://api.iconify.design"].concat(Rn)
});
function Hi(e, t) {
    const n = Bo(t);
    return n === null ? !1 : (hr[e] = n,
    !0)
}
function pr(e) {
    return hr[e]
}
function Cf() {
    return Object.keys(hr)
}
function Bi() {}
const Ir = Object.create(null);
function Af(e) {
    if (!Ir[e]) {
        const t = pr(e);
        if (!t)
            return;
        const n = Sl(t)
          , r = {
            config: t,
            redundancy: n
        };
        Ir[e] = r
    }
    return Ir[e]
}
function Ol(e, t, n) {
    let r, o;
    if (typeof e == "string") {
        const i = Qr(e);
        if (!i)
            return n(void 0, 424),
            Bi;
        o = i.send;
        const s = Af(e);
        s && (r = s.redundancy)
    } else {
        const i = Bo(e);
        if (i) {
            r = Sl(i);
            const s = e.resources ? e.resources[0] : ""
              , l = Qr(s);
            l && (o = l.send)
        }
    }
    return !r || !o ? (n(void 0, 424),
    Bi) : r.query(t, o, n)().abort
}
const Ui = "iconify2"
  , an = "iconify"
  , Il = an + "-count"
  , Wi = an + "-version"
  , Pl = 36e5
  , Sf = 168
  , Of = 50;
function Gr(e, t) {
    try {
        return e.getItem(t)
    } catch {}
}
function Uo(e, t, n) {
    try {
        return e.setItem(t, n),
        !0
    } catch {}
}
function Ki(e, t) {
    try {
        e.removeItem(t)
    } catch {}
}
function Yr(e, t) {
    return Uo(e, Il, t.toString())
}
function Xr(e) {
    return parseInt(Gr(e, Il)) || 0
}
const dt = {
    local: !0,
    session: !0
}
  , Ml = {
    local: new Set,
    session: new Set
};
let Wo = !1;
function If(e) {
    Wo = e
}
let En = typeof window > "u" ? {} : window;
function Nl(e) {
    const t = e + "Storage";
    try {
        if (En && En[t] && typeof En[t].length == "number")
            return En[t]
    } catch {}
    dt[e] = !1
}
function jl(e, t) {
    const n = Nl(e);
    if (!n)
        return;
    const r = Gr(n, Wi);
    if (r !== Ui) {
        if (r) {
            const l = Xr(n);
            for (let c = 0; c < l; c++)
                Ki(n, an + c.toString())
        }
        Uo(n, Wi, Ui),
        Yr(n, 0);
        return
    }
    const o = Math.floor(Date.now() / Pl) - Sf
      , i = l => {
        const c = an + l.toString()
          , u = Gr(n, c);
        if (typeof u == "string") {
            try {
                const a = JSON.parse(u);
                if (typeof a == "object" && typeof a.cached == "number" && a.cached > o && typeof a.provider == "string" && typeof a.data == "object" && typeof a.data.prefix == "string" && t(a, l))
                    return !0
            } catch {}
            Ki(n, c)
        }
    }
    ;
    let s = Xr(n);
    for (let l = s - 1; l >= 0; l--)
        i(l) || (l === s - 1 ? (s--,
        Yr(n, s)) : Ml[e].add(l))
}
function Fl() {
    if (!Wo) {
        If(!0);
        for (const e in dt)
            jl(e, t => {
                const n = t.data
                  , r = t.provider
                  , o = n.prefix
                  , i = et(r, o);
                if (!Ho(i, n).length)
                    return !1;
                const s = n.lastModified || -1;
                return i.lastModifiedCached = i.lastModifiedCached ? Math.min(i.lastModifiedCached, s) : s,
                !0
            }
            )
    }
}
function Pf(e, t) {
    const n = e.lastModifiedCached;
    if (n && n >= t)
        return n === t;
    if (e.lastModifiedCached = t,
    n)
        for (const r in dt)
            jl(r, o => {
                const i = o.data;
                return o.provider !== e.provider || i.prefix !== e.prefix || i.lastModified === t
            }
            );
    return !0
}
function Mf(e, t) {
    Wo || Fl();
    function n(r) {
        let o;
        if (!dt[r] || !(o = Nl(r)))
            return;
        const i = Ml[r];
        let s;
        if (i.size)
            i.delete(s = Array.from(i).shift());
        else if (s = Xr(o),
        s >= Of || !Yr(o, s + 1))
            return;
        const l = {
            cached: Math.floor(Date.now() / Pl),
            provider: e.provider,
            data: t
        };
        return Uo(o, an + s.toString(), JSON.stringify(l))
    }
    t.lastModified && !Pf(e, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t),
    delete t.not_found),
    n("local") || n("session"))
}
function Vi() {}
function Nf(e) {
    e.iconsLoaderFlag || (e.iconsLoaderFlag = !0,
    setTimeout( () => {
        e.iconsLoaderFlag = !1,
        yf(e)
    }
    ))
}
function jf(e, t) {
    e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t,
    e.iconsQueueFlag || (e.iconsQueueFlag = !0,
    setTimeout( () => {
        e.iconsQueueFlag = !1;
        const {provider: n, prefix: r} = e
          , o = e.iconsToLoad;
        delete e.iconsToLoad;
        let i;
        if (!o || !(i = Qr(n)))
            return;
        i.prepare(n, r, o).forEach(l => {
            Ol(n, l, c => {
                if (typeof c != "object")
                    l.icons.forEach(u => {
                        e.missing.add(u)
                    }
                    );
                else
                    try {
                        const u = Ho(e, c);
                        if (!u.length)
                            return;
                        const a = e.pendingIcons;
                        a && u.forEach(h => {
                            a.delete(h)
                        }
                        ),
                        Mf(e, c)
                    } catch (u) {
                        console.error(u)
                    }
                Nf(e)
            }
            )
        }
        )
    }
    ))
}
const Ko = (e, t) => {
    const n = Tf(e, !0, xl())
      , r = bf(n);
    if (!r.pending.length) {
        let c = !0;
        return t && setTimeout( () => {
            c && t(r.loaded, r.missing, r.pending, Vi)
        }
        ),
        () => {
            c = !1
        }
    }
    const o = Object.create(null)
      , i = [];
    let s, l;
    return r.pending.forEach(c => {
        const {provider: u, prefix: a} = c;
        if (a === l && u === s)
            return;
        s = u,
        l = a,
        i.push(et(u, a));
        const h = o[u] || (o[u] = Object.create(null));
        h[a] || (h[a] = [])
    }
    ),
    r.pending.forEach(c => {
        const {provider: u, prefix: a, name: h} = c
          , p = et(u, a)
          , m = p.pendingIcons || (p.pendingIcons = new Set);
        m.has(h) || (m.add(h),
        o[u][a].push(h))
    }
    ),
    i.forEach(c => {
        const {provider: u, prefix: a} = c;
        o[u][a].length && jf(c, o[u][a])
    }
    ),
    t ? _f(t, r, i) : Vi
}
  , Ff = e => new Promise( (t, n) => {
    const r = typeof e == "string" ? hn(e, !0) : e;
    if (!r) {
        n(e);
        return
    }
    Ko([r || e], o => {
        if (o.length && r) {
            const i = un(r);
            if (i) {
                t({
                    ...dn,
                    ...i
                });
                return
            }
        }
        n(e)
    }
    )
}
);
function Df(e) {
    try {
        const t = typeof e == "string" ? JSON.parse(e) : e;
        if (typeof t.body == "string")
            return {
                ...t
            }
    } catch {}
}
function Rf(e, t) {
    const n = typeof e == "string" ? hn(e, !0, !0) : null;
    if (!n) {
        const i = Df(e);
        return {
            value: e,
            data: i
        }
    }
    const r = un(n);
    if (r !== void 0 || !n.prefix)
        return {
            value: e,
            name: n,
            data: r
        };
    const o = Ko([n], () => t(e, n, un(n)));
    return {
        value: e,
        name: n,
        loading: o
    }
}
let Dl = !1;
try {
    Dl = navigator.vendor.indexOf("Apple") === 0
} catch {}
function Lf(e, t) {
    switch (t) {
    case "svg":
    case "bg":
    case "mask":
        return t
    }
    return t !== "style" && (Dl || e.indexOf("<a") === -1) ? "svg" : e.indexOf("currentColor") === -1 ? "bg" : "mask"
}
const $f = /(-?[0-9.]*[0-9]+[0-9.]*)/g
  , kf = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Zr(e, t, n) {
    if (t === 1)
        return e;
    if (n = n || 100,
    typeof e == "number")
        return Math.ceil(e * t * n) / n;
    if (typeof e != "string")
        return e;
    const r = e.split($f);
    if (r === null || !r.length)
        return e;
    const o = [];
    let i = r.shift()
      , s = kf.test(i);
    for (; ; ) {
        if (s) {
            const l = parseFloat(i);
            isNaN(l) ? o.push(i) : o.push(Math.ceil(l * t * n) / n)
        } else
            o.push(i);
        if (i = r.shift(),
        i === void 0)
            return o.join("");
        s = !s
    }
}
function Hf(e, t="defs") {
    let n = "";
    const r = e.indexOf("<" + t);
    for (; r >= 0; ) {
        const o = e.indexOf(">", r)
          , i = e.indexOf("</" + t);
        if (o === -1 || i === -1)
            break;
        const s = e.indexOf(">", i);
        if (s === -1)
            break;
        n += e.slice(o + 1, i).trim(),
        e = e.slice(0, r).trim() + e.slice(s + 1)
    }
    return {
        defs: n,
        content: e
    }
}
function Bf(e, t) {
    return e ? "<defs>" + e + "</defs>" + t : t
}
function Uf(e, t, n) {
    const r = Hf(e);
    return Bf(r.defs, t + r.content + n)
}
const Wf = e => e === "unset" || e === "undefined" || e === "none";
function Rl(e, t) {
    const n = {
        ...dn,
        ...e
    }
      , r = {
        ...wl,
        ...t
    }
      , o = {
        left: n.left,
        top: n.top,
        width: n.width,
        height: n.height
    };
    let i = n.body;
    [n, r].forEach(w => {
        const O = []
          , L = w.hFlip
          , j = w.vFlip;
        let H = w.rotate;
        L ? j ? H += 2 : (O.push("translate(" + (o.width + o.left).toString() + " " + (0 - o.top).toString() + ")"),
        O.push("scale(-1 1)"),
        o.top = o.left = 0) : j && (O.push("translate(" + (0 - o.left).toString() + " " + (o.height + o.top).toString() + ")"),
        O.push("scale(1 -1)"),
        o.top = o.left = 0);
        let C;
        switch (H < 0 && (H -= Math.floor(H / 4) * 4),
        H = H % 4,
        H) {
        case 1:
            C = o.height / 2 + o.top,
            O.unshift("rotate(90 " + C.toString() + " " + C.toString() + ")");
            break;
        case 2:
            O.unshift("rotate(180 " + (o.width / 2 + o.left).toString() + " " + (o.height / 2 + o.top).toString() + ")");
            break;
        case 3:
            C = o.width / 2 + o.left,
            O.unshift("rotate(-90 " + C.toString() + " " + C.toString() + ")");
            break
        }
        H % 2 === 1 && (o.left !== o.top && (C = o.left,
        o.left = o.top,
        o.top = C),
        o.width !== o.height && (C = o.width,
        o.width = o.height,
        o.height = C)),
        O.length && (i = Uf(i, '<g transform="' + O.join(" ") + '">', "</g>"))
    }
    );
    const s = r.width
      , l = r.height
      , c = o.width
      , u = o.height;
    let a, h;
    s === null ? (h = l === null ? "1em" : l === "auto" ? u : l,
    a = Zr(h, c / u)) : (a = s === "auto" ? c : s,
    h = l === null ? Zr(a, u / c) : l === "auto" ? u : l);
    const p = {}
      , m = (w, O) => {
        Wf(O) || (p[w] = O.toString())
    }
    ;
    m("width", a),
    m("height", h);
    const _ = [o.left, o.top, c, u];
    return p.viewBox = _.join(" "),
    {
        attributes: p,
        viewBox: _,
        body: i
    }
}
function Vo(e, t) {
    let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    for (const r in t)
        n += " " + r + '="' + t[r] + '"';
    return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>"
}
function Kf(e) {
    return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ")
}
function Vf(e) {
    return "data:image/svg+xml," + Kf(e)
}
function Ll(e) {
    return 'url("' + Vf(e) + '")'
}
const qf = () => {
    let e;
    try {
        if (e = fetch,
        typeof e == "function")
            return e
    } catch {}
}
;
let Jn = qf();
function zf(e) {
    Jn = e
}
function Jf() {
    return Jn
}
function Qf(e, t) {
    const n = pr(e);
    if (!n)
        return 0;
    let r;
    if (!n.maxURL)
        r = 0;
    else {
        let o = 0;
        n.resources.forEach(s => {
            o = Math.max(o, s.length)
        }
        );
        const i = t + ".json?icons=";
        r = n.maxURL - o - n.path.length - i.length
    }
    return r
}
function Gf(e) {
    return e === 404
}
const Yf = (e, t, n) => {
    const r = []
      , o = Qf(e, t)
      , i = "icons";
    let s = {
        type: i,
        provider: e,
        prefix: t,
        icons: []
    }
      , l = 0;
    return n.forEach( (c, u) => {
        l += c.length + 1,
        l >= o && u > 0 && (r.push(s),
        s = {
            type: i,
            provider: e,
            prefix: t,
            icons: []
        },
        l = c.length),
        s.icons.push(c)
    }
    ),
    r.push(s),
    r
}
;
function Xf(e) {
    if (typeof e == "string") {
        const t = pr(e);
        if (t)
            return t.path
    }
    return "/"
}
const Zf = (e, t, n) => {
    if (!Jn) {
        n("abort", 424);
        return
    }
    let r = Xf(t.provider);
    switch (t.type) {
    case "icons":
        {
            const i = t.prefix
              , l = t.icons.join(",")
              , c = new URLSearchParams({
                icons: l
            });
            r += i + ".json?" + c.toString();
            break
        }
    case "custom":
        {
            const i = t.uri;
            r += i.slice(0, 1) === "/" ? i.slice(1) : i;
            break
        }
    default:
        n("abort", 400);
        return
    }
    let o = 503;
    Jn(e + r).then(i => {
        const s = i.status;
        if (s !== 200) {
            setTimeout( () => {
                n(Gf(s) ? "abort" : "next", s)
            }
            );
            return
        }
        return o = 501,
        i.json()
    }
    ).then(i => {
        if (typeof i != "object" || i === null) {
            setTimeout( () => {
                i === 404 ? n("abort", i) : n("next", o)
            }
            );
            return
        }
        setTimeout( () => {
            n("success", i)
        }
        )
    }
    ).catch( () => {
        n("next", o)
    }
    )
}
  , ed = {
    prepare: Yf,
    send: Zf
};
function qi(e, t) {
    switch (e) {
    case "local":
    case "session":
        dt[e] = t;
        break;
    case "all":
        for (const n in dt)
            dt[n] = t;
        break
    }
}
const Pr = "data-style";
let $l = "";
function td(e) {
    $l = e
}
function zi(e, t) {
    let n = Array.from(e.childNodes).find(r => r.hasAttribute && r.hasAttribute(Pr));
    n || (n = document.createElement("style"),
    n.setAttribute(Pr, Pr),
    e.appendChild(n)),
    n.textContent = ":host{display:inline-block;vertical-align:" + (t ? "-0.125em" : "0") + "}span,svg{display:block}" + $l
}
function kl() {
    ki("", ed),
    xl(!0);
    let e;
    try {
        e = window
    } catch {}
    if (e) {
        if (Fl(),
        e.IconifyPreload !== void 0) {
            const n = e.IconifyPreload
              , r = "Invalid IconifyPreload syntax.";
            typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach(o => {
                try {
                    (typeof o != "object" || o === null || o instanceof Array || typeof o.icons != "object" || typeof o.prefix != "string" || !Li(o)) && console.error(r)
                } catch {
                    console.error(r)
                }
            }
            )
        }
        if (e.IconifyProviders !== void 0) {
            const n = e.IconifyProviders;
            if (typeof n == "object" && n !== null)
                for (const r in n) {
                    const o = "IconifyProviders[" + r + "] is invalid.";
                    try {
                        const i = n[r];
                        if (typeof i != "object" || !i || i.resources === void 0)
                            continue;
                        Hi(r, i) || console.error(o)
                    } catch {
                        console.error(o)
                    }
                }
        }
    }
    return {
        enableCache: n => qi(n, !0),
        disableCache: n => qi(n, !1),
        iconLoaded: $i,
        iconExists: $i,
        getIcon: vf,
        listIcons: mf,
        addIcon: Cl,
        addCollection: Li,
        calculateSize: Zr,
        buildIcon: Rl,
        iconToHTML: Vo,
        svgToURL: Ll,
        loadIcons: Ko,
        loadIcon: Ff,
        addAPIProvider: Hi,
        appendCustomStyle: td,
        _api: {
            getAPIConfig: pr,
            setAPIModule: ki,
            sendAPIQuery: Ol,
            setFetch: zf,
            getFetch: Jf,
            listAPIProviders: Cf
        }
    }
}
const eo = {
    "background-color": "currentColor"
}
  , Hl = {
    "background-color": "transparent"
}
  , Ji = {
    image: "var(--svg)",
    repeat: "no-repeat",
    size: "100% 100%"
}
  , Qi = {
    "-webkit-mask": eo,
    mask: eo,
    background: Hl
};
for (const e in Qi) {
    const t = Qi[e];
    for (const n in Ji)
        t[e + "-" + n] = Ji[n]
}
function Gi(e) {
    return e ? e + (e.match(/^[-0-9.]+$/) ? "px" : "") : "inherit"
}
function nd(e, t, n) {
    const r = document.createElement("span");
    let o = e.body;
    o.indexOf("<a") !== -1 && (o += "<!-- " + Date.now() + " -->");
    const i = e.attributes
      , s = Vo(o, {
        ...i,
        width: t.width + "",
        height: t.height + ""
    })
      , l = Ll(s)
      , c = r.style
      , u = {
        "--svg": l,
        width: Gi(i.width),
        height: Gi(i.height),
        ...n ? eo : Hl
    };
    for (const a in u)
        c.setProperty(a, u[a]);
    return r
}
let en;
function rd() {
    try {
        en = window.trustedTypes.createPolicy("iconify", {
            createHTML: e => e
        })
    } catch {
        en = null
    }
}
function od(e) {
    return en === void 0 && rd(),
    en ? en.createHTML(e) : e
}
function id(e) {
    const t = document.createElement("span")
      , n = e.attributes;
    let r = "";
    n.width || (r = "width: inherit;"),
    n.height || (r += "height: inherit;"),
    r && (n.style = r);
    const o = Vo(e.body, n);
    return t.innerHTML = od(o),
    t.firstChild
}
function to(e) {
    return Array.from(e.childNodes).find(t => {
        const n = t.tagName && t.tagName.toUpperCase();
        return n === "SPAN" || n === "SVG"
    }
    )
}
function Yi(e, t) {
    const n = t.icon.data
      , r = t.customisations
      , o = Rl(n, r);
    r.preserveAspectRatio && (o.attributes.preserveAspectRatio = r.preserveAspectRatio);
    const i = t.renderedMode;
    let s;
    switch (i) {
    case "svg":
        s = id(o);
        break;
    default:
        s = nd(o, {
            ...dn,
            ...n
        }, i === "mask")
    }
    const l = to(e);
    l ? s.tagName === "SPAN" && l.tagName === s.tagName ? l.setAttribute("style", s.getAttribute("style")) : e.replaceChild(s, l) : e.appendChild(s)
}
function Xi(e, t, n) {
    const r = n && (n.rendered ? n : n.lastRender);
    return {
        rendered: !1,
        inline: t,
        icon: e,
        lastRender: r
    }
}
function sd(e="iconify-icon") {
    let t, n;
    try {
        t = window.customElements,
        n = window.HTMLElement
    } catch {
        return
    }
    if (!t || !n)
        return;
    const r = t.get(e);
    if (r)
        return r;
    const o = ["icon", "mode", "inline", "noobserver", "width", "height", "rotate", "flip"]
      , i = class extends n {
        constructor() {
            super();
            qe(this, "_shadowRoot");
            qe(this, "_initialised", !1);
            qe(this, "_state");
            qe(this, "_checkQueued", !1);
            qe(this, "_connected", !1);
            qe(this, "_observer", null);
            qe(this, "_visible", !0);
            const c = this._shadowRoot = this.attachShadow({
                mode: "open"
            })
              , u = this.hasAttribute("inline");
            zi(c, u),
            this._state = Xi({
                value: ""
            }, u),
            this._queueCheck()
        }
        connectedCallback() {
            this._connected = !0,
            this.startObserver()
        }
        disconnectedCallback() {
            this._connected = !1,
            this.stopObserver()
        }
        static get observedAttributes() {
            return o.slice(0)
        }
        attributeChangedCallback(c) {
            switch (c) {
            case "inline":
                {
                    const u = this.hasAttribute("inline")
                      , a = this._state;
                    u !== a.inline && (a.inline = u,
                    zi(this._shadowRoot, u));
                    break
                }
            case "noobserver":
                {
                    this.hasAttribute("noobserver") ? this.startObserver() : this.stopObserver();
                    break
                }
            default:
                this._queueCheck()
            }
        }
        get icon() {
            const c = this.getAttribute("icon");
            if (c && c.slice(0, 1) === "{")
                try {
                    return JSON.parse(c)
                } catch {}
            return c
        }
        set icon(c) {
            typeof c == "object" && (c = JSON.stringify(c)),
            this.setAttribute("icon", c)
        }
        get inline() {
            return this.hasAttribute("inline")
        }
        set inline(c) {
            c ? this.setAttribute("inline", "true") : this.removeAttribute("inline")
        }
        get observer() {
            return this.hasAttribute("observer")
        }
        set observer(c) {
            c ? this.setAttribute("observer", "true") : this.removeAttribute("observer")
        }
        restartAnimation() {
            const c = this._state;
            if (c.rendered) {
                const u = this._shadowRoot;
                if (c.renderedMode === "svg")
                    try {
                        u.lastChild.setCurrentTime(0);
                        return
                    } catch {}
                Yi(u, c)
            }
        }
        get status() {
            const c = this._state;
            return c.rendered ? "rendered" : c.icon.data === null ? "failed" : "loading"
        }
        _queueCheck() {
            this._checkQueued || (this._checkQueued = !0,
            setTimeout( () => {
                this._check()
            }
            ))
        }
        _check() {
            if (!this._checkQueued)
                return;
            this._checkQueued = !1;
            const c = this._state
              , u = this.getAttribute("icon");
            if (u !== c.icon.value) {
                this._iconChanged(u);
                return
            }
            if (!c.rendered || !this._visible)
                return;
            const a = this.getAttribute("mode")
              , h = Di(this);
            (c.attrMode !== a || uf(c.customisations, h) || !to(this._shadowRoot)) && this._renderIcon(c.icon, h, a)
        }
        _iconChanged(c) {
            const u = Rf(c, (a, h, p) => {
                const m = this._state;
                if (m.rendered || this.getAttribute("icon") !== a)
                    return;
                const _ = {
                    value: a,
                    name: h,
                    data: p
                };
                _.data ? this._gotIconData(_) : m.icon = _
            }
            );
            u.data ? this._gotIconData(u) : this._state = Xi(u, this._state.inline, this._state)
        }
        _forceRender() {
            if (!this._visible) {
                const c = to(this._shadowRoot);
                c && this._shadowRoot.removeChild(c);
                return
            }
            this._queueCheck()
        }
        _gotIconData(c) {
            this._checkQueued = !1,
            this._renderIcon(c, Di(this), this.getAttribute("mode"))
        }
        _renderIcon(c, u, a) {
            const h = Lf(c.data.body, a)
              , p = this._state.inline;
            Yi(this._shadowRoot, this._state = {
                rendered: !0,
                icon: c,
                inline: p,
                customisations: u,
                attrMode: a,
                renderedMode: h
            })
        }
        startObserver() {
            if (!this._observer && !this.hasAttribute("noobserver"))
                try {
                    this._observer = new IntersectionObserver(c => {
                        const u = c.some(a => a.isIntersecting);
                        u !== this._visible && (this._visible = u,
                        this._forceRender())
                    }
                    ),
                    this._observer.observe(this)
                } catch {
                    if (this._observer) {
                        try {
                            this._observer.disconnect()
                        } catch {}
                        this._observer = null
                    }
                }
        }
        stopObserver() {
            this._observer && (this._observer.disconnect(),
            this._observer = null,
            this._visible = !0,
            this._connected && this._forceRender())
        }
    }
    ;
    o.forEach(l => {
        l in i.prototype || Object.defineProperty(i.prototype, l, {
            get: function() {
                return this.getAttribute(l)
            },
            set: function(c) {
                c !== null ? this.setAttribute(l, c) : this.removeAttribute(l)
            }
        })
    }
    );
    const s = kl();
    for (const l in s)
        i[l] = i.prototype[l] = s[l];
    return t.define(e, i),
    i
}
sd() || kl();
function qo(e) {
    typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch(t => setTimeout( () => {
        throw t
    }
    ))
}
function zo() {
    let e = []
      , t = {
        addEventListener(n, r, o, i) {
            return n.addEventListener(r, o, i),
            t.add( () => n.removeEventListener(r, o, i))
        },
        requestAnimationFrame(...n) {
            let r = requestAnimationFrame(...n);
            t.add( () => cancelAnimationFrame(r))
        },
        nextFrame(...n) {
            t.requestAnimationFrame( () => {
                t.requestAnimationFrame(...n)
            }
            )
        },
        setTimeout(...n) {
            let r = setTimeout(...n);
            t.add( () => clearTimeout(r))
        },
        microTask(...n) {
            let r = {
                current: !0
            };
            return qo( () => {
                r.current && n[0]()
            }
            ),
            t.add( () => {
                r.current = !1
            }
            )
        },
        style(n, r, o) {
            let i = n.style.getPropertyValue(r);
            return Object.assign(n.style, {
                [r]: o
            }),
            this.add( () => {
                Object.assign(n.style, {
                    [r]: i
                })
            }
            )
        },
        group(n) {
            let r = zo();
            return n(r),
            this.add( () => r.dispose())
        },
        add(n) {
            return e.push(n),
            () => {
                let r = e.indexOf(n);
                if (r >= 0)
                    for (let o of e.splice(r, 1))
                        o()
            }
        },
        dispose() {
            for (let n of e.splice(0))
                n()
        }
    };
    return t
}
let ld = Symbol("headlessui.useid")
  , cd = 0;
function Bl() {
    return be(ld, () => `${++cd}`)()
}
function le(e) {
    var t;
    if (e == null || e.value == null)
        return null;
    let n = (t = e.value.$el) != null ? t : e.value;
    return n instanceof Node ? n : null
}
function mt(e, t, ...n) {
    if (e in t) {
        let o = t[e];
        return typeof o == "function" ? o(...n) : o
    }
    let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o => `"${o}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, mt),
    r
}
var ud = Object.defineProperty
  , ad = (e, t, n) => t in e ? ud(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , Zi = (e, t, n) => (ad(e, typeof t != "symbol" ? t + "" : t, n),
n);
let fd = class {
    constructor() {
        Zi(this, "current", this.detect()),
        Zi(this, "currentId", 0)
    }
    set(t) {
        this.current !== t && (this.currentId = 0,
        this.current = t)
    }
    reset() {
        this.set(this.detect())
    }
    nextId() {
        return ++this.currentId
    }
    get isServer() {
        return this.current === "server"
    }
    get isClient() {
        return this.current === "client"
    }
    detect() {
        return typeof window > "u" || typeof document > "u" ? "server" : "client"
    }
}
  , gr = new fd;
function Dt(e) {
    if (gr.isServer)
        return null;
    if (e instanceof Node)
        return e.ownerDocument;
    if (e != null && e.hasOwnProperty("value")) {
        let t = le(e);
        if (t)
            return t.ownerDocument
    }
    return document
}
let no = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
var Qe = (e => (e[e.First = 1] = "First",
e[e.Previous = 2] = "Previous",
e[e.Next = 4] = "Next",
e[e.Last = 8] = "Last",
e[e.WrapAround = 16] = "WrapAround",
e[e.NoScroll = 32] = "NoScroll",
e))(Qe || {})
  , Ul = (e => (e[e.Error = 0] = "Error",
e[e.Overflow = 1] = "Overflow",
e[e.Success = 2] = "Success",
e[e.Underflow = 3] = "Underflow",
e))(Ul || {})
  , dd = (e => (e[e.Previous = -1] = "Previous",
e[e.Next = 1] = "Next",
e))(dd || {});
function hd(e=document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(no)).sort( (t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)))
}
var Wl = (e => (e[e.Strict = 0] = "Strict",
e[e.Loose = 1] = "Loose",
e))(Wl || {});
function pd(e, t=0) {
    var n;
    return e === ((n = Dt(e)) == null ? void 0 : n.body) ? !1 : mt(t, {
        0() {
            return e.matches(no)
        },
        1() {
            let r = e;
            for (; r !== null; ) {
                if (r.matches(no))
                    return !0;
                r = r.parentElement
            }
            return !1
        }
    })
}
var gd = (e => (e[e.Keyboard = 0] = "Keyboard",
e[e.Mouse = 1] = "Mouse",
e))(gd || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", e => {
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0),
document.addEventListener("click", e => {
    e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "")
}
, !0));
function ht(e) {
    e == null || e.focus({
        preventScroll: !0
    })
}
let md = ["textarea", "input"].join(",");
function vd(e) {
    var t, n;
    return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, md)) != null ? n : !1
}
function bd(e, t=n => n) {
    return e.slice().sort( (n, r) => {
        let o = t(n)
          , i = t(r);
        if (o === null || i === null)
            return 0;
        let s = o.compareDocumentPosition(i);
        return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    }
    )
}
function Ln(e, t, {sorted: n=!0, relativeTo: r=null, skipElements: o=[]}={}) {
    var i;
    let s = (i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? i : document
      , l = Array.isArray(e) ? n ? bd(e) : e : hd(e);
    o.length > 0 && l.length > 1 && (l = l.filter(_ => !o.includes(_))),
    r = r ?? s.activeElement;
    let c = ( () => {
        if (t & 5)
            return 1;
        if (t & 10)
            return -1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), u = ( () => {
        if (t & 1)
            return 0;
        if (t & 2)
            return Math.max(0, l.indexOf(r)) - 1;
        if (t & 4)
            return Math.max(0, l.indexOf(r)) + 1;
        if (t & 8)
            return l.length - 1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
    }
    )(), a = t & 32 ? {
        preventScroll: !0
    } : {}, h = 0, p = l.length, m;
    do {
        if (h >= p || h + p <= 0)
            return 0;
        let _ = u + h;
        if (t & 16)
            _ = (_ + p) % p;
        else {
            if (_ < 0)
                return 3;
            if (_ >= p)
                return 1
        }
        m = l[_],
        m == null || m.focus(a),
        h += c
    } while (m !== s.activeElement);
    return t & 6 && vd(m) && m.select(),
    2
}
function Kl() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}
function yd() {
    return /Android/gi.test(window.navigator.userAgent)
}
function wd() {
    return Kl() || yd()
}
function xn(e, t, n) {
    gr.isServer || He(r => {
        document.addEventListener(e, t, n),
        r( () => document.removeEventListener(e, t, n))
    }
    )
}
function Vl(e, t, n) {
    gr.isServer || He(r => {
        window.addEventListener(e, t, n),
        r( () => window.removeEventListener(e, t, n))
    }
    )
}
function _d(e, t, n=W( () => !0)) {
    function r(i, s) {
        if (!n.value || i.defaultPrevented)
            return;
        let l = s(i);
        if (l === null || !l.getRootNode().contains(l))
            return;
        let c = function u(a) {
            return typeof a == "function" ? u(a()) : Array.isArray(a) || a instanceof Set ? a : [a]
        }(e);
        for (let u of c) {
            if (u === null)
                continue;
            let a = u instanceof HTMLElement ? u : le(u);
            if (a != null && a.contains(l) || i.composed && i.composedPath().includes(a))
                return
        }
        return !pd(l, Wl.Loose) && l.tabIndex !== -1 && i.preventDefault(),
        t(i, l)
    }
    let o = z(null);
    xn("pointerdown", i => {
        var s, l;
        n.value && (o.value = ((l = (s = i.composedPath) == null ? void 0 : s.call(i)) == null ? void 0 : l[0]) || i.target)
    }
    , !0),
    xn("mousedown", i => {
        var s, l;
        n.value && (o.value = ((l = (s = i.composedPath) == null ? void 0 : s.call(i)) == null ? void 0 : l[0]) || i.target)
    }
    , !0),
    xn("click", i => {
        wd() || o.value && (r(i, () => o.value),
        o.value = null)
    }
    , !0),
    xn("touchend", i => r(i, () => i.target instanceof HTMLElement ? i.target : null), !0),
    Vl("blur", i => r(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
}
var ro = (e => (e[e.None = 0] = "None",
e[e.RenderStrategy = 1] = "RenderStrategy",
e[e.Static = 2] = "Static",
e))(ro || {})
  , Td = (e => (e[e.Unmount = 0] = "Unmount",
e[e.Hidden = 1] = "Hidden",
e))(Td || {});
function yt({visible: e=!0, features: t=0, ourProps: n, theirProps: r, ...o}) {
    var i;
    let s = zl(r, n)
      , l = Object.assign(o, {
        props: s
    });
    if (e || t & 2 && s.static)
        return Mr(l);
    if (t & 1) {
        let c = (i = s.unmount) == null || i ? 0 : 1;
        return mt(c, {
            0() {
                return null
            },
            1() {
                return Mr({
                    ...o,
                    props: {
                        ...s,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }
                })
            }
        })
    }
    return Mr(l)
}
function Mr({props: e, attrs: t, slots: n, slot: r, name: o}) {
    var i, s;
    let {as: l, ...c} = Ed(e, ["unmount", "static"])
      , u = (i = n.default) == null ? void 0 : i.call(n, r)
      , a = {};
    if (r) {
        let h = !1
          , p = [];
        for (let[m,_] of Object.entries(r))
            typeof _ == "boolean" && (h = !0),
            _ === !0 && p.push(m);
        h && (a["data-headlessui-state"] = p.join(" "))
    }
    if (l === "template") {
        if (u = ql(u ?? []),
        Object.keys(c).length > 0 || Object.keys(t).length > 0) {
            let[h,...p] = u ?? [];
            if (!xd(h) || p.length > 0)
                throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(c).concat(Object.keys(t)).map(w => w.trim()).filter( (w, O, L) => L.indexOf(w) === O).sort( (w, O) => w.localeCompare(O)).map(w => `  - ${w}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map(w => `  - ${w}`).join(`
`)].join(`
`));
            let m = zl((s = h.props) != null ? s : {}, c, a)
              , _ = gt(h, m, !0);
            for (let w in m)
                w.startsWith("on") && (_.props || (_.props = {}),
                _.props[w] = m[w]);
            return _
        }
        return Array.isArray(u) && u.length === 1 ? u[0] : u
    }
    return xe(l, Object.assign({}, c, a), {
        default: () => u
    })
}
function ql(e) {
    return e.flatMap(t => t.type === Ce ? ql(t.children) : [t])
}
function zl(...e) {
    if (e.length === 0)
        return {};
    if (e.length === 1)
        return e[0];
    let t = {}
      , n = {};
    for (let r of e)
        for (let o in r)
            o.startsWith("on") && typeof r[o] == "function" ? (n[o] != null || (n[o] = []),
            n[o].push(r[o])) : t[o] = r[o];
    if (t.disabled || t["aria-disabled"])
        return Object.assign(t, Object.fromEntries(Object.keys(n).map(r => [r, void 0])));
    for (let r in n)
        Object.assign(t, {
            [r](o, ...i) {
                let s = n[r];
                for (let l of s) {
                    if (o instanceof Event && o.defaultPrevented)
                        return;
                    l(o, ...i)
                }
            }
        });
    return t
}
function Ed(e, t=[]) {
    let n = Object.assign({}, e);
    for (let r of t)
        r in n && delete n[r];
    return n
}
function xd(e) {
    return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function"
}
var Qn = (e => (e[e.None = 1] = "None",
e[e.Focusable = 2] = "Focusable",
e[e.Hidden = 4] = "Hidden",
e))(Qn || {});
let oo = tt({
    name: "Hidden",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        features: {
            type: Number,
            default: 1
        }
    },
    setup(e, {slots: t, attrs: n}) {
        return () => {
            var r;
            let {features: o, ...i} = e
              , s = {
                "aria-hidden": (o & 2) === 2 ? !0 : (r = i["aria-hidden"]) != null ? r : void 0,
                hidden: (o & 4) === 4 ? !0 : void 0,
                style: {
                    position: "fixed",
                    top: 1,
                    left: 1,
                    width: 1,
                    height: 0,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    ...(o & 4) === 4 && (o & 2) !== 2 && {
                        display: "none"
                    }
                }
            };
            return yt({
                ourProps: s,
                theirProps: i,
                slot: {},
                attrs: n,
                slots: t,
                name: "Hidden"
            })
        }
    }
})
  , Cd = Symbol("Context");
var zt = (e => (e[e.Open = 1] = "Open",
e[e.Closed = 2] = "Closed",
e[e.Closing = 4] = "Closing",
e[e.Opening = 8] = "Opening",
e))(zt || {});
function Ad() {
    return be(Cd, null)
}
var Jl = (e => (e.Space = " ",
e.Enter = "Enter",
e.Escape = "Escape",
e.Backspace = "Backspace",
e.Delete = "Delete",
e.ArrowLeft = "ArrowLeft",
e.ArrowUp = "ArrowUp",
e.ArrowRight = "ArrowRight",
e.ArrowDown = "ArrowDown",
e.Home = "Home",
e.End = "End",
e.PageUp = "PageUp",
e.PageDown = "PageDown",
e.Tab = "Tab",
e))(Jl || {});
function Sd(e) {
    function t() {
        document.readyState !== "loading" && (e(),
        document.removeEventListener("DOMContentLoaded", t))
    }
    typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t),
    t())
}
let lt = [];
Sd( () => {
    function e(t) {
        t.target instanceof HTMLElement && t.target !== document.body && lt[0] !== t.target && (lt.unshift(t.target),
        lt = lt.filter(n => n != null && n.isConnected),
        lt.splice(10))
    }
    window.addEventListener("click", e, {
        capture: !0
    }),
    window.addEventListener("mousedown", e, {
        capture: !0
    }),
    window.addEventListener("focus", e, {
        capture: !0
    }),
    document.body.addEventListener("click", e, {
        capture: !0
    }),
    document.body.addEventListener("mousedown", e, {
        capture: !0
    }),
    document.body.addEventListener("focus", e, {
        capture: !0
    })
}
);
function Ql(e, t, n, r) {
    gr.isServer || He(o => {
        e = e ?? window,
        e.addEventListener(t, n, r),
        o( () => e.removeEventListener(t, n, r))
    }
    )
}
var Jt = (e => (e[e.Forwards = 0] = "Forwards",
e[e.Backwards = 1] = "Backwards",
e))(Jt || {});
function Od() {
    let e = z(0);
    return Vl("keydown", t => {
        t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0)
    }
    ),
    e
}
function Gl(e) {
    if (!e)
        return new Set;
    if (typeof e == "function")
        return new Set(e());
    let t = new Set;
    for (let n of e.value) {
        let r = le(n);
        r instanceof HTMLElement && t.add(r)
    }
    return t
}
var Yl = (e => (e[e.None = 1] = "None",
e[e.InitialFocus = 2] = "InitialFocus",
e[e.TabLock = 4] = "TabLock",
e[e.FocusLock = 8] = "FocusLock",
e[e.RestoreFocus = 16] = "RestoreFocus",
e[e.All = 30] = "All",
e))(Yl || {});
let Ut = Object.assign(tt({
    name: "FocusTrap",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        initialFocus: {
            type: Object,
            default: null
        },
        features: {
            type: Number,
            default: 30
        },
        containers: {
            type: [Object, Function],
            default: z(new Set)
        }
    },
    inheritAttrs: !1,
    setup(e, {attrs: t, slots: n, expose: r}) {
        let o = z(null);
        r({
            el: o,
            $el: o
        });
        let i = W( () => Dt(o))
          , s = z(!1);
        ke( () => s.value = !0),
        Ke( () => s.value = !1),
        Pd({
            ownerDocument: i
        }, W( () => s.value && !!(e.features & 16)));
        let l = Md({
            ownerDocument: i,
            container: o,
            initialFocus: W( () => e.initialFocus)
        }, W( () => s.value && !!(e.features & 2)));
        Nd({
            ownerDocument: i,
            container: o,
            containers: e.containers,
            previousActiveElement: l
        }, W( () => s.value && !!(e.features & 8)));
        let c = Od();
        function u(m) {
            let _ = le(o);
            _ && (w => w())( () => {
                mt(c.value, {
                    [Jt.Forwards]: () => {
                        Ln(_, Qe.First, {
                            skipElements: [m.relatedTarget]
                        })
                    }
                    ,
                    [Jt.Backwards]: () => {
                        Ln(_, Qe.Last, {
                            skipElements: [m.relatedTarget]
                        })
                    }
                })
            }
            )
        }
        let a = z(!1);
        function h(m) {
            m.key === "Tab" && (a.value = !0,
            requestAnimationFrame( () => {
                a.value = !1
            }
            ))
        }
        function p(m) {
            if (!s.value)
                return;
            let _ = Gl(e.containers);
            le(o)instanceof HTMLElement && _.add(le(o));
            let w = m.relatedTarget;
            w instanceof HTMLElement && w.dataset.headlessuiFocusGuard !== "true" && (Xl(_, w) || (a.value ? Ln(le(o), mt(c.value, {
                [Jt.Forwards]: () => Qe.Next,
                [Jt.Backwards]: () => Qe.Previous
            }) | Qe.WrapAround, {
                relativeTo: m.target
            }) : m.target instanceof HTMLElement && ht(m.target)))
        }
        return () => {
            let m = {}
              , _ = {
                ref: o,
                onKeydown: h,
                onFocusout: p
            }
              , {features: w, initialFocus: O, containers: L, ...j} = e;
            return xe(Ce, [!!(w & 4) && xe(oo, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: u,
                features: Qn.Focusable
            }), yt({
                ourProps: _,
                theirProps: {
                    ...t,
                    ...j
                },
                slot: m,
                attrs: t,
                slots: n,
                name: "FocusTrap"
            }), !!(w & 4) && xe(oo, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: u,
                features: Qn.Focusable
            })])
        }
    }
}), {
    features: Yl
});
function Id(e) {
    let t = z(lt.slice());
    return Ae([e], ([n], [r]) => {
        r === !0 && n === !1 ? qo( () => {
            t.value.splice(0)
        }
        ) : r === !1 && n === !0 && (t.value = lt.slice())
    }
    , {
        flush: "post"
    }),
    () => {
        var n;
        return (n = t.value.find(r => r != null && r.isConnected)) != null ? n : null
    }
}
function Pd({ownerDocument: e}, t) {
    let n = Id(t);
    ke( () => {
        He( () => {
            var r, o;
            t.value || ((r = e.value) == null ? void 0 : r.activeElement) === ((o = e.value) == null ? void 0 : o.body) && ht(n())
        }
        , {
            flush: "post"
        })
    }
    ),
    Ke( () => {
        t.value && ht(n())
    }
    )
}
function Md({ownerDocument: e, container: t, initialFocus: n}, r) {
    let o = z(null)
      , i = z(!1);
    return ke( () => i.value = !0),
    Ke( () => i.value = !1),
    ke( () => {
        Ae([t, n, r], (s, l) => {
            if (s.every( (u, a) => (l == null ? void 0 : l[a]) === u) || !r.value)
                return;
            let c = le(t);
            c && qo( () => {
                var u, a;
                if (!i.value)
                    return;
                let h = le(n)
                  , p = (u = e.value) == null ? void 0 : u.activeElement;
                if (h) {
                    if (h === p) {
                        o.value = p;
                        return
                    }
                } else if (c.contains(p)) {
                    o.value = p;
                    return
                }
                h ? ht(h) : Ln(c, Qe.First | Qe.NoScroll) === Ul.Error && console.warn("There are no focusable elements inside the <FocusTrap />"),
                o.value = (a = e.value) == null ? void 0 : a.activeElement
            }
            )
        }
        , {
            immediate: !0,
            flush: "post"
        })
    }
    ),
    o
}
function Nd({ownerDocument: e, container: t, containers: n, previousActiveElement: r}, o) {
    var i;
    Ql((i = e.value) == null ? void 0 : i.defaultView, "focus", s => {
        if (!o.value)
            return;
        let l = Gl(n);
        le(t)instanceof HTMLElement && l.add(le(t));
        let c = r.value;
        if (!c)
            return;
        let u = s.target;
        u && u instanceof HTMLElement ? Xl(l, u) ? (r.value = u,
        ht(u)) : (s.preventDefault(),
        s.stopPropagation(),
        ht(c)) : ht(r.value)
    }
    , !0)
}
function Xl(e, t) {
    for (let n of e)
        if (n.contains(t))
            return !0;
    return !1
}
function jd(e) {
    let t = Oo(e.getSnapshot());
    return Ke(e.subscribe( () => {
        t.value = e.getSnapshot()
    }
    )),
    t
}
function Fd(e, t) {
    let n = e()
      , r = new Set;
    return {
        getSnapshot() {
            return n
        },
        subscribe(o) {
            return r.add(o),
            () => r.delete(o)
        },
        dispatch(o, ...i) {
            let s = t[o].call(n, ...i);
            s && (n = s,
            r.forEach(l => l()))
        }
    }
}
function Dd() {
    let e;
    return {
        before({doc: t}) {
            var n;
            let r = t.documentElement;
            e = ((n = t.defaultView) != null ? n : window).innerWidth - r.clientWidth
        },
        after({doc: t, d: n}) {
            let r = t.documentElement
              , o = r.clientWidth - r.offsetWidth
              , i = e - o;
            n.style(r, "paddingRight", `${i}px`)
        }
    }
}
function Rd() {
    return Kl() ? {
        before({doc: e, d: t, meta: n}) {
            function r(o) {
                return n.containers.flatMap(i => i()).some(i => i.contains(o))
            }
            t.microTask( () => {
                var o;
                if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
                    let l = zo();
                    l.style(e.documentElement, "scrollBehavior", "auto"),
                    t.add( () => t.microTask( () => l.dispose()))
                }
                let i = (o = window.scrollY) != null ? o : window.pageYOffset
                  , s = null;
                t.addEventListener(e, "click", l => {
                    if (l.target instanceof HTMLElement)
                        try {
                            let c = l.target.closest("a");
                            if (!c)
                                return;
                            let {hash: u} = new URL(c.href)
                              , a = e.querySelector(u);
                            a && !r(a) && (s = a)
                        } catch {}
                }
                , !0),
                t.addEventListener(e, "touchstart", l => {
                    if (l.target instanceof HTMLElement)
                        if (r(l.target)) {
                            let c = l.target;
                            for (; c.parentElement && r(c.parentElement); )
                                c = c.parentElement;
                            t.style(c, "overscrollBehavior", "contain")
                        } else
                            t.style(l.target, "touchAction", "none")
                }
                ),
                t.addEventListener(e, "touchmove", l => {
                    if (l.target instanceof HTMLElement) {
                        if (l.target.tagName === "INPUT")
                            return;
                        if (r(l.target)) {
                            let c = l.target;
                            for (; c.parentElement && c.dataset.headlessuiPortal !== "" && !(c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth); )
                                c = c.parentElement;
                            c.dataset.headlessuiPortal === "" && l.preventDefault()
                        } else
                            l.preventDefault()
                    }
                }
                , {
                    passive: !1
                }),
                t.add( () => {
                    var l;
                    let c = (l = window.scrollY) != null ? l : window.pageYOffset;
                    i !== c && window.scrollTo(0, i),
                    s && s.isConnected && (s.scrollIntoView({
                        block: "nearest"
                    }),
                    s = null)
                }
                )
            }
            )
        }
    } : {}
}
function Ld() {
    return {
        before({doc: e, d: t}) {
            t.style(e.documentElement, "overflow", "hidden")
        }
    }
}
function $d(e) {
    let t = {};
    for (let n of e)
        Object.assign(t, n(t));
    return t
}
let ut = Fd( () => new Map, {
    PUSH(e, t) {
        var n;
        let r = (n = this.get(e)) != null ? n : {
            doc: e,
            count: 0,
            d: zo(),
            meta: new Set
        };
        return r.count++,
        r.meta.add(t),
        this.set(e, r),
        this
    },
    POP(e, t) {
        let n = this.get(e);
        return n && (n.count--,
        n.meta.delete(t)),
        this
    },
    SCROLL_PREVENT({doc: e, d: t, meta: n}) {
        let r = {
            doc: e,
            d: t,
            meta: $d(n)
        }
          , o = [Rd(), Dd(), Ld()];
        o.forEach( ({before: i}) => i == null ? void 0 : i(r)),
        o.forEach( ({after: i}) => i == null ? void 0 : i(r))
    },
    SCROLL_ALLOW({d: e}) {
        e.dispose()
    },
    TEARDOWN({doc: e}) {
        this.delete(e)
    }
});
ut.subscribe( () => {
    let e = ut.getSnapshot()
      , t = new Map;
    for (let[n] of e)
        t.set(n, n.documentElement.style.overflow);
    for (let n of e.values()) {
        let r = t.get(n.doc) === "hidden"
          , o = n.count !== 0;
        (o && !r || !o && r) && ut.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n),
        n.count === 0 && ut.dispatch("TEARDOWN", n)
    }
}
);
function kd(e, t, n) {
    let r = jd(ut)
      , o = W( () => {
        let i = e.value ? r.value.get(e.value) : void 0;
        return i ? i.count > 0 : !1
    }
    );
    return Ae([e, t], ([i,s], [l], c) => {
        if (!i || !s)
            return;
        ut.dispatch("PUSH", i, n);
        let u = !1;
        c( () => {
            u || (ut.dispatch("POP", l ?? i, n),
            u = !0)
        }
        )
    }
    , {
        immediate: !0
    }),
    o
}
let Nr = new Map
  , Wt = new Map;
function es(e, t=z(!0)) {
    He(n => {
        var r;
        if (!t.value)
            return;
        let o = le(e);
        if (!o)
            return;
        n(function() {
            var s;
            if (!o)
                return;
            let l = (s = Wt.get(o)) != null ? s : 1;
            if (l === 1 ? Wt.delete(o) : Wt.set(o, l - 1),
            l !== 1)
                return;
            let c = Nr.get(o);
            c && (c["aria-hidden"] === null ? o.removeAttribute("aria-hidden") : o.setAttribute("aria-hidden", c["aria-hidden"]),
            o.inert = c.inert,
            Nr.delete(o))
        });
        let i = (r = Wt.get(o)) != null ? r : 0;
        Wt.set(o, i + 1),
        i === 0 && (Nr.set(o, {
            "aria-hidden": o.getAttribute("aria-hidden"),
            inert: o.inert
        }),
        o.setAttribute("aria-hidden", "true"),
        o.inert = !0)
    }
    )
}
function Hd({defaultContainers: e=[], portals: t, mainTreeNodeRef: n}={}) {
    let r = z(null)
      , o = Dt(r);
    function i() {
        var s, l, c;
        let u = [];
        for (let a of e)
            a !== null && (a instanceof HTMLElement ? u.push(a) : "value"in a && a.value instanceof HTMLElement && u.push(a.value));
        if (t != null && t.value)
            for (let a of t.value)
                u.push(a);
        for (let a of (s = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? s : [])
            a !== document.body && a !== document.head && a instanceof HTMLElement && a.id !== "headlessui-portal-root" && (a.contains(le(r)) || a.contains((c = (l = le(r)) == null ? void 0 : l.getRootNode()) == null ? void 0 : c.host) || u.some(h => a.contains(h)) || u.push(a));
        return u
    }
    return {
        resolveContainers: i,
        contains(s) {
            return i().some(l => l.contains(s))
        },
        mainTreeNodeRef: r,
        MainTreeNode() {
            return n != null ? null : xe(oo, {
                features: Qn.Hidden,
                ref: r
            })
        }
    }
}
let Zl = Symbol("ForcePortalRootContext");
function Bd() {
    return be(Zl, !1)
}
let ts = tt({
    name: "ForcePortalRoot",
    props: {
        as: {
            type: [Object, String],
            default: "template"
        },
        force: {
            type: Boolean,
            default: !1
        }
    },
    setup(e, {slots: t, attrs: n}) {
        return bt(Zl, e.force),
        () => {
            let {force: r, ...o} = e;
            return yt({
                theirProps: o,
                ourProps: {},
                slot: {},
                slots: t,
                attrs: n,
                name: "ForcePortalRoot"
            })
        }
    }
})
  , ec = Symbol("StackContext");
var io = (e => (e[e.Add = 0] = "Add",
e[e.Remove = 1] = "Remove",
e))(io || {});
function Ud() {
    return be(ec, () => {}
    )
}
function Wd({type: e, enabled: t, element: n, onUpdate: r}) {
    let o = Ud();
    function i(...s) {
        r == null || r(...s),
        o(...s)
    }
    ke( () => {
        Ae(t, (s, l) => {
            s ? i(0, e, n) : l === !0 && i(1, e, n)
        }
        , {
            immediate: !0,
            flush: "sync"
        })
    }
    ),
    Ke( () => {
        t.value && i(1, e, n)
    }
    ),
    bt(ec, i)
}
let Kd = Symbol("DescriptionContext");
function Vd({slot: e=z({}), name: t="Description", props: n={}}={}) {
    let r = z([]);
    function o(i) {
        return r.value.push(i),
        () => {
            let s = r.value.indexOf(i);
            s !== -1 && r.value.splice(s, 1)
        }
    }
    return bt(Kd, {
        register: o,
        slot: e,
        name: t,
        props: n
    }),
    W( () => r.value.length > 0 ? r.value.join(" ") : void 0)
}
function qd(e) {
    let t = Dt(e);
    if (!t) {
        if (e === null)
            return null;
        throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)
    }
    let n = t.getElementById("headlessui-portal-root");
    if (n)
        return n;
    let r = t.createElement("div");
    return r.setAttribute("id", "headlessui-portal-root"),
    t.body.appendChild(r)
}
const so = new WeakMap;
function zd(e) {
    var t;
    return (t = so.get(e)) != null ? t : 0
}
function ns(e, t) {
    let n = t(zd(e));
    return n <= 0 ? so.delete(e) : so.set(e, n),
    n
}
let Jd = tt({
    name: "Portal",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        }
    },
    setup(e, {slots: t, attrs: n}) {
        let r = z(null)
          , o = W( () => Dt(r))
          , i = Bd()
          , s = be(tc, null)
          , l = z(i === !0 || s == null ? qd(r.value) : s.resolveTarget());
        l.value && ns(l.value, p => p + 1);
        let c = z(!1);
        ke( () => {
            c.value = !0
        }
        ),
        He( () => {
            i || s != null && (l.value = s.resolveTarget())
        }
        );
        let u = be(lo, null)
          , a = !1
          , h = fr();
        return Ae(r, () => {
            if (a || !u)
                return;
            let p = le(r);
            p && (Ke(u.register(p), h),
            a = !0)
        }
        ),
        Ke( () => {
            var p, m;
            let _ = (p = o.value) == null ? void 0 : p.getElementById("headlessui-portal-root");
            !_ || l.value !== _ || ns(l.value, w => w - 1) || l.value.children.length > 0 || (m = l.value.parentElement) == null || m.removeChild(l.value)
        }
        ),
        () => {
            if (!c.value || l.value === null)
                return null;
            let p = {
                ref: r,
                "data-headlessui-portal": ""
            };
            return xe(aa, {
                to: l.value
            }, yt({
                ourProps: p,
                theirProps: e,
                slot: {},
                attrs: n,
                slots: t,
                name: "Portal"
            }))
        }
    }
})
  , lo = Symbol("PortalParentContext");
function Qd() {
    let e = be(lo, null)
      , t = z([]);
    function n(i) {
        return t.value.push(i),
        e && e.register(i),
        () => r(i)
    }
    function r(i) {
        let s = t.value.indexOf(i);
        s !== -1 && t.value.splice(s, 1),
        e && e.unregister(i)
    }
    let o = {
        register: n,
        unregister: r,
        portals: t
    };
    return [t, tt({
        name: "PortalWrapper",
        setup(i, {slots: s}) {
            return bt(lo, o),
            () => {
                var l;
                return (l = s.default) == null ? void 0 : l.call(s)
            }
        }
    })]
}
let tc = Symbol("PortalGroupContext")
  , Gd = tt({
    name: "PortalGroup",
    props: {
        as: {
            type: [Object, String],
            default: "template"
        },
        target: {
            type: Object,
            default: null
        }
    },
    setup(e, {attrs: t, slots: n}) {
        let r = rr({
            resolveTarget() {
                return e.target
            }
        });
        return bt(tc, r),
        () => {
            let {target: o, ...i} = e;
            return yt({
                theirProps: i,
                ourProps: {},
                slot: {},
                attrs: t,
                slots: n,
                name: "PortalGroup"
            })
        }
    }
});
var Yd = (e => (e[e.Open = 0] = "Open",
e[e.Closed = 1] = "Closed",
e))(Yd || {});
let co = Symbol("DialogContext");
function nc(e) {
    let t = be(co, null);
    if (t === null) {
        let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(n, nc),
        n
    }
    return t
}
let Cn = "DC8F892D-2EBD-447C-A4C8-A03058436FF4"
  , xp = tt({
    name: "Dialog",
    inheritAttrs: !1,
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        static: {
            type: Boolean,
            default: !1
        },
        unmount: {
            type: Boolean,
            default: !0
        },
        open: {
            type: [Boolean, String],
            default: Cn
        },
        initialFocus: {
            type: Object,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        role: {
            type: String,
            default: "dialog"
        }
    },
    emits: {
        close: e => !0
    },
    setup(e, {emit: t, attrs: n, slots: r, expose: o}) {
        var i, s;
        let l = (i = e.id) != null ? i : `headlessui-dialog-${Bl()}`
          , c = z(!1);
        ke( () => {
            c.value = !0
        }
        );
        let u = !1
          , a = W( () => e.role === "dialog" || e.role === "alertdialog" ? e.role : (u || (u = !0,
        console.warn(`Invalid role [${a}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),
        "dialog"))
          , h = z(0)
          , p = Ad()
          , m = W( () => e.open === Cn && p !== null ? (p.value & zt.Open) === zt.Open : e.open)
          , _ = z(null)
          , w = W( () => Dt(_));
        if (o({
            el: _,
            $el: _
        }),
        !(e.open !== Cn || p !== null))
            throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
        if (typeof m.value != "boolean")
            throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${m.value === Cn ? void 0 : e.open}`);
        let O = W( () => c.value && m.value ? 0 : 1)
          , L = W( () => O.value === 0)
          , j = W( () => h.value > 1)
          , H = be(co, null) !== null
          , [C,K] = Qd()
          , {resolveContainers: S, mainTreeNodeRef: F, MainTreeNode: $} = Hd({
            portals: C,
            defaultContainers: [W( () => {
                var V;
                return (V = Y.panelRef.value) != null ? V : _.value
            }
            )]
        })
          , te = W( () => j.value ? "parent" : "leaf")
          , P = W( () => p !== null ? (p.value & zt.Closing) === zt.Closing : !1)
          , G = W( () => H || P.value ? !1 : L.value)
          , he = W( () => {
            var V, Q, _e;
            return (_e = Array.from((Q = (V = w.value) == null ? void 0 : V.querySelectorAll("body > *")) != null ? Q : []).find(Se => Se.id === "headlessui-portal-root" ? !1 : Se.contains(le(F)) && Se instanceof HTMLElement)) != null ? _e : null
        }
        );
        es(he, G);
        let wt = W( () => j.value ? !0 : L.value)
          , Rt = W( () => {
            var V, Q, _e;
            return (_e = Array.from((Q = (V = w.value) == null ? void 0 : V.querySelectorAll("[data-headlessui-portal]")) != null ? Q : []).find(Se => Se.contains(le(F)) && Se instanceof HTMLElement)) != null ? _e : null
        }
        );
        es(Rt, wt),
        Wd({
            type: "Dialog",
            enabled: W( () => O.value === 0),
            element: _,
            onUpdate: (V, Q) => {
                if (Q === "Dialog")
                    return mt(V, {
                        [io.Add]: () => h.value += 1,
                        [io.Remove]: () => h.value -= 1
                    })
            }
        });
        let pn = Vd({
            name: "DialogDescription",
            slot: W( () => ({
                open: m.value
            }))
        })
          , oe = z(null)
          , Y = {
            titleId: oe,
            panelRef: z(null),
            dialogState: O,
            setTitleId(V) {
                oe.value !== V && (oe.value = V)
            },
            close() {
                t("close", !1)
            }
        };
        bt(co, Y);
        let X = W( () => !(!L.value || j.value));
        _d(S, (V, Q) => {
            V.preventDefault(),
            Y.close(),
            sr( () => Q == null ? void 0 : Q.focus())
        }
        , X);
        let Be = W( () => !(j.value || O.value !== 0));
        Ql((s = w.value) == null ? void 0 : s.defaultView, "keydown", V => {
            Be.value && (V.defaultPrevented || V.key === Jl.Escape && (V.preventDefault(),
            V.stopPropagation(),
            Y.close()))
        }
        );
        let _t = W( () => !(P.value || O.value !== 0 || H));
        return kd(w, _t, V => {
            var Q;
            return {
                containers: [...(Q = V.containers) != null ? Q : [], S]
            }
        }
        ),
        He(V => {
            if (O.value !== 0)
                return;
            let Q = le(_);
            if (!Q)
                return;
            let _e = new ResizeObserver(Se => {
                for (let Lt of Se) {
                    let me = Lt.target.getBoundingClientRect();
                    me.x === 0 && me.y === 0 && me.width === 0 && me.height === 0 && Y.close()
                }
            }
            );
            _e.observe(Q),
            V( () => _e.disconnect())
        }
        ),
        () => {
            let {open: V, initialFocus: Q, ..._e} = e
              , Se = {
                ...n,
                ref: _,
                id: l,
                role: a.value,
                "aria-modal": O.value === 0 ? !0 : void 0,
                "aria-labelledby": oe.value,
                "aria-describedby": pn.value
            }
              , Lt = {
                open: O.value === 0
            };
            return xe(ts, {
                force: !0
            }, () => [xe(Jd, () => xe(Gd, {
                target: _.value
            }, () => xe(ts, {
                force: !1
            }, () => xe(Ut, {
                initialFocus: Q,
                containers: S,
                features: L.value ? mt(te.value, {
                    parent: Ut.features.RestoreFocus,
                    leaf: Ut.features.All & ~Ut.features.FocusLock
                }) : Ut.features.None
            }, () => xe(K, {}, () => yt({
                ourProps: Se,
                theirProps: {
                    ..._e,
                    ...n
                },
                slot: Lt,
                attrs: n,
                slots: r,
                visible: O.value === 0,
                features: ro.RenderStrategy | ro.Static,
                name: "Dialog"
            })))))), xe($)])
        }
    }
})
  , Cp = tt({
    name: "DialogPanel",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        id: {
            type: String,
            default: null
        }
    },
    setup(e, {attrs: t, slots: n, expose: r}) {
        var o;
        let i = (o = e.id) != null ? o : `headlessui-dialog-panel-${Bl()}`
          , s = nc("DialogPanel");
        r({
            el: s.panelRef,
            $el: s.panelRef
        });
        function l(c) {
            c.stopPropagation()
        }
        return () => {
            let {...c} = e
              , u = {
                id: i,
                ref: s.panelRef,
                onClick: l
            };
            return yt({
                ourProps: u,
                theirProps: c,
                slot: {
                    open: s.dialogState.value === 0
                },
                attrs: t,
                slots: n,
                name: "DialogPanel"
            })
        }
    }
});
function Ap(e, t) {
    var n;
    const r = Oo();
    return He( () => {
        r.value = e()
    }
    , {
        ...t,
        flush: (n = t == null ? void 0 : t.flush) != null ? n : "sync"
    }),
    fn(r)
}
function Jo(e) {
    return xs() ? (Uc(e),
    !0) : !1
}
function Mt(e) {
    return typeof e == "function" ? e() : or(e)
}
const Xd = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Zd = Object.prototype.toString
  , eh = e => Zd.call(e) === "[object Object]"
  , rc = () => {}
;
function th(e, t) {
    function n(...r) {
        return new Promise( (o, i) => {
            Promise.resolve(e( () => t.apply(this, r), {
                fn: t,
                thisArg: this,
                args: r
            })).then(o).catch(i)
        }
        )
    }
    return n
}
const oc = e => e();
function nh(e=oc) {
    const t = z(!0);
    function n() {
        t.value = !1
    }
    function r() {
        t.value = !0
    }
    const o = (...i) => {
        t.value && e(...i)
    }
    ;
    return {
        isActive: fn(t),
        pause: n,
        resume: r,
        eventFilter: o
    }
}
function rh(e) {
    return e || fr()
}
function oh(...e) {
    if (e.length !== 1)
        return vu(...e);
    const t = e[0];
    return typeof t == "function" ? fn(pu( () => ({
        get: t,
        set: rc
    }))) : z(t)
}
function ih(e, t, n={}) {
    const {eventFilter: r=oc, ...o} = n;
    return Ae(e, th(r, t), o)
}
function sh(e, t, n={}) {
    const {eventFilter: r, ...o} = n
      , {eventFilter: i, pause: s, resume: l, isActive: c} = nh(r);
    return {
        stop: ih(e, t, {
            ...o,
            eventFilter: i
        }),
        pause: s,
        resume: l,
        isActive: c
    }
}
function ic(e, t=!0, n) {
    rh() ? ke(e, n) : t ? e() : sr(e)
}
function Sp(e=!1, t={}) {
    const {truthyValue: n=!0, falsyValue: r=!1} = t
      , o = ae(e)
      , i = z(e);
    function s(l) {
        if (arguments.length)
            return i.value = l,
            i.value;
        {
            const c = Mt(n);
            return i.value = i.value === c ? Mt(r) : c,
            i.value
        }
    }
    return o ? s : [i, s]
}
function Gn(e) {
    var t;
    const n = Mt(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const vt = Xd ? window : void 0;
function rs(...e) {
    let t, n, r, o;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n,r,o] = e,
    t = vt) : [t,n,r,o] = e,
    !t)
        return rc;
    Array.isArray(n) || (n = [n]),
    Array.isArray(r) || (r = [r]);
    const i = []
      , s = () => {
        i.forEach(a => a()),
        i.length = 0
    }
      , l = (a, h, p, m) => (a.addEventListener(h, p, m),
    () => a.removeEventListener(h, p, m))
      , c = Ae( () => [Gn(t), Mt(o)], ([a,h]) => {
        if (s(),
        !a)
            return;
        const p = eh(h) ? {
            ...h
        } : h;
        i.push(...n.flatMap(m => r.map(_ => l(a, m, _, p))))
    }
    , {
        immediate: !0,
        flush: "post"
    })
      , u = () => {
        c(),
        s()
    }
    ;
    return Jo(u),
    u
}
function lh() {
    const e = z(!1)
      , t = fr();
    return t && ke( () => {
        e.value = !0
    }
    , t),
    e
}
function sc(e) {
    const t = lh();
    return W( () => (t.value,
    !!e()))
}
function ch(e, t={}) {
    const {window: n=vt} = t
      , r = sc( () => n && "matchMedia"in n && typeof n.matchMedia == "function");
    let o;
    const i = z(!1)
      , s = u => {
        i.value = u.matches
    }
      , l = () => {
        o && ("removeEventListener"in o ? o.removeEventListener("change", s) : o.removeListener(s))
    }
      , c = He( () => {
        r.value && (l(),
        o = n.matchMedia(Mt(e)),
        "addEventListener"in o ? o.addEventListener("change", s) : o.addListener(s),
        i.value = o.matches)
    }
    );
    return Jo( () => {
        c(),
        l(),
        o = void 0
    }
    ),
    i
}
const An = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , Sn = "__vueuse_ssr_handlers__"
  , uh = ah();
function ah() {
    return Sn in An || (An[Sn] = An[Sn] || {}),
    An[Sn]
}
function lc(e, t) {
    return uh[e] || t
}
function fh(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number"
}
const dh = {
    boolean: {
        read: e => e === "true",
        write: e => String(e)
    },
    object: {
        read: e => JSON.parse(e),
        write: e => JSON.stringify(e)
    },
    number: {
        read: e => Number.parseFloat(e),
        write: e => String(e)
    },
    any: {
        read: e => e,
        write: e => String(e)
    },
    string: {
        read: e => e,
        write: e => String(e)
    },
    map: {
        read: e => new Map(JSON.parse(e)),
        write: e => JSON.stringify(Array.from(e.entries()))
    },
    set: {
        read: e => new Set(JSON.parse(e)),
        write: e => JSON.stringify(Array.from(e))
    },
    date: {
        read: e => new Date(e),
        write: e => e.toISOString()
    }
}
  , os = "vueuse-storage";
function hh(e, t, n, r={}) {
    var o;
    const {flush: i="pre", deep: s=!0, listenToStorageChanges: l=!0, writeDefaults: c=!0, mergeDefaults: u=!1, shallow: a, window: h=vt, eventFilter: p, onError: m=P => {
        console.error(P)
    }
    , initOnMounted: _} = r
      , w = (a ? Oo : z)(typeof t == "function" ? t() : t);
    if (!n)
        try {
            n = lc("getDefaultStorage", () => {
                var P;
                return (P = vt) == null ? void 0 : P.localStorage
            }
            )()
        } catch (P) {
            m(P)
        }
    if (!n)
        return w;
    const O = Mt(t)
      , L = fh(O)
      , j = (o = r.serializer) != null ? o : dh[L]
      , {pause: H, resume: C} = sh(w, () => S(w.value), {
        flush: i,
        deep: s,
        eventFilter: p
    });
    h && l && ic( () => {
        rs(h, "storage", $),
        rs(h, os, te),
        _ && $()
    }
    ),
    _ || $();
    function K(P, G) {
        h && h.dispatchEvent(new CustomEvent(os,{
            detail: {
                key: e,
                oldValue: P,
                newValue: G,
                storageArea: n
            }
        }))
    }
    function S(P) {
        try {
            const G = n.getItem(e);
            if (P == null)
                K(G, null),
                n.removeItem(e);
            else {
                const he = j.write(P);
                G !== he && (n.setItem(e, he),
                K(G, he))
            }
        } catch (G) {
            m(G)
        }
    }
    function F(P) {
        const G = P ? P.newValue : n.getItem(e);
        if (G == null)
            return c && O != null && n.setItem(e, j.write(O)),
            O;
        if (!P && u) {
            const he = j.read(G);
            return typeof u == "function" ? u(he, O) : L === "object" && !Array.isArray(he) ? {
                ...O,
                ...he
            } : he
        } else
            return typeof G != "string" ? G : j.read(G)
    }
    function $(P) {
        if (!(P && P.storageArea !== n)) {
            if (P && P.key == null) {
                w.value = O;
                return
            }
            if (!(P && P.key !== e)) {
                H();
                try {
                    (P == null ? void 0 : P.newValue) !== j.write(w.value) && (w.value = F(P))
                } catch (G) {
                    m(G)
                } finally {
                    P ? sr(C) : C()
                }
            }
        }
    }
    function te(P) {
        $(P.detail)
    }
    return w
}
function cc(e) {
    return ch("(prefers-color-scheme: dark)", e)
}
function ph(e={}) {
    const {selector: t="html", attribute: n="class", initialValue: r="auto", window: o=vt, storage: i, storageKey: s="vueuse-color-scheme", listenToStorageChanges: l=!0, storageRef: c, emitAuto: u, disableTransition: a=!0} = e
      , h = {
        auto: "",
        light: "light",
        dark: "dark",
        ...e.modes || {}
    }
      , p = cc({
        window: o
    })
      , m = W( () => p.value ? "dark" : "light")
      , _ = c || (s == null ? oh(r) : hh(s, r, i, {
        window: o,
        listenToStorageChanges: l
    }))
      , w = W( () => _.value === "auto" ? m.value : _.value)
      , O = lc("updateHTMLAttrs", (C, K, S) => {
        const F = typeof C == "string" ? o == null ? void 0 : o.document.querySelector(C) : Gn(C);
        if (!F)
            return;
        let $;
        if (a) {
            $ = o.document.createElement("style");
            const te = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
            $.appendChild(document.createTextNode(te)),
            o.document.head.appendChild($)
        }
        if (K === "class") {
            const te = S.split(/\s/g);
            Object.values(h).flatMap(P => (P || "").split(/\s/g)).filter(Boolean).forEach(P => {
                te.includes(P) ? F.classList.add(P) : F.classList.remove(P)
            }
            )
        } else
            F.setAttribute(K, S);
        a && (o.getComputedStyle($).opacity,
        document.head.removeChild($))
    }
    );
    function L(C) {
        var K;
        O(t, n, (K = h[C]) != null ? K : C)
    }
    function j(C) {
        e.onChanged ? e.onChanged(C, L) : L(C)
    }
    Ae(w, j, {
        flush: "post",
        immediate: !0
    }),
    ic( () => j(w.value));
    const H = W({
        get() {
            return u ? _.value : w.value
        },
        set(C) {
            _.value = C
        }
    });
    try {
        return Object.assign(H, {
            store: _,
            system: m,
            state: w
        })
    } catch {
        return H
    }
}
function Op(e={}) {
    const {valueDark: t="dark", valueLight: n="", window: r=vt} = e
      , o = ph({
        ...e,
        onChanged: (l, c) => {
            var u;
            e.onChanged ? (u = e.onChanged) == null || u.call(e, l === "dark", c, l) : c(l)
        }
        ,
        modes: {
            dark: t,
            light: n
        }
    })
      , i = W( () => o.system ? o.system.value : cc({
        window: r
    }).value ? "dark" : "light");
    return W({
        get() {
            return o.value === "dark"
        },
        set(l) {
            const c = l ? "dark" : "light";
            i.value === c ? o.value = "auto" : o.value = c
        }
    })
}
function Ip(e, t, n={}) {
    const {window: r=vt, ...o} = n;
    let i;
    const s = sc( () => r && "ResizeObserver"in r)
      , l = () => {
        i && (i.disconnect(),
        i = void 0)
    }
      , c = W( () => Array.isArray(e) ? e.map(h => Gn(h)) : [Gn(e)])
      , u = Ae(c, h => {
        if (l(),
        s.value && r) {
            i = new ResizeObserver(t);
            for (const p of h)
                p && i.observe(p, o)
        }
    }
    , {
        immediate: !0,
        flush: "post"
    })
      , a = () => {
        l(),
        u()
    }
    ;
    return Jo(a),
    {
        isSupported: s,
        stop: a
    }
}
var is = 36
  , gh = "";
for (; is--; )
    gh += is.toString(36);
var Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , uc = {}
  , Qo = {};
Object.defineProperty(Qo, "__esModule", {
    value: !0
});
Qo.default = yh;
var ss = "html"
  , ls = "head"
  , On = "body"
  , mh = /<([a-zA-Z]+[0-9]?)/
  , cs = /<head[^]*>/i
  , us = /<body[^]*>/i
  , Yn = function(e, t) {
    throw new Error("This browser does not support `document.implementation.createHTMLDocument`")
}
  , uo = function(e, t) {
    throw new Error("This browser does not support `DOMParser.prototype.parseFromString`")
}
  , as = typeof window == "object" && window.DOMParser;
if (typeof as == "function") {
    var vh = new as
      , bh = "text/html";
    uo = function(e, t) {
        return t && (e = "<".concat(t, ">").concat(e, "</").concat(t, ">")),
        vh.parseFromString(e, bh)
    }
    ,
    Yn = uo
}
if (typeof document == "object" && document.implementation) {
    var In = document.implementation.createHTMLDocument();
    Yn = function(e, t) {
        if (t) {
            var n = In.documentElement.querySelector(t);
            return n && (n.innerHTML = e),
            In
        }
        return In.documentElement.innerHTML = e,
        In
    }
}
var Pn = typeof document == "object" && document.createElement("template"), ao;
Pn && Pn.content && (ao = function(e) {
    return Pn.innerHTML = e,
    Pn.content.childNodes
}
);
function yh(e) {
    var t, n, r = e.match(mh), o = r && r[1] ? r[1].toLowerCase() : "";
    switch (o) {
    case ss:
        {
            var i = uo(e);
            if (!cs.test(e)) {
                var s = i.querySelector(ls);
                (t = s == null ? void 0 : s.parentNode) === null || t === void 0 || t.removeChild(s)
            }
            if (!us.test(e)) {
                var s = i.querySelector(On);
                (n = s == null ? void 0 : s.parentNode) === null || n === void 0 || n.removeChild(s)
            }
            return i.querySelectorAll(ss)
        }
    case ls:
    case On:
        {
            var l = Yn(e).querySelectorAll(o);
            return us.test(e) && cs.test(e) ? l[0].parentNode.childNodes : l
        }
    default:
        {
            if (ao)
                return ao(e);
            var s = Yn(e, On).querySelector(On);
            return s.childNodes
        }
    }
}
var mr = {}
  , ac = {}
  , Go = {};
(function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Doctype = e.CDATA = e.Tag = e.Style = e.Script = e.Comment = e.Directive = e.Text = e.Root = e.isTag = e.ElementType = void 0;
    var t;
    (function(r) {
        r.Root = "root",
        r.Text = "text",
        r.Directive = "directive",
        r.Comment = "comment",
        r.Script = "script",
        r.Style = "style",
        r.Tag = "tag",
        r.CDATA = "cdata",
        r.Doctype = "doctype"
    }
    )(t = e.ElementType || (e.ElementType = {}));
    function n(r) {
        return r.type === t.Tag || r.type === t.Script || r.type === t.Style
    }
    e.isTag = n,
    e.Root = t.Root,
    e.Text = t.Text,
    e.Directive = t.Directive,
    e.Comment = t.Comment,
    e.Script = t.Script,
    e.Style = t.Style,
    e.Tag = t.Tag,
    e.CDATA = t.CDATA,
    e.Doctype = t.Doctype
}
)(Go);
var B = {}
  , nt = Le && Le.__extends || function() {
    var e = function(t, n) {
        return e = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(r, o) {
            r.__proto__ = o
        }
        || function(r, o) {
            for (var i in o)
                Object.prototype.hasOwnProperty.call(o, i) && (r[i] = o[i])
        }
        ,
        e(t, n)
    };
    return function(t, n) {
        if (typeof n != "function" && n !== null)
            throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
        e(t, n);
        function r() {
            this.constructor = t
        }
        t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype,
        new r)
    }
}()
  , tn = Le && Le.__assign || function() {
    return tn = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) {
            t = arguments[n];
            for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
        }
        return e
    }
    ,
    tn.apply(this, arguments)
}
;
Object.defineProperty(B, "__esModule", {
    value: !0
});
B.cloneNode = B.hasChildren = B.isDocument = B.isDirective = B.isComment = B.isText = B.isCDATA = B.isTag = B.Element = B.Document = B.CDATA = B.NodeWithChildren = B.ProcessingInstruction = B.Comment = B.Text = B.DataNode = B.Node = void 0;
var ye = Go
  , Yo = function() {
    function e() {
        this.parent = null,
        this.prev = null,
        this.next = null,
        this.startIndex = null,
        this.endIndex = null
    }
    return Object.defineProperty(e.prototype, "parentNode", {
        get: function() {
            return this.parent
        },
        set: function(t) {
            this.parent = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "previousSibling", {
        get: function() {
            return this.prev
        },
        set: function(t) {
            this.prev = t
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "nextSibling", {
        get: function() {
            return this.next
        },
        set: function(t) {
            this.next = t
        },
        enumerable: !1,
        configurable: !0
    }),
    e.prototype.cloneNode = function(t) {
        return t === void 0 && (t = !1),
        Xo(this, t)
    }
    ,
    e
}();
B.Node = Yo;
var vr = function(e) {
    nt(t, e);
    function t(n) {
        var r = e.call(this) || this;
        return r.data = n,
        r
    }
    return Object.defineProperty(t.prototype, "nodeValue", {
        get: function() {
            return this.data
        },
        set: function(n) {
            this.data = n
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(Yo);
B.DataNode = vr;
var fc = function(e) {
    nt(t, e);
    function t() {
        var n = e !== null && e.apply(this, arguments) || this;
        return n.type = ye.ElementType.Text,
        n
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 3
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(vr);
B.Text = fc;
var dc = function(e) {
    nt(t, e);
    function t() {
        var n = e !== null && e.apply(this, arguments) || this;
        return n.type = ye.ElementType.Comment,
        n
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 8
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(vr);
B.Comment = dc;
var hc = function(e) {
    nt(t, e);
    function t(n, r) {
        var o = e.call(this, r) || this;
        return o.name = n,
        o.type = ye.ElementType.Directive,
        o
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 1
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(vr);
B.ProcessingInstruction = hc;
var br = function(e) {
    nt(t, e);
    function t(n) {
        var r = e.call(this) || this;
        return r.children = n,
        r
    }
    return Object.defineProperty(t.prototype, "firstChild", {
        get: function() {
            var n;
            return (n = this.children[0]) !== null && n !== void 0 ? n : null
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "lastChild", {
        get: function() {
            return this.children.length > 0 ? this.children[this.children.length - 1] : null
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "childNodes", {
        get: function() {
            return this.children
        },
        set: function(n) {
            this.children = n
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(Yo);
B.NodeWithChildren = br;
var pc = function(e) {
    nt(t, e);
    function t() {
        var n = e !== null && e.apply(this, arguments) || this;
        return n.type = ye.ElementType.CDATA,
        n
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 4
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(br);
B.CDATA = pc;
var gc = function(e) {
    nt(t, e);
    function t() {
        var n = e !== null && e.apply(this, arguments) || this;
        return n.type = ye.ElementType.Root,
        n
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 9
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(br);
B.Document = gc;
var mc = function(e) {
    nt(t, e);
    function t(n, r, o, i) {
        o === void 0 && (o = []),
        i === void 0 && (i = n === "script" ? ye.ElementType.Script : n === "style" ? ye.ElementType.Style : ye.ElementType.Tag);
        var s = e.call(this, o) || this;
        return s.name = n,
        s.attribs = r,
        s.type = i,
        s
    }
    return Object.defineProperty(t.prototype, "nodeType", {
        get: function() {
            return 1
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "tagName", {
        get: function() {
            return this.name
        },
        set: function(n) {
            this.name = n
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "attributes", {
        get: function() {
            var n = this;
            return Object.keys(this.attribs).map(function(r) {
                var o, i;
                return {
                    name: r,
                    value: n.attribs[r],
                    namespace: (o = n["x-attribsNamespace"]) === null || o === void 0 ? void 0 : o[r],
                    prefix: (i = n["x-attribsPrefix"]) === null || i === void 0 ? void 0 : i[r]
                }
            })
        },
        enumerable: !1,
        configurable: !0
    }),
    t
}(br);
B.Element = mc;
function vc(e) {
    return (0,
    ye.isTag)(e)
}
B.isTag = vc;
function bc(e) {
    return e.type === ye.ElementType.CDATA
}
B.isCDATA = bc;
function yc(e) {
    return e.type === ye.ElementType.Text
}
B.isText = yc;
function wc(e) {
    return e.type === ye.ElementType.Comment
}
B.isComment = wc;
function _c(e) {
    return e.type === ye.ElementType.Directive
}
B.isDirective = _c;
function Tc(e) {
    return e.type === ye.ElementType.Root
}
B.isDocument = Tc;
function wh(e) {
    return Object.prototype.hasOwnProperty.call(e, "children")
}
B.hasChildren = wh;
function Xo(e, t) {
    t === void 0 && (t = !1);
    var n;
    if (yc(e))
        n = new fc(e.data);
    else if (wc(e))
        n = new dc(e.data);
    else if (vc(e)) {
        var r = t ? jr(e.children) : []
          , o = new mc(e.name,tn({}, e.attribs),r);
        r.forEach(function(c) {
            return c.parent = o
        }),
        e.namespace != null && (o.namespace = e.namespace),
        e["x-attribsNamespace"] && (o["x-attribsNamespace"] = tn({}, e["x-attribsNamespace"])),
        e["x-attribsPrefix"] && (o["x-attribsPrefix"] = tn({}, e["x-attribsPrefix"])),
        n = o
    } else if (bc(e)) {
        var r = t ? jr(e.children) : []
          , i = new pc(r);
        r.forEach(function(u) {
            return u.parent = i
        }),
        n = i
    } else if (Tc(e)) {
        var r = t ? jr(e.children) : []
          , s = new gc(r);
        r.forEach(function(u) {
            return u.parent = s
        }),
        e["x-mode"] && (s["x-mode"] = e["x-mode"]),
        n = s
    } else if (_c(e)) {
        var l = new hc(e.name,e.data);
        e["x-name"] != null && (l["x-name"] = e["x-name"],
        l["x-publicId"] = e["x-publicId"],
        l["x-systemId"] = e["x-systemId"]),
        n = l
    } else
        throw new Error("Not implemented yet: ".concat(e.type));
    return n.startIndex = e.startIndex,
    n.endIndex = e.endIndex,
    e.sourceCodeLocation != null && (n.sourceCodeLocation = e.sourceCodeLocation),
    n
}
B.cloneNode = Xo;
function jr(e) {
    for (var t = e.map(function(r) {
        return Xo(r, !0)
    }), n = 1; n < t.length; n++)
        t[n].prev = t[n - 1],
        t[n - 1].next = t[n];
    return t
}
(function(e) {
    var t = Le && Le.__createBinding || (Object.create ? function(l, c, u, a) {
        a === void 0 && (a = u);
        var h = Object.getOwnPropertyDescriptor(c, u);
        (!h || ("get"in h ? !c.__esModule : h.writable || h.configurable)) && (h = {
            enumerable: !0,
            get: function() {
                return c[u]
            }
        }),
        Object.defineProperty(l, a, h)
    }
    : function(l, c, u, a) {
        a === void 0 && (a = u),
        l[a] = c[u]
    }
    )
      , n = Le && Le.__exportStar || function(l, c) {
        for (var u in l)
            u !== "default" && !Object.prototype.hasOwnProperty.call(c, u) && t(c, l, u)
    }
    ;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.DomHandler = void 0;
    var r = Go
      , o = B;
    n(B, e);
    var i = {
        withStartIndices: !1,
        withEndIndices: !1,
        xmlMode: !1
    }
      , s = function() {
        function l(c, u, a) {
            this.dom = [],
            this.root = new o.Document(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null,
            typeof u == "function" && (a = u,
            u = i),
            typeof c == "object" && (u = c,
            c = void 0),
            this.callback = c ?? null,
            this.options = u ?? i,
            this.elementCB = a ?? null
        }
        return l.prototype.onparserinit = function(c) {
            this.parser = c
        }
        ,
        l.prototype.onreset = function() {
            this.dom = [],
            this.root = new o.Document(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null
        }
        ,
        l.prototype.onend = function() {
            this.done || (this.done = !0,
            this.parser = null,
            this.handleCallback(null))
        }
        ,
        l.prototype.onerror = function(c) {
            this.handleCallback(c)
        }
        ,
        l.prototype.onclosetag = function() {
            this.lastNode = null;
            var c = this.tagStack.pop();
            this.options.withEndIndices && (c.endIndex = this.parser.endIndex),
            this.elementCB && this.elementCB(c)
        }
        ,
        l.prototype.onopentag = function(c, u) {
            var a = this.options.xmlMode ? r.ElementType.Tag : void 0
              , h = new o.Element(c,u,void 0,a);
            this.addNode(h),
            this.tagStack.push(h)
        }
        ,
        l.prototype.ontext = function(c) {
            var u = this.lastNode;
            if (u && u.type === r.ElementType.Text)
                u.data += c,
                this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
            else {
                var a = new o.Text(c);
                this.addNode(a),
                this.lastNode = a
            }
        }
        ,
        l.prototype.oncomment = function(c) {
            if (this.lastNode && this.lastNode.type === r.ElementType.Comment) {
                this.lastNode.data += c;
                return
            }
            var u = new o.Comment(c);
            this.addNode(u),
            this.lastNode = u
        }
        ,
        l.prototype.oncommentend = function() {
            this.lastNode = null
        }
        ,
        l.prototype.oncdatastart = function() {
            var c = new o.Text("")
              , u = new o.CDATA([c]);
            this.addNode(u),
            c.parent = u,
            this.lastNode = c
        }
        ,
        l.prototype.oncdataend = function() {
            this.lastNode = null
        }
        ,
        l.prototype.onprocessinginstruction = function(c, u) {
            var a = new o.ProcessingInstruction(c,u);
            this.addNode(a)
        }
        ,
        l.prototype.handleCallback = function(c) {
            if (typeof this.callback == "function")
                this.callback(c, this.dom);
            else if (c)
                throw c
        }
        ,
        l.prototype.addNode = function(c) {
            var u = this.tagStack[this.tagStack.length - 1]
              , a = u.children[u.children.length - 1];
            this.options.withStartIndices && (c.startIndex = this.parser.startIndex),
            this.options.withEndIndices && (c.endIndex = this.parser.endIndex),
            u.children.push(c),
            a && (c.prev = a,
            a.next = c),
            c.parent = u,
            this.lastNode = null
        }
        ,
        l
    }();
    e.DomHandler = s,
    e.default = s
}
)(ac);
var Ec = {};
(function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES = void 0,
    e.CASE_SENSITIVE_TAG_NAMES = ["animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"],
    e.CASE_SENSITIVE_TAG_NAMES_MAP = e.CASE_SENSITIVE_TAG_NAMES.reduce(function(t, n) {
        return t[n.toLowerCase()] = n,
        t
    }, {})
}
)(Ec);
Object.defineProperty(mr, "__esModule", {
    value: !0
});
mr.formatAttributes = xc;
mr.formatDOM = Cc;
var Mn = ac
  , _h = Ec;
function Th(e) {
    return _h.CASE_SENSITIVE_TAG_NAMES_MAP[e]
}
function xc(e) {
    for (var t = {}, n = 0, r = e.length; n < r; n++) {
        var o = e[n];
        t[o.name] = o.value
    }
    return t
}
function Eh(e) {
    e = e.toLowerCase();
    var t = Th(e);
    return t || e
}
function Cc(e, t, n) {
    t === void 0 && (t = null);
    for (var r = [], o, i = 0, s = e.length; i < s; i++) {
        var l = e[i];
        switch (l.nodeType) {
        case 1:
            {
                var c = Eh(l.nodeName);
                o = new Mn.Element(c,xc(l.attributes)),
                o.children = Cc(c === "template" ? l.content.childNodes : l.childNodes, o);
                break
            }
        case 3:
            o = new Mn.Text(l.nodeValue);
            break;
        case 8:
            o = new Mn.Comment(l.nodeValue);
            break;
        default:
            continue
        }
        var u = r[i - 1] || null;
        u && (u.next = o),
        o.parent = t,
        o.prev = u,
        o.next = null,
        r.push(o)
    }
    return n && (o = new Mn.ProcessingInstruction(n.substring(0, n.indexOf(" ")).toLowerCase(),n),
    o.next = r[0] || null,
    o.parent = t,
    r.unshift(o),
    r[1] && (r[1].prev = r[0])),
    r
}
var xh = Le && Le.__importDefault || function(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
;
Object.defineProperty(uc, "__esModule", {
    value: !0
});
var fs = uc.default = Oh
  , Ch = xh(Qo)
  , Ah = mr
  , Sh = /<(![a-zA-Z\s]+)>/;
function Oh(e) {
    if (typeof e != "string")
        throw new TypeError("First argument must be a string");
    if (!e)
        return [];
    var t = e.match(Sh)
      , n = t ? t[1] : void 0;
    return (0,
    Ah.formatDOM)((0,
    Ch.default)(e), null, n)
}
fs.default;
var Ih = typeof global == "object" && global && global.Object === Object && global;
const Ph = Ih;
var Mh = typeof self == "object" && self && self.Object === Object && self
  , Nh = Ph || Mh || Function("return this")();
const Ac = Nh;
var jh = Ac.Symbol;
const Xn = jh;
var Sc = Object.prototype
  , Fh = Sc.hasOwnProperty
  , Dh = Sc.toString
  , Kt = Xn ? Xn.toStringTag : void 0;
function Rh(e) {
    var t = Fh.call(e, Kt)
      , n = e[Kt];
    try {
        e[Kt] = void 0;
        var r = !0
    } catch {}
    var o = Dh.call(e);
    return r && (t ? e[Kt] = n : delete e[Kt]),
    o
}
var Lh = Object.prototype
  , $h = Lh.toString;
function kh(e) {
    return $h.call(e)
}
var Hh = "[object Null]"
  , Bh = "[object Undefined]"
  , ds = Xn ? Xn.toStringTag : void 0;
function Uh(e) {
    return e == null ? e === void 0 ? Bh : Hh : ds && ds in Object(e) ? Rh(e) : kh(e)
}
function Wh(e) {
    return e != null && typeof e == "object"
}
var Kh = "[object Symbol]";
function Vh(e) {
    return typeof e == "symbol" || Wh(e) && Uh(e) == Kh
}
var qh = /\s/;
function zh(e) {
    for (var t = e.length; t-- && qh.test(e.charAt(t)); )
        ;
    return t
}
var Jh = /^\s+/;
function Qh(e) {
    return e && e.slice(0, zh(e) + 1).replace(Jh, "")
}
function fo(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function")
}
var hs = 0 / 0
  , Gh = /^[-+]0x[0-9a-f]+$/i
  , Yh = /^0b[01]+$/i
  , Xh = /^0o[0-7]+$/i
  , Zh = parseInt;
function ps(e) {
    if (typeof e == "number")
        return e;
    if (Vh(e))
        return hs;
    if (fo(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = fo(t) ? t + "" : t
    }
    if (typeof e != "string")
        return e === 0 ? e : +e;
    e = Qh(e);
    var n = Yh.test(e);
    return n || Xh.test(e) ? Zh(e.slice(2), n ? 2 : 8) : Gh.test(e) ? hs : +e
}
var ep = function() {
    return Ac.Date.now()
};
const Fr = ep;
var tp = "Expected a function"
  , np = Math.max
  , rp = Math.min;
function Pp(e, t, n) {
    var r, o, i, s, l, c, u = 0, a = !1, h = !1, p = !0;
    if (typeof e != "function")
        throw new TypeError(tp);
    t = ps(t) || 0,
    fo(n) && (a = !!n.leading,
    h = "maxWait"in n,
    i = h ? np(ps(n.maxWait) || 0, t) : i,
    p = "trailing"in n ? !!n.trailing : p);
    function m(S) {
        var F = r
          , $ = o;
        return r = o = void 0,
        u = S,
        s = e.apply($, F),
        s
    }
    function _(S) {
        return u = S,
        l = setTimeout(L, t),
        a ? m(S) : s
    }
    function w(S) {
        var F = S - c
          , $ = S - u
          , te = t - F;
        return h ? rp(te, i - $) : te
    }
    function O(S) {
        var F = S - c
          , $ = S - u;
        return c === void 0 || F >= t || F < 0 || h && $ >= i
    }
    function L() {
        var S = Fr();
        if (O(S))
            return j(S);
        l = setTimeout(L, w(S))
    }
    function j(S) {
        return l = void 0,
        p && r ? m(S) : (r = o = void 0,
        s)
    }
    function H() {
        l !== void 0 && clearTimeout(l),
        u = 0,
        r = c = o = l = void 0
    }
    function C() {
        return l === void 0 ? s : j(Fr())
    }
    function K() {
        var S = Fr()
          , F = O(S);
        if (r = arguments,
        o = this,
        c = S,
        F) {
            if (l === void 0)
                return _(c);
            if (h)
                return clearTimeout(l),
                l = setTimeout(L, t),
                m(c)
        }
        return l === void 0 && (l = setTimeout(L, t)),
        s
    }
    return K.cancel = H,
    K.flush = C,
    K
}
z(new Date);
let op;
function ip() {
    return op
}
function sp(e) {
    return typeof e == "function" ? e() : or(e)
}
function ho(e) {
    if (e instanceof Promise)
        return e;
    const t = sp(e);
    if (!e || !t)
        return t;
    if (Array.isArray(t))
        return t.map(n => ho(n));
    if (typeof t == "object") {
        const n = {};
        for (const r in t)
            if (Object.prototype.hasOwnProperty.call(t, r)) {
                if (r === "titleTemplate" || r[0] === "o" && r[1] === "n") {
                    n[r] = or(t[r]);
                    continue
                }
                n[r] = ho(t[r])
            }
        return n
    }
    return t
}
const lp = "usehead"
  , gs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , ms = "__unhead_injection_handler__";
function cp() {
    if (ms in gs)
        return gs[ms]();
    const e = be(lp);
    return e || ip()
}
function Mp(e, t={}) {
    const n = t.head || cp();
    if (n)
        return n.ssr ? n.push(e, t) : up(n, e, t)
}
function up(e, t, n={}) {
    const r = z(!1)
      , o = z({});
    He( () => {
        o.value = r.value ? {} : ho(t)
    }
    );
    const i = e.push(o.value, n);
    return Ae(o, l => {
        i.patch(l)
    }
    ),
    fr() && (Ys( () => {
        i.dispose()
    }
    ),
    Qs( () => {
        r.value = !0
    }
    ),
    Js( () => {
        r.value = !1
    }
    )),
    i
}
export {Ys as A, pp as B, gp as C, _p as D, sr as E, Ce as F, Cp as G, Mp as H, tt as I, ga as J, W as K, dp as L, hp as M, xp as Y, Tp as a, bp as b, yp as c, fl as d, ul as e, ge as f, wp as g, xe as h, or as i, pa as j, mp as k, Sp as l, Op as m, yo as n, ll as o, cc as p, z as q, vp as r, Ae as s, fp as t, ch as u, Ap as v, Su as w, Pp as x, Ip as y, ke as z};
