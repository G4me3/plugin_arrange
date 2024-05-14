"use strict";

exports.__esModule = true;
exports["default"] = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/** */
var SimpleAnnotationServerV2Adapter = /*#__PURE__*/function () {
  /** */
  function SimpleAnnotationServerV2Adapter(canvasId, endpointUrl) {
    this.canvasId = canvasId;
    this.endpointUrl = endpointUrl;
  }

  /** */
  var _proto = SimpleAnnotationServerV2Adapter.prototype;
  /** */
  _proto.create =
  /*#__PURE__*/
  function () {
    var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(annotation) {
      var _this = this;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", fetch(this.endpointUrl + "/create", {
              body: JSON.stringify(SimpleAnnotationServerV2Adapter.createV2Anno(annotation)),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then(function (response) {
              return _this.all();
            })["catch"](function () {
              return _this.all();
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function create(_x) {
      return _create.apply(this, arguments);
    }
    return create;
  }() /** */;
  _proto.update =
  /*#__PURE__*/
  function () {
    var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(annotation) {
      var _this2 = this;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch(this.endpointUrl + "/update", {
              body: JSON.stringify(SimpleAnnotationServerV2Adapter.createV2Anno(annotation)),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST'
            }).then(function (response) {
              return _this2.all();
            })["catch"](function () {
              return _this2.all();
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function update(_x2) {
      return _update.apply(this, arguments);
    }
    return update;
  }() /** */;
  _proto["delete"] =
  /*#__PURE__*/
  function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(annoId) {
      var _this3 = this;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", fetch(this.endpointUrl + "/destroy?uri=" + encodeURIComponent(annoId), {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'DELETE'
            }).then(function (response) {
              return _this3.all();
            })["catch"](function () {
              return _this3.all();
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function _delete(_x3) {
      return _delete2.apply(this, arguments);
    }
    return _delete;
  }() /** */;
  _proto.get =
  /*#__PURE__*/
  function () {
    var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(annoId) {
      var annotationPage;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.all();
          case 2:
            annotationPage = _context4.sent;
            if (!annotationPage) {
              _context4.next = 5;
              break;
            }
            return _context4.abrupt("return", annotationPage.items.find(function (item) {
              return item.id === annoId;
            }));
          case 5:
            return _context4.abrupt("return", null);
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function get(_x4) {
      return _get.apply(this, arguments);
    }
    return get;
  }() /** Returns an AnnotationPage with all annotations */;
  _proto.all =
  /*#__PURE__*/
  function () {
    var _all = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var resp, annos;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return fetch(this.annotationPageId);
          case 2:
            resp = _context5.sent;
            _context5.next = 5;
            return resp.json();
          case 5:
            annos = _context5.sent;
            return _context5.abrupt("return", this.createAnnotationPage(annos));
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this);
    }));
    function all() {
      return _all.apply(this, arguments);
    }
    return all;
  }() /** Creates a V2 annotation from a V3 annotation */;
  SimpleAnnotationServerV2Adapter.createV2Anno = function createV2Anno(v3anno) {
    var _this4 = this;
    var v2anno = {
      '@context': 'http://iiif.io/api/presentation/2/context.json',
      '@type': 'oa:Annotation',
      motivation: 'oa:commenting',
      on: {
        '@type': 'oa:SpecificResource',
        full: v3anno.target.source.id
      }
    };
    // copy id if it is SAS-generated
    if (v3anno.id && v3anno.id.startsWith('http')) {
      v2anno['@id'] = v3anno.id;
    }
    if (Array.isArray(v3anno.body)) {
      v2anno.resource = v3anno.body.map(function (b) {
        return _this4.createV2AnnoBody(b);
      });
    } else {
      v2anno.resource = this.createV2AnnoBody(v3anno.body);
    }
    if (v3anno.target.selector) {
      if (Array.isArray(v3anno.target.selector)) {
        var selectors = v3anno.target.selector.map(function (s) {
          return _this4.createV2AnnoSelector(s);
        });
        // create choice, assuming two elements and 0 is default
        v2anno.on.selector = {
          '@type': 'oa:Choice',
          "default": selectors[0],
          item: selectors[1]
        };
      } else {
        v2anno.on.selector = this.createV2AnnoSelector(v3anno.target.selector);
      }
      if (v3anno.target.source.partOf) {
        v2anno.on.within = {
          '@id': v3anno.target.source.partOf.id,
          '@type': 'sc:Manifest'
        };
      }
    }
    return v2anno;
  }

  /** */;
  SimpleAnnotationServerV2Adapter.createV2AnnoBody = function createV2AnnoBody(v3body) {
    var v2body = {
      chars: v3body.value
    };
    if (v3body.purpose === 'tagging') {
      v2body['@type'] = 'oa:Tag';
    } else {
      v2body['@type'] = 'dctypes:Text';
    }
    if (v3body.format) {
      v2body.format = v3body.format;
    }
    if (v3body.language) {
      v2body.language = v3body.language;
    }
    return v2body;
  }

  /** */;
  SimpleAnnotationServerV2Adapter.createV2AnnoSelector = function createV2AnnoSelector(v3selector) {
    switch (v3selector.type) {
      case 'SvgSelector':
        return {
          '@type': 'oa:SvgSelector',
          value: v3selector.value
        };
      case 'FragmentSelector':
        return {
          '@type': 'oa:FragmentSelector',
          value: v3selector.value
        };
      default:
        return null;
    }
  }

  /** Creates an AnnotationPage from a list of V2 annotations */;
  _proto.createAnnotationPage = function createAnnotationPage(v2annos) {
    if (Array.isArray(v2annos)) {
      var v3annos = v2annos.map(function (a) {
        return SimpleAnnotationServerV2Adapter.createV3Anno(a);
      });
      return {
        id: this.annotationPageId,
        items: v3annos,
        type: 'AnnotationPage'
      };
    }
    return v2annos;
  }

  /** Creates a V3 annotation from a V2 annotation */;
  SimpleAnnotationServerV2Adapter.createV3Anno = function createV3Anno(v2anno) {
    var _this5 = this;
    var v3anno = {
      id: v2anno['@id'],
      motivation: 'commenting',
      type: 'Annotation'
    };
    if (Array.isArray(v2anno.resource)) {
      v3anno.body = v2anno.resource.map(function (b) {
        return _this5.createV3AnnoBody(b);
      });
    } else {
      v3anno.body = this.createV3AnnoBody(v2anno.resource);
    }
    var v2target = v2anno.on;
    if (Array.isArray(v2target)) {
      var _v2target = v2target;
      v2target = _v2target[0];
    }
    v3anno.target = {
      selector: this.createV3AnnoSelector(v2target.selector),
      source: v2target.full
    };
    if (v2target.within) {
      v3anno.target.source = {
        id: v2target.full,
        partOf: {
          id: v2target.within['@id'],
          type: 'Manifest'
        },
        type: 'Canvas'
      };
    }
    return v3anno;
  }

  /** */;
  SimpleAnnotationServerV2Adapter.createV3AnnoBody = function createV3AnnoBody(v2body) {
    var v3body = {
      type: 'TextualBody',
      value: v2body.chars
    };
    if (v2body.format) {
      v3body.format = v2body.format;
    }
    if (v2body.language) {
      v3body.language = v2body.language;
    }
    if (v2body['@type'] === 'oa:Tag') {
      v3body.purpose = 'tagging';
    }
    return v3body;
  }

  /** */;
  SimpleAnnotationServerV2Adapter.createV3AnnoSelector = function createV3AnnoSelector(v2selector) {
    switch (v2selector['@type']) {
      case 'oa:SvgSelector':
        return {
          type: 'SvgSelector',
          value: v2selector.value
        };
      case 'oa:FragmentSelector':
        return {
          type: 'FragmentSelector',
          value: v2selector.value
        };
      case 'oa:Choice':
        /* create alternate selectors */
        return [this.createV3AnnoSelector(v2selector["default"]), this.createV3AnnoSelector(v2selector.item)];
      default:
        return null;
    }
  };
  _createClass(SimpleAnnotationServerV2Adapter, [{
    key: "annotationPageId",
    get: function get() {
      return this.endpointUrl + "/search?uri=" + this.canvasId;
    }
  }]);
  return SimpleAnnotationServerV2Adapter;
}();
exports["default"] = SimpleAnnotationServerV2Adapter;
module.exports = exports.default;