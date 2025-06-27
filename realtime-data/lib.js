const instruments = require('./instruments_symbols.js');


function decodeUint8ArrayToTimestamp(uint8Array) {
    let timestampString = "";
    for (let i = 0; i < uint8Array.length; i++) {
        timestampString += String.fromCharCode(uint8Array[i]);
    }

    // Convert the timestamp string to a numeric value (assuming it's in seconds)
    const numericValue = parseInt(timestampString, 10);

    // Create a Date object from the numeric value (in seconds)
    const date = new Date(numericValue * 1000);

    return date;
}

var n = Uint8Array,
    o = Uint16Array,
    a = Uint32Array,
    i = new n([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    u = new n([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    l = new n([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    s = function (e, t) {
        for (var r = new o(31), n = 0; n < 31; ++n) r[n] = t += 1 << e[n - 1];
        var i = new a(r[30]);
        for (n = 1; n < 30; ++n)
            for (var u = r[n]; u < r[n + 1]; ++u) i[u] = u - r[n] << 5 | n;
        return [r, i]
    },
    c = s(i, 2),
    f = c[0],
    d = c[1];
f[28] = 258, d[258] = 28;
for (var p = s(u, 0), h = p[0], v = (p[1], new o(32768)), m = 0; m < 32768; ++m) {
    var y = (43690 & m) >>> 1 | (21845 & m) << 1;
    y = (61680 & (y = (52428 & y) >>> 2 | (13107 & y) << 2)) >>> 4 | (3855 & y) << 4, v[m] = ((65280 & y) >>> 8 | (255 & y) << 8) >>> 1
}
var g = function (e, t, r) {
    for (var n = e.length, a = 0, i = new o(t); a < n; ++a) ++i[e[a] - 1];
    var u, l = new o(t);
    for (a = 0; a < t; ++a) l[a] = l[a - 1] + i[a - 1] << 1;
    if (r) {
        u = new o(1 << t);
        var s = 15 - t;
        for (a = 0; a < n; ++a)
            if (e[a])
                for (var c = a << 4 | e[a], f = t - e[a], d = l[e[a] - 1]++ << f, p = d | (1 << f) - 1; d <= p; ++d) u[v[d] >>> s] = c
    } else
        for (u = new o(n), a = 0; a < n; ++a) e[a] && (u[a] = v[l[e[a] - 1]++] >>> 15 - e[a]);
    return u
},
    b = new n(288);
for (m = 0; m < 144; ++m) b[m] = 8;
for (m = 144; m < 256; ++m) b[m] = 9;
for (m = 256; m < 280; ++m) b[m] = 7;
for (m = 280; m < 288; ++m) b[m] = 8;
var _ = new n(32);
for (m = 0; m < 32; ++m) _[m] = 5;
var w = g(b, 9, 1),
    x = g(_, 5, 1),
    E = function (e) {
        for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r]);
        return t
    },
    S = function (e, t, r) {
        var n = t / 8 | 0;
        return (e[n] | e[n + 1] << 8) >> (7 & t) & r
    },
    O = function (e, t) {
        var r = t / 8 | 0;
        return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (7 & t)
    },
    k = function (e) {
        return (e / 8 | 0) + (7 & e && 1)
    },
    T = function (e, t, r) {
        (null == t || t < 0) && (t = 0), (null == r || r > e.length) && (r = e.length);
        var i = new (e instanceof o ? o : e instanceof a ? a : n)(r - t);
        return i.set(e.subarray(t, r)), i
    },
    P = function (e, t, r) {
        var o = e.length;
        if (!o || r && !r.l && o < 5) return t || new n(0);
        var a = !t || r,
            s = !r || r.i;
        r || (r = {}), t || (t = new n(3 * o));
        var c = function (e) {
            var r = t.length;
            if (e > r) {
                var o = new n(Math.max(2 * r, e));
                o.set(t), t = o
            }
        },
            d = r.f || 0,
            p = r.p || 0,
            v = r.b || 0,
            m = r.l,
            y = r.d,
            b = r.m,
            _ = r.n,
            P = 8 * o;
        do {
            if (!m) {
                r.f = d = S(e, p, 1);
                var R = S(e, p + 1, 3);
                if (p += 3, !R) {
                    var A = e[(Y = k(p) + 4) - 4] | e[Y - 3] << 8,
                        M = Y + A;
                    if (M > o) {
                        if (s) throw "unexpected EOF";
                        break
                    }
                    a && c(v + A), t.set(e.subarray(Y, M), v), r.b = v += A, r.p = p = 8 * M;
                    continue
                }
                if (1 == R) m = w, y = x, b = 9, _ = 5;
                else {
                    if (2 != R) throw "invalid block type";
                    var C = S(e, p, 31) + 257,
                        j = S(e, p + 10, 15) + 4,
                        I = C + S(e, p + 5, 31) + 1;
                    p += 14;
                    for (var N = new n(I), D = new n(19), L = 0; L < j; ++L) D[l[L]] = S(e, p + 3 * L, 7);
                    p += 3 * j;
                    var U = E(D),
                        F = (1 << U) - 1,
                        z = g(D, U, 1);
                    for (L = 0; L < I;) {
                        var Y, B = z[S(e, p, F)];
                        if (p += 15 & B, (Y = B >>> 4) < 16) N[L++] = Y;
                        else {
                            var W = 0,
                                H = 0;
                            for (16 == Y ? (H = 3 + S(e, p, 3), p += 2, W = N[L - 1]) : 17 == Y ? (H = 3 + S(e, p, 7), p += 3) : 18 == Y && (H = 11 + S(e, p, 127), p += 7); H--;) N[L++] = W
                        }
                    }
                    var q = N.subarray(0, C),
                        V = N.subarray(C);
                    b = E(q), _ = E(V), m = g(q, b, 1), y = g(V, _, 1)
                }
                if (p > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
            }
            a && c(v + 131072);
            for (var $ = (1 << b) - 1, G = (1 << _) - 1, K = p; ; K = p) {
                var X = (W = m[O(e, p) & $]) >>> 4;
                if ((p += 15 & W) > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
                if (!W) throw "invalid length/literal";
                if (X < 256) t[v++] = X;
                else {
                    if (256 == X) {
                        K = p, m = null;
                        break
                    }
                    var Z = X - 254;
                    if (X > 264) {
                        var Q = i[L = X - 257];
                        Z = S(e, p, (1 << Q) - 1) + f[L], p += Q
                    }
                    var J = y[O(e, p) & G],
                        ee = J >>> 4;
                    if (!J) throw "invalid distance";
                    p += 15 & J;
                    V = h[ee];
                    if (ee > 3) {
                        Q = u[ee];
                        V += O(e, p) & (1 << Q) - 1, p += Q
                    }
                    if (p > P) {
                        if (s) throw "unexpected EOF";
                        break
                    }
                    a && c(v + 131072);
                    for (var te = v + Z; v < te; v += 4) t[v] = t[v - V], t[v + 1] = t[v + 1 - V], t[v + 2] = t[v + 2 - V], t[v + 3] = t[v + 3 - V];
                    v = te
                }
            }
            r.l = m, r.p = K, r.b = v, m && (d = 1, r.m = b, r.d = y, r.n = _)
        } while (!d);
        return v == t.length ? t : T(t, 0, v)
    },
    R = new n(0),
    A = function (e) {
        if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw "invalid gzip data";
        var t = e[3],
            r = 10;
        4 & t && (r += e[10] | 2 + (e[11] << 8));
        for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++]);
        return r + (2 & t)
    },
    M = function (e) {
        var t = e.length;
        return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
    },
    C = function (e) {
        if (8 != (15 & e[0]) || e[0] >>> 4 > 7 || (e[0] << 8 | e[1]) % 31) throw "invalid zlib data";
        if (32 & e[1]) throw "invalid zlib data: preset dictionaries not supported"
    };

function j(e, t) {
    return P(e, t)
}

function I(e, t) {
    return P(e.subarray(A(e), -8), t || new n(M(e)))
}

function N(e, t) {
    return P((C(e), e.subarray(2, -4)), t)
}

function D(e, t) {
    return 31 == e[0] && 139 == e[1] && 8 == e[2] ? I(e, t) : 8 != (15 & e[0]) || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31 ? j(e, t) : N(e, t)
}
var L = "undefined" != typeof TextDecoder && new TextDecoder;
try {
    L.decode(R, {
        stream: !0
    }), 1
} catch (U) { }

// 

// Secomd
function HR(e) {
    var t, i, n;
    const {
        underlyingToken: o,
        expiry: r,
        optionChain: a
    } = e;
    return {
        [o]: {
            [r]: {
                atm_strike: Number.isFinite(a.atm_strike) ? a.atm_strike : null,
                atm_iv: Number.isFinite(a.atm_iv) ? 100 * a.atm_iv : null,
                atm_iv_change: Number.isFinite(a.atm_iv_change) ? 100 * a.atm_iv_change : null,
                atm_iv_percentile: Number.isFinite(a.atm_iv_percentile) ? 100 * a.atm_iv_percentile : null,
                atm_ivp_type: null !== (t = null === a || void 0 === a ? void 0 : a.atm_ivp_type) && void 0 !== t ? t : null,
                pcr: null !== (i = null === a || void 0 === a ? void 0 : a.pcr) && void 0 !== i ? i : null,
                max_pain_strike: null !== (n = null === a || void 0 === a ? void 0 : a.max_pain_strike) && void 0 !== n ? n : null,
                chain: null !== a && void 0 !== a && a.chain ? Object.keys(a.chain).reduce(((e, t) => (a.chain[t] && (e[t] = function (e, t) {
                    const i = {
                        CE: e.call || {},
                        PE: e.put || {},
                        strike: +t,
                        pcr: e.pcr,
                        ivChange: Number.isFinite(e.iv_change) ? 100 * e.iv_change : null
                    };
                    if (void 0 !== e.greeks && null !== e.greeks) {
                        const t = e.greeks.call_delta || null;
                        i.greeks = {
                            callDelta: Number.isFinite(t) ? t : null,
                            gamma: e.greeks.gamma,
                            impliedVolatility: 100 * e.greeks.iv,
                            putDelta: Number.isFinite(t) ? t - 1 : null,
                            theta: e.greeks.theta,
                            vega: e.greeks.vega
                        }
                    } else i.greeks = {};
                    return i
                }(a.chain[t], t)), e)), {}) : {}
            }
        }
    }
}

// 

const WR = {
    INVALID: 0,
    QUOTE: 1,
    OPTION_CHAIN: 3,
    UNDERLYING_STATS: 5,
    ORDER_UPDATES: 6,
    SCREENER_STATS: 7,
    COMMON_EVENTS: 8,
    NSE_EVENTS: 9,
    CUSTOM_PING: 253,
    CUSTOM_PONG: 254
};

const JR = {
    INVALID: 0,
    QUOTE: 1,
    OPTION_CHAIN: 3,
    UNDERLYING_STATS: 5,
    ORDER_UPDATES: 6,
    SCREENER_STATS: 7,
    COMMON_EVENTS: 8,
    NSE_EVENTS: 9,
    CUSTOM_PING: 253,
    CUSTOM_PONG: 254
};

function A(e) {
    if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw "invalid gzip data";
    var t = e[3],
        r = 10;
    4 & t && (r += e[10] | 2 + (e[11] << 8));
    for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++]);
    return r + (2 & t)
}

function Hr_iF(e, t) {
    // console.log('boom', e, t);
    return 31 == e[0] && 139 == e[1] && 8 == e[2] ? I(e, t) : 8 != (15 & e[0]) || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31 ? j(e, t) : N(e, t)
}

function I(e, t) {
    return P(e.subarray(A(e), -8), t || new n(M(e)))
}

function P(e, t, r) {
    var o = e.length;
    if (!o || r && !r.l && o < 5) return t || new n(0);
    var a = !t || r,
        s = !r || r.i;
    r || (r = {}), t || (t = new n(3 * o));
    var c = function (e) {
        var r = t.length;
        if (e > r) {
            var o = new n(Math.max(2 * r, e));
            o.set(t), t = o
        }
    },
        d = r.f || 0,
        p = r.p || 0,
        v = r.b || 0,
        m = r.l,
        y = r.d,
        b = r.m,
        _ = r.n,
        P = 8 * o;
    do {
        if (!m) {
            r.f = d = S(e, p, 1);
            var R = S(e, p + 1, 3);
            if (p += 3, !R) {
                var A = e[(Y = k(p) + 4) - 4] | e[Y - 3] << 8,
                    M = Y + A;
                if (M > o) {
                    if (s) throw "unexpected EOF";
                    break
                }
                a && c(v + A), t.set(e.subarray(Y, M), v), r.b = v += A, r.p = p = 8 * M;
                continue
            }
            if (1 == R) m = w, y = x, b = 9, _ = 5;
            else {
                if (2 != R) throw "invalid block type";
                var C = S(e, p, 31) + 257,
                    j = S(e, p + 10, 15) + 4,
                    I = C + S(e, p + 5, 31) + 1;
                p += 14;
                for (var N = new n(I), D = new n(19), L = 0; L < j; ++L) D[l[L]] = S(e, p + 3 * L, 7);
                p += 3 * j;
                var U = E(D),
                    F = (1 << U) - 1,
                    z = g(D, U, 1);
                for (L = 0; L < I;) {
                    var Y, B = z[S(e, p, F)];
                    if (p += 15 & B, (Y = B >>> 4) < 16) N[L++] = Y;
                    else {
                        var W = 0,
                            H = 0;
                        for (16 == Y ? (H = 3 + S(e, p, 3), p += 2, W = N[L - 1]) : 17 == Y ? (H = 3 + S(e, p, 7), p += 3) : 18 == Y && (H = 11 + S(e, p, 127), p += 7); H--;) N[L++] = W
                    }
                }
                var q = N.subarray(0, C),
                    V = N.subarray(C);
                b = E(q), _ = E(V), m = g(q, b, 1), y = g(V, _, 1)
            }
            if (p > P) {
                if (s) throw "unexpected EOF";
                break
            }
        }
        a && c(v + 131072);
        for (var $ = (1 << b) - 1, G = (1 << _) - 1, K = p; ; K = p) {
            var X = (W = m[O(e, p) & $]) >>> 4;
            if ((p += 15 & W) > P) {
                if (s) throw "unexpected EOF";
                break
            }
            if (!W) throw "invalid length/literal";
            if (X < 256) t[v++] = X;
            else {
                if (256 == X) {
                    K = p, m = null;
                    break
                }
                var Z = X - 254;
                if (X > 264) {
                    var Q = i[L = X - 257];
                    Z = S(e, p, (1 << Q) - 1) + f[L], p += Q
                }
                var J = y[O(e, p) & G],
                    ee = J >>> 4;
                if (!J) throw "invalid distance";
                p += 15 & J;
                V = h[ee];
                if (ee > 3) {
                    Q = u[ee];
                    V += O(e, p) & (1 << Q) - 1, p += Q
                }
                if (p > P) {
                    if (s) throw "unexpected EOF";
                    break
                }
                a && c(v + 131072);
                for (var te = v + Z; v < te; v += 4) t[v] = t[v - V], t[v + 1] = t[v + 1 - V], t[v + 2] = t[v + 2 - V], t[v + 3] = t[v + 3 - V];
                v = te
            }
        }
        r.l = m, r.p = K, r.b = v, m && (d = 1, r.m = b, r.d = y, r.n = _)
    } while (!d);
    return v == t.length ? t : T(t, 0, v)
}

function Fr(e) {
    const t = new Uint8Array(e);
    let i = 0;
    const n = t.length;
    for (let o = 0, r = n - 1; o < n; o++, r--) i += t[r] << 8 * o;
    return i
}

function RR(e, t, i) {
    "use strict";
    i.d(t, {
        F7: () => E,
        J_: () => g,
        Th: () => N,
        Tn: () => y,
        Zs: () => m,
        dL: () => M,
        eF: () => T,
        o5: () => I,
        p6: () => p
    });
    var n = i(72981),
        o = i(63148),
        r = i.n(o),
        a = i(15616),
        l = i.n(a),
        s = i(62382),
        d = i.n(s),
        c = i(91884),
        u = i.n(c);

    function g(e) {
        return d()(e)
    }
    const p = (e, t) => {
        try {
            return l()(new Date(e), t)
        } catch (i) {
            return e.toString()
        }
    },
        I = e => {
            try {
                return l()(new Date(e), "yyyy-MM-dd")
            } catch (t) {
                return e.toString()
            }
        },
        y = e => {
            try {
                return l()(new Date(e), "dd MMM")
            } catch (t) {
                return e.toString()
            }
        };

    function M(e) {
        try {
            return l()(new Date(e), "MMM do")
        } catch (t) {
            return e
        }
    }
    const m = (e, t) => {
        try {
            const i = u()(e, "yyyy-MM-dd", new Date),
                n = u()(t, "yyyy-MM-dd", new Date);
            return r()(n, i)
        } catch (i) {
            return NaN
        }
    };

    function N(e) {
        try {
            return l()(new Date(e), "do MMM")
        } catch (t) {
            return e
        }
    }

    function E(e) {
        const t = new Date(e);
        try {
            return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
        } catch (i) {
            return t.toDateString()
        }
    }

    function T(e) {
        try {
            return l()(new Date(e), "MMM")
        } catch (t) {
            return e
        }
    }
}

function GR(e) {
    return (0, RR)(1e3 * e)
}

function FR(e) {
    const t = new Uint8Array(e);
    let i = 0;
    const n = t.length;
    for (let o = 0, r = n - 1; o < n; o++, r--) i += t[r] << 8 * o;
    return i
}




function BR(e) {
    const t = FR(e.slice(0, 4)),
        i = e.slice(4, 12),
        n = new TextDecoder("utf-8").decode(i),
        o = n.slice(0, 4),
        r = n.slice(4, 6),
        a = n.slice(6, 8),
        l = "".concat(o, "-").concat(r, "-").concat(a),
        s = (0, Hr_iF)(e.slice(12)),
        d = new TextDecoder("utf-8").decode(s);

    // let time = GR(t);



    // console.log(t, n, l, i);
    let _timestamp = new Date();
    // console.log(t, l, _timestamp);

    return {
        token: t,
        expiry: l,
        data:
            HR({
                underlyingToken: t,
                expiry: l,
                optionChain: JSON.parse(d),
                client_timestamp: _timestamp
            })
    }
}

function QR(e) {
    const t = FR(e.slice(0, 4)),
        i = (0, Hr_iF)(e.slice(4)),
        n = new TextDecoder("utf-8").decode(i);
    return {
        [t]: JSON.parse(n)
    }
}

function VR(e) {
    // e is the payload after the first byte, which starts with the gzip header.
    // 1. Decompress the gzipped data. The Hr_iF function is used for this elsewhere.
    const decompressed_data = (0, Hr_iF)(e);

    // 2. Decode the resulting Uint8Array into a UTF-8 string.
    const decoded_string = new TextDecoder("utf-8").decode(decompressed_data);

    // 3. Parse the string as JSON.
    return JSON.parse(decoded_string);
}


function XR(e) {
    if (!e || e.byteLength <= 0) throw new Error("empty binary packet cannot be processed");
    const t = new Uint8Array(e),
        i = t[0];
    switch (i) {
        case WR.OPTION_CHAIN:
            let _payload = BR(t.slice(1));
            // console.log('token' , _payload.token)
            let snapshot = instruments.iCache.get(_payload.token);
            return {
                token: _payload.token, expiry: _payload.expiry, kind: JR.OPTION_CHAIN, packetId: i, payload: _payload ,  snapshot: snapshot
            };
        case WR.UNDERLYING_STATS:
            // console.log('token' , 'UNDERLYING_STATS');
            return {
                token: 'ALL', expiry: 'UNDERLYING_STATS', kind: JR.UNDERLYING_STATS, packetId: i, payload: QR(t.slice(1))
            };
        case WR.SCREENER_STATS:
            return {
                kind: JR.SCREENER_STATS, packetId: i, payload: VR(t.slice(1))
            };
        case WR.QUOTE: {

            function fn18797(e, t, i) {
                "use strict";
                i.d(t, {
                    F7: () => E,
                    J_: () => g,
                    Th: () => N,
                    Tn: () => y,
                    Zs: () => m,
                    dL: () => M,
                    eF: () => T,
                    o5: () => I,
                    p6: () => p
                });
                var n = i(72981),
                    o = i(63148),
                    r = i.n(o),
                    a = i(15616),
                    l = i.n(a),
                    s = i(62382),
                    d = i.n(s),
                    c = i(91884),
                    u = i.n(c);

                function g(e) {
                    return d()(e)
                }
                const p = (e, t) => {
                    try {
                        return l()(new Date(e), t)
                    } catch (i) {
                        return e.toString()
                    }
                },
                    I = e => {
                        try {
                            return l()(new Date(e), "yyyy-MM-dd")
                        } catch (t) {
                            return e.toString()
                        }
                    },
                    y = e => {
                        try {
                            return l()(new Date(e), "dd MMM")
                        } catch (t) {
                            return e.toString()
                        }
                    };

                function M(e) {
                    try {
                        return l()(new Date(e), "MMM do")
                    } catch (t) {
                        return e
                    }
                }
                const m = (e, t) => {
                    try {
                        const i = u()(e, "yyyy-MM-dd", new Date),
                            n = u()(t, "yyyy-MM-dd", new Date);
                        return r()(n, i)
                    } catch (i) {
                        return NaN
                    }
                };

                function N(e) {
                    try {
                        return l()(new Date(e), "do MMM")
                    } catch (t) {
                        return e
                    }
                }

                function E(e) {
                    const t = new Date(e);
                    try {
                        return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
                    } catch (i) {
                        return t.toDateString()
                    }
                }

                function T(e) {
                    try {
                        return l()(new Date(e), "MMM")
                    } catch (t) {
                        return e
                    }
                }
            }

            var RR = fn18797;

            function RR_F7(e) {
                const t = new Date(e);
                try {
                    return (0, n.Z)(t, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
                } catch (i) {
                    return t.toDateString()
                }
            }

            const wR = 3,
                kR = 9,
                UR = "full",
                YR = "quote",
                ZR = "ltp";

            function GR(e) {
                return (0, RR_F7)(1e3 * e)

            }

            const e = function (e) {
                const t = FR(e.slice(0, 4)),
                    i = 255 & t;
                let n, o, r = !0;
                if (i === kR && (r = !1), i === wR ? (n = .0025, o = 1e7) : (n = .05, o = 100), 8 === e.byteLength) return {
                    tradable: r,
                    mode: ZR,
                    instrumentToken: t,
                    lastPrice: FR(e.slice(4, 8)) / o
                };
                if (28 === e.byteLength || 32 === e.byteLength) {
                    let i = YR;
                    32 === e.byteLength && (i = UR);
                    const a = {
                        tradable: r,
                        mode: i,
                        instrumentToken: t,
                        tickSize: n,
                        lastPrice: FR(e.slice(4, 8)) / o,
                        ohlc: {
                            high: FR(e.slice(8, 12)) / o,
                            low: FR(e.slice(12, 16)) / o,
                            open: FR(e.slice(16, 20)) / o,
                            close: FR(e.slice(20, 24)) / o
                        },
                        change: FR(e.slice(24, 28))
                    };
                    if (0 !== a.ohlc.close && (a.change = 100 * (a.lastPrice - a.ohlc.close) / a.ohlc.close), 32 === e.byteLength) {
                        a.timestamp = null;
                        const t = FR(e.slice(28, 32));
                        t && (a.timestamp = GR(t), a.timestampEpochSec = t)
                    }
                    return a
                }
                if (44 === e.byteLength || 184 === e.byteLength) {
                    let i = YR;
                    184 === e.byteLength && (i = UR);
                    const a = {
                        tradable: r,
                        mode: i,
                        instrumentToken: t,
                        tickSize: n,
                        lastPrice: FR(e.slice(4, 8)) / o,
                        lastQuantity: FR(e.slice(8, 12)),
                        averagePrice: FR(e.slice(12, 16)) / o,
                        volume: FR(e.slice(16, 20)),
                        buyQuantity: FR(e.slice(20, 24)),
                        sellQuantity: FR(e.slice(24, 28)),
                        ohlc: {
                            open: FR(e.slice(28, 32)) / o,
                            high: FR(e.slice(32, 36)) / o,
                            low: FR(e.slice(36, 40)) / o,
                            close: FR(e.slice(40, 44)) / o
                        },
                        last_traded_timestamp: 184 === e.byteLength ? FR(e.slice(44, 48)) : 0
                    };
                    if (0 !== a.ohlc.close && (a.change = 100 * (a.lastPrice - a.ohlc.close) / a.ohlc.close), 184 === e.byteLength) {
                        a.last_trade_time = null;
                        const t = FR(e.slice(44, 48));
                        t && (a.last_trade_time = GR(t)), a.timestamp = null;
                        const i = FR(e.slice(60, 64));
                        i && (a.timestamp = GR(i), a.timestampEpochSec = i), a.oi = FR(e.slice(48, 52)), a.oiDayHigh = FR(e.slice(52, 56)), a.oiDayLow = FR(e.slice(56, 60)), a.depth = {
                            buy: [],
                            sell: []
                        };
                        let n = 0;
                        const r = e.slice(64, 184);
                        for (let e = 0; e < 10; e++) n = 12 * e, a.depth[e < 5 ? "buy" : "sell"].push({
                            quantity: FR(r.slice(n, n + 4)),
                            price: FR(r.slice(n + 4, n + 8)) / o,
                            orders: FR(r.slice(n + 8, n + 10))
                        })
                    }
                    return a
                }
                return null
            }(t.slice(1));
            if (e) {

                let insrumentToken = e.instrumentToken;
                instruments.iCache.set(insrumentToken, e);

                return {
                    token: 'ALL',
                    expiry: 'QUOTE',
                    kind: JR.QUOTE,
                    packetId: i,
                    payload: e
                };
            }
            throw new Error("empty quote packet received")
        }
        case WR.ORDER_UPDATES:
            return {
                kind: JR.ORDER_UPDATES, packetId: i, payload: KR(t.slice(1))
            };
        case WR.COMMON_EVENTS:
            return {
                kind: JR.COMMON_EVENTS, packetId: i, payload: KR(t.slice(1))
            };
        case WR.NSE_EVENTS:
            return {
                kind: JR.NSE_EVENTS, packetId: i, payload: KR(t.slice(1))
            };
        case WR.CUSTOM_PING:
            return {
                token: 'PING',
                expiry: 'CUSTOM_PING',
                kind: JR.CUSTOM_PING, packetId: i, payload: {}
            };
        case WR.INVALID:
            throw new Error("invalid packet id 0 provided");
        default:
            throw new Error("invalid packet id ".concat(i, " provided"))
    }
}

const rabbitmq = require('./rabbitmq.js');

function print(data) {
    // console.log(JSON.stringify(data, null, 4));


    const jsonObject = data;
    if (data.token) {
        fs.appendFileSync(`${dir}/${data.token}:${data.expiry}.json`, '\r\n' + JSON.stringify(jsonObject));
       rabbitmq.sendData(jsonObject)
    }

}


module.exports = {
    decodeData: function (data) {
        // whatever
        message = XR(data);
        return message;
    },
    print: print,
    JR: JR // Export the JR constants object
};