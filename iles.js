import {c as p, a as s, h as d} from "./vendor-vue.5f1410ab.js";
var u = e => document.getElementById(e) || console.error(`Missing #${e}, could not mount island.`);
function y(e, r, o, a, t) {
    const n = u(o);
    n && (e(r, o, n, a, t),
    n.setAttribute("hydrated", ""))
}
var f = s;
function b(e, r, o, a, t) {
    const n = t && Object.fromEntries(Object.entries(t).map( ([c,i]) => [c, () => p(i)]));
    f({
        render: () => d(e, a, n)
    }).mount(o, !!t)
}
export {b as c, y as h};
