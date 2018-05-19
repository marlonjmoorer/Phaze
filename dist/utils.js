"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isPromise(obj) {
  return !!obj && ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function") && typeof obj.then === "function";
}
var checkState = exports.checkState = function checkState(prevState, state, keys) {};

var mapEffects = exports.mapEffects = function mapEffects(effects, commit) {
  var _this = this;

  return Object.keys(effects).reduce(function (final, key) {
    if (!effects[key] || typeof effects[key] != "function") return;
    return _extends({}, final, _defineProperty({}, key, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var state = _this.getState();
      var result = effects[key].apply(effects, [state].concat(args));
      commit(state);
    }));
  }, {});
};
var mapActions = exports.mapActions = function mapActions(actions) {
  var _this2 = this;

  return Object.keys(actions).reduce(function (finalActions, key) {
    if (!actions[key] || typeof actions[key] != "function") return;
    return _extends({}, finalActions, _defineProperty({}, key, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var state, store;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = _this2.getState();
              store = {
                state: _this2.getState(),
                dispatch: _this2.dispatch,
                commit: _this2.commit
              };
              return _context.abrupt("return", actions[key].apply(actions, [store].concat(_toConsumableArray(args))));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }))));
  }, {});
};
var mapComputed = exports.mapComputed = function mapComputed(computed) {
  var _this3 = this;

  console.log("state", this.getState());
  return Object.keys(computed).reduce(function (comp, key) {
    return _extends({}, comp, _defineProperty({}, key, computed[key](_this3.getState())));
  }, {});
};