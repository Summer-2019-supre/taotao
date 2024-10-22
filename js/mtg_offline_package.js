"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
}
: function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
}
;
!function(e) {
    e.layerTips = function(e) {
        if (!document.querySelector(".layerTip")) {
            var t = document.createElement("div");
            t.className = "layerTip",
            t.innerText = e || "默认信息",
            t.setAttribute("style", "position: fixed; top: 50%; left: 50%; z-index: 10000; background-color: rgba(0, 0, 0, 0.5); color: #fff; font-size: 12px; padding: 5px 10px; transform: translate(-50%, -50%);"),
            document.body.appendChild(t),
            setTimeout(function() {
                t.remove()
            }, 5e3)
        }
    }
    ,
    window.UF || (window.UF = e)
}(window.UF ? window.UF : {}),
window.MTG_OFFLINE_PACKAGE = {
    isRender_h5_close: 0,
    init: function() {
        var e = this;
        function E() {
            return (65536 * (1 + Math.random()) | 0).toString(10).substring(1)
        }
        !function(e) {
            var t = "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && exports
              , n = "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module && module.exports == t && module
              , o = "object" == ("undefined" == typeof global ? "undefined" : _typeof(global)) && global;
            o.global !== o && o.window !== o || (e = o);
            function i(e) {
                this.message = e
            }
            (i.prototype = new Error).name = "InvalidCharacterError";
            function d(e) {
                throw new i(e)
            }
            var l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , s = /<%= spaceCharacters %>/g
              , a = {
                encode: function(e) {
                    e = String(e),
                    /[^\0-\xFF]/.test(e) && d("The string to be encoded contains characters outside of the Latin1 range.");
                    for (var t, n, o, i, a = e.length % 3, r = "", s = -1, c = e.length - a; ++s < c; )
                        t = e.charCodeAt(s) << 16,
                        n = e.charCodeAt(++s) << 8,
                        o = e.charCodeAt(++s),
                        r += l.charAt((i = t + n + o) >> 18 & 63) + l.charAt(i >> 12 & 63) + l.charAt(i >> 6 & 63) + l.charAt(63 & i);
                    return 2 == a ? (t = e.charCodeAt(s) << 8,
                    n = e.charCodeAt(++s),
                    r += l.charAt((i = t + n) >> 10) + l.charAt(i >> 4 & 63) + l.charAt(i << 2 & 63) + "=") : 1 == a && (i = e.charCodeAt(s),
                    r += l.charAt(i >> 2) + l.charAt(i << 4 & 63) + "=="),
                    r
                },
                decode: function(e) {
                    var t = (e = String(e).replace(s, "")).length;
                    t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length),
                    t % 4 != 1 && !/[^+a-zA-Z0-9/]/.test(e) || d("Invalid character: the string to be decoded is not correctly encoded.");
                    for (var n, o, i = 0, a = "", r = -1; ++r < t; )
                        o = l.indexOf(e.charAt(r)),
                        n = i % 4 ? 64 * n + o : o,
                        i++ % 4 && (a += String.fromCharCode(255 & n >> (-2 * i & 6)));
                    return a
                },
                version: "<%= version %>"
            };
            if ("function" == typeof define && "object" == _typeof(define.amd) && define.amd)
                define(function() {
                    return a
                });
            else if (t && !t.nodeType)
                if (n)
                    n.exports = a;
                else
                    for (var r in a)
                        a.hasOwnProperty(r) && (t[r] = a[r]);
            else
                e.base64 = a
        }(window),
        function(e, d) {
            var i = e.document
              , t = e.navigator.userAgent
              , u = !!t.match(/.+Mac OS X/)
              , f = /Android/i.test(t)
              , n = t.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i)
              , o = t.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/)
              , a = Object.prototype.hasOwnProperty
              , r = d.windvane = e.WindVane || (e.WindVane = {})
              , s = 1
              , c = []
              , l = "iframe_"
              , h = "suc_"
              , p = "err_"
              , w = "defer_"
              , m = "param_"
              , g = "chunk_"
              , v = "1" + E() + E() + "00";
            n = n ? (n[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
            o = o ? (o[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
            window.addEventListener("message", function(e) {
                var t = e.data
                  , n = t.eventName
                  , o = t.data;
                "windvane-req-forward" === n && (A.onSuccess(o.sid, o.data, "self_call"),
                o = n = null)
            }, !1);
            var A = {
                isAvailable: 1 === function(e, t) {
                    e = e.toString().split("."),
                    t = t.toString().split(".");
                    for (var n = 0; n < e.length || n < t.length; n++) {
                        var o = parseInt(e[n], 10)
                          , i = parseInt(t[n], 10);
                        if (window.isNaN(o) && (o = 0),
                        window.isNaN(i) && (i = 0),
                        o < i)
                            return -1;
                        if (i < o)
                            return 1
                    }
                    return 0
                }(o, "0"),
                call: function(e, t, n, o, i, a) {
                    var r, s;
                    if ("number" == typeof arguments[arguments.length - 1] && (a = arguments[arguments.length - 1]),
                    "function" != typeof o && (o = null),
                    "function" != typeof i && (i = null),
                    d.promise && (s = d.promise.defer()),
                    0 < a) {
                        var c = setTimeout(function() {
                            A.onFailure(r, {
                                ret: "HY_TIMEOUT"
                            })
                        }, a);
                        r = v + c
                    } else
                        r = y.getSid();
                    if (y.registerCall(r, o, i, s),
                    y.registerGC(r + "", a),
                    y.callMethod(e, t, n, r),
                    s)
                        return s.promise
                },
                fireEvent: function(e, t, n) {
                    var o = i.createEvent("HTMLEvents");
                    o.initEvent(e, !1, !0),
                    o.param = y.parseData(t || y.getData(n)),
                    i.dispatchEvent(o)
                },
                getParam: function(e) {
                    return y.getParam(e)
                },
                setData: function(e, t) {
                    y.setData(e, t)
                },
                onSuccess: function(e, t) {
                    var n = h + e
                      , o = p + e
                      , i = w + e
                      , a = y.calls;
                    if (a[n] || a[o] || a[i])
                        y.onComplete(e + "", t, "success");
                    else if (window === top)
                        for (var r = [].slice.call(window), s = 0; s < r.length; s++) {
                            var c = r[s];
                            c !== top && (console.log("native call onSuccess for", e, c, r.indexOf(c), r.length, s),
                            c.postMessage({
                                eventName: "windvane-req-forward",
                                data: {
                                    sid: e,
                                    data: t
                                }
                            }, "*"))
                        }
                },
                onFailure: function(e, t) {
                    y.onComplete(e + "", t, "failure")
                },
                getDeviceVersion: function() {
                    return {
                        device: u ? "ios" : f ? "android" : "other",
                        version: o
                    }
                }
            }
              , y = {
                params: {},
                chunks: {},
                calls: {},
                getSid: function() {
                    return Math.floor(Math.random() * (1 << 50)) + "" + s++
                },
                buildParam: function(e) {
                    return e && "object" === (void 0 === e ? "undefined" : _typeof(e)) ? JSON.stringify(e) : e || ""
                },
                getParam: function(e) {
                    return this.params[m + e] || ""
                },
                setParam: function(e, t) {
                    this.params[m + e] = t
                },
                parseData: function(e) {
                    var t;
                    if (e && "string" == typeof e)
                        try {
                            t = function(e) {
                                var t, n, o, i, a, r;
                                for (t = "",
                                o = e.length,
                                n = 0; n < o; )
                                    switch ((i = e.charCodeAt(n++)) >> 4) {
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                    case 7:
                                        t += e.charAt(n - 1);
                                        break;
                                    case 12:
                                    case 13:
                                        a = e.charCodeAt(n++),
                                        t += String.fromCharCode((31 & i) << 6 | 63 & a);
                                        break;
                                    case 14:
                                        a = e.charCodeAt(n++),
                                        r = e.charCodeAt(n++),
                                        t += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | (63 & r) << 0)
                                    }
                                return t
                            }(t = base64.decode(e)),
                            t = JSON.parse(t)
                        } catch (e) {
                            t = {
                                ret: ["WV_ERR::PARAM_PARSE_ERROR"]
                            }
                        }
                    else
                        t = e || {};
                    return t
                },
                setData: function(e, t) {
                    this.chunks[g + e] = this.chunks[g + e] || [],
                    this.chunks[g + e].push(t)
                },
                getData: function(e) {
                    return this.chunks[g + e] ? this.chunks[g + e].join("") : ""
                },
                registerCall: function(e, t, n, o) {
                    t && (this.calls[h + e] = t),
                    n && (this.calls[p + e] = n),
                    o && (this.calls[w + e] = o)
                },
                unregisterCall: function(e) {
                    var t = h + e
                      , n = p + e
                      , o = w + e
                      , i = {};
                    return this.calls[t] && (i.success = this.calls[t],
                    delete this.calls[t]),
                    this.calls[n] && (i.failure = this.calls[n],
                    delete this.calls[n]),
                    this.calls[o] && (i.defer = this.calls[o],
                    delete this.calls[o]),
                    i
                },
                useIframe: function(e, t) {
                    var n = l + e
                      , o = c.pop();
                    o || ((o = i.createElement("iframe")).setAttribute("frameborder", "0"),
                    o.style.cssText = "width:0;height:0;border:0;display:none;"),
                    o.setAttribute("id", n),
                    o.setAttribute("src", t),
                    o.parentNode || setTimeout(function() {
                        i.body.appendChild(o)
                    }, 5)
                },
                retrieveIframe: function(e) {
                    var t = l + e
                      , n = i.querySelector("#" + t);
                    3 <= c.length ? i.body.removeChild(n) : c.push(n)
                },
                callMethod: function(e, t, n, o) {
                    var i;
                    if (n = y.buildParam(n),
                    u)
                        i = "mv://" + window.location.hostname + "?" + e + ":" + o + "/" + t + "?" + n,
                        this.setParam(o, n),
                        this.useIframe(o, i);
                    else if (f) {
                        i = "mv://" + e + ":" + o + "/" + t + "?" + n;
                        window.prompt(i, "wv_hybrid:")
                    }
                },
                registerGC: function(e, t) {
                    var n = this
                      , o = Math.max(t || 0, 6e5)
                      , i = Math.max(t || 0, 6e4)
                      , a = Math.max(t || 0, 6e5);
                    setTimeout(function() {
                        n.unregisterCall(e)
                    }, o),
                    u ? setTimeout(function() {
                        n.params[m + e] && delete n.params[m + e]
                    }, i) : f && setTimeout(function() {
                        n.chunks[g + e] && delete n.chunks[g + e]
                    }, a)
                },
                onComplete: function(e, t, n) {
                    var o, i, a = -1 === (i = (o = e + "").lastIndexOf("00")) ? "unknow_sid" : o.substring(i + 2);
                    clearTimeout(a);
                    var r = this.unregisterCall(e)
                      , s = r.success
                      , c = r.failure
                      , d = r.defer;
                    t = t || this.getData(e);
                    var l = (t = this.parseData(t)).ret;
                    "string" == typeof l && ((t = t.value || t).ret || (t.ret = [l])),
                    "success" === n ? (s && s(t),
                    d && d.resolve(t)) : "failure" === n && (c && c(t),
                    d && d.reject(t)),
                    u ? (this.retrieveIframe(e),
                    this.params[m + e] && delete this.params[m + e]) : f && this.chunks[g + e] && delete this.chunks[g + e]
                }
            };
            for (var b in A)
                a.call(r, b) || (r[b] = A[b])
        }(window, window.lib || (window.lib = {})),
        window.gameReady = function() {
            window.OFFLINE_GAMEREADY = !0
        }
        ,
        window.install = function() {
            window.UF.layerTips("offline, check your network.")
        }
        ,
        window.WindVane.call("RewardJs", "getEndScreenInfo", {
            pageNo: 1,
            exclude_ids: []
        }, function(e) {
            window.MW_CONFIG.endScreenInfo = e;
            var t = new Event("PLAYABLE:getEndScreenInfo");
            document.dispatchEvent(t)
        }, function() {}),
        window.WindVane.call("VideoBridge", "init", {
            pageNo: 1,
            exclude_ids: []
        }, function(e) {
            window.MW_CONFIG.VideoBridgeData = e;
            var t = new Event("PLAYABLE:VideoBridge");
            document.dispatchEvent(t)
        }, function() {}),
        document.addEventListener("webviewshow", function() {
            window.MUTIL_ONLINE || window.MW_INIT || e.showView()
        }, !1);
        var t = 0;
        document.addEventListener("PLAYABLE:VideoBridge", function() {
            1 !== t && (t = 1)
        }, !1)
    },
    addStyle: function(e, t) {
        var n = document.createElement("style");
        t && (n.id = t),
        n.type = "text/css",
        document.querySelector("head").appendChild(n),
        n.appendChild(document.createTextNode(e))
    },
    playable_closeBtn: function() {
        var e = document.createElement("div");
        e.className = "m-playable-close";
        this.addStyle(".m-playable-close{color:red;text-align:center;border-radius:100%;height:30px;width:30px;font-size:0;top:15px;right:15px;position:absolute;z-index:99998;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAACQUlEQVRYw82ZvW7CMBDHb6FsrRoRJgaWDlAJ9TUQAw9BOzAgujAjeISOSEyAkQz0FahEFyCPQfIa6ZmAaCPAH3G43i0IrPvJxnf++wygY1moQB2a0IcPGMAIfYCf+vhNHX/JQgr2AFXoIohd8RGOqOJIa1aCDoyvIn/7GEeXkkOfcRbMwLtQNoc+QssIevQWRjCwFxgmwgofYhRNq8EkMVb4BCMpWwbTg1n0JkZUsHvoWcUK72FU6WztYyO0ZNbNVLDRgl/dUixFr11OoEmq4Mn55Hq0kLfyvD5TUlqpY6NqFrPyTbDCYzW8ezNwl2a+sTl3ZIMby8JcJWhh3lhKR3VO6kJyzL9+haHnu1wW0uVeEIbtlcMlUuGgUqqygMXF1g/DrQTtcjFq4z993k0lEavKGyvH17vr6Ai73uW46gbLSiTcH/SlBcdFVscKWYiKtKK6G12+8QU6P4v/kp95+0VWxAqvACpilgx9xLpcI6Xqmgdh9E96wQmN2EAbuz8k+3rpf0AfZm2IZUjFKwgzQgcOd/Z5u9XHMqTi7YcZon1jLEOqWjLF3dknl0gghxvV6xEhOMlS+0mWmmxzmaVTkDydNAvIxloBISuZZIeE8rEYYe0di9aEgKcpBAilj1TsvWmJvfdvVbGnIG/bq+JC5d8rLtordXkrOlnS2pyZqoAzU4XaXfoHVxjRSCO6tJFdUwkv5mStCMLmC2G7ibDBRtZSJGyiEraNSRvlhE8Dx0YUwWPICa77/GMBSvrglcoT3w+nZMDvaGLTzgAAAABJRU5ErkJggg==);background-position:0 0;background-size:100% 100%}.m-playable-close.close-loading{background-image:none;background-color:#333;opacity:.7}.m-playable-close.close-loading .close-spinner{display:inline-block}.m-playable-close .close-spinner{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);zoom:.4;display:none}.m-playable-close .close-spinner>div{background-color:#b2b2b2}.m-playable-close.s-hide{display:none}");
        e.innerHTML = function() {
            var e = "";
            Array.prototype.join;
            return e += '<div class="close-spinner">\n  <div class="close-bounce1"></div>\n  <div class="close-bounce2"></div>\n  <div class="close-bounce3"></div>\n</div>\n'
        }(),
        document.querySelector("body").appendChild(e),
        this.bindForPropagation(e, "touchstart", function(e) {
            window.WindVane.call("RewardJs", "triggerCloseBtn", {}, function(e) {}, function() {}),
            e.stopPropagation(),
            e.preventDefault()
        })
    },
    bindForPropagation: function(t, n, e) {
        ["click", "touchmove", "touchstart", "touchend", "mousedown", "mouseup", "pointerup", "pointerdown"].forEach(function(e) {
            e !== n && t.addEventListener(e, function(e) {
                e.stopPropagation(),
                e.preventDefault()
            })
        }),
        n && e && t.addEventListener(n, e, !0)
    },
    triggerResize: function() {
        var e = this;
        e.nScreenWidth = window.innerWidth,
        setInterval(function() {
            e.nScreenWidth !== window.innerWidth && (e.nScreenWidth = window.innerWidth,
            window.dispatchEvent(new Event("resize")))
        }, 16),
        window.dispatchEvent(new Event("resize"))
    },
    triggerGameStart: function() {
        var e = this;
        if (window.OFFLINE_GAMEREADY) {
            window.gameStart && window.gameStart();
            var t = new Event("PLAYABLE:gameStart");
            document.dispatchEvent(t)
        } else
            setTimeout(function() {
                e.triggerGameStart()
            }, 50)
    },
    showView: function() {
        var e = this;
        window.activeSound && window.activeSound(),
        setTimeout(function() {
            e.showCloseButton(e.isRender_h5_close)
        }, 5e3),
        this.triggerGameStart(),
        this.triggerResize()
    },
    showCloseButton: function(e) {
        window.WindVane && (e ? (this.playable_closeBtn(),
        window.WindVane.call("RewardJs", "toggleCloseBtn", {
            state: 2
        }, function(e) {}, function() {})) : window.WindVane.call("RewardJs", "toggleCloseBtn", {
            state: 1
        }, function(e) {}, function() {}))
    }
},
window.MUTIL_ONLINE && window.gameReady ? setTimeout(function() {
    window.MW_INIT || window.MTG_OFFLINE_PACKAGE.init()
}, 5e3) : window.MUTIL_ONLINE || window.gameReady || window.MTG_OFFLINE_PACKAGE.init();
