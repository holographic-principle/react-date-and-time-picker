module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(4);
            var content = __webpack_require__(5);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".dtp-root {\n  background-color: white;\n  border-radius: 3px;\n  border: 1px solid hsl(0, 0%, 95%);\n  box-shadow: 0 1px 9px hsla(0, 0%, 0%, .4);\n  color: hsl(0, 0%, 25%);\n  font-size: 14px;\n  left: 0;\n  overflow: hidden;\n  padding: 0 12px;\n  position: absolute;\n  top: 0;\n  -webkit-user-select: none;\n          user-select: none;\n  width: 256px;\n}\n\n.dtp-root .material-icons {\n  line-height: inherit;\n}\n\n.dtp-hover-span {\n  border-radius: 4px;\n  box-shadow: 0 0 0 hsla(0, 0%, 0%, 0);\n  cursor: pointer;\n  display: block;\n  height: 100%;\n  padding: 0 8px;\n  transition: box-shadow .1s;\n}\n\n.dtp-header,\n.dtp-footer {\n  align-items: center;\n  background-color: hsl(0, 0%, 98%);\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, .12);\n  display: flex;\n  height: 36px;\n  justify-content: space-between;\n  line-height: 36px;\n  margin: 0 -12px;\n}\n\n.dtp-footer {\n  justify-content: space-around;\n}\n\n.dtp-previous-month,\n.dtp-next-month {\n  box-sizing: border-box;\n  cursor: pointer;\n  padding: 0;\n  text-align: center;\n  width: 40px;\n}\n\n.dtp-header-month,\n.dtp-header-year {\n  border-radius: 0;\n  min-width: 40px;\n  padding: 0 12px;\n  text-align: center;\n}\n\n.dtp-header-month.dtp-selected,\n.dtp-header-year.dtp-selected {\n  background-image: linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7));\n  background-position: 0 100%;\n  background-repeat: no-repeat;\n  background-size: 100% 2px;\n}\n\n.dtp-main-section {\n  align-items: center;\n  display: flex;\n  height: 208px;\n  width: 252px;\n}\n\n.dtp-table {\n  border-collapse: collapse;\n  margin: 0;\n  max-width: 252px;\n  width: 252px;\n}\n\n.dtp-table th,\n.dtp-table td {\n  padding: 0;\n}\n\n.dtp-th-day,\n.dtp-td-day {\n  border: none;\n  height: 28px;\n  line-height: 28px;\n  padding: 0;\n  width: 36px;\n}\n\n.dtp-select-day {\n  cursor: pointer;\n}\n\n.dtp-table .dtp-th-day  {\n  font-weight: normal;\n  padding: 0;\n  text-align: center;\n  width: 36px;\n}\n\n.dtp-th-day .dtp-hover-span,\n.dtp-td-day .dtp-hover-span {\n  border-radius: 19px;\n  display: block;\n  margin: 0 auto;\n  padding: 0;\n  text-align: center;\n  width: 28px;\n}\n\n.dtp-td-day:hover .dtp-hover-span,\n.dtp-td-years .dtp-hover-span:hover,\n.dtp-td-months .dtp-hover-span:hover {\n  box-shadow: 1px 1px 4px hsla(0, 0%, 0%, .2),\n              0 0 2px hsla(0, 0%, 0%, .2);\n}\n\n.dtp-today > .dtp-hover-span {\n  box-shadow: 0 0 4px hsla(0, 0%, 0%, .2);\n}\n\n.dtp-selected-day > .dtp-hover-span  {\n  background-color: hsl(210, 100%, 50%);\n  color: white;\n}\n\n.dtp-table .dtp-td-years,\n.dtp-table .dtp-td-months {\n  height: 32px;\n  line-height: 32px;\n  padding: 4px 0;\n  text-align: center;\n  width: 88px;\n}\n\n.dtp-time-container {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n\n.dtp-time-controls {\n  display: flex;\n  flex-direction: column;\n}\n\n.dtp-time-controls .dtp-hover-span {\n  height: 32px;\n  line-height: 32px;\n}\n\n.dtp-digits {\n  display: block;\n  margin: auto;\n}\n\n.dtp-digits circle {\n   fill: black;\n}\n\n.dtp-digit-display-light {\n  fill: white;\n}\n\n.dtp-digit-display-light.on {\n  fill: black;\n}\n\n.dtp-icon-chevron-left::before {\n  content: 'chevron_left';\n}\n\n.dtp-icon-chevron-right::before {\n  content: 'chevron_right';\n}\n\n.dtp-icon-arrow-drop-up::before {\n  content: 'arrow_drop_up';\n}\n\n.dtp-icon-expand-less::before {\n  content: 'expand_less';\n}\n\n.dtp-icon-expand-more::before {\n  content: 'expand_more';\n}\n\n.dtp-transparent {\n  color: transparent;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(1);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./src/ui_strings.js
