"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require("events");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store(_ref) {
    var _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? {} : _ref$actions,
        _ref$state = _ref.state,
        state = _ref$state === undefined ? {} : _ref$state,
        _ref$computed = _ref.computed,
        computed = _ref$computed === undefined ? {} : _ref$computed,
        _ref$effects = _ref.effects,
        effects = _ref$effects === undefined ? {} : _ref$effects;

    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.getState = function () {
      return _this.state;
    };

    _this.dispatch = function (key) {
      var _this$actions;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$actions = _this.actions)[key].apply(_this$actions, args);
    };

    _this.commit = function (key) {
      var _this$effects;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$effects = _this.effects)[key].apply(_this$effects, args);
    };

    var update = setState.bind(_this);
    _this.state = state;
    _this.actions = _utils.mapActions.call(_this, actions);
    _this.computed = _utils.mapComputed.call(_this, computed);
    _this._computed = computed;
    _this.effects = _utils.mapEffects.call(_this, effects, update);
    return _this;
  }

  return Store;
}(_events.EventEmitter);

exports.default = Store;


var setState = function setState(state) {
  var _this2 = this;

  this.state = _extends({}, this.state, state);
  this.computed = _utils.mapComputed.call(this, this._computed);
  this.emit("update", this);
  Object.keys(state).forEach(function (key) {
    _this2.emit(key, _this2.state[key]);
  });
};