var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

/** Start deepAssign */
function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
};

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  return Object(val);
}

function assignKey(to, from, key) {
  var val = from[key];

  if (val === undefined || val === null) {
    return;
  }

  if (hasOwnProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    to[key] = val;
  } else {
    to[key] = _assign(Object(to[key]), from[key]);
  }
}

function _assign(to, from) {
  if (to === from) {
    return to;
  }

  from = Object(from);

  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(from);

    for (var i = 0; i < symbols.length; i++) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i]);
      }
    }
  }

  return to;
}

Object.deepAssign = function deepAssign(target) {
  target = toObject(target);

  for (var s = 1; s < arguments.length; s++) {
    _assign(target, arguments[s]);
  }

  return target;
};

/** Assign Polyfill */
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

/** hex to rgba */
function hexToRGBA(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

/** Create a guid */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}