const WEEK_DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEK_DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
// CONCATENATED MODULE: ./src/utils.js
function* range(end, start = 0, iter = 1) {
  for (let i = start; i < end; i += iter) {
    yield i;
  }
}
function rotate(iterable, delta) {
  const l = iterable.length;
  return Array.from(range(l)).map(i => iterable[(i + delta) % l]);
}
function classes(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

const defineProperty = (object, n, start) => {
  Object.defineProperty(object, String(n), {
    get: () => {
      defineProperty(object, n + 1, start);
      return n + start;
    }
  });
  return object;
};

function Enum(start = 1) {
  return defineProperty([], 0, start);
}
class TargetManager {
  constructor(config) {
    this._targetClassNames = new Map();
    this._targetQueries = new Map();
    Object.keys(config).forEach(eventType => {
      const classNames = config[eventType];

      this._targetClassNames.set(eventType, classNames);

      this._targetQueries.set(eventType, classNames.map(className => `.${className}`).join(', '));
    });
  }

  getTarget(event, eventType = event.type) {
    const target = event.target.closest(this._targetQueries.get(eventType));

    if (target) {
      const className = this._targetClassNames.get(eventType).find(targetClassName => target.classList.contains(targetClassName));

      return {
        target,
        className
      };
    }

    return {};
  }

}
const getDefaultLineHeight = () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'about:blank';
  document.body.appendChild(iframe);
  const iframeDocument = iframe.contentWindow.document;
  const span = iframeDocument.createElement('span');
  iframeDocument.body.appendChild(span);
  span.textContent = 'a';
  const lineHeight = span.offsetHeight;
  iframe.remove();
  return lineHeight;
};
// CONCATENATED MODULE: ./src/classNames.js
/* harmony default export */ var classNames = ({
  ROOT: 'dtp-root',
  HEADER_ROW: 'dtp-header',
  HEADER_MONTH: 'dtp-header-month',
  HEADER_YEAR: 'dtp-header-year',
  MAIN_SECTION: 'dtp-main-section',
  TABLE: 'dtp-table',
  TH_DAY: 'dtp-th-day',
  TD_DAY: 'dtp-td-day',
  FOOTER_ROW: 'dtp-footer',
  TIME_CONTAINER: 'dtp-time-container',
  TIME_CONTROLS: 'dtp-time-controls',
  DISPLAY_LIGHT: 'dtp-digit-display-light',
  DIGITS: 'dtp-digits',
  HOVER_SPAN: 'dtp-hover-span',
  TODAY: 'dtp-today',
  SELECTED_DAY: 'dtp-selected-day',
  SELECTED: 'dtp-selected',
  PREVIOUS_YEAR: 'dtp-previous-year',
  PREVIOUS_MONTH: 'dtp-previous-month',
  PREVIOUS_HOUR: 'dtp-hour-previous',
  PREVIOUS_MINUTE: 'dtp-minute-previous',
  NEXT_YEAR: 'dtp-next-year',
  NEXT_MONTH: 'dtp-next-month',
  NEXT_HOUR: 'dtp-hour-next',
  NEXT_MINUTE: 'dtp-minute-next',
  SELECT_MONTH: 'dtp-td-months',
  SELECT_YEAR: 'dtp-td-years',
  SELECT_DAY: 'dtp-select-day',
  SELECT_TIME: 'dtp-select-time',
  SELECT_CALENDAR: 'dtp-select-year',
  SELECT_TODAY: 'dtp-select-today',
  CLEAR_SELECTION: 'dtp-clear-selection',
  VIEW_DAYS: 'dtp-view-days',
  VIEW_MONTHS: 'dtp-view-months',
  VIEW_YEARS: 'dtp-view-years',
  VIEW_TIME: 'dtp-view-time',
  ICON_CHEVRON_LEFT: 'dtp-icon-chevron-left',
  ICON_CHEVRON_RIGHT: 'dtp-icon-chevron-right',
  ICON_ARROW_DROP_UP: 'dtp-icon-arrow-drop-up',
  ICON_EXPAND_LESS: 'dtp-icon-expand-less',
  ICON_EXPAND_MORE: 'dtp-icon-expand-more',
  MATERIAL_ICONS: 'material-icons',
  TRANSPARENT: 'dtp-transparent'
});
// CONCATENATED MODULE: ./src/dateExtensions.js
/**
 * According to ISO 8601.
 * Week 1 is the week with the first Thursday.
 * Weeks starting on Monday.
 *
 * Code mainly from https://weeknumber.net/how-to/javascript
 *
 * @param {Date} date - A Date instance.
 * @return {number} The week number of the year.
 */
