! function(t, e, n) {
    function i(n, i) {
        var r = e.createElement("span");
        r.id = "rs-css-ready";
        var o = function() {
                var n, i = e.getElementById("rs-css-ready");
                return i && t.getComputedStyle && t.getComputedStyle(i, null) ? n = e.defaultView.getComputedStyle(i, null).getPropertyValue("color") : r.currentStyle && (n = i.currentStyle.color), n && "rgb(190, 142, 54)" === n || "#BE8E36" === n
            },
            s = e.createElement("link");
        s.id = "rs-embedded-css", s.rel = "stylesheet", s.type = "text/css", s.href = n;
        var a = e.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(s, a), a.parentNode.insertBefore(r, a),
            function() {
                var t = setInterval(function() {
                    o() && (clearInterval(t), i())
                }, 100)
            }()
    }
    t._RealScout || (t._RealScout = {});
    var r = {};
    ! function(t) {
        function e(t, e, i) {
            var r;
            return e && "object" == typeof e && (e[t] !== n ? r = e[t] : i && e.get && "function" == typeof e.get && (r = e.get(t))), r
        }

        function i(t, e, n, i, r, o) {
            function s() {}

            function a() {}
            s.prototype = t, a.prototype = t.subs;
            var u, l = new s;
            l.subs = new a, l.subsText = {}, l.buf = "", i = i || {}, l.stackSubs = i, l.subsText = o;
            for (u in e) i[u] || (i[u] = e[u]);
            for (u in i) l.subs[u] = i[u];
            r = r || {}, l.stackPartials = r;
            for (u in n) r[u] || (r[u] = n[u]);
            for (u in r) l.partials[u] = r[u];
            return l
        }

        function r(t) {
            return String(null === t || t === n ? "" : t)
        }

        function o(t) {
            return t = r(t), p.test(t) ? t.replace(s, "&amp;").replace(a, "&lt;").replace(u, "&gt;").replace(l, "&#39;").replace(c, "&quot;") : t
        }
        t.Template = function(t, e, n, i) {
            t = t || {}, this.r = t.code || this.r, this.c = n, this.options = i || {}, this.text = e || "", this.partials = t.partials || {}, this.subs = t.subs || {}, this.buf = ""
        }, t.Template.prototype = {
            r: function(t, e, n) {
                return ""
            },
            v: o,
            t: r,
            render: function(t, e, n) {
                return this.ri([t], e || {}, n)
            },
            ri: function(t, e, n) {
                return this.r(t, e, n)
            },
            ep: function(t, e) {
                var r = this.partials[t],
                    o = e[r.name];
                if (r.instance && r.base == o) return r.instance;
                if ("string" == typeof o) {
                    if (!this.c) throw new Error("No compiler available.");
                    o = this.c.compile(o, this.options)
                }
                if (!o) return null;
                if (this.partials[t].base = o, r.subs) {
                    e.stackText || (e.stackText = {});
                    for (key in r.subs) e.stackText[key] || (e.stackText[key] = this.activeSub !== n && e.stackText[this.activeSub] ? e.stackText[this.activeSub] : this.text);
                    o = i(o, r.subs, r.partials, this.stackSubs, this.stackPartials, e.stackText)
                }
                return this.partials[t].instance = o, o
            },
            rp: function(t, e, n, i) {
                var r = this.ep(t, n);
                return r ? r.ri(e, n, i) : ""
            },
            rs: function(t, e, n) {
                var i = t[t.length - 1];
                if (!d(i)) return void n(t, e, this);
                for (var r = 0; r < i.length; r++) t.push(i[r]), n(t, e, this), t.pop()
            },
            s: function(t, e, n, i, r, o, s) {
                var a;
                return (!d(t) || 0 !== t.length) && ("function" == typeof t && (t = this.ms(t, e, n, i, r, o, s)), a = !!t, !i && a && e && e.push("object" == typeof t ? t : e[e.length - 1]), a)
            },
            d: function(t, i, r, o) {
                var s, a = t.split("."),
                    u = this.f(a[0], i, r, o),
                    l = this.options.modelGet,
                    c = null;
                if ("." === t && d(i[i.length - 2])) u = i[i.length - 1];
                else
                    for (var p = 1; p < a.length; p++) s = e(a[p], u, l), s !== n ? (c = u, u = s) : u = "";
                return !(o && !u) && (o || "function" != typeof u || (i.push(c), u = this.mv(u, i, r), i.pop()), u)
            },
            f: function(t, i, r, o) {
                for (var s = !1, a = null, u = !1, l = this.options.modelGet, c = i.length - 1; c >= 0; c--)
                    if (a = i[c], s = e(t, a, l), s !== n) {
                        u = !0;
                        break
                    }
                return u ? (o || "function" != typeof s || (s = this.mv(s, i, r)), s) : !o && ""
            },
            ls: function(t, e, n, i, o) {
                var s = this.options.delimiters;
                return this.options.delimiters = o, this.b(this.ct(r(t.call(e, i)), e, n)), this.options.delimiters = s, !1
            },
            ct: function(t, e, n) {
                if (this.options.disableLambda) throw new Error("Lambda features disabled.");
                return this.c.compile(t, this.options).render(e, n)
            },
            b: function(t) {
                this.buf += t
            },
            fl: function() {
                var t = this.buf;
                return this.buf = "", t
            },
            ms: function(t, e, n, i, r, o, s) {
                var a, u = e[e.length - 1],
                    l = t.call(u);
                return "function" == typeof l ? !!i || (a = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text, this.ls(l, u, n, a.substring(r, o), s)) : l
            },
            mv: function(t, e, n) {
                var i = e[e.length - 1],
                    o = t.call(i);
                return "function" == typeof o ? this.ct(r(o.call(i)), i, n) : o
            },
            sub: function(t, e, n, i) {
                var r = this.subs[t];
                r && (this.activeSub = t, r(e, n, this, i), this.activeSub = !1)
            }
        };
        var s = /&/g,
            a = /</g,
            u = />/g,
            l = /\'/g,
            c = /\"/g,
            p = /[&<>\"\']/,
            d = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
    }("undefined" != typeof exports ? exports : r),
    function(t) {
        function e(t) {
            "}" === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1))
        }

        function n(t) {
            return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, "")
        }

        function i(t, e, n) {
            if (e.charAt(n) != t.charAt(0)) return !1;
            for (var i = 1, r = t.length; i < r; i++)
                if (e.charAt(n + i) != t.charAt(i)) return !1;
            return !0
        }

        function r(e, n, i, a) {
            var u = [],
                l = null,
                c = null,
                p = null;
            for (c = i[i.length - 1]; e.length > 0;) {
                if (p = e.shift(), c && "<" == c.tag && !(p.tag in x)) throw new Error("Illegal content in < super tag.");
                if (t.tags[p.tag] <= t.tags.$ || o(p, a)) i.push(p), p.nodes = r(e, p.tag, i, a);
                else {
                    if ("/" == p.tag) {
                        if (0 === i.length) throw new Error("Closing tag without opener: /" + p.n);
                        if (l = i.pop(), p.n != l.n && !s(p.n, l.n, a)) throw new Error("Nesting error: " + l.n + " vs. " + p.n);
                        return l.end = p.i, u
                    }
                    "\n" == p.tag && (p.last = 0 == e.length || "\n" == e[0].tag)
                }
                u.push(p)
            }
            if (i.length > 0) throw new Error("missing closing tag: " + i.pop().n);
            return u
        }

        function o(t, e) {
            for (var n = 0, i = e.length; n < i; n++)
                if (e[n].o == t.n) return t.tag = "#", !0
        }

        function s(t, e, n) {
            for (var i = 0, r = n.length; i < r; i++)
                if (n[i].c == t && n[i].o == e) return !0
        }

        function a(t) {
            var e = [];
            for (var n in t) e.push('"' + l(n) + '": function(c,p,t,i) {' + t[n] + "}");
            return "{ " + e.join(",") + " }"
        }

        function u(t) {
            var e = [];
            for (var n in t.partials) e.push('"' + l(n) + '":{name:"' + l(t.partials[n].name) + '", ' + u(t.partials[n]) + "}");
            return "partials: {" + e.join(",") + "}, subs: " + a(t.subs)
        }

        function l(t) {
            return t.replace(v, "\\\\").replace(g, '\\"').replace(m, "\\n").replace(b, "\\r").replace(y, "\\u2028").replace(_, "\\u2029")
        }

        function c(t) {
            return ~t.indexOf(".") ? "d" : "f"
        }

        function p(t, e) {
            var n = "<" + (e.prefix || ""),
                i = n + t.n + w++;
            return e.partials[i] = {
                name: t.n,
                partials: {}
            }, e.code += 't.b(t.rp("' + l(i) + '",c,p,"' + (t.indent || "") + '"));', i
        }

        function d(t, e) {
            e.code += "t.b(t.t(t." + c(t.n) + '("' + l(t.n) + '",c,p,0)));'
        }

        function h(t) {
            return "t.b(" + t + ");"
        }
        var f = /\S/,
            g = /\"/g,
            m = /\n/g,
            b = /\r/g,
            v = /\\/g,
            y = /\u2028/,
            _ = /\u2029/;
        t.tags = {
            "#": 1,
            "^": 2,
            "<": 3,
            $: 4,
            "/": 5,
            "!": 6,
            ">": 7,
            "=": 8,
            _v: 9,
            "{": 10,
            "&": 11,
            _t: 12
        }, t.scan = function(r, o) {
            function s() {
                v.length > 0 && (y.push({
                    tag: "_t",
                    text: new String(v)
                }), v = "")
            }

            function a() {
                for (var e = !0, n = w; n < y.length; n++)
                    if (e = t.tags[y[n].tag] < t.tags._v || "_t" == y[n].tag && null === y[n].text.match(f), !e) return !1;
                return e
            }

            function u(t, e) {
                if (s(), t && a())
                    for (var n, i = w; i < y.length; i++) y[i].text && ((n = y[i + 1]) && ">" == n.tag && (n.indent = y[i].text.toString()), y.splice(i, 1));
                else e || y.push({
                    tag: "\n"
                });
                _ = !1, w = y.length
            }

            function l(t, e) {
                var i = "=" + C,
                    r = t.indexOf(i, e),
                    o = n(t.substring(t.indexOf("=", e) + 1, r)).split(" ");
                return T = o[0], C = o[o.length - 1], r + i.length - 1
            }
            var c = r.length,
                p = 0,
                d = 1,
                h = 2,
                g = p,
                m = null,
                b = null,
                v = "",
                y = [],
                _ = !1,
                x = 0,
                w = 0,
                T = "{{",
                C = "}}";
            for (o && (o = o.split(" "), T = o[0], C = o[1]), x = 0; x < c; x++) g == p ? i(T, r, x) ? (--x, s(), g = d) : "\n" == r.charAt(x) ? u(_) : v += r.charAt(x) : g == d ? (x += T.length - 1, b = t.tags[r.charAt(x + 1)], m = b ? r.charAt(x + 1) : "_v", "=" == m ? (x = l(r, x), g = p) : (b && x++, g = h), _ = x) : i(C, r, x) ? (y.push({
                tag: m,
                n: n(v),
                otag: T,
                ctag: C,
                i: "/" == m ? _ - T.length : x + C.length
            }), v = "", x += C.length - 1, g = p, "{" == m && ("}}" == C ? x++ : e(y[y.length - 1]))) : v += r.charAt(x);
            return u(_, !0), y
        };
        var x = {
            _t: !0,
            "\n": !0,
            $: !0,
            "/": !0
        };
        t.stringify = function(e, n, i) {
            return "{code: function (c,p,i) { " + t.wrapMain(e.code) + " }," + u(e) + "}"
        };
        var w = 0;
        t.generate = function(e, n, i) {
            w = 0;
            var r = {
                code: "",
                subs: {},
                partials: {}
            };
            return t.walk(e, r), i.asString ? this.stringify(r, n, i) : this.makeTemplate(r, n, i)
        }, t.wrapMain = function(t) {
            return 'var t=this;t.b(i=i||"");' + t + "return t.fl();"
        }, t.template = t.Template, t.makeTemplate = function(t, e, n) {
            var i = this.makePartials(t);
            return i.code = new Function("c", "p", "i", this.wrapMain(t.code)), new this.template(i, e, this, n)
        }, t.makePartials = function(t) {
            var e, n = {
                subs: {},
                partials: t.partials,
                name: t.name
            };
            for (e in n.partials) n.partials[e] = this.makePartials(n.partials[e]);
            for (e in t.subs) n.subs[e] = new Function("c", "p", "t", "i", t.subs[e]);
            return n
        }, t.codegen = {
            "#": function(e, n) {
                n.code += "if(t.s(t." + c(e.n) + '("' + l(e.n) + '",c,p,1),c,p,0,' + e.i + "," + e.end + ',"' + e.otag + " " + e.ctag + '")){t.rs(c,p,function(c,p,t){', t.walk(e.nodes, n), n.code += "});c.pop();}"
            },
            "^": function(e, n) {
                n.code += "if(!t.s(t." + c(e.n) + '("' + l(e.n) + '",c,p,1),c,p,1,0,0,"")){', t.walk(e.nodes, n), n.code += "};"
            },
            ">": p,
            "<": function(e, n) {
                var i = {
                    partials: {},
                    code: "",
                    subs: {},
                    inPartial: !0
                };
                t.walk(e.nodes, i);
                var r = n.partials[p(e, n)];
                r.subs = i.subs, r.partials = i.partials
            },
            $: function(e, n) {
                var i = {
                    subs: {},
                    code: "",
                    partials: n.partials,
                    prefix: e.n
                };
                t.walk(e.nodes, i), n.subs[e.n] = i.code, n.inPartial || (n.code += 't.sub("' + l(e.n) + '",c,p,i);')
            },
            "\n": function(t, e) {
                e.code += h('"\\n"' + (t.last ? "" : " + i"))
            },
            _v: function(t, e) {
                e.code += "t.b(t.v(t." + c(t.n) + '("' + l(t.n) + '",c,p,0)));'
            },
            _t: function(t, e) {
                e.code += h('"' + l(t.text) + '"')
            },
            "{": d,
            "&": d
        }, t.walk = function(e, n) {
            for (var i, r = 0, o = e.length; r < o; r++) i = t.codegen[e[r].tag], i && i(e[r], n);
            return n
        }, t.parse = function(t, e, n) {
            return n = n || {}, r(t, "", [], n.sectionTags || [])
        }, t.cache = {}, t.cacheKey = function(t, e) {
            return [t, !!e.asString, !!e.disableLambda, e.delimiters, !!e.modelGet].join("||")
        }, t.compile = function(e, n) {
            n = n || {};
            var i = t.cacheKey(e, n),
                r = this.cache[i];
            if (r) {
                var o = r.partials;
                for (var s in o) delete o[s].instance;
                return r
            }
            return r = this.generate(this.parse(this.scan(e, n.delimiters), e, n), e, n), this.cache[i] = r
        }
    }("undefined" != typeof exports ? exports : r), _RealScout.Hogan = r,
        function(t, e) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return e(t)
            } : e(t)
        }("undefined" != typeof t ? t : this, function(t, e) {
            function i(t) {
                var e = t.length,
                    n = ot.type(t);
                return "function" !== n && !ot.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
            }

            function r(t, e, n) {
                if (ot.isFunction(e)) return ot.grep(t, function(t, i) {
                    return !!e.call(t, i, t) !== n
                });
                if (e.nodeType) return ot.grep(t, function(t) {
                    return t === e !== n
                });
                if ("string" == typeof e) {
                    if (ht.test(e)) return ot.filter(e, t, n);
                    e = ot.filter(e, t)
                }
                return ot.grep(t, function(t) {
                    return ot.inArray(t, e) >= 0 !== n
                })
            }

            function o(t, e) {
                do t = t[e]; while (t && 1 !== t.nodeType);
                return t
            }

            function s(t) {
                var e = xt[t] = {};
                return ot.each(t.match(_t) || [], function(t, n) {
                    e[n] = !0
                }), e
            }

            function a() {
                gt.addEventListener ? (gt.removeEventListener("DOMContentLoaded", u, !1), t.removeEventListener("load", u, !1)) : (gt.detachEvent("onreadystatechange", u), t.detachEvent("onload", u))
            }

            function u() {
                (gt.addEventListener || "load" === event.type || "complete" === gt.readyState) && (a(), ot.ready())
            }

            function l(t, e, i) {
                if (i === n && 1 === t.nodeType) {
                    var r = "data-" + e.replace(St, "-$1").toLowerCase();
                    if (i = t.getAttribute(r), "string" == typeof i) {
                        try {
                            i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : kt.test(i) ? ot.parseJSON(i) : i)
                        } catch (o) {}
                        ot.data(t, e, i)
                    } else i = n
                }
                return i
            }

            function c(t) {
                var e;
                for (e in t)
                    if (("data" !== e || !ot.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
                return !0
            }

            function p(t, e, i, r) {
                if (ot.acceptData(t)) {
                    var o, s, a = ot.expando,
                        u = t.nodeType,
                        l = u ? ot.cache : t,
                        c = u ? t[a] : t[a] && a;
                    if (c && l[c] && (r || l[c].data) || i !== n || "string" != typeof e) return c || (c = u ? t[a] = X.pop() || ot.guid++ : a), l[c] || (l[c] = u ? {} : {
                        toJSON: ot.noop
                    }), "object" != typeof e && "function" != typeof e || (r ? l[c] = ot.extend(l[c], e) : l[c].data = ot.extend(l[c].data, e)), s = l[c], r || (s.data || (s.data = {}), s = s.data), i !== n && (s[ot.camelCase(e)] = i), "string" == typeof e ? (o = s[e], null == o && (o = s[ot.camelCase(e)])) : o = s, o
                }
            }

            function d(t, e, n) {
                if (ot.acceptData(t)) {
                    var i, r, o = t.nodeType,
                        s = o ? ot.cache : t,
                        a = o ? t[ot.expando] : ot.expando;
                    if (s[a]) {
                        if (e && (i = n ? s[a] : s[a].data)) {
                            ot.isArray(e) ? e = e.concat(ot.map(e, ot.camelCase)) : e in i ? e = [e] : (e = ot.camelCase(e), e = e in i ? [e] : e.split(" ")), r = e.length;
                            for (; r--;) delete i[e[r]];
                            if (n ? !c(i) : !ot.isEmptyObject(i)) return
                        }(n || (delete s[a].data, c(s[a]))) && (o ? ot.cleanData([t], !0) : it.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
                    }
                }
            }

            function h() {
                return !0
            }

            function f() {
                return !1
            }

            function g() {
                try {
                    return gt.activeElement
                } catch (t) {}
            }

            function m(t) {
                var e = Mt.split("|"),
                    n = t.createDocumentFragment();
                if (n.createElement)
                    for (; e.length;) n.createElement(e.pop());
                return n
            }

            function b(t, e) {
                var i, r, o = 0,
                    s = typeof t.getElementsByTagName !== Ct ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== Ct ? t.querySelectorAll(e || "*") : n;
                if (!s)
                    for (s = [], i = t.childNodes || t; null != (r = i[o]); o++) !e || ot.nodeName(r, e) ? s.push(r) : ot.merge(s, b(r, e));
                return e === n || e && ot.nodeName(t, e) ? ot.merge([t], s) : s
            }

            function v(t) {
                Lt.test(t.type) && (t.defaultChecked = t.checked)
            }

            function y(t, e) {
                return ot.nodeName(t, "table") && ot.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
            }

            function _(t) {
                return t.type = (null !== ot.find.attr(t, "type")) + "/" + t.type, t
            }

            function x(t) {
                var e = Qt.exec(t.type);
                return e ? t.type = e[1] : t.removeAttribute("type"), t
            }

            function w(t, e) {
                for (var n, i = 0; null != (n = t[i]); i++) ot._data(n, "globalEval", !e || ot._data(e[i], "globalEval"))
            }

            function T(t, e) {
                if (1 === e.nodeType && ot.hasData(t)) {
                    var n, i, r, o = ot._data(t),
                        s = ot._data(e, o),
                        a = o.events;
                    if (a) {
                        delete s.handle, s.events = {};
                        for (n in a)
                            for (i = 0, r = a[n].length; i < r; i++) ot.event.add(e, n, a[n][i])
                    }
                    s.data && (s.data = ot.extend({}, s.data))
                }
            }

            function C(t, e) {
                var n, i, r;
                if (1 === e.nodeType) {
                    if (n = e.nodeName.toLowerCase(), !it.noCloneEvent && e[ot.expando]) {
                        r = ot._data(e);
                        for (i in r.events) ot.removeEvent(e, i, r.handle);
                        e.removeAttribute(ot.expando)
                    }
                    "script" === n && e.text !== t.text ? (_(e).text = t.text, x(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !ot.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Lt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
                }
            }

            function k(e, n) {
                var i, r = ot(n.createElement(e)).appendTo(n.body),
                    o = t.getDefaultComputedStyle && (i = t.getDefaultComputedStyle(r[0])) ? i.display : ot.css(r[0], "display");
                return r.detach(), o
            }

            function S(t) {
                var e = gt,
                    n = te[t];
                return n || (n = k(t, e), "none" !== n && n || (Zt = (Zt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Zt[0].contentWindow || Zt[0].contentDocument).document, e.write(), e.close(), n = k(t, e), Zt.detach()), te[t] = n), n
            }

            function E(t, e) {
                return {
                    get: function() {
                        var n = t();
                        if (null != n) return n ? void delete this.get : (this.get = e).apply(this, arguments)
                    }
                }
            }

            function A(t, e) {
                if (e in t) return e;
                for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, r = he.length; r--;)
                    if (e = he[r] + n, e in t) return e;
                return i
            }

            function N(t, e) {
                for (var n, i, r, o = [], s = 0, a = t.length; s < a; s++) i = t[s], i.style && (o[s] = ot._data(i, "olddisplay"), n = i.style.display, e ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Nt(i) && (o[s] = ot._data(i, "olddisplay", S(i.nodeName)))) : (r = Nt(i), (n && "none" !== n || !r) && ot._data(i, "olddisplay", r ? n : ot.css(i, "display"))));
                for (s = 0; s < a; s++) i = t[s], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[s] || "" : "none"));
                return t
            }

            function D(t, e, n) {
                var i = le.exec(e);
                return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
            }

            function L(t, e, n, i, r) {
                for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; o < 4; o += 2) "margin" === n && (s += ot.css(t, n + At[o], !0, r)), i ? ("content" === n && (s -= ot.css(t, "padding" + At[o], !0, r)), "margin" !== n && (s -= ot.css(t, "border" + At[o] + "Width", !0, r))) : (s += ot.css(t, "padding" + At[o], !0, r), "padding" !== n && (s += ot.css(t, "border" + At[o] + "Width", !0, r)));
                return s
            }

            function $(t, e, n) {
                var i = !0,
                    r = "width" === e ? t.offsetWidth : t.offsetHeight,
                    o = ee(t),
                    s = it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, o);
                if (r <= 0 || null == r) {
                    if (r = ne(t, e, o), (r < 0 || null == r) && (r = t.style[e]), re.test(r)) return r;
                    i = s && (it.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
                }
                return r + L(t, e, n || (s ? "border" : "content"), i, o) + "px"
            }

            function j(t, e, n, i, r) {
                return new j.prototype.init(t, e, n, i, r)
            }

            function P() {
                return setTimeout(function() {
                    fe = n
                }), fe = ot.now()
            }

            function H(t, e) {
                var n, i = {
                        height: t
                    },
                    r = 0;
                for (e = e ? 1 : 0; r < 4; r += 2 - e) n = At[r], i["margin" + n] = i["padding" + n] = t;
                return e && (i.opacity = i.width = t), i
            }

            function R(t, e, n) {
                for (var i, r = (_e[e] || []).concat(_e["*"]), o = 0, s = r.length; o < s; o++)
                    if (i = r[o].call(n, e, t)) return i
            }

            function M(t, e, i) {
                var r, o, s, a, u, l, c, p, d = this,
                    h = {},
                    f = t.style,
                    g = t.nodeType && Nt(t),
                    m = ot._data(t, "fxshow");
                i.queue || (u = ot._queueHooks(t, "fx"), null == u.unqueued && (u.unqueued = 0, l = u.empty.fire, u.empty.fire = function() {
                    u.unqueued || l()
                }), u.unqueued++, d.always(function() {
                    d.always(function() {
                        u.unqueued--, ot.queue(t, "fx").length || u.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [f.overflow, f.overflowX, f.overflowY], c = ot.css(t, "display"), p = "none" === c ? ot._data(t, "olddisplay") || S(t.nodeName) : c, "inline" === p && "none" === ot.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== S(t.nodeName) ? f.zoom = 1 : f.display = "inline-block")), i.overflow && (f.overflow = "hidden", it.shrinkWrapBlocks() || d.always(function() {
                    f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
                }));
                for (r in e)
                    if (o = e[r], me.exec(o)) {
                        if (delete e[r], s = s || "toggle" === o, o === (g ? "hide" : "show")) {
                            if ("show" !== o || !m || m[r] === n) continue;
                            g = !0
                        }
                        h[r] = m && m[r] || ot.style(t, r)
                    } else c = n;
                if (ot.isEmptyObject(h)) "inline" === ("none" === c ? S(t.nodeName) : c) && (f.display = c);
                else {
                    m ? "hidden" in m && (g = m.hidden) : m = ot._data(t, "fxshow", {}), s && (m.hidden = !g), g ? ot(t).show() : d.done(function() {
                        ot(t).hide()
                    }), d.done(function() {
                        var e;
                        ot._removeData(t, "fxshow");
                        for (e in h) ot.style(t, e, h[e])
                    });
                    for (r in h) a = R(g ? m[r] : 0, r, d), r in m || (m[r] = a.start, g && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
                }
            }

            function I(t, e) {
                var n, i, r, o, s;
                for (n in t)
                    if (i = ot.camelCase(n), r = e[i], o = t[n], ot.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), s = ot.cssHooks[i], s && "expand" in s) {
                        o = s.expand(o), delete t[i];
                        for (n in o) n in t || (t[n] = o[n], e[n] = r)
                    } else e[i] = r
            }

            function O(t, e, n) {
                var i, r, o = 0,
                    s = ye.length,
                    a = ot.Deferred().always(function() {
                        delete u.elem
                    }),
                    u = function() {
                        if (r) return !1;
                        for (var e = fe || P(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, o = 1 - i, s = 0, u = l.tweens.length; s < u; s++) l.tweens[s].run(o);
                        return a.notifyWith(t, [l, o, n]), o < 1 && u ? n : (a.resolveWith(t, [l]), !1)
                    },
                    l = a.promise({
                        elem: t,
                        props: ot.extend({}, e),
                        opts: ot.extend(!0, {
                            specialEasing: {}
                        }, n),
                        originalProperties: e,
                        originalOptions: n,
                        startTime: fe || P(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(e, n) {
                            var i = ot.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                            return l.tweens.push(i), i
                        },
                        stop: function(e) {
                            var n = 0,
                                i = e ? l.tweens.length : 0;
                            if (r) return this;
                            for (r = !0; n < i; n++) l.tweens[n].run(1);
                            return e ? a.resolveWith(t, [l, e]) : a.rejectWith(t, [l, e]), this
                        }
                    }),
                    c = l.props;
                for (I(c, l.opts.specialEasing); o < s; o++)
                    if (i = ye[o].call(l, t, c, l.opts)) return i;
                return ot.map(c, R, l), ot.isFunction(l.opts.start) && l.opts.start.call(t, l), ot.fx.timer(ot.extend(u, {
                    elem: t,
                    anim: l,
                    queue: l.opts.queue
                })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            }

            function q(t) {
                return function(e, n) {
                    "string" != typeof e && (n = e, e = "*");
                    var i, r = 0,
                        o = e.toLowerCase().match(_t) || [];
                    if (ot.isFunction(n))
                        for (; i = o[r++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
                }
            }

            function B(t, e, n, i) {
                function r(a) {
                    var u;
                    return o[a] = !0, ot.each(t[a] || [], function(t, a) {
                        var l = a(e, n, i);
                        return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (e.dataTypes.unshift(l), r(l), !1)
                    }), u
                }
                var o = {},
                    s = t === Ke;
                return r(e.dataTypes[0]) || !o["*"] && r("*")
            }

            function F(t, e) {
                var i, r, o = ot.ajaxSettings.flatOptions || {};
                for (r in e) e[r] !== n && ((o[r] ? t : i || (i = {}))[r] = e[r]);
                return i && ot.extend(!0, t, i), t
            }

            function z(t, e, i) {
                for (var r, o, s, a, u = t.contents, l = t.dataTypes;
                    "*" === l[0];) l.shift(), o === n && (o = t.mimeType || e.getResponseHeader("Content-Type"));
                if (o)
                    for (a in u)
                        if (u[a] && u[a].test(o)) {
                            l.unshift(a);
                            break
                        }
                if (l[0] in i) s = l[0];
                else {
                    for (a in i) {
                        if (!l[0] || t.converters[a + " " + l[0]]) {
                            s = a;
                            break
                        }
                        r || (r = a)
                    }
                    s = s || r
                }
                if (s) return s !== l[0] && l.unshift(s), i[s]
            }

            function K(t, e, n, i) {
                var r, o, s, a, u, l = {},
                    c = t.dataTypes.slice();
                if (c[1])
                    for (s in t.converters) l[s.toLowerCase()] = t.converters[s];
                for (o = c.shift(); o;)
                    if (t.responseFields[o] && (n[t.responseFields[o]] = e), !u && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = o, o = c.shift())
                        if ("*" === o) o = u;
                        else if ("*" !== u && u !== o) {
                    if (s = l[u + " " + o] || l["* " + o], !s)
                        for (r in l)
                            if (a = r.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                                s === !0 ? s = l[r] : l[r] !== !0 && (o = a[0], c.unshift(a[1]));
                                break
                            }
                    if (s !== !0)
                        if (s && t["throws"]) e = s(e);
                        else try {
                            e = s(e)
                        } catch (p) {
                            return {
                                state: "parsererror",
                                error: s ? p : "No conversion from " + u + " to " + o
                            }
                        }
                }
                return {
                    state: "success",
                    data: e
                }
            }

            function W(t, e, n, i) {
                var r;
                if (ot.isArray(e)) ot.each(e, function(e, r) {
                    n || Qe.test(t) ? i(t, r) : W(t + "[" + ("object" == typeof r ? e : "") + "]", r, n, i)
                });
                else if (n || "object" !== ot.type(e)) i(t, e);
                else
                    for (r in e) W(t + "[" + r + "]", e[r], n, i)
            }

            function U() {
                try {
                    return new t.XMLHttpRequest
                } catch (e) {}
            }

            function V() {
                try {
                    return new t.ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {}
            }

            function Q(t) {
                return ot.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
            }
            var X = [],
                Y = X.slice,
                G = X.concat,
                J = X.push,
                Z = X.indexOf,
                tt = {},
                et = tt.toString,
                nt = tt.hasOwnProperty,
                it = {},
                rt = "1.11.1",
                ot = function(t, e) {
                    return new ot.fn.init(t, e)
                },
                st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                at = /^-ms-/,
                ut = /-([\da-z])/gi,
                lt = function(t, e) {
                    return e.toUpperCase()
                };
            ot.fn = ot.prototype = {
                jquery: rt,
                constructor: ot,
                selector: "",
                length: 0,
                toArray: function() {
                    return Y.call(this)
                },
                get: function(t) {
                    return null != t ? t < 0 ? this[t + this.length] : this[t] : Y.call(this)
                },
                pushStack: function(t) {
                    var e = ot.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e
                },
                each: function(t, e) {
                    return ot.each(this, t, e)
                },
                map: function(t) {
                    return this.pushStack(ot.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function() {
                    return this.pushStack(Y.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(t) {
                    var e = this.length,
                        n = +t + (t < 0 ? e : 0);
                    return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: J,
                sort: X.sort,
                splice: X.splice
            }, ot.extend = ot.fn.extend = function() {
                var t, e, i, r, o, s, a = arguments[0] || {},
                    u = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[u] || {}, u++), "object" == typeof a || ot.isFunction(a) || (a = {}), u === l && (a = this, u--); u < l; u++)
                    if (null != (o = arguments[u]))
                        for (r in o) t = a[r], i = o[r], a !== i && (c && i && (ot.isPlainObject(i) || (e = ot.isArray(i))) ? (e ? (e = !1, s = t && ot.isArray(t) ? t : []) : s = t && ot.isPlainObject(t) ? t : {}, a[r] = ot.extend(c, s, i)) : i !== n && (a[r] = i));
                return a
            }, ot.extend({
                expando: "jQuery" + (rt + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(t) {
                    throw new Error(t)
                },
                noop: function() {},
                isFunction: function(t) {
                    return "function" === ot.type(t)
                },
                isArray: Array.isArray || function(t) {
                    return "array" === ot.type(t)
                },
                isWindow: function(t) {
                    return null != t && t == t.window
                },
                isNumeric: function(t) {
                    return !ot.isArray(t) && t - parseFloat(t) >= 0
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                isPlainObject: function(t) {
                    var e;
                    if (!t || "object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !nt.call(t, "constructor") && !nt.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (i) {
                        return !1
                    }
                    if (it.ownLast)
                        for (e in t) return nt.call(t, e);
                    for (e in t);
                    return e === n || nt.call(t, e)
                },
                type: function(t) {
                    return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? tt[et.call(t)] || "object" : typeof t
                },
                globalEval: function(e) {
                    e && ot.trim(e) && (t.execScript || function(e) {
                        t.eval.call(t, e)
                    })(e)
                },
                camelCase: function(t) {
                    return t.replace(at, "ms-").replace(ut, lt)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, e, n) {
                    var r, o = 0,
                        s = t.length,
                        a = i(t);
                    if (n) {
                        if (a)
                            for (; o < s && (r = e.apply(t[o], n), r !== !1); o++);
                        else
                            for (o in t)
                                if (r = e.apply(t[o], n), r === !1) break
                    } else if (a)
                        for (; o < s && (r = e.call(t[o], o, t[o]), r !== !1); o++);
                    else
                        for (o in t)
                            if (r = e.call(t[o], o, t[o]), r === !1) break;
                    return t
                },
                trim: function(t) {
                    return null == t ? "" : (t + "").replace(st, "")
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? ot.merge(n, "string" == typeof t ? [t] : t) : J.call(n, t)), n
                },
                inArray: function(t, e, n) {
                    var i;
                    if (e) {
                        if (Z) return Z.call(e, t, n);
                        for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                            if (n in e && e[n] === t) return n
                    }
                    return -1
                },
                merge: function(t, e) {
                    for (var i = +e.length, r = 0, o = t.length; r < i;) t[o++] = e[r++];
                    if (i !== i)
                        for (; e[r] !== n;) t[o++] = e[r++];
                    return t.length = o, t
                },
                grep: function(t, e, n) {
                    for (var i, r = [], o = 0, s = t.length, a = !n; o < s; o++) i = !e(t[o], o), i !== a && r.push(t[o]);
                    return r
                },
                map: function(t, e, n) {
                    var r, o = 0,
                        s = t.length,
                        a = i(t),
                        u = [];
                    if (a)
                        for (; o < s; o++) r = e(t[o], o, n), null != r && u.push(r);
                    else
                        for (o in t) r = e(t[o], o, n), null != r && u.push(r);
                    return G.apply([], u)
                },
                guid: 1,
                proxy: function(t, e) {
                    var i, r, o;
                    return "string" == typeof e && (o = t[e], e = t, t = o), ot.isFunction(t) ? (i = Y.call(arguments, 2), r = function() {
                        return t.apply(e || this, i.concat(Y.call(arguments)))
                    }, r.guid = t.guid = t.guid || ot.guid++, r) : n
                },
                now: function() {
                    return +new Date
                },
                support: it
            }), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                tt["[object " + e + "]"] = e.toLowerCase()
            });
            var ct = function(t) {
                function e(t, e, n, i) {
                    var r, o, s, a, u, l, c, d, f, g;
                    if ((e ? e.ownerDocument || e : B) !== j && $(e), e = e || j, n = n || [], !t || "string" != typeof t) return n;
                    if (1 !== (a = e.nodeType) && 9 !== a) return [];
                    if (H && !i) {
                        if (r = yt.exec(t))
                            if (s = r[1]) {
                                if (9 === a) {
                                    if (o = e.getElementById(s), !o || !o.parentNode) return n;
                                    if (o.id === s) return n.push(o), n
                                } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(s)) && O(e, o) && o.id === s) return n.push(o), n
                            } else {
                                if (r[2]) return tt.apply(n, e.getElementsByTagName(t)), n;
                                if ((s = r[3]) && w.getElementsByClassName && e.getElementsByClassName) return tt.apply(n, e.getElementsByClassName(s)), n
                            }
                        if (w.qsa && (!R || !R.test(t))) {
                            if (d = c = q, f = e, g = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                                for (l = S(t), (c = e.getAttribute("id")) ? d = c.replace(xt, "\\$&") : e.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + h(l[u]);
                                f = _t.test(t) && p(e.parentNode) || e, g = l.join(",")
                            }
                            if (g) try {
                                return tt.apply(n, f.querySelectorAll(g)), n
                            } catch (m) {} finally {
                                c || e.removeAttribute("id")
                            }
                        }
                    }
                    return A(t.replace(lt, "$1"), e, n, i)
                }

                function i() {
                    function t(n, i) {
                        return e.push(n + " ") > T.cacheLength && delete t[e.shift()], t[n + " "] = i
                    }
                    var e = [];
                    return t
                }

                function r(t) {
                    return t[q] = !0, t
                }

                function o(t) {
                    var e = j.createElement("div");
                    try {
                        return !!t(e)
                    } catch (n) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function s(t, e) {
                    for (var n = t.split("|"), i = t.length; i--;) T.attrHandle[n[i]] = e
                }

                function a(t, e) {
                    var n = e && t,
                        i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
                    if (i) return i;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === e) return -1;
                    return t ? 1 : -1
                }

                function u(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return "input" === n && e.type === t
                    }
                }

                function l(t) {
                    return function(e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }

                function c(t) {
                    return r(function(e) {
                        return e = +e, r(function(n, i) {
                            for (var r, o = t([], n.length, e), s = o.length; s--;) n[r = o[s]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }

                function p(t) {
                    return t && typeof t.getElementsByTagName !== Q && t
                }

                function d() {}

                function h(t) {
                    for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                    return i
                }

                function f(t, e, n) {
                    var i = e.dir,
                        r = n && "parentNode" === i,
                        o = z++;
                    return e.first ? function(e, n, o) {
                        for (; e = e[i];)
                            if (1 === e.nodeType || r) return t(e, n, o)
                    } : function(e, n, s) {
                        var a, u, l = [F, o];
                        if (s) {
                            for (; e = e[i];)
                                if ((1 === e.nodeType || r) && t(e, n, s)) return !0
                        } else
                            for (; e = e[i];)
                                if (1 === e.nodeType || r) {
                                    if (u = e[q] || (e[q] = {}), (a = u[i]) && a[0] === F && a[1] === o) return l[2] = a[2];
                                    if (u[i] = l, l[2] = t(e, n, s)) return !0
                                }
                    }
                }

                function g(t) {
                    return t.length > 1 ? function(e, n, i) {
                        for (var r = t.length; r--;)
                            if (!t[r](e, n, i)) return !1;
                        return !0
                    } : t[0]
                }

                function m(t, n, i) {
                    for (var r = 0, o = n.length; r < o; r++) e(t, n[r], i);
                    return i
                }

                function b(t, e, n, i, r) {
                    for (var o, s = [], a = 0, u = t.length, l = null != e; a < u; a++)(o = t[a]) && (n && !n(o, i, r) || (s.push(o), l && e.push(a)));
                    return s
                }

                function v(t, e, n, i, o, s) {
                    return i && !i[q] && (i = v(i)), o && !o[q] && (o = v(o, s)), r(function(r, s, a, u) {
                        var l, c, p, d = [],
                            h = [],
                            f = s.length,
                            g = r || m(e || "*", a.nodeType ? [a] : a, []),
                            v = !t || !r && e ? g : b(g, d, t, a, u),
                            y = n ? o || (r ? t : f || i) ? [] : s : v;
                        if (n && n(v, y, a, u), i)
                            for (l = b(y, h), i(l, [], a, u), c = l.length; c--;)(p = l[c]) && (y[h[c]] = !(v[h[c]] = p));
                        if (r) {
                            if (o || t) {
                                if (o) {
                                    for (l = [], c = y.length; c--;)(p = y[c]) && l.push(v[c] = p);
                                    o(null, y = [], l, u)
                                }
                                for (c = y.length; c--;)(p = y[c]) && (l = o ? nt.call(r, p) : d[c]) > -1 && (r[l] = !(s[l] = p))
                            }
                        } else y = b(y === s ? y.splice(f, y.length) : y), o ? o(null, s, y, u) : tt.apply(s, y)
                    })
                }

                function y(t) {
                    for (var e, n, i, r = t.length, o = T.relative[t[0].type], s = o || T.relative[" "], a = o ? 1 : 0, u = f(function(t) {
                            return t === e
                        }, s, !0), l = f(function(t) {
                            return nt.call(e, t) > -1
                        }, s, !0), c = [function(t, n, i) {
                            return !o && (i || n !== N) || ((e = n).nodeType ? u(t, n, i) : l(t, n, i))
                        }]; a < r; a++)
                        if (n = T.relative[t[a].type]) c = [f(g(c), n)];
                        else {
                            if (n = T.filter[t[a].type].apply(null, t[a].matches), n[q]) {
                                for (i = ++a; i < r && !T.relative[t[i].type]; i++);
                                return v(a > 1 && g(c), a > 1 && h(t.slice(0, a - 1).concat({
                                    value: " " === t[a - 2].type ? "*" : ""
                                })).replace(lt, "$1"), n, a < i && y(t.slice(a, i)), i < r && y(t = t.slice(i)), i < r && h(t))
                            }
                            c.push(n)
                        }
                    return g(c)
                }

                function _(t, n) {
                    var i = n.length > 0,
                        o = t.length > 0,
                        s = function(r, s, a, u, l) {
                            var c, p, d, h = 0,
                                f = "0",
                                g = r && [],
                                m = [],
                                v = N,
                                y = r || o && T.find.TAG("*", l),
                                _ = F += null == v ? 1 : Math.random() || .1,
                                x = y.length;
                            for (l && (N = s !== j && s); f !== x && null != (c = y[f]); f++) {
                                if (o && c) {
                                    for (p = 0; d = t[p++];)
                                        if (d(c, s, a)) {
                                            u.push(c);
                                            break
                                        }
                                    l && (F = _)
                                }
                                i && ((c = !d && c) && h--, r && g.push(c))
                            }
                            if (h += f, i && f !== h) {
                                for (p = 0; d = n[p++];) d(g, m, s, a);
                                if (r) {
                                    if (h > 0)
                                        for (; f--;) g[f] || m[f] || (m[f] = J.call(u));
                                    m = b(m)
                                }
                                tt.apply(u, m), l && !r && m.length > 0 && h + n.length > 1 && e.uniqueSort(u)
                            }
                            return l && (F = _, N = v), g
                        };
                    return i ? r(s) : s
                }
                var x, w, T, C, k, S, E, A, N, D, L, $, j, P, H, R, M, I, O, q = "sizzle" + -new Date,
                    B = t.document,
                    F = 0,
                    z = 0,
                    K = i(),
                    W = i(),
                    U = i(),
                    V = function(t, e) {
                        return t === e && (L = !0), 0
                    },
                    Q = typeof n,
                    X = 1 << 31,
                    Y = {}.hasOwnProperty,
                    G = [],
                    J = G.pop,
                    Z = G.push,
                    tt = G.push,
                    et = G.slice,
                    nt = G.indexOf || function(t) {
                        for (var e = 0, n = this.length; e < n; e++)
                            if (this[e] === t) return e;
                        return -1
                    },
                    it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    rt = "[\\x20\\t\\r\\n\\f]",
                    ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    st = ot.replace("w", "w#"),
                    at = "\\[" + rt + "*(" + ot + ")(?:" + rt + "*([*^$|!~]?=)" + rt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + st + "))|)" + rt + "*\\]",
                    ut = ":(" + ot + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)",
                    lt = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"),
                    ct = new RegExp("^" + rt + "*," + rt + "*"),
                    pt = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"),
                    dt = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"),
                    ht = new RegExp(ut),
                    ft = new RegExp("^" + st + "$"),
                    gt = {
                        ID: new RegExp("^#(" + ot + ")"),
                        CLASS: new RegExp("^\\.(" + ot + ")"),
                        TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + at),
                        PSEUDO: new RegExp("^" + ut),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + it + ")$", "i"),
                        needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
                    },
                    mt = /^(?:input|select|textarea|button)$/i,
                    bt = /^h\d$/i,
                    vt = /^[^{]+\{\s*\[native \w/,
                    yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    _t = /[+~]/,
                    xt = /'|\\/g,
                    wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"),
                    Tt = function(t, e, n) {
                        var i = "0x" + e - 65536;
                        return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                    };
                try {
                    tt.apply(G = et.call(B.childNodes), B.childNodes), G[B.childNodes.length].nodeType
                } catch (Ct) {
                    tt = {
                        apply: G.length ? function(t, e) {
                            Z.apply(t, et.call(e))
                        } : function(t, e) {
                            for (var n = t.length, i = 0; t[n++] = e[i++];);
                            t.length = n - 1
                        }
                    }
                }
                w = e.support = {}, k = e.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return !!e && "HTML" !== e.nodeName
                }, $ = e.setDocument = function(t) {
                    var e, n = t ? t.ownerDocument || t : B,
                        i = n.defaultView;
                    return n !== j && 9 === n.nodeType && n.documentElement ? (j = n, P = n.documentElement, H = !k(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                        $()
                    }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                        $()
                    })), w.attributes = o(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), w.getElementsByTagName = o(function(t) {
                        return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
                    }), w.getElementsByClassName = vt.test(n.getElementsByClassName) && o(function(t) {
                        return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                    }), w.getById = o(function(t) {
                        return P.appendChild(t).id = q, !n.getElementsByName || !n.getElementsByName(q).length
                    }), w.getById ? (T.find.ID = function(t, e) {
                        if (typeof e.getElementById !== Q && H) {
                            var n = e.getElementById(t);
                            return n && n.parentNode ? [n] : []
                        }
                    }, T.filter.ID = function(t) {
                        var e = t.replace(wt, Tt);
                        return function(t) {
                            return t.getAttribute("id") === e;
                        }
                    }) : (delete T.find.ID, T.filter.ID = function(t) {
                        var e = t.replace(wt, Tt);
                        return function(t) {
                            var n = typeof t.getAttributeNode !== Q && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }), T.find.TAG = w.getElementsByTagName ? function(t, e) {
                        if (typeof e.getElementsByTagName !== Q) return e.getElementsByTagName(t)
                    } : function(t, e) {
                        var n, i = [],
                            r = 0,
                            o = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return o
                    }, T.find.CLASS = w.getElementsByClassName && function(t, e) {
                        if (typeof e.getElementsByClassName !== Q && H) return e.getElementsByClassName(t)
                    }, M = [], R = [], (w.qsa = vt.test(n.querySelectorAll)) && (o(function(t) {
                        t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && R.push("[*^$]=" + rt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || R.push("\\[" + rt + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || R.push(":checked")
                    }), o(function(t) {
                        var e = n.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && R.push("name" + rt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (w.matchesSelector = vt.test(I = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && o(function(t) {
                        w.disconnectedMatch = I.call(t, "div"), I.call(t, "[s!='']:x"), M.push("!=", ut)
                    }), R = R.length && new RegExp(R.join("|")), M = M.length && new RegExp(M.join("|")), e = vt.test(P.compareDocumentPosition), O = e || vt.test(P.contains) ? function(t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                            i = e && e.parentNode;
                        return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, V = e ? function(t, e) {
                        if (t === e) return L = !0, 0;
                        var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !w.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === B && O(B, t) ? -1 : e === n || e.ownerDocument === B && O(B, e) ? 1 : D ? nt.call(D, t) - nt.call(D, e) : 0 : 4 & i ? -1 : 1)
                    } : function(t, e) {
                        if (t === e) return L = !0, 0;
                        var i, r = 0,
                            o = t.parentNode,
                            s = e.parentNode,
                            u = [t],
                            l = [e];
                        if (!o || !s) return t === n ? -1 : e === n ? 1 : o ? -1 : s ? 1 : D ? nt.call(D, t) - nt.call(D, e) : 0;
                        if (o === s) return a(t, e);
                        for (i = t; i = i.parentNode;) u.unshift(i);
                        for (i = e; i = i.parentNode;) l.unshift(i);
                        for (; u[r] === l[r];) r++;
                        return r ? a(u[r], l[r]) : u[r] === B ? -1 : l[r] === B ? 1 : 0
                    }, n) : j
                }, e.matches = function(t, n) {
                    return e(t, null, null, n)
                }, e.matchesSelector = function(t, n) {
                    if ((t.ownerDocument || t) !== j && $(t), n = n.replace(dt, "='$1']"), w.matchesSelector && H && (!M || !M.test(n)) && (!R || !R.test(n))) try {
                        var i = I.call(t, n);
                        if (i || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                    } catch (r) {}
                    return e(n, j, null, [t]).length > 0
                }, e.contains = function(t, e) {
                    return (t.ownerDocument || t) !== j && $(t), O(t, e)
                }, e.attr = function(t, e) {
                    (t.ownerDocument || t) !== j && $(t);
                    var i = T.attrHandle[e.toLowerCase()],
                        r = i && Y.call(T.attrHandle, e.toLowerCase()) ? i(t, e, !H) : n;
                    return r !== n ? r : w.attributes || !H ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }, e.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, e.uniqueSort = function(t) {
                    var e, n = [],
                        i = 0,
                        r = 0;
                    if (L = !w.detectDuplicates, D = !w.sortStable && t.slice(0), t.sort(V), L) {
                        for (; e = t[r++];) e === t[r] && (i = n.push(r));
                        for (; i--;) t.splice(n[i], 1)
                    }
                    return D = null, t
                }, C = e.getText = function(t) {
                    var e, n = "",
                        i = 0,
                        r = t.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += C(t)
                        } else if (3 === r || 4 === r) return t.nodeValue
                    } else
                        for (; e = t[i++];) n += C(e);
                    return n
                }, T = e.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: gt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(wt, Tt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, Tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, n = !t[6] && t[2];
                            return gt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ht.test(n) && (e = S(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(wt, Tt).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = K[t + " "];
                            return e || (e = new RegExp("(^|" + rt + ")" + t + "(" + rt + "|$)")) && K(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== Q && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, n, i) {
                            return function(r) {
                                var o = e.attr(r, t);
                                return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                            }
                        },
                        CHILD: function(t, e, n, i, r) {
                            var o = "nth" !== t.slice(0, 3),
                                s = "last" !== t.slice(-4),
                                a = "of-type" === e;
                            return 1 === i && 0 === r ? function(t) {
                                return !!t.parentNode
                            } : function(e, n, u) {
                                var l, c, p, d, h, f, g = o !== s ? "nextSibling" : "previousSibling",
                                    m = e.parentNode,
                                    b = a && e.nodeName.toLowerCase(),
                                    v = !u && !a;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (p = e; p = p[g];)
                                                if (a ? p.nodeName.toLowerCase() === b : 1 === p.nodeType) return !1;
                                            f = g = "only" === t && !f && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (f = [s ? m.firstChild : m.lastChild], s && v) {
                                        for (c = m[q] || (m[q] = {}), l = c[t] || [], h = l[0] === F && l[1], d = l[0] === F && l[2], p = h && m.childNodes[h]; p = ++h && p && p[g] || (d = h = 0) || f.pop();)
                                            if (1 === p.nodeType && ++d && p === e) {
                                                c[t] = [F, h, d];
                                                break
                                            }
                                    } else if (v && (l = (e[q] || (e[q] = {}))[t]) && l[0] === F) d = l[1];
                                    else
                                        for (;
                                            (p = ++h && p && p[g] || (d = h = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== b : 1 !== p.nodeType) || !++d || (v && ((p[q] || (p[q] = {}))[t] = [F, d]), p !== e)););
                                    return d -= r, d === i || d % i === 0 && d / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, n) {
                            var i, o = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return o[q] ? o(n) : o.length > 1 ? (i = [t, t, "", n], T.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, e) {
                                for (var i, r = o(t, n), s = r.length; s--;) i = nt.call(t, r[s]), t[i] = !(e[i] = r[s])
                            }) : function(t) {
                                return o(t, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function(t) {
                            var e = [],
                                n = [],
                                i = E(t.replace(lt, "$1"));
                            return i[q] ? r(function(t, e, n, r) {
                                for (var o, s = i(t, null, r, []), a = t.length; a--;)(o = s[a]) && (t[a] = !(e[a] = o))
                            }) : function(t, r, o) {
                                return e[0] = t, i(e, null, o, n), !n.pop()
                            }
                        }),
                        has: r(function(t) {
                            return function(n) {
                                return e(t, n).length > 0
                            }
                        }),
                        contains: r(function(t) {
                            return function(e) {
                                return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                            }
                        }),
                        lang: r(function(t) {
                            return ft.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, Tt).toLowerCase(),
                                function(e) {
                                    var n;
                                    do
                                        if (n = H ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var n = t.location && t.location.hash;
                            return n && n.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === P
                        },
                        focus: function(t) {
                            return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !T.pseudos.empty(t)
                        },
                        header: function(t) {
                            return bt.test(t.nodeName)
                        },
                        input: function(t) {
                            return mt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: c(function() {
                            return [0]
                        }),
                        last: c(function(t, e) {
                            return [e - 1]
                        }),
                        eq: c(function(t, e, n) {
                            return [n < 0 ? n + e : n]
                        }),
                        even: c(function(t, e) {
                            for (var n = 0; n < e; n += 2) t.push(n);
                            return t
                        }),
                        odd: c(function(t, e) {
                            for (var n = 1; n < e; n += 2) t.push(n);
                            return t
                        }),
                        lt: c(function(t, e, n) {
                            for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                            return t
                        }),
                        gt: c(function(t, e, n) {
                            for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                            return t
                        })
                    }
                }, T.pseudos.nth = T.pseudos.eq;
                for (x in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) T.pseudos[x] = u(x);
                for (x in {
                        submit: !0,
                        reset: !0
                    }) T.pseudos[x] = l(x);
                return d.prototype = T.filters = T.pseudos, T.setFilters = new d, S = e.tokenize = function(t, n) {
                    var i, r, o, s, a, u, l, c = W[t + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (a = t, u = [], l = T.preFilter; a;) {
                        i && !(r = ct.exec(a)) || (r && (a = a.slice(r[0].length) || a), u.push(o = [])), i = !1, (r = pt.exec(a)) && (i = r.shift(), o.push({
                            value: i,
                            type: r[0].replace(lt, " ")
                        }), a = a.slice(i.length));
                        for (s in T.filter) !(r = gt[s].exec(a)) || l[s] && !(r = l[s](r)) || (i = r.shift(), o.push({
                            value: i,
                            type: s,
                            matches: r
                        }), a = a.slice(i.length));
                        if (!i) break
                    }
                    return n ? a.length : a ? e.error(t) : W(t, u).slice(0)
                }, E = e.compile = function(t, e) {
                    var n, i = [],
                        r = [],
                        o = U[t + " "];
                    if (!o) {
                        for (e || (e = S(t)), n = e.length; n--;) o = y(e[n]), o[q] ? i.push(o) : r.push(o);
                        o = U(t, _(r, i)), o.selector = t
                    }
                    return o
                }, A = e.select = function(t, e, n, i) {
                    var r, o, s, a, u, l = "function" == typeof t && t,
                        c = !i && S(t = l.selector || t);
                    if (n = n || [], 1 === c.length) {
                        if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === e.nodeType && H && T.relative[o[1].type]) {
                            if (e = (T.find.ID(s.matches[0].replace(wt, Tt), e) || [])[0], !e) return n;
                            l && (e = e.parentNode), t = t.slice(o.shift().value.length)
                        }
                        for (r = gt.needsContext.test(t) ? 0 : o.length; r-- && (s = o[r], !T.relative[a = s.type]);)
                            if ((u = T.find[a]) && (i = u(s.matches[0].replace(wt, Tt), _t.test(o[0].type) && p(e.parentNode) || e))) {
                                if (o.splice(r, 1), t = i.length && h(o), !t) return tt.apply(n, i), n;
                                break
                            }
                    }
                    return (l || E(t, c))(i, e, !H, n, _t.test(t) && p(e.parentNode) || e), n
                }, w.sortStable = q.split("").sort(V).join("") === q, w.detectDuplicates = !!L, $(), w.sortDetached = o(function(t) {
                    return 1 & t.compareDocumentPosition(j.createElement("div"))
                }), o(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || s("type|href|height|width", function(t, e, n) {
                    if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), w.attributes && o(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || s("value", function(t, e, n) {
                    if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
                }), o(function(t) {
                    return null == t.getAttribute("disabled")
                }) || s(it, function(t, e, n) {
                    var i;
                    if (!n) return t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
                }), e
            }(t);
            ot.find = ct, ot.expr = ct.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = ct.uniqueSort, ot.text = ct.getText, ot.isXMLDoc = ct.isXML, ot.contains = ct.contains;
            var pt = ot.expr.match.needsContext,
                dt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                ht = /^.[^:#\[\.,]*$/;
            ot.filter = function(t, e, n) {
                var i = e[0];
                return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? ot.find.matchesSelector(i, t) ? [i] : [] : ot.find.matches(t, ot.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            }, ot.fn.extend({
                find: function(t) {
                    var e, n = [],
                        i = this,
                        r = i.length;
                    if ("string" != typeof t) return this.pushStack(ot(t).filter(function() {
                        for (e = 0; e < r; e++)
                            if (ot.contains(i[e], this)) return !0
                    }));
                    for (e = 0; e < r; e++) ot.find(t, i[e], n);
                    return n = this.pushStack(r > 1 ? ot.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
                },
                filter: function(t) {
                    return this.pushStack(r(this, t || [], !1))
                },
                not: function(t) {
                    return this.pushStack(r(this, t || [], !0))
                },
                is: function(t) {
                    return !!r(this, "string" == typeof t && pt.test(t) ? ot(t) : t || [], !1).length
                }
            });
            var ft, gt = t.document,
                mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                bt = ot.fn.init = function(t, e) {
                    var i, r;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || ft).find(t) : this.constructor(e).find(t);
                        if (i[1]) {
                            if (e = e instanceof ot ? e[0] : e, ot.merge(this, ot.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : gt, !0)), dt.test(i[1]) && ot.isPlainObject(e))
                                for (i in e) ot.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                            return this
                        }
                        if (r = gt.getElementById(i[2]), r && r.parentNode) {
                            if (r.id !== i[2]) return ft.find(t);
                            this.length = 1, this[0] = r
                        }
                        return this.context = gt, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? "undefined" != typeof ft.ready ? ft.ready(t) : t(ot) : (t.selector !== n && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
                };
            bt.prototype = ot.fn, ft = ot(gt);
            var vt = /^(?:parents|prev(?:Until|All))/,
                yt = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            ot.extend({
                dir: function(t, e, i) {
                    for (var r = [], o = t[e]; o && 9 !== o.nodeType && (i === n || 1 !== o.nodeType || !ot(o).is(i));) 1 === o.nodeType && r.push(o), o = o[e];
                    return r
                },
                sibling: function(t, e) {
                    for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                    return n
                }
            }), ot.fn.extend({
                has: function(t) {
                    var e, n = ot(t, this),
                        i = n.length;
                    return this.filter(function() {
                        for (e = 0; e < i; e++)
                            if (ot.contains(this, n[e])) return !0
                    })
                },
                closest: function(t, e) {
                    for (var n, i = 0, r = this.length, o = [], s = pt.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; i < r; i++)
                        for (n = this[i]; n && n !== e; n = n.parentNode)
                            if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, t))) {
                                o.push(n);
                                break
                            }
                    return this.pushStack(o.length > 1 ? ot.unique(o) : o)
                },
                index: function(t) {
                    return t ? "string" == typeof t ? ot.inArray(this[0], ot(t)) : ot.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(t, e) {
                    return this.pushStack(ot.unique(ot.merge(this.get(), ot(t, e))))
                },
                addBack: function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }
            }), ot.each({
                parent: function(t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                },
                parents: function(t) {
                    return ot.dir(t, "parentNode")
                },
                parentsUntil: function(t, e, n) {
                    return ot.dir(t, "parentNode", n)
                },
                next: function(t) {
                    return o(t, "nextSibling")
                },
                prev: function(t) {
                    return o(t, "previousSibling")
                },
                nextAll: function(t) {
                    return ot.dir(t, "nextSibling")
                },
                prevAll: function(t) {
                    return ot.dir(t, "previousSibling")
                },
                nextUntil: function(t, e, n) {
                    return ot.dir(t, "nextSibling", n)
                },
                prevUntil: function(t, e, n) {
                    return ot.dir(t, "previousSibling", n)
                },
                siblings: function(t) {
                    return ot.sibling((t.parentNode || {}).firstChild, t)
                },
                children: function(t) {
                    return ot.sibling(t.firstChild)
                },
                contents: function(t) {
                    return ot.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ot.merge([], t.childNodes)
                }
            }, function(t, e) {
                ot.fn[t] = function(n, i) {
                    var r = ot.map(this, e, n);
                    return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = ot.filter(i, r)), this.length > 1 && (yt[t] || (r = ot.unique(r)), vt.test(t) && (r = r.reverse())), this.pushStack(r)
                }
            });
            var _t = /\S+/g,
                xt = {};
            ot.Callbacks = function(t) {
                t = "string" == typeof t ? xt[t] || s(t) : ot.extend({}, t);
                var e, i, r, o, a, u, l = [],
                    c = !t.once && [],
                    p = function(n) {
                        for (i = t.memory && n, r = !0, a = u || 0, u = 0, o = l.length, e = !0; l && a < o; a++)
                            if (l[a].apply(n[0], n[1]) === !1 && t.stopOnFalse) {
                                i = !1;
                                break
                            }
                        e = !1, l && (c ? c.length && p(c.shift()) : i ? l = [] : d.disable())
                    },
                    d = {
                        add: function() {
                            if (l) {
                                var n = l.length;
                                ! function r(e) {
                                    ot.each(e, function(e, n) {
                                        var i = ot.type(n);
                                        "function" === i ? t.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                                    })
                                }(arguments), e ? o = l.length : i && (u = n, p(i))
                            }
                            return this
                        },
                        remove: function() {
                            return l && ot.each(arguments, function(t, n) {
                                for (var i;
                                    (i = ot.inArray(n, l, i)) > -1;) l.splice(i, 1), e && (i <= o && o--, i <= a && a--)
                            }), this
                        },
                        has: function(t) {
                            return t ? ot.inArray(t, l) > -1 : !(!l || !l.length)
                        },
                        empty: function() {
                            return l = [], o = 0, this
                        },
                        disable: function() {
                            return l = c = i = n, this
                        },
                        disabled: function() {
                            return !l
                        },
                        lock: function() {
                            return c = n, i || d.disable(), this
                        },
                        locked: function() {
                            return !c
                        },
                        fireWith: function(t, n) {
                            return !l || r && !c || (n = n || [], n = [t, n.slice ? n.slice() : n], e ? c.push(n) : p(n)), this
                        },
                        fire: function() {
                            return d.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                return d
            }, ot.extend({
                Deferred: function(t) {
                    var e = [
                            ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", ot.Callbacks("memory")]
                        ],
                        n = "pending",
                        i = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return r.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var t = arguments;
                                return ot.Deferred(function(n) {
                                    ot.each(e, function(e, o) {
                                        var s = ot.isFunction(t[e]) && t[e];
                                        r[o[1]](function() {
                                            var t = s && s.apply(this, arguments);
                                            t && ot.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, s ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            promise: function(t) {
                                return null != t ? ot.extend(t, i) : i
                            }
                        },
                        r = {};
                    return i.pipe = i.then, ot.each(e, function(t, o) {
                        var s = o[2],
                            a = o[3];
                        i[o[1]] = s.add, a && s.add(function() {
                            n = a
                        }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
                            return r[o[0] + "With"](this === r ? i : this, arguments), this
                        }, r[o[0] + "With"] = s.fireWith
                    }), i.promise(r), t && t.call(r, r), r
                },
                when: function(t) {
                    var e, n, i, r = 0,
                        o = Y.call(arguments),
                        s = o.length,
                        a = 1 !== s || t && ot.isFunction(t.promise) ? s : 0,
                        u = 1 === a ? t : ot.Deferred(),
                        l = function(t, n, i) {
                            return function(r) {
                                n[t] = this, i[t] = arguments.length > 1 ? Y.call(arguments) : r, i === e ? u.notifyWith(n, i) : --a || u.resolveWith(n, i)
                            }
                        };
                    if (s > 1)
                        for (e = new Array(s), n = new Array(s), i = new Array(s); r < s; r++) o[r] && ot.isFunction(o[r].promise) ? o[r].promise().done(l(r, i, o)).fail(u.reject).progress(l(r, n, e)) : --a;
                    return a || u.resolveWith(i, o), u.promise()
                }
            });
            var wt;
            ot.fn.ready = function(t) {
                return ot.ready.promise().done(t), this
            }, ot.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? ot.readyWait++ : ot.ready(!0)
                },
                ready: function(t) {
                    if (t === !0 ? !--ot.readyWait : !ot.isReady) {
                        if (!gt.body) return setTimeout(ot.ready);
                        ot.isReady = !0, t !== !0 && --ot.readyWait > 0 || (wt.resolveWith(gt, [ot]), ot.fn.triggerHandler && (ot(gt).triggerHandler("ready"), ot(gt).off("ready")))
                    }
                }
            }), ot.ready.promise = function(e) {
                if (!wt)
                    if (wt = ot.Deferred(), "complete" === gt.readyState) setTimeout(ot.ready);
                    else if (gt.addEventListener) gt.addEventListener("DOMContentLoaded", u, !1), t.addEventListener("load", u, !1);
                else {
                    gt.attachEvent("onreadystatechange", u), t.attachEvent("onload", u);
                    var n = !1;
                    try {
                        n = null == t.frameElement && gt.documentElement
                    } catch (i) {}
                    n && n.doScroll && ! function r() {
                        if (!ot.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (t) {
                                return setTimeout(r, 50)
                            }
                            a(), ot.ready()
                        }
                    }()
                }
                return wt.promise(e)
            };
            var Tt, Ct = typeof n;
            for (Tt in ot(it)) break;
            it.ownLast = "0" !== Tt, it.inlineBlockNeedsLayout = !1, ot(function() {
                    var t, e, n, i;
                    n = gt.getElementsByTagName("body")[0], n && n.style && (e = gt.createElement("div"), i = gt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== Ct && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
                }),
                function() {
                    var t = gt.createElement("div");
                    if (null == it.deleteExpando) {
                        it.deleteExpando = !0;
                        try {
                            delete t.test
                        } catch (e) {
                            it.deleteExpando = !1
                        }
                    }
                    t = null
                }(), ot.acceptData = function(t) {
                    var e = ot.noData[(t.nodeName + " ").toLowerCase()],
                        n = +t.nodeType || 1;
                    return (1 === n || 9 === n) && (!e || e !== !0 && t.getAttribute("classid") === e)
                };
            var kt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                St = /([A-Z])/g;
            ot.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(t) {
                    return t = t.nodeType ? ot.cache[t[ot.expando]] : t[ot.expando], !!t && !c(t)
                },
                data: function(t, e, n) {
                    return p(t, e, n)
                },
                removeData: function(t, e) {
                    return d(t, e)
                },
                _data: function(t, e, n) {
                    return p(t, e, n, !0)
                },
                _removeData: function(t, e) {
                    return d(t, e, !0)
                }
            }), ot.fn.extend({
                data: function(t, e) {
                    var i, r, o, s = this[0],
                        a = s && s.attributes;
                    if (t === n) {
                        if (this.length && (o = ot.data(s), 1 === s.nodeType && !ot._data(s, "parsedAttrs"))) {
                            for (i = a.length; i--;) a[i] && (r = a[i].name, 0 === r.indexOf("data-") && (r = ot.camelCase(r.slice(5)), l(s, r, o[r])));
                            ot._data(s, "parsedAttrs", !0)
                        }
                        return o
                    }
                    return "object" == typeof t ? this.each(function() {
                        ot.data(this, t)
                    }) : arguments.length > 1 ? this.each(function() {
                        ot.data(this, t, e)
                    }) : s ? l(s, t, ot.data(s, t)) : n
                },
                removeData: function(t) {
                    return this.each(function() {
                        ot.removeData(this, t)
                    })
                }
            }), ot.extend({
                queue: function(t, e, n) {
                    var i;
                    if (t) return e = (e || "fx") + "queue", i = ot._data(t, e), n && (!i || ot.isArray(n) ? i = ot._data(t, e, ot.makeArray(n)) : i.push(n)), i || []
                },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var n = ot.queue(t, e),
                        i = n.length,
                        r = n.shift(),
                        o = ot._queueHooks(t, e),
                        s = function() {
                            ot.dequeue(t, e)
                        };
                    "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, s, o)), !i && o && o.empty.fire()
                },
                _queueHooks: function(t, e) {
                    var n = e + "queueHooks";
                    return ot._data(t, n) || ot._data(t, n, {
                        empty: ot.Callbacks("once memory").add(function() {
                            ot._removeData(t, e + "queue"), ot._removeData(t, n)
                        })
                    })
                }
            }), ot.fn.extend({
                queue: function(t, e) {
                    var i = 2;
                    return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? ot.queue(this[0], t) : e === n ? this : this.each(function() {
                        var n = ot.queue(this, t, e);
                        ot._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && ot.dequeue(this, t)
                    })
                },
                dequeue: function(t) {
                    return this.each(function() {
                        ot.dequeue(this, t)
                    })
                },
                clearQueue: function(t) {
                    return this.queue(t || "fx", [])
                },
                promise: function(t, e) {
                    var i, r = 1,
                        o = ot.Deferred(),
                        s = this,
                        a = this.length,
                        u = function() {
                            --r || o.resolveWith(s, [s])
                        };
                    for ("string" != typeof t && (e = t, t = n), t = t || "fx"; a--;) i = ot._data(s[a], t + "queueHooks"), i && i.empty && (r++, i.empty.add(u));
                    return u(), o.promise(e)
                }
            });
            var Et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                At = ["Top", "Right", "Bottom", "Left"],
                Nt = function(t, e) {
                    return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
                },
                Dt = ot.access = function(t, e, i, r, o, s, a) {
                    var u = 0,
                        l = t.length,
                        c = null == i;
                    if ("object" === ot.type(i)) {
                        o = !0;
                        for (u in i) ot.access(t, e, u, i[u], !0, s, a)
                    } else if (r !== n && (o = !0, ot.isFunction(r) || (a = !0), c && (a ? (e.call(t, r), e = null) : (c = e, e = function(t, e, n) {
                            return c.call(ot(t), n)
                        })), e))
                        for (; u < l; u++) e(t[u], i, a ? r : r.call(t[u], u, e(t[u], i)));
                    return o ? t : c ? e.call(t) : l ? e(t[0], i) : s
                },
                Lt = /^(?:checkbox|radio)$/i;
            ! function() {
                var t = gt.createElement("input"),
                    e = gt.createElement("div"),
                    n = gt.createDocumentFragment();
                if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", it.leadingWhitespace = 3 === e.firstChild.nodeType, it.tbody = !e.getElementsByTagName("tbody").length, it.htmlSerialize = !!e.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== gt.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, n.appendChild(t), it.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, n.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                        it.noCloneEvent = !1
                    }), e.cloneNode(!0).click()), null == it.deleteExpando) {
                    it.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (i) {
                        it.deleteExpando = !1
                    }
                }
            }(),
            function() {
                var e, n, i = gt.createElement("div");
                for (e in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) n = "on" + e, (it[e + "Bubbles"] = n in t) || (i.setAttribute(n, "t"), it[e + "Bubbles"] = i.attributes[n].expando === !1);
                i = null
            }();
            var $t = /^(?:input|select|textarea)$/i,
                jt = /^key/,
                Pt = /^(?:mouse|pointer|contextmenu)|click/,
                Ht = /^(?:focusinfocus|focusoutblur)$/,
                Rt = /^([^.]*)(?:\.(.+)|)$/;
            ot.event = {
                global: {},
                add: function(t, e, i, r, o) {
                    var s, a, u, l, c, p, d, h, f, g, m, b = ot._data(t);
                    if (b) {
                        for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = ot.guid++), (a = b.events) || (a = b.events = {}), (p = b.handle) || (p = b.handle = function(t) {
                                return typeof ot === Ct || t && ot.event.triggered === t.type ? n : ot.event.dispatch.apply(p.elem, arguments)
                            }, p.elem = t), e = (e || "").match(_t) || [""], u = e.length; u--;) s = Rt.exec(e[u]) || [], f = m = s[1], g = (s[2] || "").split(".").sort(), f && (c = ot.event.special[f] || {}, f = (o ? c.delegateType : c.bindType) || f, c = ot.event.special[f] || {}, d = ot.extend({
                            type: f,
                            origType: m,
                            data: r,
                            handler: i,
                            guid: i.guid,
                            selector: o,
                            needsContext: o && ot.expr.match.needsContext.test(o),
                            namespace: g.join(".")
                        }, l), (h = a[f]) || (h = a[f] = [], h.delegateCount = 0, c.setup && c.setup.call(t, r, g, p) !== !1 || (t.addEventListener ? t.addEventListener(f, p, !1) : t.attachEvent && t.attachEvent("on" + f, p))), c.add && (c.add.call(t, d), d.handler.guid || (d.handler.guid = i.guid)), o ? h.splice(h.delegateCount++, 0, d) : h.push(d), ot.event.global[f] = !0);
                        t = null
                    }
                },
                remove: function(t, e, n, i, r) {
                    var o, s, a, u, l, c, p, d, h, f, g, m = ot.hasData(t) && ot._data(t);
                    if (m && (c = m.events)) {
                        for (e = (e || "").match(_t) || [""], l = e.length; l--;)
                            if (a = Rt.exec(e[l]) || [], h = g = a[1], f = (a[2] || "").split(".").sort(), h) {
                                for (p = ot.event.special[h] || {}, h = (i ? p.delegateType : p.bindType) || h, d = c[h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = d.length; o--;) s = d[o], !r && g !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (d.splice(o, 1), s.selector && d.delegateCount--, p.remove && p.remove.call(t, s));
                                u && !d.length && (p.teardown && p.teardown.call(t, f, m.handle) !== !1 || ot.removeEvent(t, h, m.handle), delete c[h])
                            } else
                                for (h in c) ot.event.remove(t, h + e[l], n, i, !0);
                        ot.isEmptyObject(c) && (delete m.handle, ot._removeData(t, "events"))
                    }
                },
                trigger: function(e, i, r, o) {
                    var s, a, u, l, c, p, d, h = [r || gt],
                        f = nt.call(e, "type") ? e.type : e,
                        g = nt.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (u = p = r = r || gt, 3 !== r.nodeType && 8 !== r.nodeType && !Ht.test(f + ot.event.triggered) && (f.indexOf(".") >= 0 && (g = f.split("."), f = g.shift(), g.sort()), a = f.indexOf(":") < 0 && "on" + f, e = e[ot.expando] ? e : new ot.Event(f, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = g.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = n, e.target || (e.target = r), i = null == i ? [e] : ot.makeArray(i, [e]), c = ot.event.special[f] || {}, o || !c.trigger || c.trigger.apply(r, i) !== !1)) {
                        if (!o && !c.noBubble && !ot.isWindow(r)) {
                            for (l = c.delegateType || f, Ht.test(l + f) || (u = u.parentNode); u; u = u.parentNode) h.push(u), p = u;
                            p === (r.ownerDocument || gt) && h.push(p.defaultView || p.parentWindow || t)
                        }
                        for (d = 0;
                            (u = h[d++]) && !e.isPropagationStopped();) e.type = d > 1 ? l : c.bindType || f, s = (ot._data(u, "events") || {})[e.type] && ot._data(u, "handle"), s && s.apply(u, i), s = a && u[a], s && s.apply && ot.acceptData(u) && (e.result = s.apply(u, i), e.result === !1 && e.preventDefault());
                        if (e.type = f, !o && !e.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), i) === !1) && ot.acceptData(r) && a && r[f] && !ot.isWindow(r)) {
                            p = r[a], p && (r[a] = null), ot.event.triggered = f;
                            try {
                                r[f]()
                            } catch (m) {}
                            ot.event.triggered = n, p && (r[a] = p)
                        }
                        return e.result
                    }
                },
                dispatch: function(t) {
                    t = ot.event.fix(t);
                    var e, i, r, o, s, a = [],
                        u = Y.call(arguments),
                        l = (ot._data(this, "events") || {})[t.type] || [],
                        c = ot.event.special[t.type] || {};
                    if (u[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                        for (a = ot.event.handlers.call(this, t, l), e = 0;
                            (o = a[e++]) && !t.isPropagationStopped();)
                            for (t.currentTarget = o.elem, s = 0;
                                (r = o.handlers[s++]) && !t.isImmediatePropagationStopped();) t.namespace_re && !t.namespace_re.test(r.namespace) || (t.handleObj = r, t.data = r.data, i = ((ot.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, u), i !== n && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, t), t.result
                    }
                },
                handlers: function(t, e) {
                    var i, r, o, s, a = [],
                        u = e.delegateCount,
                        l = t.target;
                    if (u && l.nodeType && (!t.button || "click" !== t.type))
                        for (; l != this; l = l.parentNode || this)
                            if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                                for (o = [], s = 0; s < u; s++) r = e[s], i = r.selector + " ", o[i] === n && (o[i] = r.needsContext ? ot(i, this).index(l) >= 0 : ot.find(i, this, null, [l]).length), o[i] && o.push(r);
                                o.length && a.push({
                                    elem: l,
                                    handlers: o
                                })
                            }
                    return u < e.length && a.push({
                        elem: this,
                        handlers: e.slice(u)
                    }), a
                },
                fix: function(t) {
                    if (t[ot.expando]) return t;
                    var e, n, i, r = t.type,
                        o = t,
                        s = this.fixHooks[r];
                    for (s || (this.fixHooks[r] = s = Pt.test(r) ? this.mouseHooks : jt.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new ot.Event(o), e = i.length; e--;) n = i[e], t[n] = o[n];
                    return t.target || (t.target = o.srcElement || gt), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, s.filter ? s.filter(t, o) : t
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, e) {
                        var i, r, o, s = e.button,
                            a = e.fromElement;
                        return null == t.pageX && null != e.clientX && (r = t.target.ownerDocument || gt, o = r.documentElement, i = r.body, t.pageX = e.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || s === n || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== g() && this.focus) try {
                                return this.focus(), !1
                            } catch (t) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === g() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if (ot.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                        },
                        _default: function(t) {
                            return ot.nodeName(t.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(t) {
                            t.result !== n && t.originalEvent && (t.originalEvent.returnValue = t.result)
                        }
                    }
                },
                simulate: function(t, e, n, i) {
                    var r = ot.extend(new ot.Event, n, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    i ? ot.event.trigger(r, null, e) : ot.event.dispatch.call(e, r), r.isDefaultPrevented() && n.preventDefault()
                }
            }, ot.removeEvent = gt.removeEventListener ? function(t, e, n) {
                t.removeEventListener && t.removeEventListener(e, n, !1)
            } : function(t, e, n) {
                var i = "on" + e;
                t.detachEvent && (typeof t[i] === Ct && (t[i] = null), t.detachEvent(i, n))
            }, ot.Event = function(t, e) {
                return this instanceof ot.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.defaultPrevented === n && t.returnValue === !1 ? h : f) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(t, e)
            }, ot.Event.prototype = {
                isDefaultPrevented: f,
                isPropagationStopped: f,
                isImmediatePropagationStopped: f,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = h, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = h, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = h, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
                }
            }, ot.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(t, e) {
                ot.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var n, i = this,
                            r = t.relatedTarget,
                            o = t.handleObj;
                        return r && (r === i || ot.contains(i, r)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                    }
                }
            }), it.submitBubbles || (ot.event.special.submit = {
                setup: function() {
                    return !ot.nodeName(this, "form") && void ot.event.add(this, "click._submit keypress._submit", function(t) {
                        var e = t.target,
                            i = ot.nodeName(e, "input") || ot.nodeName(e, "button") ? e.form : n;
                        i && !ot._data(i, "submitBubbles") && (ot.event.add(i, "submit._submit", function(t) {
                            t._submit_bubble = !0
                        }), ot._data(i, "submitBubbles", !0))
                    })
                },
                postDispatch: function(t) {
                    t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ot.event.simulate("submit", this.parentNode, t, !0))
                },
                teardown: function() {
                    return !ot.nodeName(this, "form") && void ot.event.remove(this, "._submit")
                }
            }), it.changeBubbles || (ot.event.special.change = {
                setup: function() {
                    return $t.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (ot.event.add(this, "propertychange._change", function(t) {
                        "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                    }), ot.event.add(this, "click._change", function(t) {
                        this._just_changed && !t.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, t, !0)
                    })), !1) : void ot.event.add(this, "beforeactivate._change", function(t) {
                        var e = t.target;
                        $t.test(e.nodeName) && !ot._data(e, "changeBubbles") && (ot.event.add(e, "change._change", function(t) {
                            !this.parentNode || t.isSimulated || t.isTrigger || ot.event.simulate("change", this.parentNode, t, !0)
                        }), ot._data(e, "changeBubbles", !0))
                    })
                },
                handle: function(t) {
                    var e = t.target;
                    if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return ot.event.remove(this, "._change"), !$t.test(this.nodeName)
                }
            }), it.focusinBubbles || ot.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var n = function(t) {
                    ot.event.simulate(e, t.target, ot.event.fix(t), !0)
                };
                ot.event.special[e] = {
                    setup: function() {
                        var i = this.ownerDocument || this,
                            r = ot._data(i, e);
                        r || i.addEventListener(t, n, !0), ot._data(i, e, (r || 0) + 1)
                    },
                    teardown: function() {
                        var i = this.ownerDocument || this,
                            r = ot._data(i, e) - 1;
                        r ? ot._data(i, e, r) : (i.removeEventListener(t, n, !0), ot._removeData(i, e))
                    }
                }
            }), ot.fn.extend({
                on: function(t, e, i, r, o) {
                    var s, a;
                    if ("object" == typeof t) {
                        "string" != typeof e && (i = i || e, e = n);
                        for (s in t) this.on(s, e, i, t[s], o);
                        return this
                    }
                    if (null == i && null == r ? (r = e, i = e = n) : null == r && ("string" == typeof e ? (r = i, i = n) : (r = i, i = e, e = n)), r === !1) r = f;
                    else if (!r) return this;
                    return 1 === o && (a = r, r = function(t) {
                        return ot().off(t), a.apply(this, arguments)
                    }, r.guid = a.guid || (a.guid = ot.guid++)), this.each(function() {
                        ot.event.add(this, t, r, i, e)
                    })
                },
                one: function(t, e, n, i) {
                    return this.on(t, e, n, i, 1)
                },
                off: function(t, e, i) {
                    var r, o;
                    if (t && t.preventDefault && t.handleObj) return r = t.handleObj, ot(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof t) {
                        for (o in t) this.off(o, e, t[o]);
                        return this
                    }
                    return e !== !1 && "function" != typeof e || (i = e, e = n), i === !1 && (i = f), this.each(function() {
                        ot.event.remove(this, t, i, e)
                    })
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        ot.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function(t, e) {
                    var n = this[0];
                    if (n) return ot.event.trigger(t, e, n, !0)
                }
            });
            var Mt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                It = / jQuery\d+="(?:null|\d+)"/g,
                Ot = new RegExp("<(?:" + Mt + ")[\\s/>]", "i"),
                qt = /^\s+/,
                Bt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                Ft = /<([\w:]+)/,
                zt = /<tbody/i,
                Kt = /<|&#?\w+;/,
                Wt = /<(?:script|style|link)/i,
                Ut = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Vt = /^$|\/(?:java|ecma)script/i,
                Qt = /^true\/(.*)/,
                Xt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                Yt = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    area: [1, "<map>", "</map>"],
                    param: [1, "<object>", "</object>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                },
                Gt = m(gt),
                Jt = Gt.appendChild(gt.createElement("div"));
            Yt.optgroup = Yt.option, Yt.tbody = Yt.tfoot = Yt.colgroup = Yt.caption = Yt.thead, Yt.th = Yt.td, ot.extend({
                clone: function(t, e, n) {
                    var i, r, o, s, a, u = ot.contains(t.ownerDocument, t);
                    if (it.html5Clone || ot.isXMLDoc(t) || !Ot.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Jt.innerHTML = t.outerHTML, Jt.removeChild(o = Jt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t)))
                        for (i = b(o), a = b(t), s = 0; null != (r = a[s]); ++s) i[s] && C(r, i[s]);
                    if (e)
                        if (n)
                            for (a = a || b(t), i = i || b(o), s = 0; null != (r = a[s]); s++) T(r, i[s]);
                        else T(t, o);
                    return i = b(o, "script"), i.length > 0 && w(i, !u && b(t, "script")), i = a = r = null, o
                },
                buildFragment: function(t, e, n, i) {
                    for (var r, o, s, a, u, l, c, p = t.length, d = m(e), h = [], f = 0; f < p; f++)
                        if (o = t[f], o || 0 === o)
                            if ("object" === ot.type(o)) ot.merge(h, o.nodeType ? [o] : o);
                            else if (Kt.test(o)) {
                        for (a = a || d.appendChild(e.createElement("div")), u = (Ft.exec(o) || ["", ""])[1].toLowerCase(), c = Yt[u] || Yt._default, a.innerHTML = c[1] + o.replace(Bt, "<$1></$2>") + c[2], r = c[0]; r--;) a = a.lastChild;
                        if (!it.leadingWhitespace && qt.test(o) && h.push(e.createTextNode(qt.exec(o)[0])), !it.tbody)
                            for (o = "table" !== u || zt.test(o) ? "<table>" !== c[1] || zt.test(o) ? 0 : a : a.firstChild, r = o && o.childNodes.length; r--;) ot.nodeName(l = o.childNodes[r], "tbody") && !l.childNodes.length && o.removeChild(l);
                        for (ot.merge(h, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                        a = d.lastChild
                    } else h.push(e.createTextNode(o));
                    for (a && d.removeChild(a), it.appendChecked || ot.grep(b(h, "input"), v), f = 0; o = h[f++];)
                        if ((!i || ot.inArray(o, i) === -1) && (s = ot.contains(o.ownerDocument, o), a = b(d.appendChild(o), "script"), s && w(a), n))
                            for (r = 0; o = a[r++];) Vt.test(o.type || "") && n.push(o);
                    return a = null, d
                },
                cleanData: function(t, e) {
                    for (var n, i, r, o, s = 0, a = ot.expando, u = ot.cache, l = it.deleteExpando, c = ot.event.special; null != (n = t[s]); s++)
                        if ((e || ot.acceptData(n)) && (r = n[a], o = r && u[r])) {
                            if (o.events)
                                for (i in o.events) c[i] ? ot.event.remove(n, i) : ot.removeEvent(n, i, o.handle);
                            u[r] && (delete u[r], l ? delete n[a] : typeof n.removeAttribute !== Ct ? n.removeAttribute(a) : n[a] = null, X.push(r))
                        }
                }
            }), ot.fn.extend({
                text: function(t) {
                    return Dt(this, function(t) {
                        return t === n ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || gt).createTextNode(t))
                    }, null, t, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = y(this, t);
                            e.appendChild(t)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = y(this, t);
                            e.insertBefore(t, e.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                    })
                },
                remove: function(t, e) {
                    for (var n, i = t ? ot.filter(t, this) : this, r = 0; null != (n = i[r]); r++) e || 1 !== n.nodeType || ot.cleanData(b(n)), n.parentNode && (e && ot.contains(n.ownerDocument, n) && w(b(n, "script")), n.parentNode.removeChild(n));
                    return this
                },
                empty: function() {
                    for (var t, e = 0; null != (t = this[e]); e++) {
                        for (1 === t.nodeType && ot.cleanData(b(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                        t.options && ot.nodeName(t, "select") && (t.options.length = 0)
                    }
                    return this
                },
                clone: function(t, e) {
                    return t = null != t && t, e = null == e ? t : e, this.map(function() {
                        return ot.clone(this, t, e)
                    })
                },
                html: function(t) {
                    return Dt(this, function(t) {
                        var e = this[0] || {},
                            i = 0,
                            r = this.length;
                        if (t === n) return 1 === e.nodeType ? e.innerHTML.replace(It, "") : n;
                        if ("string" == typeof t && !Wt.test(t) && (it.htmlSerialize || !Ot.test(t)) && (it.leadingWhitespace || !qt.test(t)) && !Yt[(Ft.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = t.replace(Bt, "<$1></$2>");
                            try {
                                for (; i < r; i++) e = this[i] || {}, 1 === e.nodeType && (ot.cleanData(b(e, !1)), e.innerHTML = t);
                                e = 0
                            } catch (o) {}
                        }
                        e && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function() {
                    var t = arguments[0];
                    return this.domManip(arguments, function(e) {
                        t = this.parentNode, ot.cleanData(b(this)), t && t.replaceChild(e, this)
                    }), t && (t.length || t.nodeType) ? this : this.remove()
                },
                detach: function(t) {
                    return this.remove(t, !0)
                },
                domManip: function(t, e) {
                    t = G.apply([], t);
                    var n, i, r, o, s, a, u = 0,
                        l = this.length,
                        c = this,
                        p = l - 1,
                        d = t[0],
                        h = ot.isFunction(d);
                    if (h || l > 1 && "string" == typeof d && !it.checkClone && Ut.test(d)) return this.each(function(n) {
                        var i = c.eq(n);
                        h && (t[0] = d.call(this, n, i.html())), i.domManip(t, e)
                    });
                    if (l && (a = ot.buildFragment(t, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                        for (o = ot.map(b(a, "script"), _), r = o.length; u < l; u++) i = a, u !== p && (i = ot.clone(i, !0, !0), r && ot.merge(o, b(i, "script"))), e.call(this[u], i, u);
                        if (r)
                            for (s = o[o.length - 1].ownerDocument, ot.map(o, x), u = 0; u < r; u++) i = o[u], Vt.test(i.type || "") && !ot._data(i, "globalEval") && ot.contains(s, i) && (i.src ? ot._evalUrl && ot._evalUrl(i.src) : ot.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Xt, "")));
                        a = n = null
                    }
                    return this
                }
            }), ot.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(t, e) {
                ot.fn[t] = function(t) {
                    for (var n, i = 0, r = [], o = ot(t), s = o.length - 1; i <= s; i++) n = i === s ? this : this.clone(!0), ot(o[i])[e](n), J.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var Zt, te = {};
            ! function() {
                var t;
                it.shrinkWrapBlocks = function() {
                    if (null != t) return t;
                    t = !1;
                    var e, n, i;
                    return n = gt.getElementsByTagName("body")[0], n && n.style ? (e = gt.createElement("div"), i = gt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== Ct && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(gt.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), n.removeChild(i), t) : void 0
                }
            }();
            var ee, ne, ie = /^margin/,
                re = new RegExp("^(" + Et + ")(?!px)[a-z%]+$", "i"),
                oe = /^(top|right|bottom|left)$/;
            t.getComputedStyle ? (ee = function(t) {
                    return t.ownerDocument.defaultView.getComputedStyle(t, null)
                }, ne = function(t, e, i) {
                    var r, o, s, a, u = t.style;
                    return i = i || ee(t), a = i ? i.getPropertyValue(e) || i[e] : n, i && ("" !== a || ot.contains(t.ownerDocument, t) || (a = ot.style(t, e)), re.test(a) && ie.test(e) && (r = u.width, o = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = i.width, u.width = r, u.minWidth = o, u.maxWidth = s)), a === n ? a : a + ""
                }) : gt.documentElement.currentStyle && (ee = function(t) {
                    return t.currentStyle
                }, ne = function(t, e, i) {
                    var r, o, s, a, u = t.style;
                    return i = i || ee(t), a = i ? i[e] : n, null == a && u && u[e] && (a = u[e]), re.test(a) && !oe.test(e) && (r = u.left, o = t.runtimeStyle, s = o && o.left, s && (o.left = t.currentStyle.left), u.left = "fontSize" === e ? "1em" : a, a = u.pixelLeft + "px", u.left = r, s && (o.left = s)), a === n ? a : a + "" || "auto"
                }),
                function() {
                    function e() {
                        var e, n, i, r;
                        n = gt.getElementsByTagName("body")[0], n && n.style && (e = gt.createElement("div"), i = gt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = s = !1, u = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, s = "4px" === (t.getComputedStyle(e, null) || {
                            width: "4px"
                        }).width, r = e.appendChild(gt.createElement("div")), r.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", e.style.width = "1px", u = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = e.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === r[0].offsetHeight, a && (r[0].style.display = "", r[1].style.display = "none", a = 0 === r[0].offsetHeight), n.removeChild(i))
                    }
                    var n, i, r, o, s, a, u;
                    n = gt.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = n.getElementsByTagName("a")[0], i = r && r.style, i && (i.cssText = "float:left;opacity:.5", it.opacity = "0.5" === i.opacity, it.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === n.style.backgroundClip, it.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, ot.extend(it, {
                        reliableHiddenOffsets: function() {
                            return null == a && e(), a
                        },
                        boxSizingReliable: function() {
                            return null == s && e(), s
                        },
                        pixelPosition: function() {
                            return null == o && e(), o
                        },
                        reliableMarginRight: function() {
                            return null == u && e(), u
                        }
                    }))
                }(), ot.swap = function(t, e, n, i) {
                    var r, o, s = {};
                    for (o in e) s[o] = t.style[o], t.style[o] = e[o];
                    r = n.apply(t, i || []);
                    for (o in e) t.style[o] = s[o];
                    return r
                };
            var se = /alpha\([^)]*\)/i,
                ae = /opacity\s*=\s*([^)]*)/,
                ue = /^(none|table(?!-c[ea]).+)/,
                le = new RegExp("^(" + Et + ")(.*)$", "i"),
                ce = new RegExp("^([+-])=(" + Et + ")", "i"),
                pe = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                de = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                he = ["Webkit", "O", "Moz", "ms"];
            ot.extend({
                cssHooks: {
                    opacity: {
                        get: function(t, e) {
                            if (e) {
                                var n = ne(t, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": it.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(t, e, i, r) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var o, s, a, u = ot.camelCase(e),
                            l = t.style;
                        if (e = ot.cssProps[u] || (ot.cssProps[u] = A(l, u)), a = ot.cssHooks[e] || ot.cssHooks[u], i === n) return a && "get" in a && (o = a.get(t, !1, r)) !== n ? o : l[e];
                        if (s = typeof i, "string" === s && (o = ce.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ot.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || ot.cssNumber[u] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(a && "set" in a && (i = a.set(t, i, r)) === n))) try {
                            l[e] = i
                        } catch (c) {}
                    }
                },
                css: function(t, e, i, r) {
                    var o, s, a, u = ot.camelCase(e);
                    return e = ot.cssProps[u] || (ot.cssProps[u] = A(t.style, u)), a = ot.cssHooks[e] || ot.cssHooks[u], a && "get" in a && (s = a.get(t, !0, i)), s === n && (s = ne(t, e, r)), "normal" === s && e in de && (s = de[e]), "" === i || i ? (o = parseFloat(s), i === !0 || ot.isNumeric(o) ? o || 0 : s) : s
                }
            }), ot.each(["height", "width"], function(t, e) {
                ot.cssHooks[e] = {
                    get: function(t, n, i) {
                        if (n) return ue.test(ot.css(t, "display")) && 0 === t.offsetWidth ? ot.swap(t, pe, function() {
                            return $(t, e, i)
                        }) : $(t, e, i)
                    },
                    set: function(t, n, i) {
                        var r = i && ee(t);
                        return D(t, n, i ? L(t, e, i, it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, r), r) : 0)
                    }
                }
            }), it.opacity || (ot.cssHooks.opacity = {
                get: function(t, e) {
                    return ae.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
                },
                set: function(t, e) {
                    var n = t.style,
                        i = t.currentStyle,
                        r = ot.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                        o = i && i.filter || n.filter || "";
                    n.zoom = 1, (e >= 1 || "" === e) && "" === ot.trim(o.replace(se, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = se.test(o) ? o.replace(se, r) : o + " " + r)
                }
            }), ot.cssHooks.marginRight = E(it.reliableMarginRight, function(t, e) {
                if (e) return ot.swap(t, {
                    display: "inline-block"
                }, ne, [t, "marginRight"])
            }), ot.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(t, e) {
                ot.cssHooks[t + e] = {
                    expand: function(n) {
                        for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + At[i] + e] = o[i] || o[i - 2] || o[0];
                        return r
                    }
                }, ie.test(t) || (ot.cssHooks[t + e].set = D)
            }), ot.fn.extend({
                css: function(t, e) {
                    return Dt(this, function(t, e, i) {
                        var r, o, s = {},
                            a = 0;
                        if (ot.isArray(e)) {
                            for (r = ee(t), o = e.length; a < o; a++) s[e[a]] = ot.css(t, e[a], !1, r);
                            return s
                        }
                        return i !== n ? ot.style(t, e, i) : ot.css(t, e)
                    }, t, e, arguments.length > 1)
                },
                show: function() {
                    return N(this, !0)
                },
                hide: function() {
                    return N(this)
                },
                toggle: function(t) {
                    return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                        Nt(this) ? ot(this).show() : ot(this).hide()
                    })
                }
            }), ot.Tween = j, j.prototype = {
                constructor: j,
                init: function(t, e, n, i, r, o) {
                    this.elem = t, this.prop = n, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ot.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var t = j.propHooks[this.prop];
                    return t && t.get ? t.get(this) : j.propHooks._default.get(this)
                },
                run: function(t) {
                    var e, n = j.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
                }
            }, j.prototype.init.prototype = j.prototype, j.propHooks = {
                _default: {
                    get: function(t) {
                        var e;
                        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                    },
                    set: function(t) {
                        ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ot.cssProps[t.prop]] || ot.cssHooks[t.prop]) ? ot.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                    }
                }
            }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
                set: function(t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                }
            }, ot.easing = {
                linear: function(t) {
                    return t
                },
                swing: function(t) {
                    return .5 - Math.cos(t * Math.PI) / 2
                }
            }, ot.fx = j.prototype.init, ot.fx.step = {};
            var fe, ge, me = /^(?:toggle|show|hide)$/,
                be = new RegExp("^(?:([+-])=|)(" + Et + ")([a-z%]*)$", "i"),
                ve = /queueHooks$/,
                ye = [M],
                _e = {
                    "*": [function(t, e) {
                        var n = this.createTween(t, e),
                            i = n.cur(),
                            r = be.exec(e),
                            o = r && r[3] || (ot.cssNumber[t] ? "" : "px"),
                            s = (ot.cssNumber[t] || "px" !== o && +i) && be.exec(ot.css(n.elem, t)),
                            a = 1,
                            u = 20;
                        if (s && s[3] !== o) {
                            o = o || s[3], r = r || [], s = +i || 1;
                            do a = a || ".5", s /= a, ot.style(n.elem, t, s + o); while (a !== (a = n.cur() / i) && 1 !== a && --u)
                        }
                        return r && (s = n.start = +s || +i || 0, n.unit = o, n.end = r[1] ? s + (r[1] + 1) * r[2] : +r[2]), n
                    }]
                };
            ot.Animation = ot.extend(O, {
                    tweener: function(t, e) {
                        ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                        for (var n, i = 0, r = t.length; i < r; i++) n = t[i], _e[n] = _e[n] || [], _e[n].unshift(e)
                    },
                    prefilter: function(t, e) {
                        e ? ye.unshift(t) : ye.push(t)
                    }
                }), ot.speed = function(t, e, n) {
                    var i = t && "object" == typeof t ? ot.extend({}, t) : {
                        complete: n || !n && e || ot.isFunction(t) && t,
                        duration: t,
                        easing: n && e || e && !ot.isFunction(e) && e
                    };
                    return i.duration = ot.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ot.fx.speeds ? ot.fx.speeds[i.duration] : ot.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                        ot.isFunction(i.old) && i.old.call(this), i.queue && ot.dequeue(this, i.queue)
                    }, i
                }, ot.fn.extend({
                    fadeTo: function(t, e, n, i) {
                        return this.filter(Nt).css("opacity", 0).show().end().animate({
                            opacity: e
                        }, t, n, i)
                    },
                    animate: function(t, e, n, i) {
                        var r = ot.isEmptyObject(t),
                            o = ot.speed(e, n, i),
                            s = function() {
                                var e = O(this, ot.extend({}, t), o);
                                (r || ot._data(this, "finish")) && e.stop(!0)
                            };
                        return s.finish = s, r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
                    },
                    stop: function(t, e, i) {
                        var r = function(t) {
                            var e = t.stop;
                            delete t.stop, e(i)
                        };
                        return "string" != typeof t && (i = e, e = t, t = n), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                            var e = !0,
                                n = null != t && t + "queueHooks",
                                o = ot.timers,
                                s = ot._data(this);
                            if (n) s[n] && s[n].stop && r(s[n]);
                            else
                                for (n in s) s[n] && s[n].stop && ve.test(n) && r(s[n]);
                            for (n = o.length; n--;) o[n].elem !== this || null != t && o[n].queue !== t || (o[n].anim.stop(i), e = !1, o.splice(n, 1));
                            !e && i || ot.dequeue(this, t)
                        })
                    },
                    finish: function(t) {
                        return t !== !1 && (t = t || "fx"), this.each(function() {
                            var e, n = ot._data(this),
                                i = n[t + "queue"],
                                r = n[t + "queueHooks"],
                                o = ot.timers,
                                s = i ? i.length : 0;
                            for (n.finish = !0, ot.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                            for (e = 0; e < s; e++) i[e] && i[e].finish && i[e].finish.call(this);
                            delete n.finish
                        })
                    }
                }), ot.each(["toggle", "show", "hide"], function(t, e) {
                    var n = ot.fn[e];
                    ot.fn[e] = function(t, i, r) {
                        return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(H(e, !0), t, i, r)
                    }
                }), ot.each({
                    slideDown: H("show"),
                    slideUp: H("hide"),
                    slideToggle: H("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(t, e) {
                    ot.fn[t] = function(t, n, i) {
                        return this.animate(e, t, n, i)
                    }
                }), ot.timers = [], ot.fx.tick = function() {
                    var t, e = ot.timers,
                        i = 0;
                    for (fe = ot.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
                    e.length || ot.fx.stop(), fe = n
                }, ot.fx.timer = function(t) {
                    ot.timers.push(t), t() ? ot.fx.start() : ot.timers.pop()
                }, ot.fx.interval = 13, ot.fx.start = function() {
                    ge || (ge = setInterval(ot.fx.tick, ot.fx.interval))
                }, ot.fx.stop = function() {
                    clearInterval(ge), ge = null
                }, ot.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, ot.fn.delay = function(t, e) {
                    return t = ot.fx ? ot.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                        var i = setTimeout(e, t);
                        n.stop = function() {
                            clearTimeout(i)
                        }
                    })
                },
                function() {
                    var t, e, n, i, r;
                    e = gt.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = e.getElementsByTagName("a")[0], n = gt.createElement("select"), r = n.appendChild(gt.createElement("option")), t = e.getElementsByTagName("input")[0], i.style.cssText = "top:1px", it.getSetAttribute = "t" !== e.className, it.style = /top/.test(i.getAttribute("style")), it.hrefNormalized = "/a" === i.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = r.selected, it.enctype = !!gt.createElement("form").enctype, n.disabled = !0, it.optDisabled = !r.disabled, t = gt.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value
                }();
            var xe = /\r/g;
            ot.fn.extend({
                val: function(t) {
                    var e, i, r, o = this[0]; {
                        if (arguments.length) return r = ot.isFunction(t), this.each(function(i) {
                            var o;
                            1 === this.nodeType && (o = r ? t.call(this, i, ot(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o, function(t) {
                                return null == t ? "" : t + ""
                            })), e = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], e && "set" in e && e.set(this, o, "value") !== n || (this.value = o))
                        });
                        if (o) return e = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()], e && "get" in e && (i = e.get(o, "value")) !== n ? i : (i = o.value, "string" == typeof i ? i.replace(xe, "") : null == i ? "" : i)
                    }
                }
            }), ot.extend({
                valHooks: {
                    option: {
                        get: function(t) {
                            var e = ot.find.attr(t, "value");
                            return null != e ? e : ot.trim(ot.text(t))
                        }
                    },
                    select: {
                        get: function(t) {
                            for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || r < 0, s = o ? null : [], a = o ? r + 1 : i.length, u = r < 0 ? a : o ? r : 0; u < a; u++)
                                if (n = i[u], (n.selected || u === r) && (it.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ot.nodeName(n.parentNode, "optgroup"))) {
                                    if (e = ot(n).val(), o) return e;
                                    s.push(e)
                                }
                            return s
                        },
                        set: function(t, e) {
                            for (var n, i, r = t.options, o = ot.makeArray(e), s = r.length; s--;)
                                if (i = r[s], ot.inArray(ot.valHooks.option.get(i), o) >= 0) try {
                                    i.selected = n = !0
                                } catch (a) {
                                    i.scrollHeight
                                } else i.selected = !1;
                            return n || (t.selectedIndex = -1), r
                        }
                    }
                }
            }), ot.each(["radio", "checkbox"], function() {
                ot.valHooks[this] = {
                    set: function(t, e) {
                        if (ot.isArray(e)) return t.checked = ot.inArray(ot(t).val(), e) >= 0
                    }
                }, it.checkOn || (ot.valHooks[this].get = function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                })
            });
            var we, Te, Ce = ot.expr.attrHandle,
                ke = /^(?:checked|selected)$/i,
                Se = it.getSetAttribute,
                Ee = it.input;
            ot.fn.extend({
                attr: function(t, e) {
                    return Dt(this, ot.attr, t, e, arguments.length > 1)
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        ot.removeAttr(this, t)
                    })
                }
            }), ot.extend({
                attr: function(t, e, i) {
                    var r, o, s = t.nodeType;
                    if (t && 3 !== s && 8 !== s && 2 !== s) return typeof t.getAttribute === Ct ? ot.prop(t, e, i) : (1 === s && ot.isXMLDoc(t) || (e = e.toLowerCase(), r = ot.attrHooks[e] || (ot.expr.match.bool.test(e) ? Te : we)), i === n ? r && "get" in r && null !== (o = r.get(t, e)) ? o : (o = ot.find.attr(t, e), null == o ? n : o) : null !== i ? r && "set" in r && (o = r.set(t, i, e)) !== n ? o : (t.setAttribute(e, i + ""), i) : void ot.removeAttr(t, e))
                },
                removeAttr: function(t, e) {
                    var n, i, r = 0,
                        o = e && e.match(_t);
                    if (o && 1 === t.nodeType)
                        for (; n = o[r++];) i = ot.propFix[n] || n, ot.expr.match.bool.test(n) ? Ee && Se || !ke.test(n) ? t[i] = !1 : t[ot.camelCase("default-" + n)] = t[i] = !1 : ot.attr(t, n, ""), t.removeAttribute(Se ? n : i)
                },
                attrHooks: {
                    type: {
                        set: function(t, e) {
                            if (!it.radioValue && "radio" === e && ot.nodeName(t, "input")) {
                                var n = t.value;
                                return t.setAttribute("type", e), n && (t.value = n), e
                            }
                        }
                    }
                }
            }), Te = {
                set: function(t, e, n) {
                    return e === !1 ? ot.removeAttr(t, n) : Ee && Se || !ke.test(n) ? t.setAttribute(!Se && ot.propFix[n] || n, n) : t[ot.camelCase("default-" + n)] = t[n] = !0, n
                }
            }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function(t, e) {
                var n = Ce[e] || ot.find.attr;
                Ce[e] = Ee && Se || !ke.test(e) ? function(t, e, i) {
                    var r, o;
                    return i || (o = Ce[e], Ce[e] = r, r = null != n(t, e, i) ? e.toLowerCase() : null, Ce[e] = o), r
                } : function(t, e, n) {
                    if (!n) return t[ot.camelCase("default-" + e)] ? e.toLowerCase() : null
                }
            }), Ee && Se || (ot.attrHooks.value = {
                set: function(t, e, n) {
                    return ot.nodeName(t, "input") ? void(t.defaultValue = e) : we && we.set(t, e, n)
                }
            }), Se || (we = {
                set: function(t, e, n) {
                    var i = t.getAttributeNode(n);
                    if (i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n)) return e
                }
            }, Ce.id = Ce.name = Ce.coords = function(t, e, n) {
                var i;
                if (!n) return (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
            }, ot.valHooks.button = {
                get: function(t, e) {
                    var n = t.getAttributeNode(e);
                    if (n && n.specified) return n.value
                },
                set: we.set
            }, ot.attrHooks.contenteditable = {
                set: function(t, e, n) {
                    we.set(t, "" !== e && e, n)
                }
            }, ot.each(["width", "height"], function(t, e) {
                ot.attrHooks[e] = {
                    set: function(t, n) {
                        if ("" === n) return t.setAttribute(e, "auto"), n
                    }
                }
            })), it.style || (ot.attrHooks.style = {
                get: function(t) {
                    return t.style.cssText || n
                },
                set: function(t, e) {
                    return t.style.cssText = e + ""
                }
            });
            var Ae = /^(?:input|select|textarea|button|object)$/i,
                Ne = /^(?:a|area)$/i;
            ot.fn.extend({
                prop: function(t, e) {
                    return Dt(this, ot.prop, t, e, arguments.length > 1)
                },
                removeProp: function(t) {
                    return t = ot.propFix[t] || t, this.each(function() {
                        try {
                            this[t] = n, delete this[t]
                        } catch (e) {}
                    })
                }
            }), ot.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(t, e, i) {
                    var r, o, s, a = t.nodeType;
                    if (t && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !ot.isXMLDoc(t), s && (e = ot.propFix[e] || e, o = ot.propHooks[e]), i !== n ? o && "set" in o && (r = o.set(t, i, e)) !== n ? r : t[e] = i : o && "get" in o && null !== (r = o.get(t, e)) ? r : t[e]
                },
                propHooks: {
                    tabIndex: {
                        get: function(t) {
                            var e = ot.find.attr(t, "tabindex");
                            return e ? parseInt(e, 10) : Ae.test(t.nodeName) || Ne.test(t.nodeName) && t.href ? 0 : -1
                        }
                    }
                }
            }), it.hrefNormalized || ot.each(["href", "src"], function(t, e) {
                ot.propHooks[e] = {
                    get: function(t) {
                        return t.getAttribute(e, 4)
                    }
                }
            }), it.optSelected || (ot.propHooks.selected = {
                get: function(t) {
                    var e = t.parentNode;
                    return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
                }
            }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                ot.propFix[this.toLowerCase()] = this
            }), it.enctype || (ot.propFix.enctype = "encoding");
            var De = /[\t\r\n\f]/g;
            ot.fn.extend({
                addClass: function(t) {
                    var e, n, i, r, o, s, a = 0,
                        u = this.length,
                        l = "string" == typeof t && t;
                    if (ot.isFunction(t)) return this.each(function(e) {
                        ot(this).addClass(t.call(this, e, this.className))
                    });
                    if (l)
                        for (e = (t || "").match(_t) || []; a < u; a++)
                            if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : " ")) {
                                for (o = 0; r = e[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                                s = ot.trim(i), n.className !== s && (n.className = s)
                            }
                    return this
                },
                removeClass: function(t) {
                    var e, n, i, r, o, s, a = 0,
                        u = this.length,
                        l = 0 === arguments.length || "string" == typeof t && t;
                    if (ot.isFunction(t)) return this.each(function(e) {
                        ot(this).removeClass(t.call(this, e, this.className))
                    });
                    if (l)
                        for (e = (t || "").match(_t) || []; a < u; a++)
                            if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : "")) {
                                for (o = 0; r = e[o++];)
                                    for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                                s = t ? ot.trim(i) : "", n.className !== s && (n.className = s)
                            }
                    return this
                },
                toggleClass: function(t, e) {
                    var n = typeof t;
                    return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : ot.isFunction(t) ? this.each(function(n) {
                        ot(this).toggleClass(t.call(this, n, this.className, e), e)
                    }) : this.each(function() {
                        if ("string" === n)
                            for (var e, i = 0, r = ot(this), o = t.match(_t) || []; e = o[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                        else n !== Ct && "boolean" !== n || (this.className && ot._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ot._data(this, "__className__") || "")
                    })
                },
                hasClass: function(t) {
                    for (var e = " " + t + " ", n = 0, i = this.length; n < i; n++)
                        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(De, " ").indexOf(e) >= 0) return !0;
                    return !1
                }
            }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                ot.fn[e] = function(t, n) {
                    return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                }
            }), ot.fn.extend({
                hover: function(t, e) {
                    return this.mouseenter(t).mouseleave(e || t)
                },
                bind: function(t, e, n) {
                    return this.on(t, null, e, n)
                },
                unbind: function(t, e) {
                    return this.off(t, null, e)
                },
                delegate: function(t, e, n, i) {
                    return this.on(e, t, n, i)
                },
                undelegate: function(t, e, n) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                }
            });
            var Le = ot.now(),
                $e = /\?/,
                je = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            ot.parseJSON = function(e) {
                if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
                var n, i = null,
                    r = ot.trim(e + "");
                return r && !ot.trim(r.replace(je, function(t, e, r, o) {
                    return n && e && (i = 0), 0 === i ? t : (n = r || e, i += !o - !r, "")
                })) ? Function("return " + r)() : ot.error("Invalid JSON: " + e)
            }, ot.parseXML = function(e) {
                var i, r;
                if (!e || "string" != typeof e) return null;
                try {
                    t.DOMParser ? (r = new DOMParser, i = r.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
                } catch (o) {
                    i = n
                }
                return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + e), i
            };
            var Pe, He, Re = /#.*$/,
                Me = /([?&])_=[^&]*/,
                Ie = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                Oe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                qe = /^(?:GET|HEAD)$/,
                Be = /^\/\//,
                Fe = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                ze = {},
                Ke = {},
                We = "*/".concat("*");
            try {
                He = location.href
            } catch (Ue) {
                He = gt.createElement("a"), He.href = "", He = He.href
            }
            Pe = Fe.exec(He.toLowerCase()) || [], ot.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: He,
                    type: "GET",
                    isLocal: Oe.test(Pe[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": We,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": ot.parseJSON,
                        "text xml": ot.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(t, e) {
                    return e ? F(F(t, ot.ajaxSettings), e) : F(ot.ajaxSettings, t)
                },
                ajaxPrefilter: q(ze),
                ajaxTransport: q(Ke),
                ajax: function(t, e) {
                    function i(t, e, i, r) {
                        var o, p, v, y, x, T = e;
                        2 !== _ && (_ = 2, u && clearTimeout(u), c = n, a = r || "", w.readyState = t > 0 ? 4 : 0, o = t >= 200 && t < 300 || 304 === t, i && (y = z(d, w, i)), y = K(d, y, w, o), o ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (ot.lastModified[s] = x), x = w.getResponseHeader("etag"), x && (ot.etag[s] = x)), 204 === t || "HEAD" === d.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = y.state, p = y.data, v = y.error, o = !v)) : (v = T, !t && T || (T = "error", t < 0 && (t = 0))), w.status = t, w.statusText = (e || T) + "", o ? g.resolveWith(h, [p, T, w]) : g.rejectWith(h, [w, T, v]), w.statusCode(b), b = n, l && f.trigger(o ? "ajaxSuccess" : "ajaxError", [w, d, o ? p : v]), m.fireWith(h, [w, T]), l && (f.trigger("ajaxComplete", [w, d]), --ot.active || ot.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (e = t, t = n), e = e || {};
                    var r, o, s, a, u, l, c, p, d = ot.ajaxSetup({}, e),
                        h = d.context || d,
                        f = d.context && (h.nodeType || h.jquery) ? ot(h) : ot.event,
                        g = ot.Deferred(),
                        m = ot.Callbacks("once memory"),
                        b = d.statusCode || {},
                        v = {},
                        y = {},
                        _ = 0,
                        x = "canceled",
                        w = {
                            readyState: 0,
                            getResponseHeader: function(t) {
                                var e;
                                if (2 === _) {
                                    if (!p)
                                        for (p = {}; e = Ie.exec(a);) p[e[1].toLowerCase()] = e[2];
                                    e = p[t.toLowerCase()]
                                }
                                return null == e ? null : e
                            },
                            getAllResponseHeaders: function() {
                                return 2 === _ ? a : null
                            },
                            setRequestHeader: function(t, e) {
                                var n = t.toLowerCase();
                                return _ || (t = y[n] = y[n] || t, v[t] = e), this
                            },
                            overrideMimeType: function(t) {
                                return _ || (d.mimeType = t), this
                            },
                            statusCode: function(t) {
                                var e;
                                if (t)
                                    if (_ < 2)
                                        for (e in t) b[e] = [b[e], t[e]];
                                    else w.always(t[w.status]);
                                return this
                            },
                            abort: function(t) {
                                var e = t || x;
                                return c && c.abort(e), i(0, e), this
                            }
                        };
                    if (g.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((t || d.url || He) + "").replace(Re, "").replace(Be, Pe[1] + "//"), d.type = e.method || e.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(_t) || [""], null == d.crossDomain && (r = Fe.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === Pe[1] && r[2] === Pe[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Pe[3] || ("http:" === Pe[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), B(ze, d, e, w), 2 === _) return w;
                    l = d.global, l && 0 === ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !qe.test(d.type), s = d.url, d.hasContent || (d.data && (s = d.url += ($e.test(s) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Me.test(s) ? s.replace(Me, "$1_=" + Le++) : s + ($e.test(s) ? "&" : "?") + "_=" + Le++)), d.ifModified && (ot.lastModified[s] && w.setRequestHeader("If-Modified-Since", ot.lastModified[s]), ot.etag[s] && w.setRequestHeader("If-None-Match", ot.etag[s])), (d.data && d.hasContent && d.contentType !== !1 || e.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + We + "; q=0.01" : "") : d.accepts["*"]);
                    for (o in d.headers) w.setRequestHeader(o, d.headers[o]);
                    if (d.beforeSend && (d.beforeSend.call(h, w, d) === !1 || 2 === _)) return w.abort();
                    x = "abort";
                    for (o in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) w[o](d[o]);
                    if (c = B(Ke, d, e, w)) {
                        w.readyState = 1, l && f.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (u = setTimeout(function() {
                            w.abort("timeout")
                        }, d.timeout));
                        try {
                            _ = 1, c.send(v, i)
                        } catch (T) {
                            if (!(_ < 2)) throw T;
                            i(-1, T)
                        }
                    } else i(-1, "No Transport");
                    return w
                },
                getJSON: function(t, e, n) {
                    return ot.get(t, e, n, "json")
                },
                getScript: function(t, e) {
                    return ot.get(t, n, e, "script")
                }
            }), ot.each(["get", "post"], function(t, e) {
                ot[e] = function(t, i, r, o) {
                    return ot.isFunction(i) && (o = o || r, r = i, i = n), ot.ajax({
                        url: t,
                        type: e,
                        dataType: o,
                        data: i,
                        success: r
                    })
                }
            }), ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
                ot.fn[e] = function(t) {
                    return this.on(e, t)
                }
            }), ot._evalUrl = function(t) {
                return ot.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, ot.fn.extend({
                wrapAll: function(t) {
                    if (ot.isFunction(t)) return this.each(function(e) {
                        ot(this).wrapAll(t.call(this, e))
                    });
                    if (this[0]) {
                        var e = ot(t, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                            for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                            return t
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    return ot.isFunction(t) ? this.each(function(e) {
                        ot(this).wrapInner(t.call(this, e))
                    }) : this.each(function() {
                        var e = ot(this),
                            n = e.contents();
                        n.length ? n.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function(t) {
                    var e = ot.isFunction(t);
                    return this.each(function(n) {
                        ot(this).wrapAll(e ? t.call(this, n) : t)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), ot.expr.filters.hidden = function(t) {
                return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (t.style && t.style.display || ot.css(t, "display"))
            }, ot.expr.filters.visible = function(t) {
                return !ot.expr.filters.hidden(t)
            };
            var Ve = /%20/g,
                Qe = /\[\]$/,
                Xe = /\r?\n/g,
                Ye = /^(?:submit|button|image|reset|file)$/i,
                Ge = /^(?:input|select|textarea|keygen)/i;
            ot.param = function(t, e) {
                var i, r = [],
                    o = function(t, e) {
                        e = ot.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                    };
                if (e === n && (e = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function() {
                    o(this.name, this.value)
                });
                else
                    for (i in t) W(i, t[i], e, o);
                return r.join("&").replace(Ve, "+")
            }, ot.fn.extend({
                serialize: function() {
                    return ot.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var t = ot.prop(this, "elements");
                        return t ? ot.makeArray(t) : this
                    }).filter(function() {
                        var t = this.type;
                        return this.name && !ot(this).is(":disabled") && Ge.test(this.nodeName) && !Ye.test(t) && (this.checked || !Lt.test(t))
                    }).map(function(t, e) {
                        var n = ot(this).val();
                        return null == n ? null : ot.isArray(n) ? ot.map(n, function(t) {
                            return {
                                name: e.name,
                                value: t.replace(Xe, "\r\n")
                            }
                        }) : {
                            name: e.name,
                            value: n.replace(Xe, "\r\n")
                        }
                    }).get()
                }
            }), ot.ajaxSettings.xhr = t.ActiveXObject !== n ? function() {
                return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && U() || V()
            } : U;
            var Je = 0,
                Ze = {},
                tn = ot.ajaxSettings.xhr();
            t.ActiveXObject && ot(t).on("unload", function() {
                for (var t in Ze) Ze[t](n, !0)
            }), it.cors = !!tn && "withCredentials" in tn, tn = it.ajax = !!tn, tn && ot.ajaxTransport(function(t) {
                if (!t.crossDomain || it.cors) {
                    var e;
                    return {
                        send: function(i, r) {
                            var o, s = t.xhr(),
                                a = ++Je;
                            if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                                for (o in t.xhrFields) s[o] = t.xhrFields[o];
                            t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                            for (o in i) i[o] !== n && s.setRequestHeader(o, i[o] + "");
                            s.send(t.hasContent && t.data || null), e = function(i, o) {
                                var u, l, c;
                                if (e && (o || 4 === s.readyState))
                                    if (delete Ze[a], e = n, s.onreadystatechange = ot.noop, o) 4 !== s.readyState && s.abort();
                                    else {
                                        c = {}, u = s.status, "string" == typeof s.responseText && (c.text = s.responseText);
                                        try {
                                            l = s.statusText
                                        } catch (p) {
                                            l = ""
                                        }
                                        u || !t.isLocal || t.crossDomain ? 1223 === u && (u = 204) : u = c.text ? 200 : 404
                                    }
                                c && r(u, l, c, s.getAllResponseHeaders())
                            }, t.async ? 4 === s.readyState ? setTimeout(e) : s.onreadystatechange = Ze[a] = e : e()
                        },
                        abort: function() {
                            e && e(n, !0)
                        }
                    }
                }
            }), ot.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(t) {
                        return ot.globalEval(t), t
                    }
                }
            }), ot.ajaxPrefilter("script", function(t) {
                t.cache === n && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
            }), ot.ajaxTransport("script", function(t) {
                if (t.crossDomain) {
                    var e, i = gt.head || ot("head")[0] || gt.documentElement;
                    return {
                        send: function(n, r) {
                            e = gt.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, n) {
                                (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || r(200, "success"))
                            }, i.insertBefore(e, i.firstChild)
                        },
                        abort: function() {
                            e && e.onload(n, !0)
                        }
                    }
                }
            });
            var en = [],
                nn = /(=)\?(?=&|$)|\?\?/;
            ot.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var t = en.pop() || ot.expando + "_" + Le++;
                    return this[t] = !0, t
                }
            }), ot.ajaxPrefilter("json jsonp", function(e, i, r) {
                var o, s, a, u = e.jsonp !== !1 && (nn.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && nn.test(e.data) && "data");
                if (u || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = ot.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, u ? e[u] = e[u].replace(nn, "$1" + o) : e.jsonp !== !1 && (e.url += ($e.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
                    return a || ot.error(o + " was not called"), a[0]
                }, e.dataTypes[0] = "json", s = t[o], t[o] = function() {
                    a = arguments
                }, r.always(function() {
                    t[o] = s, e[o] && (e.jsonpCallback = i.jsonpCallback, en.push(o)), a && ot.isFunction(s) && s(a[0]), a = s = n
                }), "script"
            }), ot.parseHTML = function(t, e, n) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (n = e, e = !1), e = e || gt;
                var i = dt.exec(t),
                    r = !n && [];
                return i ? [e.createElement(i[1])] : (i = ot.buildFragment([t], e, r), r && r.length && ot(r).remove(), ot.merge([], i.childNodes))
            };
            var rn = ot.fn.load;
            ot.fn.load = function(t, e, i) {
                if ("string" != typeof t && rn) return rn.apply(this, arguments);
                var r, o, s, a = this,
                    u = t.indexOf(" ");
                return u >= 0 && (r = ot.trim(t.slice(u, t.length)), t = t.slice(0, u)), ot.isFunction(e) ? (i = e, e = n) : e && "object" == typeof e && (s = "POST"), a.length > 0 && ot.ajax({
                    url: t,
                    type: s,
                    dataType: "html",
                    data: e
                }).done(function(t) {
                    o = arguments, a.html(r ? ot("<div>").append(ot.parseHTML(t)).find(r) : t)
                }).complete(i && function(t, e) {
                    a.each(i, o || [t.responseText, e, t])
                }), this
            }, ot.expr.filters.animated = function(t) {
                return ot.grep(ot.timers, function(e) {
                    return t === e.elem
                }).length
            };
            var on = t.document.documentElement;
            ot.offset = {
                setOffset: function(t, e, n) {
                    var i, r, o, s, a, u, l, c = ot.css(t, "position"),
                        p = ot(t),
                        d = {};
                    "static" === c && (t.style.position = "relative"), a = p.offset(), o = ot.css(t, "top"), u = ot.css(t, "left"), l = ("absolute" === c || "fixed" === c) && ot.inArray("auto", [o, u]) > -1, l ? (i = p.position(), s = i.top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(u) || 0), ot.isFunction(e) && (e = e.call(t, n, a)), null != e.top && (d.top = e.top - a.top + s), null != e.left && (d.left = e.left - a.left + r), "using" in e ? e.using.call(t, d) : p.css(d)
                }
            }, ot.fn.extend({
                offset: function(t) {
                    if (arguments.length) return t === n ? this : this.each(function(e) {
                        ot.offset.setOffset(this, t, e)
                    });
                    var e, i, r = {
                            top: 0,
                            left: 0
                        },
                        o = this[0],
                        s = o && o.ownerDocument;
                    if (s) return e = s.documentElement, ot.contains(e, o) ? (typeof o.getBoundingClientRect !== Ct && (r = o.getBoundingClientRect()), i = Q(s), {
                        top: r.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                        left: r.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                    }) : r
                },
                position: function() {
                    if (this[0]) {
                        var t, e, n = {
                                top: 0,
                                left: 0
                            },
                            i = this[0];
                        return "fixed" === ot.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (n = t.offset()), n.top += ot.css(t[0], "borderTopWidth", !0), n.left += ot.css(t[0], "borderLeftWidth", !0)), {
                            top: e.top - n.top - ot.css(i, "marginTop", !0),
                            left: e.left - n.left - ot.css(i, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || on; t && !ot.nodeName(t, "html") && "static" === ot.css(t, "position");) t = t.offsetParent;
                        return t || on
                    })
                }
            }), ot.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(t, e) {
                var i = /Y/.test(e);
                ot.fn[t] = function(r) {
                    return Dt(this, function(t, r, o) {
                        var s = Q(t);
                        return o === n ? s ? e in s ? s[e] : s.document.documentElement[r] : t[r] : void(s ? s.scrollTo(i ? ot(s).scrollLeft() : o, i ? o : ot(s).scrollTop()) : t[r] = o)
                    }, t, r, arguments.length, null)
                }
            }), ot.each(["top", "left"], function(t, e) {
                ot.cssHooks[e] = E(it.pixelPosition, function(t, n) {
                    if (n) return n = ne(t, e), re.test(n) ? ot(t).position()[e] + "px" : n
                })
            }), ot.each({
                Height: "height",
                Width: "width"
            }, function(t, e) {
                ot.each({
                    padding: "inner" + t,
                    content: e,
                    "": "outer" + t
                }, function(i, r) {
                    ot.fn[r] = function(r, o) {
                        var s = arguments.length && (i || "boolean" != typeof r),
                            a = i || (r === !0 || o === !0 ? "margin" : "border");
                        return Dt(this, function(e, i, r) {
                            var o;
                            return ot.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : r === n ? ot.css(e, i, a) : ot.style(e, i, r, a)
                        }, e, s ? r : n, s, null)
                    }
                })
            }), ot.fn.size = function() {
                return this.length
            }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return ot
            });
            var sn = t.jQuery,
                an = t.$;
            return ot.noConflict = function(e) {
                return t.$ === ot && (t.$ = an), e && t.jQuery === ot && (t.jQuery = sn), ot
            }, typeof e === Ct && (t.jQuery = t.$ = ot), ot
        }), _RealScout.jQuery = _RealScout.$ = jQuery.noConflict(!0),
        function(t) {
            var e = {
                init: function(n) {
                    var i = t.extend({
                            items: 1,
                            itemsOnPage: 1,
                            pages: 0,
                            displayedPages: 5,
                            edges: 2,
                            currentPage: 0,
                            hrefTextPrefix: "#page-",
                            hrefTextSuffix: "",
                            prevText: "Prev",
                            nextText: "Next",
                            ellipseText: "&hellip;",
                            cssStyle: "light-theme",
                            labelMap: [],
                            selectOnClick: !0,
                            nextAtFront: !1,
                            invertPageOrder: !1,
                            onPageClick: function(t, e) {},
                            onInit: function() {}
                        }, n || {}),
                        r = this;
                    return i.pages = i.pages ? i.pages : Math.ceil(i.items / i.itemsOnPage) ? Math.ceil(i.items / i.itemsOnPage) : 1, i.currentPage ? i.currentPage = i.currentPage - 1 : i.currentPage = i.invertPageOrder ? i.pages - 1 : 0, i.halfDisplayed = i.displayedPages / 2, this.each(function() {
                        r.addClass(i.cssStyle + " simple-pagination").data("pagination", i), e._draw.call(r)
                    }), i.onInit(), this
                },
                selectPage: function(t) {
                    return e._selectPage.call(this, t - 1), this
                },
                prevPage: function() {
                    var t = this.data("pagination");
                    return t.invertPageOrder ? t.currentPage < t.pages - 1 && e._selectPage.call(this, t.currentPage + 1) : t.currentPage > 0 && e._selectPage.call(this, t.currentPage - 1), this
                },
                nextPage: function() {
                    var t = this.data("pagination");
                    return t.invertPageOrder ? t.currentPage > 0 && e._selectPage.call(this, t.currentPage - 1) : t.currentPage < t.pages - 1 && e._selectPage.call(this, t.currentPage + 1), this
                },
                getPagesCount: function() {
                    return this.data("pagination").pages
                },
                getCurrentPage: function() {
                    return this.data("pagination").currentPage + 1
                },
                destroy: function() {
                    return this.empty(), this
                },
                drawPage: function(t) {
                    var n = this.data("pagination");
                    return n.currentPage = t - 1, this.data("pagination", n), e._draw.call(this), this
                },
                redraw: function() {
                    return e._draw.call(this), this
                },
                disable: function() {
                    var t = this.data("pagination");
                    return t.disabled = !0, this.data("pagination", t), e._draw.call(this), this
                },
                enable: function() {
                    var t = this.data("pagination");
                    return t.disabled = !1, this.data("pagination", t), e._draw.call(this), this
                },
                updateItems: function(t) {
                    var n = this.data("pagination");
                    n.items = t, n.pages = e._getPages(n), this.data("pagination", n), e._draw.call(this)
                },
                updateItemsOnPage: function(t) {
                    var n = this.data("pagination");
                    return n.itemsOnPage = t, n.pages = e._getPages(n), this.data("pagination", n), e._selectPage.call(this, 0), this
                },
                _draw: function() {
                    var n, i, r = this.data("pagination"),
                        o = e._getInterval(r);
                    e.destroy.call(this), i = "function" == typeof this.prop ? this.prop("tagName") : this.attr("tagName");
                    var s = "UL" === i ? this : t("<ul></ul>").appendTo(this);
                    if (r.prevText && e._appendItem.call(this, r.invertPageOrder ? r.currentPage + 1 : r.currentPage - 1, {
                            text: r.prevText,
                            classes: "prev"
                        }), r.nextText && r.nextAtFront && e._appendItem.call(this, r.invertPageOrder ? r.currentPage - 1 : r.currentPage + 1, {
                            text: r.nextText,
                            classes: "next"
                        }), r.invertPageOrder) {
                        if (o.end < r.pages && r.edges > 0) {
                            var a = Math.max(r.pages - r.edges, o.end);
                            for (n = r.pages - 1; n >= a; n--) e._appendItem.call(this, n);
                            r.pages - r.edges > o.end && r.pages - r.edges - o.end != 1 ? s.append('<li class="disabled"><span class="ellipse">' + r.ellipseText + "</span></li>") : r.pages - r.edges - o.end == 1 && e._appendItem.call(this, o.end)
                        }
                    } else if (o.start > 0 && r.edges > 0) {
                        var u = Math.min(r.edges, o.start);
                        for (n = 0; n < u; n++) e._appendItem.call(this, n);
                        r.edges < o.start && o.start - r.edges != 1 ? s.append('<li class="disabled"><span class="ellipse">' + r.ellipseText + "</span></li>") : o.start - r.edges == 1 && e._appendItem.call(this, r.edges)
                    }
                    if (r.invertPageOrder)
                        for (n = o.end - 1; n >= o.start; n--) e._appendItem.call(this, n);
                    else
                        for (n = o.start; n < o.end; n++) e._appendItem.call(this, n);
                    if (r.invertPageOrder) {
                        if (o.start > 0 && r.edges > 0) {
                            r.edges < o.start && o.start - r.edges != 1 ? s.append('<li class="disabled"><span class="ellipse">' + r.ellipseText + "</span></li>") : o.start - r.edges == 1 && e._appendItem.call(this, r.edges);
                            var u = Math.min(r.edges, o.start);
                            for (n = u - 1; n >= 0; n--) e._appendItem.call(this, n)
                        }
                    } else if (o.end < r.pages && r.edges > 0) {
                        r.pages - r.edges > o.end && r.pages - r.edges - o.end != 1 ? s.append('<li class="disabled"><span class="ellipse">' + r.ellipseText + "</span></li>") : r.pages - r.edges - o.end == 1 && e._appendItem.call(this, o.end);
                        var a = Math.max(r.pages - r.edges, o.end);
                        for (n = a; n < r.pages; n++) e._appendItem.call(this, n)
                    }
                    r.nextText && !r.nextAtFront && e._appendItem.call(this, r.invertPageOrder ? r.currentPage - 1 : r.currentPage + 1, {
                        text: r.nextText,
                        classes: "next"
                    })
                },
                _getPages: function(t) {
                    var e = Math.ceil(t.items / t.itemsOnPage);
                    return e || 1
                },
                _getInterval: function(t) {
                    return {
                        start: Math.ceil(t.currentPage > t.halfDisplayed ? Math.max(Math.min(t.currentPage - t.halfDisplayed, t.pages - t.displayedPages), 0) : 0),
                        end: Math.ceil(t.currentPage > t.halfDisplayed ? Math.min(t.currentPage + t.halfDisplayed, t.pages) : Math.min(t.displayedPages, t.pages))
                    }
                },
                _appendItem: function(n, i) {
                    var r, o, s = this,
                        a = s.data("pagination"),
                        u = t("<li></li>"),
                        l = s.find("ul");
                    n = n < 0 ? 0 : n < a.pages ? n : a.pages - 1, r = {
                        text: n + 1,
                        classes: ""
                    }, a.labelMap.length && a.labelMap[n] && (r.text = a.labelMap[n]), r = t.extend(r, i || {}), n == a.currentPage || a.disabled ? (a.disabled ? u.addClass("disabled") : u.addClass("active"), o = t('<span class="current">' + r.text + "</span>")) : (o = t('<a href="' + a.hrefTextPrefix + (n + 1) + a.hrefTextSuffix + '" class="page-link">' + r.text + "</a>"), o.click(function(t) {
                        return e._selectPage.call(s, n, t)
                    })), r.classes && o.addClass(r.classes), u.append(o), l.length ? l.append(u) : s.append(u)
                },
                _selectPage: function(t, n) {
                    var i = this.data("pagination");
                    return i.currentPage = t, i.selectOnClick && e._draw.call(this), i.onPageClick(t + 1, n)
                }
            };
            t.fn.pagination = function(n) {
                return e[n] && "_" != n.charAt(0) ? e[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery.pagination") : e.init.apply(this, arguments)
            }
        }(t._RealScout.jQuery),
        function(n) {
            var i = function() {
                    "use strict";
                    return {
                        isMsie: function() {
                            return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
                        },
                        isBlankString: function(t) {
                            return !t || /^\s*$/.test(t)
                        },
                        escapeRegExChars: function(t) {
                            return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                        },
                        isString: function(t) {
                            return "string" == typeof t
                        },
                        isNumber: function(t) {
                            return "number" == typeof t
                        },
                        isArray: n.isArray,
                        isFunction: n.isFunction,
                        isObject: n.isPlainObject,
                        isUndefined: function(t) {
                            return "undefined" == typeof t
                        },
                        toStr: function(t) {
                            return i.isUndefined(t) || null === t ? "" : t + ""
                        },
                        bind: n.proxy,
                        each: function(t, e) {
                            function i(t, n) {
                                return e(n, t)
                            }
                            n.each(t, i)
                        },
                        map: n.map,
                        filter: n.grep,
                        every: function(t, e) {
                            var i = !0;
                            return t ? (n.each(t, function(n, r) {
                                if (!(i = e.call(null, r, n, t))) return !1
                            }), !!i) : i
                        },
                        some: function(t, e) {
                            var i = !1;
                            return t ? (n.each(t, function(n, r) {
                                if (i = e.call(null, r, n, t)) return !1
                            }), !!i) : i
                        },
                        mixin: n.extend,
                        getUniqueId: function() {
                            var t = 0;
                            return function() {
                                return t++
                            }
                        }(),
                        templatify: function(t) {
                            function e() {
                                return String(t)
                            }
                            return n.isFunction(t) ? t : e
                        },
                        defer: function(t) {
                            setTimeout(t, 0)
                        },
                        debounce: function(t, e, n) {
                            var i, r;
                            return function() {
                                var o, s, a = this,
                                    u = arguments;
                                return o = function() {
                                    i = null, n || (r = t.apply(a, u))
                                }, s = n && !i, clearTimeout(i), i = setTimeout(o, e), s && (r = t.apply(a, u)), r
                            }
                        },
                        throttle: function(t, e) {
                            var n, i, r, o, s, a;
                            return s = 0, a = function() {
                                    s = new Date, r = null, o = t.apply(n, i)
                                },
                                function() {
                                    var u = new Date,
                                        l = e - (u - s);
                                    return n = this, i = arguments, l <= 0 ? (clearTimeout(r), r = null, s = u, o = t.apply(n, i)) : r || (r = setTimeout(a, l)), o
                                }
                        },
                        noop: function() {}
                    }
                }(),
                r = "0.10.5",
                o = function() {
                    "use strict";

                    function t(t) {
                        return t = i.toStr(t), t ? t.split(/\s+/) : []
                    }

                    function e(t) {
                        return t = i.toStr(t), t ? t.split(/\W+/) : []
                    }

                    function n(t) {
                        return function() {
                            var e = [].slice.call(arguments, 0);
                            return function(n) {
                                var r = [];
                                return i.each(e, function(e) {
                                    r = r.concat(t(i.toStr(n[e])))
                                }), r
                            }
                        }
                    }
                    return {
                        nonword: e,
                        whitespace: t,
                        obj: {
                            nonword: n(e),
                            whitespace: n(t)
                        }
                    }
                }(),
                s = function() {
                    "use strict";

                    function t(t) {
                        this.maxSize = i.isNumber(t) ? t : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = n.noop)
                    }

                    function e() {
                        this.head = this.tail = null
                    }

                    function r(t, e) {
                        this.key = t, this.val = e, this.prev = this.next = null
                    }
                    return i.mixin(t.prototype, {
                        set: function(t, e) {
                            var n, i = this.list.tail;
                            this.size >= this.maxSize && (this.list.remove(i), delete this.hash[i.key]), (n = this.hash[t]) ? (n.val = e, this.list.moveToFront(n)) : (n = new r(t, e), this.list.add(n), this.hash[t] = n, this.size++)
                        },
                        get: function(t) {
                            var e = this.hash[t];
                            if (e) return this.list.moveToFront(e), e.val
                        },
                        reset: function() {
                            this.size = 0, this.hash = {}, this.list = new e
                        }
                    }), i.mixin(e.prototype, {
                        add: function(t) {
                            this.head && (t.next = this.head, this.head.prev = t), this.head = t, this.tail = this.tail || t
                        },
                        remove: function(t) {
                            t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev
                        },
                        moveToFront: function(t) {
                            this.remove(t), this.add(t)
                        }
                    }), t
                }(),
                a = function() {
                    "use strict";

                    function e(t) {
                        this.prefix = ["__", t, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + i.escapeRegExChars(this.prefix))
                    }

                    function n() {
                        return (new Date).getTime()
                    }

                    function r(t) {
                        return JSON.stringify(i.isUndefined(t) ? null : t)
                    }

                    function o(t) {
                        return JSON.parse(t)
                    }
                    var s, a;
                    try {
                        s = t.localStorage, s.setItem("~~~", "!"), s.removeItem("~~~")
                    } catch (u) {
                        s = null
                    }
                    return a = s && t.JSON ? {
                        _prefix: function(t) {
                            return this.prefix + t
                        },
                        _ttlKey: function(t) {
                            return this._prefix(t) + this.ttlKey
                        },
                        get: function(t) {
                            return this.isExpired(t) && this.remove(t), o(s.getItem(this._prefix(t)))
                        },
                        set: function(t, e, o) {
                            return i.isNumber(o) ? s.setItem(this._ttlKey(t), r(n() + o)) : s.removeItem(this._ttlKey(t)), s.setItem(this._prefix(t), r(e))
                        },
                        remove: function(t) {
                            return s.removeItem(this._ttlKey(t)), s.removeItem(this._prefix(t)), this
                        },
                        clear: function() {
                            var t, e, n = [],
                                i = s.length;
                            for (t = 0; t < i; t++)(e = s.key(t)).match(this.keyMatcher) && n.push(e.replace(this.keyMatcher, ""));
                            for (t = n.length; t--;) this.remove(n[t]);
                            return this
                        },
                        isExpired: function(t) {
                            var e = o(s.getItem(this._ttlKey(t)));
                            return !!(i.isNumber(e) && n() > e)
                        }
                    } : {
                        get: i.noop,
                        set: i.noop,
                        remove: i.noop,
                        clear: i.noop,
                        isExpired: i.noop
                    }, i.mixin(e.prototype, a), e
                }(),
                u = function() {
                    "use strict";

                    function t(t) {
                        t = t || {}, this.cancelled = !1, this.lastUrl = null, this._send = t.transport ? e(t.transport) : n.ajax, this._get = t.rateLimiter ? t.rateLimiter(this._get) : this._get, this._cache = t.cache === !1 ? new s(0) : u
                    }

                    function e(t) {
                        return function(e, r) {
                            function o(t) {
                                i.defer(function() {
                                    a.resolve(t)
                                })
                            }

                            function s(t) {
                                i.defer(function() {
                                    a.reject(t)
                                })
                            }
                            var a = n.Deferred();
                            return t(e, r, o, s), a
                        }
                    }
                    var r = 0,
                        o = {},
                        a = 6,
                        u = new s(10);
                    return t.setMaxPendingRequests = function(t) {
                        a = t
                    }, t.resetCache = function() {
                        u.reset()
                    }, i.mixin(t.prototype, {
                        _get: function(t, e, n) {
                            function i(e) {
                                n && n(null, e), c._cache.set(t, e)
                            }

                            function s() {
                                n && n(!0)
                            }

                            function u() {
                                r--, delete o[t], c.onDeckRequestArgs && (c._get.apply(c, c.onDeckRequestArgs), c.onDeckRequestArgs = null)
                            }
                            var l, c = this;
                            this.cancelled || t !== this.lastUrl || ((l = o[t]) ? l.done(i).fail(s) : r < a ? (r++, o[t] = this._send(t, e).done(i).fail(s).always(u)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                        },
                        get: function(t, e, n) {
                            var r;
                            return i.isFunction(e) && (n = e, e = {}), this.cancelled = !1, this.lastUrl = t, (r = this._cache.get(t)) ? i.defer(function() {
                                n && n(null, r)
                            }) : this._get(t, e, n), !!r
                        },
                        cancel: function() {
                            this.cancelled = !0
                        }
                    }), t
                }(),
                l = function() {
                    "use strict";

                    function t(t) {
                        t = t || {}, t.datumTokenizer && t.queryTokenizer || n.error("datumTokenizer and queryTokenizer are both required"), this.datumTokenizer = t.datumTokenizer, this.queryTokenizer = t.queryTokenizer, this.reset()
                    }

                    function e(t) {
                        return t = i.filter(t, function(t) {
                            return !!t
                        }), t = i.map(t, function(t) {
                            return t.toLowerCase()
                        })
                    }

                    function r() {
                        return {
                            ids: [],
                            children: {}
                        }
                    }

                    function o(t) {
                        for (var e = {}, n = [], i = 0, r = t.length; i < r; i++) e[t[i]] || (e[t[i]] = !0, n.push(t[i]));
                        return n
                    }

                    function s(t, e) {
                        function n(t, e) {
                            return t - e
                        }
                        var i = 0,
                            r = 0,
                            o = [];
                        t = t.sort(n), e = e.sort(n);
                        for (var s = t.length, a = e.length; i < s && r < a;) t[i] < e[r] ? i++ : t[i] > e[r] ? r++ : (o.push(t[i]), i++, r++);
                        return o
                    }
                    return i.mixin(t.prototype, {
                        bootstrap: function(t) {
                            this.datums = t.datums, this.trie = t.trie
                        },
                        add: function(t) {
                            var n = this;
                            t = i.isArray(t) ? t : [t], i.each(t, function(t) {
                                var o, s;
                                o = n.datums.push(t) - 1, s = e(n.datumTokenizer(t)), i.each(s, function(t) {
                                    var e, i, s;
                                    for (e = n.trie, i = t.split(""); s = i.shift();) e = e.children[s] || (e.children[s] = r()), e.ids.push(o)
                                })
                            })
                        },
                        get: function(t) {
                            var n, r, a = this;
                            return n = e(this.queryTokenizer(t)), i.each(n, function(t) {
                                var e, n, i, o;
                                if (r && 0 === r.length) return !1;
                                for (e = a.trie, n = t.split(""); e && (i = n.shift());) e = e.children[i];
                                return e && 0 === n.length ? (o = e.ids.slice(0), void(r = r ? s(r, o) : o)) : (r = [], !1)
                            }), r ? i.map(o(r), function(t) {
                                return a.datums[t]
                            }) : []
                        },
                        reset: function() {
                            this.datums = [], this.trie = r()
                        },
                        serialize: function() {
                            return {
                                datums: this.datums,
                                trie: this.trie
                            }
                        }
                    }), t
                }(),
                c = function() {
                    "use strict";

                    function t(t) {
                        return t.local || null
                    }

                    function e(t) {
                        var e, o;
                        return o = {
                            url: null,
                            thumbprint: "",
                            ttl: 864e5,
                            filter: null,
                            ajax: {}
                        }, (e = t.prefetch || null) && (e = i.isString(e) ? {
                            url: e
                        } : e, e = i.mixin(o, e), e.thumbprint = r + e.thumbprint, e.ajax.type = e.ajax.type || "GET", e.ajax.dataType = e.ajax.dataType || "json", !e.url && n.error("prefetch requires url to be set")), e
                    }

                    function o(t) {
                        function e(t) {
                            return function(e) {
                                return i.debounce(e, t)
                            }
                        }

                        function r(t) {
                            return function(e) {
                                return i.throttle(e, t)
                            }
                        }
                        var o, s;
                        return s = {
                            url: null,
                            cache: !0,
                            wildcard: "%QUERY",
                            replace: null,
                            rateLimitBy: "debounce",
                            rateLimitWait: 300,
                            send: null,
                            filter: null,
                            ajax: {}
                        }, (o = t.remote || null) && (o = i.isString(o) ? {
                            url: o
                        } : o, o = i.mixin(s, o), o.rateLimiter = /^throttle$/i.test(o.rateLimitBy) ? r(o.rateLimitWait) : e(o.rateLimitWait), o.ajax.type = o.ajax.type || "GET", o.ajax.dataType = o.ajax.dataType || "json", delete o.rateLimitBy, delete o.rateLimitWait, !o.url && n.error("remote requires url to be set")), o
                    }
                    return {
                        local: t,
                        prefetch: e,
                        remote: o
                    }
                }();
            ! function(t) {
                "use strict";

                function e(t) {
                    t && (t.local || t.prefetch || t.remote) || n.error("one of local, prefetch, or remote is required"), this.limit = t.limit || 5, this.sorter = r(t.sorter), this.dupDetector = t.dupDetector || s, this.local = c.local(t), this.prefetch = c.prefetch(t), this.remote = c.remote(t), this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, this.index = new l({
                        datumTokenizer: t.datumTokenizer,
                        queryTokenizer: t.queryTokenizer
                    }), this.storage = this.cacheKey ? new a(this.cacheKey) : null
                }

                function r(t) {
                    function e(e) {
                        return e.sort(t)
                    }

                    function n(t) {
                        return t
                    }
                    return i.isFunction(t) ? e : n
                }

                function s() {
                    return !1
                }
                var p, d;
                return p = t.Bloodhound, d = {
                    data: "data",
                    protocol: "protocol",
                    thumbprint: "thumbprint"
                }, t.Bloodhound = e, e.noConflict = function() {
                    return t.Bloodhound = p, e
                }, e.tokenizers = o, i.mixin(e.prototype, {
                    _loadPrefetch: function(t) {
                        function e(e) {
                            o.clear(), o.add(t.filter ? t.filter(e) : e), o._saveToStorage(o.index.serialize(), t.thumbprint, t.ttl)
                        }
                        var i, r, o = this;
                        return (i = this._readFromStorage(t.thumbprint)) ? (this.index.bootstrap(i), r = n.Deferred().resolve()) : r = n.ajax(t.url, t.ajax).done(e), r
                    },
                    _getFromRemote: function(t, e) {
                        function n(t, n) {
                            e(t ? [] : o.remote.filter ? o.remote.filter(n) : n)
                        }
                        var i, r, o = this;
                        if (this.transport) return t = t || "", r = encodeURIComponent(t), i = this.remote.replace ? this.remote.replace(this.remote.url, t) : this.remote.url.replace(this.remote.wildcard, r), this.transport.get(i, this.remote.ajax, n)
                    },
                    _cancelLastRemoteRequest: function() {
                        this.transport && this.transport.cancel()
                    },
                    _saveToStorage: function(t, e, n) {
                        this.storage && (this.storage.set(d.data, t, n), this.storage.set(d.protocol, location.protocol, n), this.storage.set(d.thumbprint, e, n))
                    },
                    _readFromStorage: function(t) {
                        var e, n = {};
                        return this.storage && (n.data = this.storage.get(d.data), n.protocol = this.storage.get(d.protocol), n.thumbprint = this.storage.get(d.thumbprint)), e = n.thumbprint !== t || n.protocol !== location.protocol, n.data && !e ? n.data : null
                    },
                    _initialize: function() {
                        function t() {
                            r.add(i.isFunction(o) ? o() : o)
                        }
                        var e, r = this,
                            o = this.local;
                        return e = this.prefetch ? this._loadPrefetch(this.prefetch) : n.Deferred().resolve(), o && e.done(t), this.transport = this.remote ? new u(this.remote) : null, this.initPromise = e.promise()
                    },
                    initialize: function(t) {
                        return !this.initPromise || t ? this._initialize() : this.initPromise
                    },
                    add: function(t) {
                        this.index.add(t)
                    },
                    get: function(t, e) {
                        function n(t) {
                            var n = o.slice(0);
                            i.each(t, function(t) {
                                var e;
                                return e = i.some(n, function(e) {
                                    return r.dupDetector(t, e)
                                }), !e && n.push(t), n.length < r.limit
                            }), e && e(r.sorter(n))
                        }
                        var r = this,
                            o = [],
                            s = !1;
                        o = this.index.get(t), o = this.sorter(o).slice(0, this.limit), o.length < this.limit ? s = this._getFromRemote(t, n) : this._cancelLastRemoteRequest(), s || (o.length > 0 || !this.transport) && e && e(o)
                    },
                    clear: function() {
                        this.index.reset()
                    },
                    clearPrefetchCache: function() {
                        this.storage && this.storage.clear()
                    },
                    clearRemoteCache: function() {
                        this.transport && u.resetCache()
                    },
                    ttAdapter: function() {
                        return i.bind(this.get, this)
                    }
                }), e
            }(this);
            var p = function() {
                    return {
                        wrapper: '<span class="twitter-typeahead"></span>',
                        dropdown: '<span class="tt-dropdown-menu"></span>',
                        dataset: '<div class="tt-dataset-%CLASS%"></div>',
                        suggestions: '<span class="tt-suggestions"></span>',
                        suggestion: '<div class="tt-suggestion"></div>'
                    }
                }(),
                d = function() {
                    "use strict";
                    var t = {
                        wrapper: {
                            position: "relative",
                            display: "inline-block"
                        },
                        hint: {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            borderColor: "transparent",
                            boxShadow: "none",
                            opacity: "1"
                        },
                        input: {
                            position: "relative",
                            verticalAlign: "top",
                            backgroundColor: "transparent"
                        },
                        inputWithNoHint: {
                            position: "relative",
                            verticalAlign: "top"
                        },
                        dropdown: {
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            zIndex: "100",
                            display: "none"
                        },
                        suggestions: {
                            display: "block"
                        },
                        suggestion: {
                            whiteSpace: "nowrap",
                            cursor: "pointer"
                        },
                        suggestionChild: {
                            whiteSpace: "normal"
                        },
                        ltr: {
                            left: "0",
                            right: "auto"
                        },
                        rtl: {
                            left: "auto",
                            right: " 0"
                        }
                    };
                    return i.isMsie() && i.mixin(t.input, {
                        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                    }), i.isMsie() && i.isMsie() <= 7 && i.mixin(t.input, {
                        marginTop: "-1px"
                    }), t
                }(),
                h = function() {
                    "use strict";

                    function t(t) {
                        t && t.el || n.error("EventBus initialized without el"), this.$el = n(t.el)
                    }
                    var e = "typeahead:";
                    return i.mixin(t.prototype, {
                        trigger: function(t) {
                            var n = [].slice.call(arguments, 1);
                            this.$el.trigger(e + t, n)
                        }
                    }), t
                }(),
                f = function() {
                    "use strict";

                    function e(t, e, n, i) {
                        var r;
                        if (!n) return this;
                        for (e = e.split(l), n = i ? u(n, i) : n, this._callbacks = this._callbacks || {}; r = e.shift();) this._callbacks[r] = this._callbacks[r] || {
                            sync: [],
                            async: []
                        }, this._callbacks[r][t].push(n);
                        return this
                    }

                    function n(t, n, i) {
                        return e.call(this, "async", t, n, i)
                    }

                    function i(t, n, i) {
                        return e.call(this, "sync", t, n, i)
                    }

                    function r(t) {
                        var e;
                        if (!this._callbacks) return this;
                        for (t = t.split(l); e = t.shift();) delete this._callbacks[e];
                        return this
                    }

                    function o(t) {
                        var e, n, i, r, o;
                        if (!this._callbacks) return this;
                        for (t = t.split(l), i = [].slice.call(arguments, 1);
                            (e = t.shift()) && (n = this._callbacks[e]);) r = s(n.sync, this, [e].concat(i)), o = s(n.async, this, [e].concat(i)), r() && c(o);
                        return this
                    }

                    function s(t, e, n) {
                        function i() {
                            for (var i, r = 0, o = t.length; !i && r < o; r += 1) i = t[r].apply(e, n) === !1;
                            return !i
                        }
                        return i
                    }

                    function a() {
                        var e;
                        return e = t.setImmediate ? function(t) {
                            setImmediate(function() {
                                t()
                            })
                        } : function(t) {
                            setTimeout(function() {
                                t()
                            }, 0)
                        }
                    }

                    function u(t, e) {
                        return t.bind ? t.bind(e) : function() {
                            t.apply(e, [].slice.call(arguments, 0))
                        }
                    }
                    var l = /\s+/,
                        c = a();
                    return {
                        onSync: i,
                        onAsync: n,
                        off: r,
                        trigger: o
                    }
                }(),
                g = function(t) {
                    "use strict";

                    function e(t, e, n) {
                        for (var r, o = [], s = 0, a = t.length; s < a; s++) o.push(i.escapeRegExChars(t[s]));
                        return r = n ? "\\b(" + o.join("|") + ")\\b" : "(" + o.join("|") + ")", e ? new RegExp(r) : new RegExp(r, "i")
                    }
                    var n = {
                        node: null,
                        pattern: null,
                        tagName: "strong",
                        className: null,
                        wordsOnly: !1,
                        caseSensitive: !1
                    };
                    return function(r) {
                        function o(e) {
                            var n, i, o;
                            return (n = a.exec(e.data)) && (o = t.createElement(r.tagName), r.className && (o.className = r.className), i = e.splitText(n.index), i.splitText(n[0].length), o.appendChild(i.cloneNode(!0)), e.parentNode.replaceChild(o, i)), !!n
                        }

                        function s(t, e) {
                            for (var n, i = 3, r = 0; r < t.childNodes.length; r++) n = t.childNodes[r], n.nodeType === i ? r += e(n) ? 1 : 0 : s(n, e)
                        }
                        var a;
                        r = i.mixin({}, n, r), r.node && r.pattern && (r.pattern = i.isArray(r.pattern) ? r.pattern : [r.pattern], a = e(r.pattern, r.caseSensitive, r.wordsOnly), s(r.node, o))
                    }
                }(t.document),
                m = function() {
                    "use strict";

                    function t(t) {
                        var e, o, s, u, l = this;
                        t = t || {}, t.input || n.error("input is missing"), e = i.bind(this._onBlur, this), o = i.bind(this._onFocus, this), s = i.bind(this._onKeydown, this), u = i.bind(this._onInput, this), this.$hint = n(t.hint), this.$input = n(t.input).on("blur.tt", e).on("focus.tt", o).on("keydown.tt", s), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = i.noop), i.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(t) {
                            a[t.which || t.keyCode] || i.defer(i.bind(l._onInput, l, t))
                        }) : this.$input.on("input.tt", u), this.query = this.$input.val(), this.$overflowHelper = r(this.$input)
                    }

                    function r(t) {
                        return n('<pre aria-hidden="true"></pre>').css({
                            position: "absolute",
                            visibility: "hidden",
                            whiteSpace: "pre",
                            fontFamily: t.css("font-family"),
                            fontSize: t.css("font-size"),
                            fontStyle: t.css("font-style"),
                            fontVariant: t.css("font-variant"),
                            fontWeight: t.css("font-weight"),
                            wordSpacing: t.css("word-spacing"),
                            letterSpacing: t.css("letter-spacing"),
                            textIndent: t.css("text-indent"),
                            textRendering: t.css("text-rendering"),
                            textTransform: t.css("text-transform")
                        }).insertAfter(t)
                    }

                    function o(e, n) {
                        return t.normalizeQuery(e) === t.normalizeQuery(n)
                    }

                    function s(t) {
                        return t.altKey || t.ctrlKey || t.metaKey || t.shiftKey
                    }
                    var a;
                    return a = {
                        9: "tab",
                        27: "esc",
                        37: "left",
                        39: "right",
                        13: "enter",
                        38: "up",
                        40: "down"
                    }, t.normalizeQuery = function(t) {
                        return (t || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
                    }, i.mixin(t.prototype, f, {
                        _onBlur: function() {
                            this.resetInputValue(), this.trigger("blurred")
                        },
                        _onFocus: function() {
                            this.trigger("focused")
                        },
                        _onKeydown: function(t) {
                            var e = a[t.which || t.keyCode];
                            this._managePreventDefault(e, t), e && this._shouldTrigger(e, t) && this.trigger(e + "Keyed", t)
                        },
                        _onInput: function() {
                            this._checkInputValue()
                        },
                        _managePreventDefault: function(t, e) {
                            var n, i, r;
                            switch (t) {
                                case "tab":
                                    i = this.getHint(), r = this.getInputValue(), n = i && i !== r && !s(e);
                                    break;
                                case "up":
                                case "down":
                                    n = !s(e);
                                    break;
                                default:
                                    n = !1
                            }
                            n && e.preventDefault()
                        },
                        _shouldTrigger: function(t, e) {
                            var n;
                            switch (t) {
                                case "tab":
                                    n = !s(e);
                                    break;
                                default:
                                    n = !0
                            }
                            return n
                        },
                        _checkInputValue: function() {
                            var t, e, n;
                            t = this.getInputValue(), e = o(t, this.query), n = !!e && this.query.length !== t.length, this.query = t, e ? n && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                        },
                        focus: function() {
                            this.$input.focus()
                        },
                        blur: function() {
                            this.$input.blur()
                        },
                        getQuery: function() {
                            return this.query
                        },
                        setQuery: function(t) {
                            this.query = t
                        },
                        getInputValue: function() {
                            return this.$input.val()
                        },
                        setInputValue: function(t, e) {
                            this.$input.val(t), e ? this.clearHint() : this._checkInputValue()
                        },
                        resetInputValue: function() {
                            this.setInputValue(this.query, !0)
                        },
                        getHint: function() {
                            return this.$hint.val()
                        },
                        setHint: function(t) {
                            this.$hint.val(t)
                        },
                        clearHint: function() {
                            this.setHint("")
                        },
                        clearHintIfInvalid: function() {
                            var t, e, n, i;
                            t = this.getInputValue(), e = this.getHint(), n = t !== e && 0 === e.indexOf(t), i = "" !== t && n && !this.hasOverflow(), !i && this.clearHint()
                        },
                        getLanguageDirection: function() {
                            return (this.$input.css("direction") || "ltr").toLowerCase()
                        },
                        hasOverflow: function() {
                            var t = this.$input.width() - 2;
                            return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= t
                        },
                        isCursorAtEnd: function() {
                            var t, n, r;
                            return t = this.$input.val().length, n = this.$input[0].selectionStart, i.isNumber(n) ? n === t : !e.selection || (r = e.selection.createRange(), r.moveStart("character", -t), t === r.text.length)
                        },
                        destroy: function() {
                            this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null
                        }
                    }), t
                }(),
                b = function() {
                    "use strict";

                    function t(t) {
                        t = t || {}, t.templates = t.templates || {}, t.source || n.error("missing source"), t.name && !o(t.name) && n.error("invalid dataset name: " + t.name), this.query = null, this.highlight = !!t.highlight, this.name = t.name || i.getUniqueId(), this.source = t.source, this.displayFn = e(t.display || t.displayKey), this.templates = r(t.templates, this.displayFn), this.$el = n(p.dataset.replace("%CLASS%", this.name));
                    }

                    function e(t) {
                        function e(e) {
                            return e[t]
                        }
                        return t = t || "value", i.isFunction(t) ? t : e
                    }

                    function r(t, e) {
                        function n(t) {
                            return "<p>" + e(t) + "</p>"
                        }
                        return {
                            empty: t.empty && i.templatify(t.empty),
                            header: t.header && i.templatify(t.header),
                            footer: t.footer && i.templatify(t.footer),
                            suggestion: t.suggestion || n
                        }
                    }

                    function o(t) {
                        return /^[_a-zA-Z0-9-]+$/.test(t)
                    }
                    var s = "ttDataset",
                        a = "ttValue",
                        u = "ttDatum";
                    return t.extractDatasetName = function(t) {
                        return n(t).data(s)
                    }, t.extractValue = function(t) {
                        return n(t).data(a)
                    }, t.extractDatum = function(t) {
                        return n(t).data(u)
                    }, i.mixin(t.prototype, f, {
                        _render: function(t, e) {
                            function r() {
                                return f.templates.empty({
                                    query: t,
                                    isEmpty: !0
                                })
                            }

                            function o() {
                                function r(t) {
                                    var e;
                                    return e = n(p.suggestion).append(f.templates.suggestion(t)).data(s, f.name).data(a, f.displayFn(t)).data(u, t), e.children().each(function() {
                                        n(this).css(d.suggestionChild)
                                    }), e
                                }
                                var o, l;
                                return o = n(p.suggestions).css(d.suggestions), l = i.map(e, r), o.append.apply(o, l), f.highlight && g({
                                    className: "tt-highlight",
                                    node: o[0],
                                    pattern: t
                                }), o
                            }

                            function l() {
                                return f.templates.header({
                                    query: t,
                                    isEmpty: !h
                                })
                            }

                            function c() {
                                return f.templates.footer({
                                    query: t,
                                    isEmpty: !h
                                })
                            }
                            if (this.$el) {
                                var h, f = this;
                                this.$el.empty(), h = e && e.length, !h && this.templates.empty ? this.$el.html(r()).prepend(f.templates.header ? l() : null).append(f.templates.footer ? c() : null) : h && this.$el.html(o()).prepend(f.templates.header ? l() : null).append(f.templates.footer ? c() : null), this.trigger("rendered")
                            }
                        },
                        getRoot: function() {
                            return this.$el
                        },
                        update: function(t) {
                            function e(e) {
                                n.canceled || t !== n.query || n._render(t, e)
                            }
                            var n = this;
                            this.query = t, this.canceled = !1, this.source(t, e)
                        },
                        cancel: function() {
                            this.canceled = !0
                        },
                        clear: function() {
                            this.cancel(), this.$el.empty(), this.trigger("rendered")
                        },
                        isEmpty: function() {
                            return this.$el.is(":empty")
                        },
                        destroy: function() {
                            this.$el = null
                        }
                    }), t
                }(),
                v = function() {
                    "use strict";

                    function t(t) {
                        var r, o, s, a = this;
                        t = t || {}, t.menu || n.error("menu is required"), this.isOpen = !1, this.isEmpty = !0, this.datasets = i.map(t.datasets, e), r = i.bind(this._onSuggestionClick, this), o = i.bind(this._onSuggestionMouseEnter, this), s = i.bind(this._onSuggestionMouseLeave, this), this.$menu = n(t.menu).on("click.tt", ".tt-suggestion", r).on("mouseenter.tt", ".tt-suggestion", o).on("mouseleave.tt", ".tt-suggestion", s), i.each(this.datasets, function(t) {
                            a.$menu.append(t.getRoot()), t.onSync("rendered", a._onRendered, a)
                        })
                    }

                    function e(t) {
                        return new b(t)
                    }
                    return i.mixin(t.prototype, f, {
                        _onSuggestionClick: function(t) {
                            this.trigger("suggestionClicked", n(t.currentTarget))
                        },
                        _onSuggestionMouseEnter: function(t) {
                            this._removeCursor(), this._setCursor(n(t.currentTarget), !0)
                        },
                        _onSuggestionMouseLeave: function() {
                            this._removeCursor()
                        },
                        _onRendered: function() {
                            function t(t) {
                                return t.isEmpty()
                            }
                            this.isEmpty = i.every(this.datasets, t), this.isEmpty ? this._hide() : this.isOpen && this._show(), this.trigger("datasetRendered")
                        },
                        _hide: function() {
                            this.$menu.hide()
                        },
                        _show: function() {
                            this.$menu.css("display", "block")
                        },
                        _getSuggestions: function() {
                            return this.$menu.find(".tt-suggestion")
                        },
                        _getCursor: function() {
                            return this.$menu.find(".tt-cursor").first()
                        },
                        _setCursor: function(t, e) {
                            t.first().addClass("tt-cursor"), !e && this.trigger("cursorMoved")
                        },
                        _removeCursor: function() {
                            this._getCursor().removeClass("tt-cursor")
                        },
                        _moveCursor: function(t) {
                            var e, n, i, r;
                            if (this.isOpen) {
                                if (n = this._getCursor(), e = this._getSuggestions(), this._removeCursor(), i = e.index(n) + t, i = (i + 1) % (e.length + 1) - 1, i === -1) return void this.trigger("cursorRemoved");
                                i < -1 && (i = e.length - 1), this._setCursor(r = e.eq(i)), this._ensureVisible(r)
                            }
                        },
                        _ensureVisible: function(t) {
                            var e, n, i, r;
                            e = t.position().top, n = e + t.outerHeight(!0), i = this.$menu.scrollTop(), r = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), e < 0 ? this.$menu.scrollTop(i + e) : r < n && this.$menu.scrollTop(i + (n - r))
                        },
                        close: function() {
                            this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
                        },
                        open: function() {
                            this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                        },
                        setLanguageDirection: function(t) {
                            this.$menu.css("ltr" === t ? d.ltr : d.rtl)
                        },
                        moveCursorUp: function() {
                            this._moveCursor(-1)
                        },
                        moveCursorDown: function() {
                            this._moveCursor(1)
                        },
                        getDatumForSuggestion: function(t) {
                            var e = null;
                            return t.length && (e = {
                                raw: b.extractDatum(t),
                                value: b.extractValue(t),
                                datasetName: b.extractDatasetName(t)
                            }), e
                        },
                        getDatumForCursor: function() {
                            return this.getDatumForSuggestion(this._getCursor().first())
                        },
                        getDatumForTopSuggestion: function() {
                            return this.getDatumForSuggestion(this._getSuggestions().first())
                        },
                        update: function(t) {
                            function e(e) {
                                e.update(t)
                            }
                            i.each(this.datasets, e)
                        },
                        empty: function() {
                            function t(t) {
                                t.clear()
                            }
                            i.each(this.datasets, t), this.isEmpty = !0
                        },
                        isVisible: function() {
                            return this.isOpen && !this.isEmpty
                        },
                        destroy: function() {
                            function t(t) {
                                t.destroy()
                            }
                            this.$menu.off(".tt"), this.$menu = null, i.each(this.datasets, t)
                        }
                    }), t
                }(),
                y = function() {
                    "use strict";

                    function t(t) {
                        var o, s, a;
                        t = t || {}, t.input || n.error("missing input"), this.isActivated = !1, this.autoselect = !!t.autoselect, this.minLength = i.isNumber(t.minLength) ? t.minLength : 1, this.$node = r(t.input, t.withHint), o = this.$node.find(".tt-dropdown-menu"), s = this.$node.find(".tt-input"), a = this.$node.find(".tt-hint"), s.on("blur.tt", function(t) {
                            var n, r, a;
                            n = e.activeElement, r = o.is(n), a = o.has(n).length > 0, i.isMsie() && (r || a) && (t.preventDefault(), t.stopImmediatePropagation(), i.defer(function() {
                                s.focus()
                            }))
                        }), o.on("mousedown.tt", function(t) {
                            t.preventDefault()
                        }), this.eventBus = t.eventBus || new h({
                            el: s
                        }), this.dropdown = new v({
                            menu: o,
                            datasets: t.datasets
                        }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this), this.input = new m({
                            input: s,
                            hint: a
                        }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this), this._setLanguageDirection()
                    }

                    function r(t, e) {
                        var i, r, s, u;
                        i = n(t), r = n(p.wrapper).css(d.wrapper), s = n(p.dropdown).css(d.dropdown), u = i.clone().css(d.hint).css(o(i)), u.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", !0).attr({
                            autocomplete: "off",
                            spellcheck: "false",
                            tabindex: -1
                        }), i.data(a, {
                            dir: i.attr("dir"),
                            autocomplete: i.attr("autocomplete"),
                            spellcheck: i.attr("spellcheck"),
                            style: i.attr("style")
                        }), i.addClass("tt-input").attr({
                            autocomplete: "off",
                            spellcheck: !1
                        }).css(e ? d.input : d.inputWithNoHint);
                        try {
                            !i.attr("dir") && i.attr("dir", "auto")
                        } catch (l) {}
                        return i.wrap(r).parent().prepend(e ? u : null).append(s)
                    }

                    function o(t) {
                        return {
                            backgroundAttachment: t.css("background-attachment"),
                            backgroundClip: t.css("background-clip"),
                            backgroundColor: t.css("background-color"),
                            backgroundImage: t.css("background-image"),
                            backgroundOrigin: t.css("background-origin"),
                            backgroundPosition: t.css("background-position"),
                            backgroundRepeat: t.css("background-repeat"),
                            backgroundSize: t.css("background-size")
                        }
                    }

                    function s(t) {
                        var e = t.find(".tt-input");
                        i.each(e.data(a), function(t, n) {
                            i.isUndefined(t) ? e.removeAttr(n) : e.attr(n, t)
                        }), e.detach().removeData(a).removeClass("tt-input").insertAfter(t), t.remove()
                    }
                    var a = "ttAttrs";
                    return i.mixin(t.prototype, {
                        _onSuggestionClicked: function(t, e) {
                            var n;
                            (n = this.dropdown.getDatumForSuggestion(e)) && this._select(n)
                        },
                        _onCursorMoved: function() {
                            var t = this.dropdown.getDatumForCursor();
                            this.input.setInputValue(t.value, !0), this.eventBus.trigger("cursorchanged", t.raw, t.datasetName)
                        },
                        _onCursorRemoved: function() {
                            this.input.resetInputValue(), this._updateHint()
                        },
                        _onDatasetRendered: function() {
                            this.eventBus.trigger("datasetRendered", this.dropdown.$menu), this._updateHint()
                        },
                        _onOpened: function() {
                            this._updateHint(), this.eventBus.trigger("opened")
                        },
                        _onClosed: function() {
                            this.input.clearHint(), this.eventBus.trigger("closed")
                        },
                        _onFocused: function() {
                            this.isActivated = !0, this.dropdown.open()
                        },
                        _onBlurred: function() {
                            this.isActivated = !1, this.dropdown.empty(), this.dropdown.close()
                        },
                        _onEnterKeyed: function(t, e) {
                            var n, i;
                            n = this.dropdown.getDatumForCursor(), i = this.dropdown.getDatumForTopSuggestion(), n ? (this._select(n), e.preventDefault()) : this.autoselect && i && (this._select(i), e.preventDefault())
                        },
                        _onTabKeyed: function(t, e) {
                            var n;
                            (n = this.dropdown.getDatumForCursor()) ? (this._select(n), e.preventDefault()) : this._autocomplete(!0)
                        },
                        _onEscKeyed: function() {
                            this.dropdown.close(), this.input.resetInputValue()
                        },
                        _onUpKeyed: function() {
                            var t = this.input.getQuery();
                            this.dropdown.isEmpty && t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.moveCursorUp(), this.dropdown.open()
                        },
                        _onDownKeyed: function() {
                            var t = this.input.getQuery();
                            this.dropdown.isEmpty && t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.moveCursorDown(), this.dropdown.open()
                        },
                        _onLeftKeyed: function() {
                            "rtl" === this.dir && this._autocomplete()
                        },
                        _onRightKeyed: function() {
                            "ltr" === this.dir && this._autocomplete()
                        },
                        _onQueryChanged: function(t, e) {
                            this.input.clearHintIfInvalid(), e.length >= this.minLength ? this.dropdown.update(e) : this.dropdown.empty(), this.dropdown.open(), this._setLanguageDirection()
                        },
                        _onWhitespaceChanged: function() {
                            this._updateHint(), this.dropdown.open()
                        },
                        _setLanguageDirection: function() {
                            var t;
                            this.dir !== (t = this.input.getLanguageDirection()) && (this.dir = t, this.$node.css("direction", t), this.dropdown.setLanguageDirection(t))
                        },
                        _updateHint: function() {
                            var t, e, n, r, o, s;
                            t = this.dropdown.getDatumForTopSuggestion(), t && this.dropdown.isVisible() && !this.input.hasOverflow() ? (e = this.input.getInputValue(), n = m.normalizeQuery(e), r = i.escapeRegExChars(n), o = new RegExp("^(?:" + r + ")(.+$)", "i"), s = o.exec(t.value), s ? this.input.setHint(e + s[1]) : this.input.clearHint()) : this.input.clearHint()
                        },
                        _autocomplete: function(t) {
                            var e, n, i, r;
                            e = this.input.getHint(), n = this.input.getQuery(), i = t || this.input.isCursorAtEnd(), e && n !== e && i && (r = this.dropdown.getDatumForTopSuggestion(), r && this.input.setInputValue(r.value), this.eventBus.trigger("autocompleted", r.raw, r.datasetName))
                        },
                        _select: function(t) {
                            this.input.setQuery(t.value), this.input.setInputValue(t.value, !0), this._setLanguageDirection(), this.eventBus.trigger("selected", t.raw, t.datasetName), this.dropdown.close(), i.defer(i.bind(this.dropdown.empty, this.dropdown))
                        },
                        open: function() {
                            this.dropdown.open()
                        },
                        close: function() {
                            this.dropdown.close()
                        },
                        setVal: function(t) {
                            t = i.toStr(t), this.isActivated ? this.input.setInputValue(t) : (this.input.setQuery(t), this.input.setInputValue(t, !0)), this._setLanguageDirection()
                        },
                        getVal: function() {
                            return this.input.getQuery()
                        },
                        destroy: function() {
                            this.input.destroy(), this.dropdown.destroy(), s(this.$node), this.$node = null
                        }
                    }), t
                }();
            ! function() {
                "use strict";
                var t, e, r;
                t = n.fn.typeahead, e = "ttTypeahead", r = {
                    initialize: function(t, r) {
                        function o() {
                            var o, s, a = n(this);
                            i.each(r, function(e) {
                                e.highlight = !!t.highlight
                            }), s = new y({
                                input: a,
                                eventBus: o = new h({
                                    el: a
                                }),
                                withHint: !!i.isUndefined(t.hint) || !!t.hint,
                                minLength: t.minLength,
                                autoselect: t.autoselect,
                                datasets: r
                            }), a.data(e, s)
                        }
                        return r = i.isArray(r) ? r : [].slice.call(arguments, 1), t = t || {}, this.each(o)
                    },
                    open: function() {
                        function t() {
                            var t, i = n(this);
                            (t = i.data(e)) && t.open()
                        }
                        return this.each(t)
                    },
                    close: function() {
                        function t() {
                            var t, i = n(this);
                            (t = i.data(e)) && t.close()
                        }
                        return this.each(t)
                    },
                    val: function(t) {
                        function i() {
                            var i, r = n(this);
                            (i = r.data(e)) && i.setVal(t)
                        }

                        function r(t) {
                            var n, i;
                            return (n = t.data(e)) && (i = n.getVal()), i
                        }
                        return arguments.length ? this.each(i) : r(this.first())
                    },
                    destroy: function() {
                        function t() {
                            var t, i = n(this);
                            (t = i.data(e)) && (t.destroy(), i.removeData(e))
                        }
                        return this.each(t)
                    }
                }, n.fn.typeahead = function(t) {
                    var i;
                    return r[t] && "initialize" !== t ? (i = this.filter(function() {
                        return !!n(this).data(e)
                    }), r[t].apply(i, [].slice.call(arguments, 1))) : r.initialize.apply(this, arguments)
                }, n.fn.typeahead.noConflict = function() {
                    return n.fn.typeahead = t, this
                }
            }()
        }(t._RealScout.jQuery), _RealScout.Bloodhound = Bloodhound.noConflict();
    var o = t._RealScout,
        s = o.jQuery,
        a = function() {
            _RealScout.FeatureSearch.initAll(), _RealScout.RepListings.init(), _RealScout.SimpleSearch.init(), _RealScout.AdvancedSearch.init()
        };
    t._RealScout.getConfig = function() {
        var e = t._rsConfig && _rsConfig.apiHost || "https://www.realscout.com",
            n = t._rsConfig && _rsConfig.assetHost || "https://em.realscout.com",
            i = t._rsConfig && _rsConfig.agentDomain || "realscout.com",
            r = t._rsConfig && _rsConfig.cssPath || "/assets/em/v3/",
            o = function(t) {
                return "https://" + t + "." + i
            },
            s = "https://www.realscout.com/api/v4/widget_statistics";
        return {
            apiHost: e,
            assetHost: n,
            getAgentHost: o,
            cssPath: r,
            statisticsPath: s
        }
    }, s(e).ready(function() {
        var t = _RealScout.getConfig().assetHost + _RealScout.getConfig().cssPath + "embedded.css";
        i(t, a)
    }), t._RealScout.FeatureSearch = function() {
        var t = function(t) {
                var e, n = function(e, n) {
                        var i = {
                                rep: e,
                                agentHost: _RealScout.getConfig().getAgentHost(e),
                                categories: n
                            },
                            r = {
                                widget: u["feature-search"]
                            },
                            o = u.kingdom,
                            a = o.render(i, r);
                        s(t).append(a)
                    },
                    i = function(t, e) {
                        s.ajax({
                            url: _RealScout.getConfig().getAgentHost(t) + "/categories.js",
                            dataType: "json"
                        }).done(function(i, r, o) {
                            var a;
                            a = 0 === e.length ? i.categories : s.grep(i.categories, function(t) {
                                return s.inArray(t.name, e) !== -1
                            }), n(t, a)
                        }).fail(function(t, e, n) {})
                    };
                return e = s(t).data("cat-include") ? s(t).data("cat-include").split(",") : [], i(s(t).data("rep"), e), {
                    $: s(t)
                }
            },
            e = function() {
                s(".realscout-search.feature").each(function(e, n) {
                    s(n).find("#realscout--kingdom").remove(), t(n)
                })
            };
        return {
            init: t,
            initAll: e
        }
    }(), _RealScout.AdvancedSearch = {
        init: function() {
            this._initVariables(), this._getTemplate()
        },
        _initVariables: function() {
            this._wrapper = s(".realscout-search.advanced"), this._searchBox = ".search--typeahead input", this._dataUrl = _RealScout.getConfig().getAgentHost(this._wrapper.attr("data-rep")) + "/api/v4/omnisearch?query=%QUERY", this._statisticsUrl = _RealScout.getConfig().statisticsPath, this._buttonColorAttr = "data-button-color", this._errorText = "Oops! No Representative Found, please go back to RealScout and copy your widget code again.", this._errorClass = "search--widget__blank", this._buttonFontColorAttr = "data-button-font", this._backgroundColorAttr = "data-background-color", this._mainTitleColorAttr = "data-title-color", this._buttonClass = ".search--button button", this._searchBodyClass = ".search--body", this._minBedsInputClass = ".search--input__bmin", this._minBathsInputClass = ".search--input__bamin", this._minPriceInputClass = ".search--input__pmin", this._maxPriceInputClass = ".search--input__pmax"
        },
        _onElementReady: function(e, n, i) {
            var r = 0,
                o = t.setInterval(function() {
                    e(o), ++r === i && t.clearInterval(o)
                }, n)
        },
        _getTemplate: function() {
            this._onElementReady(function(e) {
                this._wrapper.length > 0 && (t.clearInterval(e), s.each(this._wrapper, function(t, e) {
                    this._renderTemplate(e)
                }.bind(this)))
            }.bind(this), 500, 20)
        },
        _sendStatistics: function() {
            s.ajax({
                type: "POST",
                url: this._statisticsUrl,
                data: {
                    widget: {
                        type: "advanced_search"
                    }
                },
                dataType: "json"
            }).fail(function(t, e, n) {})
        },
        _renderTemplate: function(t) {
            var e = u["advanced-search"].render();
            t = s(t);
            var n = t.attr("data-rep");
            t.empty(), n ? (t.append(e), this._customize(t), this._initTypeahead(t), this._sendStatistics()) : (t.text(this._errorText), t.addClass(this._errorClass))
        },
        _doSearch: function(e, n) {
		
			
            if ("undefined" != typeof n) {
                this._openSearch && this._openSearch.close();
                var i = e.attr("data-rep");
		    
		 document.getElementById('myframe').height = "900";
                 document.getElementById('myframe').width = "100%";
                if ("address" === n.type.toLowerCase()) document.getElementById('myframe').src=_RealScout.getConfig().getAgentHost(i) + "/homesearch/listings/" + n.slug;
                else {
                    var r = e.find(this._minPriceInputClass).val();
                    r = r ? "pmin=" + r + "&" : "";
                    var o = e.find(this._maxPriceInputClass).val();
                    o = o ? "pmax=" + o + "&" : "";
                    var s = e.find(this._minBedsInputClass).val();
                    s = parseInt(s) ? "bmin=" + parseInt(s) + "&" : "";
                    var a = e.find(this._minBathsInputClass).val();
                    a = parseInt(a) ? "bamin=" + parseInt(a) + "&" : "";
                    var u = "zoom=12&",
                        l = "geo_type=" + n.type + "&",
                        c = "geo_id=" + n.id;
                    document.getElementById('myframe').src = _RealScout.getConfig().getAgentHost(i) + "/homesearch/map?" + r + o + s + a + u + l + c;
                }
            }
        },
        _getQueryResultTemplate: function(t) {
            var e = {
                CITY: r.compile("<p><strong>{{value}}</strong>, {{city}}</p>"),
                ADDRESS: r.compile("<p><strong>{{value}}</strong>, {{city}}, {{state}} (#{{mls_id}})</p>"),
                SCHOOL: r.compile("<p><strong>{{value}}</strong>, {{city}} </p>"),
                ZIPCODE: r.compile("<p><strong>{{value}}</strong>, {{city}} </p>"),
                DEFAULT: r.compile("<p><strong>{{value}}</strong> - {{sub_name}} </p>")
            };
            return "undefined" == typeof e[t.type] ? e.DEFAULT.render(t) : e[t.type].render(t)
        },
        _initTypeahead: function(t) {
            var e = t.attr("data-rep"),
                n = this._initBloodHound(this._locationsParams(e)),
                i = this._initBloodHound(this._addressParams(e)),
                r = this._initBloodHound(this._schoolsParams(e)),
                o = {
                    highlight: !0,
                    autoselect: !0,
                    minLength: 3
                },
                s = {
                    name: "locations",
                    displayKey: "value",
                    source: n.ttAdapter(),
                    templates: {
                        header: '<h3 class="locations-schools">Locations</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                a = {
                    name: "addresses",
                    displayKey: "value",
                    source: i.ttAdapter(),
                    templates: {
                        header: '<h3 class="addresses">Addresses</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                u = {
                    name: "schools",
                    displayKey: "value",
                    source: r.ttAdapter(),
                    templates: {
                        header: '<h3 class="locations-schools">Schools</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                l = t.find(this._searchBox).typeahead(o, s, a, u);
            this._initTypeaheadEventHandlers(t, l)
        },
        _locationsParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return 0 === t.places.length && 0 === t.homes.length && 0 === t.schools.length ? [{
                    value: "No matching locations",
                    sub_name: "Please check spelling or try a different location",
                    id: "0"
                }] : t.places
            }, e
        },
        _addressParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return t.homes
            }, e
        },
        _schoolsParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return t.schools
            }, e
        },
        _initBloodHound: function(t) {
            var e = new _RealScout.Bloodhound({
                datumTokenizer: function(t) {
                    return _RealScout.Bloodhound.tokenizers.whitespace(t.value)
                },
                queryTokenizer: _RealScout.Bloodhound.tokenizers.whitespace,
                limit: 10,
                remote: t
            });
            return e.initialize(), e
        },
        _initTypeaheadEventHandlers: function(t, e) {
            var n;
            e.on("typeahead:autocompleted", function(t, e) {
                n = e
            }), e.on("typeahead:datasetRendered", function(t, e) {
                e.find(".tt-suggestion").first().addClass("tt-cursor")
            }), e.on("typeahead:selected", function(t, e) {
                n = e
            }), e.on("keydown", function(t) {
                if (13 === t.which) {
                    var i = s.Event("keydown");
                    i.keyCode = i.which = 40, e.trigger(i), i.keyCode = i.which = 9, e.trigger(i), "undefined" != typeof n && e.typeahead("close")
                }
            }.bind(this)), t.find(this._buttonClass).on("click", function(e) {
                e.preventDefault(), this._doSearch(t, n)
            }.bind(this))
        },
        _customize: function(t) {
            var e = s(t).attr(this._buttonColorAttr),
                n = s(t).attr(this._buttonFontColorAttr),
                i = s(t).attr(this._backgroundColorAttr),
                r = s(t).attr(this._mainTitleColorAttr);
            s(t).find(this._searchBodyClass).css("background-color", i), s(t).find("h2").css("color", r), s(t).find(this._buttonClass).css("background-color", e).css("color", n)
        }
    }, _RealScout.SimpleSearch = {
        init: function() {
            this._initVariables(), this._getTemplate()
        },
        _initVariables: function() {
            this._wrapper = s(".realscout-search.simple"), this._searchBox = ".search--input input", this._dataUrl = _RealScout.getConfig().getAgentHost(this._wrapper.attr("data-rep")) + "/api/v4/omnisearch?query=%QUERY", this._statisticsUrl = _RealScout.getConfig().statisticsPath, this._htmlTemplate = u["simple-search"], this._htmlPath = "module/widgets/embedded/simple-search/simple-search.html", this._buttonColorAttr = "data-button-color", this._buttonFontColorAttr = "data-button-font", this._backgroundColorAttr = "data-background-color", this._mainTitleColorAttr = "data-title-color", this._buttonClass = ".search--button button", this._searchBodyClass = ".search--body"
        },
        _onElementReady: function(e, n, i) {
            var r = 0,
                o = t.setInterval(function() {
                    e(o), ++r === i && t.clearInterval(o)
                }, n)
        },
        _getTemplate: function() {
            this._onElementReady(function(e) {
                this._wrapper.length > 0 && (t.clearInterval(e), s.each(this._wrapper, function(t, e) {
                    this._renderTemplate(e)
                }.bind(this)))
            }.bind(this), 500, 20)
        },
        _sendStatistics: function() {
            s.ajax({
                type: "POST",
                url: this._statisticsUrl,
                data: {
                    widget: {
                        type: "simple_search"
                    }
                },
                dataType: "json"
            }).fail(function(t, e, n) {})
        },
        _renderTemplate: function(t) {
            var e = this._htmlTemplate.render();
            t = s(t);
            var n = t.attr("data-rep");
            t.empty(), n ? (t.append(e), this._customize(t), this._initTypeahead(t), this._sendStatistics()) : (t.text(this._errorText), t.addClass(this._errorClass))
        },
        _doSearch: function(e, n) {
            if ("undefined" != typeof n) {
                this._openSearch && this._openSearch.close();
                var i = e.attr("data-rep");
                if ("address" === n.type.toLowerCase()) this._openSearch = t.open(_RealScout.getConfig().getAgentHost(i) + "/homesearch/listings/" + n.slug);
                else {
                    var r = "zoom=12&",
                        o = "geo_type=" + n.type + "&",
                        s = "geo_id=" + n.id;
                    this._openSearch = t.open(_RealScout.getConfig().getAgentHost(i) + "/homesearch/map?" + r + o + s)
                }
            }
        },
        _getQueryResultTemplate: function(t) {
            var e = {
                CITY: r.compile("<p><strong>{{value}}</strong>, {{city}}</p>"),
                ADDRESS: r.compile("<p><strong>{{value}}</strong>, {{city}}, {{state}} (#{{mls_id}})</p>"),
                SCHOOL: r.compile("<p><strong>{{value}}</strong>, {{city}} </p>"),
                ZIPCODE: r.compile("<p><strong>{{value}}</strong>, {{city}} </p>"),
                DEFAULT: r.compile("<p><strong>{{value}}</strong> - {{sub_name}} </p>")
            };
            return "undefined" == typeof e[t.type] ? e.DEFAULT.render(t) : e[t.type].render(t)
        },
        _initTypeahead: function(t) {
            var e = t.attr("data-rep"),
                n = this._initBloodHound(this._locationsParams(e)),
                i = this._initBloodHound(this._addressParams(e)),
                r = this._initBloodHound(this._schoolsParams(e)),
                o = {
                    highlight: !0,
                    autoselect: !0,
                    minLength: 3
                },
                s = {
                    name: "locations",
                    displayKey: "value",
                    source: n.ttAdapter(),
                    templates: {
                        header: '<h3 class="locations-schools">Locations</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                a = {
                    name: "addresses",
                    displayKey: "value",
                    source: i.ttAdapter(),
                    templates: {
                        header: '<h3 class="addresses">Addresses</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                u = {
                    name: "schools",
                    displayKey: "value",
                    source: r.ttAdapter(),
                    templates: {
                        header: '<h3 class="locations-schools">Schools</h3>',
                        suggestion: this._getQueryResultTemplate
                    }
                },
                l = t.find(this._searchBox).typeahead(o, s, a, u);
            this._initTypeaheadEventHandlers(t, l)
        },
        _locationsParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return 0 === t.places.length && 0 === t.homes.length && 0 === t.schools.length ? [{
                    value: "No matching locations",
                    sub_name: "Please check spelling or try a different location",
                    id: "0"
                }] : t.places
            }, e
        },
        _addressParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return t.homes
            }, e
        },
        _schoolsParams: function(t) {
            var e = {};
            return e.url = this._dataUrl + "&include=geo_items", e.ajax = {}, e.ajax.data = {
                subdomain: t
            }, e.filter = function(t) {
                return t.schools
            }, e
        },
        _initBloodHound: function(t) {
            var e = new _RealScout.Bloodhound({
                datumTokenizer: function(t) {
                    return _RealScout.Bloodhound.tokenizers.whitespace(t.value)
                },
                queryTokenizer: _RealScout.Bloodhound.tokenizers.whitespace,
                limit: 10,
                remote: t
            });
            return e.initialize(), e
        },
        _initTypeaheadEventHandlers: function(t, e) {
            var n;
            e.on("typeahead:autocompleted", function(t, e) {
                n = e
            }), e.on("typeahead:datasetRendered", function(t, e) {
                e.find(".tt-suggestion").first().addClass("tt-cursor")
            }), e.on("typeahead:selected", function(e, i) {
                n = i, this._doSearch(t, n)
            }.bind(this)), e.on("keydown", function(t) {
                if (13 === t.which) {
                    var n = s.Event("keydown");
                    n.keyCode = n.which = 40, e.trigger(n), n.keyCode = n.which = 9, e.trigger(n)
                }
            }.bind(this)), t.find(this._buttonClass).on("click", function(e) {
                e.preventDefault(), this._doSearch(t, n)
            }.bind(this))
        },
        _customize: function(t) {
            var e = s(t).attr(this._buttonColorAttr),
                n = s(t).attr(this._buttonFontColorAttr),
                i = s(t).attr(this._backgroundColorAttr),
                r = s(t).attr(this._mainTitleColorAttr);
            s(t).find(this._searchBodyClass).css("background-color", i), s(t).find("h2").css("color", r), s(t).find(this._buttonClass).css("background-color", e).css("color", n)
        }
    };
    var u = {};
    u["advanced-search"] = new r.Template({
        code: function(t, e, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div id="realscout--kingdom">'), i.b("\n" + n), i.b('  <div id="realscout--kingdom__castle">'), i.b("\n" + n), i.b('    <div id="kingdom--castle">'), i.b("\n" + n), i.b('      <div id="kingdom--castle__throne">'), i.b("\n" + n), i.b('        <section class="search--widget search--advanced">'), i.b("\n" + n), i.b('          <div class="search--body">'), i.b("\n" + n), i.b('            <div class="search--input-area">'), i.b("\n" + n), i.b('              <div class="row">'), i.b("\n" + n), i.b('                <div class="search--input search--input__text search--typeahead">'), i.b("\n" + n), i.b('                  <input type="text" placeholder="Search by neighborhood, city, or school" required="required">'), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b('              <div class="row">'), i.b("\n" + n), i.b('                <div class="search--select">'), i.b("\n" + n), i.b('                  <select class="search--input__bmin">'), i.b("\n" + n), i.b('                      <option class="xs">Beds</option>'), i.b("\n" + n), i.b('                      <option class="xs">0</option>'), i.b("\n" + n), i.b('                      <option class="xs">1+</option>'), i.b("\n" + n), i.b('                      <option class="xs">2+</option>'), i.b("\n" + n), i.b('                      <option class="xs">3+</option>'), i.b("\n" + n), i.b('                      <option class="xs">4+</option>'), i.b("\n" + n), i.b('                      <option class="xs">5+</option>'), i.b("\n" + n), i.b("                  </select>"), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b('                <div class="search--select">'), i.b("\n" + n), i.b('                  <select class="search--input__bamin">'), i.b("\n" + n), i.b("                    <option>Baths</option>"), i.b("\n" + n), i.b("                    <option>0</option>"), i.b("\n" + n), i.b("                    <option>1+</option>"), i.b("\n" + n), i.b("                    <option>2+</option>"), i.b("\n" + n), i.b("                    <option>3+</option>"), i.b("\n" + n), i.b("                  </select>"), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b('              <div class="row">'), i.b("\n" + n), i.b('                <div class="search--select">'), i.b("\n" + n), i.b('                    <select class="search--input__pmin">'), i.b("\n" + n), i.b('                        <option value="">Price Min</option>'), i.b("\n" + n), i.b('                        <option value="100000">$100K</option>'), i.b("\n" + n), i.b('                        <option value="150000">$150K</option>'), i.b("\n" + n), i.b('                        <option value="200000">$200K</option>'), i.b("\n" + n), i.b('                        <option value="250000">$250K</option>'), i.b("\n" + n), i.b('                        <option value="300000">$300K</option>'), i.b("\n" + n), i.b('                        <option value="350000">$350K</option>'), i.b("\n" + n), i.b('                        <option value="400000">$400K</option>'), i.b("\n" + n), i.b('                        <option value="450000">$450K</option>'), i.b("\n" + n), i.b('                        <option value="500000">$500K</option>'), i.b("\n" + n), i.b('                        <option value="550000">$550K</option>'), i.b("\n" + n), i.b('                        <option value="600000">$600K</option>'), i.b("\n" + n), i.b('                        <option value="650000">$650K</option>'), i.b("\n" + n), i.b('                        <option value="700000">$700K</option>'), i.b("\n" + n), i.b('                        <option value="750000">$750K</option>'), i.b("\n" + n), i.b('                        <option value="800000">$800K</option>'), i.b("\n" + n), i.b('                        <option value="850000">$850K</option>'), i.b("\n" + n), i.b('                        <option value="900000">$900K</option>'), i.b("\n" + n), i.b('                        <option value="950000">$950K</option>'), i.b("\n" + n), i.b('                        <option value="1000000">$1M</option>'), i.b("\n" + n), i.b('                        <option value="1100000">$1.1M</option>'), i.b("\n" + n), i.b('                        <option value="1200000">$1.2M</option>'), i.b("\n" + n), i.b('                        <option value="1300000">$1.3M</option>'), i.b("\n" + n), i.b('                        <option value="1400000">$1.4M</option>'), i.b("\n" + n), i.b('                        <option value="1500000">$1.5M</option>'), i.b("\n" + n), i.b('                        <option value="1600000">$1.6M</option>'), i.b("\n" + n), i.b('                        <option value="1700000">$1.7M</option>'), i.b("\n" + n), i.b('                        <option value="1800000">$1.8M</option>'), i.b("\n" + n), i.b('                        <option value="1900000">$1.9M</option>'), i.b("\n" + n), i.b('                        <option value="2000000">$2M</option>'), i.b("\n" + n), i.b('                        <option value="2250000">$2.25M</option>'), i.b("\n" + n), i.b('                        <option value="2500000">$2.5M</option>'), i.b("\n" + n), i.b('                        <option value="2750000">$2.75M</option>'), i.b("\n" + n), i.b('                        <option value="3000000">$3M</option>'), i.b("\n" + n), i.b('                        <option value="3500000">$3.5M</option>'), i.b("\n" + n), i.b('                        <option value="4000000">$4M</option>'), i.b("\n" + n), i.b('                        <option value="5000000">$5M</option>'), i.b("\n" + n), i.b('                        <option value="10000000">$10M</option>'), i.b("\n" + n), i.b('                        <option value="20000000">$20M</option>'), i.b("\n" + n), i.b("                    </select>"), i.b("\n"), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b('                <div class="search--select">'), i.b("\n" + n), i.b('                    <select class="search--input__pmax">'), i.b("\n" + n), i.b('                        <option value="">Price Max</option>'), i.b("\n" + n), i.b('                        <option value="100000">$100K</option>'), i.b("\n" + n), i.b('                        <option value="150000">$150K</option>'), i.b("\n" + n), i.b('                        <option value="200000">$200K</option>'), i.b("\n" + n), i.b('                        <option value="250000">$250K</option>'), i.b("\n" + n), i.b('                        <option value="300000">$300K</option>'), i.b("\n" + n), i.b('                        <option value="350000">$350K</option>'), i.b("\n" + n), i.b('                        <option value="400000">$400K</option>'), i.b("\n" + n), i.b('                        <option value="450000">$450K</option>'), i.b("\n" + n), i.b('                        <option value="500000">$500K</option>'), i.b("\n" + n), i.b('                        <option value="550000">$550K</option>'), i.b("\n" + n), i.b('                        <option value="600000">$600K</option>'), i.b("\n" + n), i.b('                        <option value="650000">$650K</option>'), i.b("\n" + n), i.b('                        <option value="700000">$700K</option>'), i.b("\n" + n), i.b('                        <option value="750000">$750K</option>'), i.b("\n" + n), i.b('                        <option value="800000">$800K</option>'), i.b("\n" + n), i.b('                        <option value="850000">$850K</option>'), i.b("\n" + n), i.b('                        <option value="900000">$900K</option>'), i.b("\n" + n), i.b('                        <option value="950000">$950K</option>'), i.b("\n" + n), i.b('                        <option value="1000000">$1M</option>'), i.b("\n" + n), i.b('                        <option value="1100000">$1.1M</option>'), i.b("\n" + n), i.b('                        <option value="1200000">$1.2M</option>'), i.b("\n" + n), i.b('                        <option value="1300000">$1.3M</option>'), i.b("\n" + n), i.b('                        <option value="1400000">$1.4M</option>'), i.b("\n" + n), i.b('                        <option value="1500000">$1.5M</option>'), i.b("\n" + n), i.b('                        <option value="1600000">$1.6M</option>'), i.b("\n" + n), i.b('                        <option value="1700000">$1.7M</option>'), i.b("\n" + n), i.b('                        <option value="1800000">$1.8M</option>'), i.b("\n" + n), i.b('                        <option value="1900000">$1.9M</option>'),
                i.b("\n" + n), i.b('                        <option value="2000000">$2M</option>'), i.b("\n" + n), i.b('                        <option value="2250000">$2.25M</option>'), i.b("\n" + n), i.b('                        <option value="2500000">$2.5M</option>'), i.b("\n" + n), i.b('                        <option value="2750000">$2.75M</option>'), i.b("\n" + n), i.b('                        <option value="3000000">$3M</option>'), i.b("\n" + n), i.b('                        <option value="3500000">$3.5M</option>'), i.b("\n" + n), i.b('                        <option value="4000000">$4M</option>'), i.b("\n" + n), i.b('                        <option value="5000000">$5M</option>'), i.b("\n" + n), i.b('                        <option value="10000000">$10M</option>'), i.b("\n" + n), i.b('                        <option value="20000000">$20M</option>'), i.b("\n" + n), i.b("                    </select>"), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b('              <div class="search--button">'), i.b("\n" + n), i.b("                <button>"), i.b("\n" + n), i.b("                  Search"), i.b("\n" + n), i.b("                </button>"), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b("            </div>"), i.b("\n" + n), i.b("          </div>"), i.b("\n" + n), i.b("        </section>"), i.b("\n" + n), i.b("      </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("  </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    }), u["feature-search"] = new r.Template({
        code: function(t, e, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<section class="realscout--listings feature--listings">'), i.b("\n"), i.b("\n" + n), i.s(i.f("categories", t, e, 1), t, e, 0, 74, 480, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                i.b('  <div class="realscout--listing feature--listing">'), i.b("\n" + n), i.b('    <div class="listing--image__container">'), i.b("\n" + n), i.b('      <a href="'), i.b(i.v(i.f("agentHost", t, e, 0))), i.b("/categories/"), i.b(i.v(i.f("id", t, e, 0))), i.b('" target="_blank">'), i.b("\n" + n), i.b('        <img class="listing--image" src="'), i.b(i.v(i.f("hd_image_url", t, e, 0))), i.b('" alt="'), i.b(i.v(i.f("id", t, e, 0))), i.b('">'), i.b("\n" + n), i.b("      </a>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b('    <header class="listing--header">'), i.b("\n" + n), i.b('      <h2 class="listing--title">'), i.b("\n" + n), i.b("        "), i.b(i.v(i.f("name", t, e, 0))), i.b("\n" + n), i.b("      </h2>"), i.b("\n" + n), i.b("    </header>"), i.b("\n" + n), i.b("  </div><!-- end of #listing -->"), i.b("\n" + n)
            }), t.pop()), i.b("\n" + n), i.b("</section><!-- end of #listings -->"), i.b("\n"), i.b("\n" + n), i.b('<footer class="realscout--listings__footer">'), i.b("\n" + n), i.b('  <a class="listing--button" role="button" href="'), i.b(i.v(i.f("agentHost", t, e, 0))), i.b('/categories" target="_blank">'), i.b("\n" + n), i.b("    Show more"), i.b("\n" + n), i.b("  </a>"), i.b("\n" + n), i.b("</footer>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    }), u["listings-embedded"] = new r.Template({
        code: function(t, e, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div id="realscout--kingdom">'), i.b("\n" + n), i.b('  <div id="realscout--kingdom__castle">'), i.b("\n" + n), i.b('    <div id="kingdom--castle">'), i.b("\n" + n), i.b('      <div id="kingdom--castle__throne">'), i.b("\n" + n), i.b('        <section class="realscout--listings home--listings '), i.b(i.v(i.f("restricted_layout", t, e, 0))), i.b(" "), i.b(i.v(i.f("display_view", t, e, 0))), i.b('">'), i.b("\n" + n), i.b('          <div class="home--listings__page pages page-1 active">'), i.b("\n" + n), i.s(i.f("properties", t, e, 1), t, e, 0, 334, 3456, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                i.b('              <a class="realscout--listing home--listing" role="button" href="'), i.b(i.v(i.d("property_basics.property_href", t, e, 0))), i.b('" target="_blank">'), i.b("\n" + n), i.b('                <div class="listing--image__container">'), i.b("\n" + n), i.b('                  <img class="listing--image" src="" data-echo="'), i.b(i.v(i.d("property_basics.image_url", t, e, 0))), i.b('" alt="'), i.b(i.v(i.f("id", t, e, 0))), i.b('">'), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b('                <header class="listing--header home--header">'), i.b("\n" + n), i.s(i.f("grid", t, e, 1), t, e, 0, 742, 1926, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                    i.b('                  <p class="listing--description">'), i.b("\n" + n), i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.display_price", t, e, 0))), i.b("</span>"), i.b("\n"), i.b("\n" + n), i.s(i.d("property_basics.beds", t, e, 1), t, e, 0, 942, 1060, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                        i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.beds", t, e, 0))), i.b(" Bed</span>"), i.b("\n" + n)
                    }), t.pop()), i.b("\n" + n), i.s(i.d("property_basics.baths", t, e, 1), t, e, 0, 1133, 1253, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                        i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.baths", t, e, 0))), i.b(" Bath</span>"), i.b("\n" + n)
                    }), t.pop()), i.b("\n" + n), i.s(i.d("property_basics.lal", t, e, 1), t, e, 0, 1325, 1442, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                        i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.lal", t, e, 0))), i.b(" Lot</span>"), i.b("\n" + n)
                    }), t.pop()), i.b("\n" + n), i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.listing_status", t, e, 0))), i.b("</span>"), i.b("\n" + n), i.b("                  </p>"), i.b("\n" + n), i.b('                  <p class="listing--description">'), i.b("\n" + n), i.b('                    <span class="listing--description__item address">'), i.b(i.v(i.d("property_basics.street_address", t, e, 0))), i.s(i.d("property_basics.street_address", t, e, 1), t, e, 0, 1783, 1784, "{{ }}") && (i.rs(t, e, function(t, e, n) {
                        n.b(",")
                    }), t.pop()), i.b(" "), i.b(i.v(i.d("property_basics.city", t, e, 0))), i.b(", "), i.b(i.v(i.d("property_basics.postal_code", t, e, 0))), i.b("</span>"), i.b("\n" + n), i.b("                  </p>"), i.b("\n" + n)
                }), t.pop()), i.s(i.f("grid", t, e, 1), t, e, 1, 0, 0, "") || (i.b('                  <p class="listing--description">'), i.b("\n" + n), i.b('                    <span class="listing--description__item">'), i.b(i.v(i.d("property_basics.listing_status", t, e, 0))), i.b("</span>"), i.b("\n" + n), i.b("                  </p>"), i.b("\n" + n), i.b('                  <p class="listing--description">'), i.b("\n" + n), i.b('                    <span class="listing--description__item address">'), i.b(i.v(i.d("property_basics.street_address", t, e, 0))), i.s(i.d("property_basics.street_address", t, e, 1), t, e, 0, 2330, 2331, "{{ }}") && (i.rs(t, e, function(t, e, n) {
                    n.b(",")
                }), t.pop()), i.b(" "), i.b(i.v(i.d("property_basics.city", t, e, 0))), i.b(", "), i.b(i.v(i.d("property_basics.postal_code", t, e, 0))), i.b("</span>"), i.b("\n" + n), i.b("                  </p>"), i.b("\n" + n), i.b('                  <p class="listing--description">'), i.b("\n" + n), i.b('                    <span class="listing--description__item price">'), i.b(i.v(i.d("property_basics.display_price", t, e, 0))), i.b("</span>"), i.b("\n" + n), i.b('                    <span class="attributes">'), i.b("\n" + n), i.b("                      ("), i.b("\n" + n), i.s(i.d("property_basics.beds", t, e, 1), t, e, 0, 2731, 2807, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                    i.b("                        "), i.b(i.v(i.d("property_basics.beds", t, e, 0))), i.b(" Bed"), i.b("\n" + n)
                }), t.pop()), i.b("\n" + n), i.s(i.d("property_basics.baths", t, e, 1), t, e, 0, 2882, 2960, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                    i.b("                        "), i.b(i.v(i.d("property_basics.baths", t, e, 0))), i.b(" Bath"), i.b("\n" + n)
                }), t.pop()), i.b("\n" + n), i.s(i.d("property_basics.lal", t, e, 1), t, e, 0, 3034, 3109, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                    i.b("                        "), i.b(i.v(i.d("property_basics.lal", t, e, 0))), i.b(" Lot"), i.b("\n" + n)
                }), t.pop()), i.b("                      )"), i.b("\n" + n), i.b("                    </span>"), i.b("\n" + n), i.b("                  </p>"), i.b("\n" + n)), i.b("\n" + n), i.b("                </header>"), i.b("\n" + n), i.b("              </a><!-- end of #listing -->"), i.b("\n" + n), i.s(i.f("paginate", t, e, 1), t, e, 0, 3334, 3430, "{{ }}") && (i.rs(t, e, function(t, e, i) {
                    i.b('                </div><div class="home--listings__page pages page-'), i.b(i.v(i.f("paginate", t, e, 0))), i.b('">'), i.b("\n" + n)
                }), t.pop())
            }), t.pop()), i.b("\n" + n), i.s(i.f("properties", t, e, 1), t, e, 1, 0, 0, "") || (i.b('                <p class="listing--no__properties">No active or pending listings at this time.</p>'), i.b("\n" + n)), i.b("\n" + n), i.b("          </div>"), i.b("\n"), i.b("\n" + n), i.b("        </section><!-- end of #listings -->"), i.b("\n"), i.b("\n" + n), i.b('        <footer class="realscout--listings__footer">'), i.b("\n" + n), i.b('          <ul class="realscout--pagination">'), i.b("\n" + n), i.b("            <li>"), i.b("\n" + n), i.b('              <a class="pagination--link pagination--link__disabled" href="#">Previous</a>'), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n), i.b("            <li>"), i.b("\n" + n), i.b('              <a class="pagination--link pagination--link__active" href="#">1</a>'), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n), i.b("          </ul>"), i.b("\n" + n), i.b("        </footer>"), i.b("\n" + n), i.b("      </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("  </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    }), u["simple-search"] = new r.Template({
        code: function(t, e, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div id="realscout--kingdom">'), i.b("\n" + n), i.b('  <div id="realscout--kingdom__castle">'), i.b("\n" + n), i.b('    <div id="kingdom--castle">'), i.b("\n" + n), i.b('      <div id="kingdom--castle__throne">'), i.b("\n" + n), i.b('        <section class="search--widget search--simple">'), i.b("\n" + n), i.b('          <form class="search--body">'), i.b("\n" + n), i.b('            <fieldset class="search--input-area">'), i.b("\n" + n), i.b('              <div class="search--input search--input__text">'), i.b("\n" + n), i.b('                <input type="text" placeholder="Search by neighborhood, city, or school" required="required">'), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b('              <div class="search--button">'), i.b("\n" + n), i.b('                <button type="submit" role="button">'), i.b("\n" + n), i.b("                  Search"), i.b("\n" + n), i.b("                </button>"), i.b("\n" + n), i.b("              </div>"), i.b("\n" + n), i.b("            </fieldset>"), i.b("\n" + n), i.b("          </form>"), i.b("\n" + n), i.b("        </section>"), i.b("\n" + n), i.b("      </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("  </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    }), u.kingdom = new r.Template({
        code: function(t, e, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div id="realscout--kingdom">'), i.b("\n" + n), i.b('  <div id="realscout--kingdom__castle">'), i.b("\n" + n), i.b('    <div id="kingdom--castle">'), i.b("\n" + n), i.b('      <div id="kingdom--castle__throne">'), i.b("\n" + n), i.b(i.rp("<widget0", t, e, "        ")), i.b("      </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("  </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {
            "<widget0": {
                name: "widget",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    }), _RealScout.RepListings = {
        init: function() {
            this._initVariables(), this._initHelpers(), this._getTemplate()
        },
        _initVariables: function() {
            this._dataUrl = _RealScout.getConfig().apiHost + "/api/v3/representatives/", this._statisticsUrl = _RealScout.getConfig().statisticsPath, this._template = u["listings-embedded"], this._htmlPath = "module/widgets/embedded/listings-embedded/listings-embedded.html", this._errorText = "Oops! No Representative Found, please go back to RealScout and copy your widget code again.", this._errorClass = "search--widget__blank", this._wrapperClass = ".realscout-listings", this._wrappers = s(this._wrapperClass)
        },
        _initHelpers: function() {
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1)
            }
        },
        _getTemplate: function() {
            this._newListings(), this._sendStatistics()
        },
        _onElementReady: function(e, n, i) {
            var r = 0,
                o = t.setInterval(function() {
                    e(o), ++r === i && t.clearInterval(o)
                }, n)
        },
        _newListings: function() {
            this._onElementReady(function(e) {
                this._wrappers.length > 0 && (t.clearInterval(e), s.each(this._wrappers, function(t, e) {
                    e = s(e), e.hasClass("agent") ? this._initAgentListings(e) : e.hasClass("office") ? this._initOfficeListings(e) : e.hasClass("single") && this._initSingleListings(e)
                }.bind(this)).bind(this))
            }.bind(this), 500, 20)
        },
        _sendStatistics: function() {
            s.ajax({
                type: "POST",
                url: this._statisticsUrl,
                data: {
                    widget: {
                        type: "advanced_search"
                    }
                },
                dataType: "json"
            }).fail(function(t, e, n) {})
        },
        _initStatuses: function(t) {
            var e = [];
            return t && (t = t.toLowerCase().split(","), s.each(t, function(t, n) {
                n = n.trim(), n = n.charAt(0).toUpperCase() + n.slice(1), e.push(n)
            })), e.join(",")
        },
        _initPager: function(e, n) {
            var i = s(n).find(".realscout--pagination");
            if (e.properties.length > 6) {
                var r, o = function(t) {
                    t.preventDefault()
                };
                i.pagination({
                    items: e.properties.length,
                    itemsOnPage: 6,
                    cssStyle: " ",
                    onInit: function() {
                        if (i)
                            for (var t = e.properties.length / 6, n = t; n >= 1; n--)
                                if (s('a[href="#page-' + n + '"]').click(o), 0 === n) s(".page-1").addClass("active");
                                else {
                                    var r = s(".page-" + (n + 1));
                                    r && r.removeClass("active")
                                }
                    },
                    onPageClick: function(e) {
                        s("a.page-link").bind("click", o), r || (r = 1), n.find(".page-" + r).removeClass("active"), n.find(".page-" + e).addClass("active"), r = e, s(t).scroll()
                    }
                })
            } else i.empty()
        },
        _initLayoutSetup: function(t) {
            return t.attr("data-two-column") ? "restricted__layout" : ""
        },
        _initViewStyle: function(t) {
            return t.attr("data-view") ? t.attr("data-view") : "grid__view"
        },
        _initAgentListings: function(t) {
            var e = t.attr("data-rep"),
                n = this._initStatuses(t.attr("data-status")),
                i = function(n) {
                    n.restricted_layout = this._initLayoutSetup(t), n.display_view = this._initViewStyle(t), n.grid = "grid__view" === n.display_view, this._renderTemplate(t, n, e)
                },
                r = {
                    url: this._dataUrl + e + "/properties",
                    dataType: "json",
                    data: {
                        statuses: n
                    },
                    success: i.bind(this)
                };
            this._getData(r, e, t)
        },
        _initOfficeListings: function(t) {
            var e = t.attr("data-rep"),
                n = this._initStatuses(t.attr("data-status")),
                i = function(n) {
                    n.restricted_layout = this._initLayoutSetup(t), n.display_view = this._initViewStyle(t), this._renderTemplate(t, n, e)
                },
                r = {
                    url: this._dataUrl + e + "/properties",
                    dataType: "json",
                    data: {
                        statuses: n,
                        plus_broker: !0
                    },
                    success: i.bind(this)
                };
            this._getData(r, e, t)
        },
        _initSingleListings: function(t) {
            var e = t.attr("data-rep"),
                n = t.attr("data-mls-id"),
                i = function(n) {
                    n.properties = [n.property], this._renderTemplate(t, n, e)
                },
                r = {
                    url: this._dataUrl + e + "/properties/" + n,
                    dataType: "json",
                    success: i.bind(this)
                };
            this._getData(r, e, t)
        },
        _getData: function(t, e, n) {
            e ? s.ajax(t) : (n.text(this._errorText), n.addClass(this._errorClass))
        },
        _renderTemplate: function(t, e, n) {
            console.log(e), e = this._customize(e, n);
            var i = this._template.render(e);
            s(t).empty().append(i), this._initPager(e, t), this._initLazyLoading()
        },
        _customize: function(t, e) {
            var n = 1;
            return t.rep = e, s.each(t.properties, function(e, i) {
                i.property_basics.property_href = _RealScout.getConfig().getAgentHost(t.rep) + "/property/" + i.id, i.property_basics.display_price = "$" + parseInt(i.property_basics.display_price).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").slice(0, -2), (e + 1) % 6 === 0 && (n++, i.paginate = n)
            }), t
        },
        _initLazyLoading: function() {
            var n = function(t) {
                    this.elem = t, this.render(), this.listen()
                },
                i = [],
                r = function(t, e) {
                    var n = " " + e + " ";
                    return (" " + t.className + " ").replace(/[\n\t]/g, " ").indexOf(n) > -1
                },
                o = function(n) {
                    if (n) {
                        var i = n.getBoundingClientRect(),
                            o = n.parentNode.parentNode.parentNode;
                        return r(o, "active") && (i.top >= 0 && i.left >= 0 && i.top) <= (t.innerHeight || e.documentElement.clientHeight)
                    }
                },
                a = function(t, e) {
                    t.src = t.getAttribute("data-echo"), e && e()
                },
                u = function(t, e) {
                    i.indexOf(t) !== -1 && i.splice(e, 1)
                },
                l = function() {
                    for (var t = 0; t < i.length; t++) {
                        var e = i[t];
                        o(e) && a(e, u(e, t))
                    }
                };
            n.prototype = {
                init: function() {
                    i.push(this.elem)
                },
                render: function() {
                    e.addEventListener ? (e.addEventListener("DOMContentLoaded", l, !1), l()) : t.onload = l
                },
                listen: function() {
                    t.onscroll = l, s("body").click(l)
                }
            };
            for (var c = e.querySelectorAll("img[data-echo]"), p = 0; p <= c.length; p++) new n(c[p]).init()
        }
    }
}(window, document);
