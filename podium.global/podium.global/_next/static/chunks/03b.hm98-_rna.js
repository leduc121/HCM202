(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 84558, e => {
    "use strict";
    var t = e.i(71645);
    e.s(["useTouch", 0, function() {
        let [e, r] = (0, t.useState)(!1);
        return (0, t.useEffect)(() => {
            let e = window.matchMedia("(pointer: coarse)");
            r(e.matches);
            let t = e => r(e.matches);
            return e.addEventListener("change", t), () => e.removeEventListener("change", t)
        }, []), e
    }])
}, 1983, 35953, 63290, e => {
    "use strict";
    var t = e.i(43476),
        r = e.i(71645),
        n = e.i(78827),
        i = e.i(98823);
    e.s(["CoverVideo", 0, function({
        src: e,
        mobileSrc: s,
        hlsSrc: u,
        className: a,
        onLoadedMetadata: c,
        ...o
    }) {
        let d = (0, r.useRef)(null),
            {
                src: l,
                isMobileSource: m
            } = (0, i.useResponsiveVideoSource)(e, s),
            p = l ? (0, n.withSafariVideoFrameNudge)(l) : null,
            h = !!u && !!l && !m;
        return (0, t.jsxs)("video", {
            ref: d,
            muted: !0,
            playsInline: !0,
            preload: "metadata",
            onLoadedMetadata: e => {
                (0, n.nudgeSafariVideoFrame)(e.currentTarget), c ?.(e)
            },
            className: a,
            ...o,
            children: [h && (0, t.jsx)("source", {
                src: u,
                type: "application/vnd.apple.mpegurl"
            }), p && (0, t.jsx)("source", {
                src: p,
                type: "video/mp4"
            })]
        }, p ?? "pending")
    }], 1983), e.s(["getVideoCurrentTime", 0, function(e) {
        let t = e ?.querySelector("video");
        return t && Number.isFinite(t.currentTime) ? t.currentTime : null
    }], 35953);
    e.s(["fluidPx", 0, function(e) {
        return e / 1512 * window.innerWidth
    }], 63290)
}, 37107, e => {
    "use strict";
    var t = e.i(71645);
    e.s(["useIsDesktop", 0, function() {
        let [e, r] = (0, t.useState)(!1);
        return (0, t.useEffect)(() => {
            let e = window.matchMedia("(min-width: 768px)"),
                t = () => r(e.matches);
            return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t)
        }, []), e
    }])
}]);