function getWeekNumber(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Thursday in current week decides the year.
  // Week starts with Monday, getDay must be rotated accordingly.
  // This may change the year.

  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7); // January 4 is always in week 1.

  const week1 = new Date(d.getFullYear(), 0, 4); // Adjustment to Thursday in week 1 is not needed, the maximum adjustment
  // would be +|- 3/7, which is less than +|- 0.5 from the exacte week delta.

  return 1 + Math.round((d.getTime() - week1.getTime()) / (7 * 24 * 60 * 60 * 1000));
}
/**
 * Gets the weeks of a month as tuples with week number and dates in that
 * week. The days belonging to the previous or next month are filled
 * with 0.
 *
 * E.g. getWeeksOfMonth(2017, 10) returns
 *
 * ```javascript
 *   [
 *     [44, [0, 0, 1, 2, 3, 4, 5]],
 *     [45, [6, 7, 8, 9, 10, 11, 12]],
 *     [46, [13, 14, 15, 16, 17, 18, 19]],
 *     [47, [20, 21, 22, 23, 24, 25, 26]],
 *     [48, [27, 28, 29, 30, 0, 0, 0]]
 *   ]
 * ```
 *
 * @param {number} year - The year.
 * @param {number} month - The month.
 * @param {boolean} [startWithMonday=true] - A boolean flag.
 * @return {Array} List of the week tuples with week number and
 *                 list of week days.
 *
 */

function getWeeksOfMonth(year, month, startWithMonday = true) {
  let day = 1;
  const date = new Date(year, month, day);
  let startDay = (date.getDay() + (startWithMonday ? 6 : 0)) % 7;
  let dayCount = 28; // eslint-disable-next-line

  while (true) {
    date.setDate(dayCount + 1);

    if (date.getMonth() !== month) {
      break;
    }

    dayCount++;
  }

  const weeks = [];
  let week = [];

  while (startDay-- > 0) {
    week.push(0);
  }

  date.setYear(year);
  date.setMonth(month);

  while (day <= dayCount) {
    date.setDate(day);
    week.push(day++);

    if (week.length === 7) {
      weeks.push([getWeekNumber(date), week]);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) {
      week.push(0);
    }

    weeks.push([getWeekNumber(date), week]);
  }

  return weeks;
}
// CONCATENATED MODULE: ./src/month.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







const {
  TD_DAY,
  TODAY,
  SELECTED_DAY,
  SELECT_DAY,
  TH_DAY,
  TABLE,
  HOVER_SPAN,
  TRANSPARENT
} = classNames;

const Day = ({
  day
}) => day < 10 ? [/*#__PURE__*/external_react_default.a.createElement("span", {
  key: "1",
  className: TRANSPARENT
}, "0"), day] : day;

Day.propTypes = {
  day: external_prop_types_default.a.number
};

const Week = ({
  year,
  month,
  week,
  selected
}) => {
  const weekRow = week.map((day, index) => {
    const current = {
      year,
      month,
      day
    };
    const isSelected = ['year', 'month', 'day'].every(prop => current[prop] === selected[prop]);
    const dateToday = new Date();
    const today = {
      year: dateToday.getFullYear(),
      month: dateToday.getMonth(),
      day: dateToday.getDate()
    };
    const isToday = ['year', 'month', 'day'].every(prop => current[prop] === today[prop]);
    return /*#__PURE__*/external_react_default.a.createElement("td", {
      key: index,
      className: classes(TD_DAY, day > 0 && SELECT_DAY, isSelected && SELECTED_DAY, isToday && TODAY)
    }, day > 0 && /*#__PURE__*/external_react_default.a.createElement("span", {
      className: classes(HOVER_SPAN)
    }, /*#__PURE__*/external_react_default.a.createElement(Day, {
      day: day
    })));
  });
  return /*#__PURE__*/external_react_default.a.createElement("tr", null, weekRow);
};

Week.propTypes = {
  year: external_prop_types_default.a.number,
  month: external_prop_types_default.a.number,
  week: external_prop_types_default.a.array,
  selected: external_prop_types_default.a.object
};

