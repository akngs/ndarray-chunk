(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chunk"] = factory();
	else
		root["chunk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function chunk(array, shape) {
	  if (array.shape.length !== shape.length) throw new Error('Shape mismatch');
	
	  var rank = shape.length;
	
	  var remainders = [];
	  var nChunks = [];
	  for (var i = 0; i < rank; ++i) {
	    remainders.push(array.shape[i] % shape[i]);
	    nChunks.push(Math.floor(array.shape[i] / shape[i]) + !!remainders[i]);
	  }
	
	  var chunks = [];
	  var hiCoor = [];
	  var loCoor = [];
	  var curChunks = chunks;
	
	  // TODO: Generalize to n-dimensional chunking and remove dups
	  if (rank === 2) {
	    for (var j = 0; j < nChunks[0]; ++j) {
	      curChunks = chunks[j] = [];
	      hiCoor[0] = Math.min(j * shape[0] + shape[0], array.shape[0]);
	      loCoor[0] = j * shape[0];
	
	      for (var i = 0; i < nChunks[1]; ++i) {
	        var _array$hi;
	
	        hiCoor[1] = Math.min(i * shape[1] + shape[1], array.shape[1]);
	        loCoor[1] = i * shape[1];
	        curChunks[i] = (_array$hi = array.hi.apply(array, hiCoor)).lo.apply(_array$hi, loCoor);
	      }
	    }
	  } else {
	    for (var i = 0; i < nChunks[0]; ++i) {
	      var _array$hi2;
	
	      hiCoor[0] = Math.min(i * shape[0] + shape[0], array.shape[0]);
	      loCoor[0] = i * shape[0];
	      curChunks[i] = (_array$hi2 = array.hi.apply(array, hiCoor)).lo.apply(_array$hi2, loCoor);
	    }
	  }
	  return chunks;
	}
	
	exports.chunk = chunk;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ndarray-chunk.js.map