const Month = ({
  year,
  month,
  selected
}) => {
  const weeksOfMonth = getWeeksOfMonth(year, month);
  const weekDays = rotate(WEEK_DAYS_SHORT, 1);
  const weekLabels = weekDays.map(wday => /*#__PURE__*/external_react_default.a.createElement("th", {
    key: wday,
    className: TH_DAY
  }, wday));
  const weekRows = weeksOfMonth.map(([, week], index) => /*#__PURE__*/external_react_default.a.createElement(Week, _extends({
    key: index
  }, {
    year,
    month,
    week,
    selected
  })));
  return /*#__PURE__*/external_react_default.a.createElement("table", {
    className: TABLE
  }, /*#__PURE__*/external_react_default.a.createElement("thead", null, /*#__PURE__*/external_react_default.a.createElement("tr", null, weekLabels)), /*#__PURE__*/external_react_default.a.createElement("tbody", null, weekRows));
};

Month.propTypes = {
  year: external_prop_types_default.a.number,
  month: external_prop_types_default.a.number,
  selected: external_prop_types_default.a.object
};
/* harmony default export */ var src_month = (Month);
// CONCATENATED MODULE: ./src/selectMonth.js



const {
  TABLE: selectMonth_TABLE,
  HOVER_SPAN: selectMonth_HOVER_SPAN,
  SELECT_MONTH
} = classNames;

const SelectMonth = () => {
  const rows = [];
  let row;
  MONTH_NAMES_SHORT.forEach((name, index) => {
    if (index % 3 === 0) {
      row = [];
      rows.push(row);
    }

    row.push( /*#__PURE__*/external_react_default.a.createElement("td", {
      key: index,
      "data-month": String(index),
      className: SELECT_MONTH
    }, /*#__PURE__*/external_react_default.a.createElement("span", {
      className: selectMonth_HOVER_SPAN
    }, name)));
  });
  return /*#__PURE__*/external_react_default.a.createElement("table", {
    className: selectMonth_TABLE
  }, /*#__PURE__*/external_react_default.a.createElement("tbody", null, rows.map((tableRow, index) => /*#__PURE__*/external_react_default.a.createElement("tr", {
    key: index
  }, tableRow))));
};

/* harmony default export */ var selectMonth = (SelectMonth);
// CONCATENATED MODULE: ./src/consts.js
const TRACK_PAD_SCROLL_THRESHOLD = 25;
// CONCATENATED MODULE: ./src/selectYear.js





const {
  TABLE: selectYear_TABLE,
  HOVER_SPAN: selectYear_HOVER_SPAN,
  SELECT_YEAR
} = classNames;

const getLineHeight = (() => {
  let lineHeight = 0;
  return () => {
    if (lineHeight === 0) {
      lineHeight = getDefaultLineHeight() || 18;
    }

    return lineHeight;
  };
})();

const SelectYear = ({
  year: startYear
}) => {
  const deltaY = Object(external_react_["useRef"])(0);
  const [deltaYear, setDeltaYear] = Object(external_react_["useState"])(0);

  const onWheel = event => {
    deltaY.current += event.deltaY * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? getLineHeight() : 1);

    if (Math.abs(deltaY.current) < TRACK_PAD_SCROLL_THRESHOLD) {
      return;
    }

    deltaY.current = 0;
    const delta = event.deltaY > 0 ? 3 : -3;
    setDeltaYear(deltaYear + delta);
  };

  const rows = [];
  let row;
  Array.from(range(startYear + deltaYear + 5, startYear + deltaYear - 4)).forEach((year, index) => {
    if (index % 3 === 0) {
      rows.push(row = []);
    }

    row.push( /*#__PURE__*/external_react_default.a.createElement("td", {
      key: index,
      className: SELECT_YEAR
    }, /*#__PURE__*/external_react_default.a.createElement("span", {
      className: selectYear_HOVER_SPAN
    }, year)));
  });
  return /*#__PURE__*/external_react_default.a.createElement("table", {
    className: selectYear_TABLE,
    onWheel: onWheel
  }, /*#__PURE__*/external_react_default.a.createElement("tbody", null, rows.map((tableRow, index) => /*#__PURE__*/external_react_default.a.createElement("tr", {
    key: index
  }, tableRow))));
};

SelectYear.propTypes = {
  year: external_prop_types_default.a.number
};
/* harmony default export */ var selectYear = (SelectYear);
// CONCATENATED MODULE: ./src/digit.js




const {
  DISPLAY_LIGHT
} = classNames;
const digits = [0b0111111, 0b0000110, 0b1011011, 0b1001111, 0b1100110, 0b1101101, 0b1111101, 0b0000111, 0b1111111, 0b1101111];

const Digit = props => {
  const mask = digits[props.digit];
  const lights = [[0.5, 0, 0], [21, 0.5, 90], [21, 21.5, 90], [0.5, 42, 0], [0, 21.5, 90], [0, 0.5, 90], [0.5, 21, 0]].map(([x, y, alpha], index) => /*#__PURE__*/external_react_default.a.createElement("use", {
    key: index,
    className: classes(DISPLAY_LIGHT, mask >> index & 1 && 'on'),
    href: "#dtp-digit-light",
    transform: `translate(${x}, ${y}) rotate(${alpha})`
  }));
  return /*#__PURE__*/external_react_default.a.createElement("g", {
    transform: `translate(${props.pos === 1 ? 4.5 : 32.5}, 4.5)`
  }, lights);
};

Digit.propTypes = {
  digit: external_prop_types_default.a.number,
  pos: external_prop_types_default.a.number
};
/* harmony default export */ var digit = (Digit);
// CONCATENATED MODULE: ./src/time.js






const {
  TIME_CONTAINER,
  TIME_CONTROLS,
  HOVER_SPAN: time_HOVER_SPAN,
  NEXT_HOUR,
  PREVIOUS_HOUR,
  NEXT_MINUTE,
  PREVIOUS_MINUTE,
  ICON_EXPAND_LESS,
  ICON_EXPAND_MORE,
  MATERIAL_ICONS,
  DIGITS
} = classNames;

const time_getLineHeight = (() => {
  let lineHeight = 0;
  return () => {
    if (lineHeight === 0) {
      lineHeight = getDefaultLineHeight() || 18;
    }

    return lineHeight;
  };
})();

const Controls = ({
  next,
  previous,
  materialIconsClass
}) => /*#__PURE__*/external_react_default.a.createElement("div", {
  className: TIME_CONTROLS
}, /*#__PURE__*/external_react_default.a.createElement("span", {
  className: classes(time_HOVER_SPAN, previous)
}, /*#__PURE__*/external_react_default.a.createElement("i", {
  className: classes(materialIconsClass, ICON_EXPAND_LESS)
})), /*#__PURE__*/external_react_default.a.createElement("span", {
  className: classes(time_HOVER_SPAN, next)
}, /*#__PURE__*/external_react_default.a.createElement("i", {
  className: classes(materialIconsClass, ICON_EXPAND_MORE)
})));

Controls.propTypes = {
  next: external_prop_types_default.a.string,
  previous: external_prop_types_default.a.string,
  materialIconsClass: external_prop_types_default.a.string
};

const Time = ({
  hours,
  minutes,
  selectedDate,
  onChange,
  config
}) => {
  const timeContainerRef = Object(external_react_["useRef"])(null);
  const deltaY = Object(external_react_["useRef"])(0);

  const onWheel = event => {
    if (!timeContainerRef.current) {
      return;
    }

    deltaY.current += event.deltaY * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? time_getLineHeight() : 1);

    if (Math.abs(deltaY.current) < TRACK_PAD_SCROLL_THRESHOLD) {
      return;
    }

    deltaY.current = 0;
    const box = timeContainerRef.current.getBoundingClientRect();
    const delta = event.deltaY > 0 ? 1 : -1;
    const date = new Date(selectedDate);

    if (event.clientX < box.left + box.width / 2) {
      date.setHours(date.getHours() + delta);
    } else {
      date.setMinutes(date.getMinutes() + delta);
    }

    onChange(date);
  };

  const materialIconsClass = config && config.materialIconsClass ? config.materialIconsClass : MATERIAL_ICONS;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    ref: timeContainerRef,
    className: TIME_CONTAINER,
    onWheel: onWheel
  }, /*#__PURE__*/external_react_default.a.createElement(Controls, {
    previous: PREVIOUS_HOUR,
    next: NEXT_HOUR,
    materialIconsClass: materialIconsClass
  }), /*#__PURE__*/external_react_default.a.createElement("svg", {
    viewBox: "0 0 140 51",
    width: "140px",
    height: "51px",
    className: DIGITS
  }, /*#__PURE__*/external_react_default.a.createElement("defs", null, /*#__PURE__*/external_react_default.a.createElement("path", {
    id: "dtp-digit-light",
    d: "M 0 0 L 2.5 2.5 17.5 2.5 20 0 17.5 -2.5 2.5 -2.5 Z"
  })), /*#__PURE__*/external_react_default.a.createElement("g", null, /*#__PURE__*/external_react_default.a.createElement(digit, {
    digit: hours / 10 | 0,
    pos: 1
  }), /*#__PURE__*/external_react_default.a.createElement(digit, {
    digit: hours % 10,
    pos: 0
  })), /*#__PURE__*/external_react_default.a.createElement("g", {
    transform: "translate(70, 2)"
  }, /*#__PURE__*/external_react_default.a.createElement("circle", {
    cx: "0",
    r: "2",
    cy: "13"
  }), /*#__PURE__*/external_react_default.a.createElement("circle", {
    cx: "0",
    r: "2",
    cy: "34"
  })), /*#__PURE__*/external_react_default.a.createElement("g", {
    transform: "translate(82, 0)"
  }, /*#__PURE__*/external_react_default.a.createElement(digit, {
    digit: minutes / 10 | 0,
    pos: 1
  }), /*#__PURE__*/external_react_default.a.createElement(digit, {
    digit: minutes % 10,
    pos: 0
  }))), /*#__PURE__*/external_react_default.a.createElement(Controls, {
    previous: PREVIOUS_MINUTE,
    next: NEXT_MINUTE,
    materialIconsClass: materialIconsClass
  }));
};

Time.propTypes = {
  hours: external_prop_types_default.a.number,
  minutes: external_prop_types_default.a.number,
  selectedDate: external_prop_types_default.a.instanceOf(Date),
  onChange: external_prop_types_default.a.func,
  config: external_prop_types_default.a.object
};
/* harmony default export */ var time = (Time);
// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(3);

// CONCATENATED MODULE: ./src/index.js










const {
  ROOT,
  HOVER_SPAN: src_HOVER_SPAN,
  SELECTED,
  HEADER_ROW,
  HEADER_MONTH,
  HEADER_YEAR,
  MAIN_SECTION,
  FOOTER_ROW,
  SELECT_DAY: src_SELECT_DAY,
  SELECT_MONTH: src_SELECT_MONTH,
  SELECT_YEAR: src_SELECT_YEAR,
  SELECT_TIME,
  SELECT_CALENDAR,
  SELECT_TODAY,
  PREVIOUS_YEAR,
  PREVIOUS_MONTH,
  PREVIOUS_HOUR: src_PREVIOUS_HOUR,
  PREVIOUS_MINUTE: src_PREVIOUS_MINUTE,
  NEXT_YEAR,
  NEXT_MONTH,
  NEXT_HOUR: src_NEXT_HOUR,
  NEXT_MINUTE: src_NEXT_MINUTE,
  CLEAR_SELECTION,
  VIEW_DAYS,
  VIEW_MONTHS,
  VIEW_YEARS,
  VIEW_TIME,
  ICON_CHEVRON_LEFT,
  ICON_CHEVRON_RIGHT,
  MATERIAL_ICONS: src_MATERIAL_ICONS
} = classNames;
const targetManager = new TargetManager({
  click: [src_SELECT_DAY, src_SELECT_MONTH, src_SELECT_YEAR, SELECT_TIME, HEADER_MONTH, HEADER_YEAR, NEXT_YEAR, NEXT_MONTH, src_NEXT_HOUR, src_NEXT_MINUTE, PREVIOUS_YEAR, PREVIOUS_MONTH, src_PREVIOUS_HOUR, src_PREVIOUS_MINUTE, SELECT_CALENDAR, SELECT_TODAY, CLEAR_SELECTION]
});
const [DAYS, MONTHS, YEARS, TIME] = Enum();
const modeViewsMap = new Map([[DAYS, VIEW_DAYS], [MONTHS, VIEW_MONTHS], [YEARS, VIEW_YEARS], [TIME, VIEW_TIME]]);

const Header = ({
  monthName,
  year,
  mode,
  materialIconsClass
}) => {
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: HEADER_ROW
  }, /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, PREVIOUS_MONTH)
  }, /*#__PURE__*/external_react_default.a.createElement("i", {
    className: classes(materialIconsClass, ICON_CHEVRON_LEFT)
  })), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, HEADER_MONTH, mode === MONTHS && SELECTED)
  }, monthName), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, NEXT_MONTH)
  }, /*#__PURE__*/external_react_default.a.createElement("i", {
    className: classes(materialIconsClass, ICON_CHEVRON_RIGHT)
  })), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, PREVIOUS_YEAR)
  }, /*#__PURE__*/external_react_default.a.createElement("i", {
    className: classes(materialIconsClass, ICON_CHEVRON_LEFT)
  })), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, HEADER_YEAR, mode === YEARS && SELECTED)
  }, year), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, NEXT_YEAR)
  }, /*#__PURE__*/external_react_default.a.createElement("i", {
    className: classes(materialIconsClass, ICON_CHEVRON_RIGHT)
  })));
};

const Footer = ({
  mode,
  useTimePicker
}) => {
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: FOOTER_ROW
  }, useTimePicker && /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, SELECT_TIME)
  }, mode === TIME ? 'Date' : 'Time'), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, SELECT_TODAY)
  }, "Today"), /*#__PURE__*/external_react_default.a.createElement("span", {
    className: classes(src_HOVER_SPAN, CLEAR_SELECTION)
  }, "Clear"));
};

class src_DateTimePicker extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: DAYS,
      displayMonth: this.props.date.getMonth(),
      displayYear: this.props.date.getFullYear(),
      selectedDate: this.props.date.getDate()
    };
    this.onClick = this.onClick.bind(this);
    this._deltaY = 0;
  }

  modifyMonthByDelta(delta) {
    const date = new Date(this.props.date);
    date.setFullYear(this.state.displayYear);
    this.setMonth(date, this.state.displayMonth + delta);
    this.setState({
      displayMonth: date.getMonth(),
      displayYear: date.getFullYear()
    });
  }

  modifyMinutesByDelta(delta) {
    const date = new Date(this.props.date);
    let minutes = date.getMinutes();

    if (minutes % 15 !== 0) {
      minutes = Math.round(minutes / 15) * 15;
    }

    date.setMinutes(minutes + delta);
    this.props.onChange(date);
  }

  showPreviousMonth() {
    if (this.state.mode === DAYS) {
      const delta = -1;
      this.modifyMonthByDelta(delta);
      return;
    } // if (this.state.mode === YEARS) {
    //   const delta = -9;
    //   this.modifyYearByDelta(delta);
    //   return;
    // }
    // if (this.state.mode === TIME) {
    //   const delta = -15;
    //   this.modifyMinutesByDelta(delta);
    // }

  }

  showNextMonth() {
    if (this.state.mode === DAYS) {
      const delta = 1;
      this.modifyMonthByDelta(delta);
      return;
    } // if (this.state.mode === YEARS) {
    //   const delta = 9;
    //   this.modifyYearByDelta(delta);
    //   return;
    // }
    // if (this.state.mode === TIME) {
    //   const delta = 15;
    //   this.modifyMinutesByDelta(delta);
    // }

  }

  showPreviousYear() {
    this.setState(prevState => ({
      displayYear: Math.max(0, prevState.displayYear - 1)
    }));
  }

  showNextYear() {
    this.setState(prevState => ({
      displayYear: prevState.displayYear + 1
    }));
  }

  onClick(event) {
    const {
      target,
      className
    } = targetManager.getTarget(event);

    switch (className) {
      case src_SELECT_DAY:
        {
          const date = new Date(this.props.date);
          date.setFullYear(this.state.displayYear);
          date.setMonth(this.state.displayMonth);
          date.setDate(Number.parseInt(target.textContent, 10));
          this.setState({
            selectedDate: date.getDate()
          });
          this.props.onChange(date);
          break;
        }

      case NEXT_MONTH:
        this.showNextMonth();
        break;

      case PREVIOUS_MONTH:
        this.showPreviousMonth();
        break;

      case NEXT_YEAR:
        this.showNextYear();
        break;

      case PREVIOUS_YEAR:
        this.showPreviousYear();
        break;

      case HEADER_MONTH:
        this.setState(prevState => ({
          mode: prevState.mode === MONTHS ? DAYS : MONTHS
        }));
        break;

      case HEADER_YEAR:
        this.setState(prevState => ({
          mode: prevState.mode === YEARS ? DAYS : YEARS
        }));
        break;

      case src_SELECT_MONTH:
        {
          const date = new Date(this.props.date);
          date.setFullYear(this.state.displayYear);
          this.setMonth(date, Number.parseInt(target.dataset.month, 10));
          this.setState({
            mode: DAYS,
            displayMonth: date.getMonth()
          });
          break;
        }

      case SELECT_TIME:
        this.setState(prevState => ({
          mode: prevState.mode === TIME ? DAYS : TIME
        }));
        break;

      case src_SELECT_YEAR:
        {
          const date = new Date(this.props.date);
          date.setMonth(this.state.displayMonth);
          this.setYear(date, Number.parseInt(target.textContent, 10));
          this.setState({
            mode: DAYS,
            displayYear: date.getFullYear()
          });
          break;
        }

      case src_NEXT_HOUR:
      case src_PREVIOUS_HOUR:
        {
          const delta = className === src_PREVIOUS_HOUR ? -1 : 1;
          const date = new Date(this.props.date);
          date.setHours(date.getHours() + delta);
          this.props.onChange(date);
          break;
        }

      case src_NEXT_MINUTE:
      case src_PREVIOUS_MINUTE:
        {
          const delta = className === src_PREVIOUS_MINUTE ? -1 : 1;
          const date = new Date(this.props.date);
          date.setMinutes(date.getMinutes() + delta);
          this.props.onChange(date);
          break;
        }

      case SELECT_CALENDAR:
        this.setState({
          mode: DAYS
        });
        break;

      case SELECT_TODAY:
        {
          const date = new Date();
          this.setState({
            displayMonth: date.getMonth(),
            displayYear: date.getFullYear()
          });
          this.props.onChange(date);
          break;
        }

      case CLEAR_SELECTION:
        {
          const date = new Date();
          this.setState({
            displayMonth: date.getMonth(),
            displayYear: date.getFullYear()
          });
          this.props.onChange(null);
          break;
        }

      default:
    }
  }

  setYear(date, year) {
    const month = date.getMonth();
    date.setFullYear(year);
    this.retainMonthAndSelectedDate(date, month);
  }

  setMonth(date, month) {
    date.setMonth(month);
    this.retainMonthAndSelectedDate(date, month);
  }

  retainMonthAndSelectedDate(date, month) {
    while (month < 0) {
      month = (month + 12) % 12;
    }

    if (date.getMonth() > month) {
      while (date.getMonth() > month) {
        date.setDate(date.getDate() - 1);
      }
    } else if (date.getDate() < this.state.selectedDate) {
      const testDate = new Date(date);

      while (date.getDate() < this.state.selectedDate) {
        testDate.setDate(date.getDate() + 1);

        if (date.getMonth() === testDate.getMonth()) {
          date.setDate(date.getDate() + 1);
        } else {
          break;
        }
      }
    }
  }

  getBody(year, month, selected) {
    switch (this.state.mode) {
      case DAYS:
        return /*#__PURE__*/external_react_default.a.createElement(src_month, {
          year,
          month,
          selected
        });

      case MONTHS:
        return /*#__PURE__*/external_react_default.a.createElement(selectMonth, null);

      case YEARS:
        return /*#__PURE__*/external_react_default.a.createElement(selectYear, {
          year: year
        });

      case TIME:
        return /*#__PURE__*/external_react_default.a.createElement(time, {
          hours: this.props.date.getHours(),
          minutes: this.props.date.getMinutes(),
          selectedDate: this.props.date,
          onChange: this.props.onChange,
          config: this.props.config
        });

      default:
    }
  }

  render() {
    const year = this.state.displayYear;
    const month = this.state.displayMonth;
    const selected = {
      year: this.props.date.getFullYear(),
      month: this.props.date.getMonth(),
      day: this.props.date.getDate()
    };
    const config = this.props.config;
    const materialIconsClass = config && config.materialIconsClass ? config.materialIconsClass : src_MATERIAL_ICONS;
    const containerStyle = config && config.containerStyle ? config.containerStyle : {};
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      className: ROOT,
      onClick: this.onClick,
      style: containerStyle
    }, /*#__PURE__*/external_react_default.a.createElement(Header, {
      monthName: MONTH_NAMES_SHORT[month],
      year: year,
      mode: this.state.mode,
      materialIconsClass: materialIconsClass
    }), /*#__PURE__*/external_react_default.a.createElement("div", {
      className: classes(MAIN_SECTION, modeViewsMap.get(this.state.mode))
    }, this.getBody(year, month, selected)), /*#__PURE__*/external_react_default.a.createElement(Footer, {
      mode: this.state.mode,
      useTimePicker: Boolean(config && config.useTimePicker)
    }));
  }

}

src_DateTimePicker.propTypes = {
  date: external_prop_types_default.a.instanceOf(Date),
  onChange: external_prop_types_default.a.func,
  config: external_prop_types_default.a.object
};
/* harmony default export */ var src_0 = __webpack_exports__["default"] = (src_DateTimePicker);

/***/ })
/******/ ]);