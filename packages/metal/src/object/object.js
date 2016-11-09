'use strict';

import { isDefAndNotNull } from '../core';

class object {
	/**
	 * Copies all the members of a source object to a target object.
	 * @param {Object} target Target object.
	 * @param {...Object} var_args The objects from which values will be copied.
	 * @return {Object} Returns the target object reference.
	 */
	static mixin(target) {
		if (!isDefAndNotNull(target)) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var output = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];

			if (isDefAndNotNull(source)) {
				for (var nextKey in source) {
					if (source.hasOwnProperty(nextKey)) {
						output[nextKey] = source[nextKey];
					}
				}
			}
		}
		return output;
	}

	/**
	 * Returns an object based on its fully qualified external name.
	 * @param {string} name The fully qualified name.
	 * @param {object=} opt_obj The object within which to look; default is
	 *     <code>window</code>.
	 * @return {?} The value (object or primitive) or, if not found, undefined.
	 */
	static getObjectByName(name, opt_obj) {
		var scope = opt_obj || window;
		var parts = name.split('.');
		return parts.reduce((part, key) => part[key], scope);
	}

	/**
	 * Returns a new object with the same keys as the given one, but with
	 * their values set to the return values of the specified function.
	 * @param {!Object} obj
	 * @param {!function(string, *)} fn
	 * @return {!Object}
	 */
	static map(obj, fn) {
		var mappedObj = {};
		var keys = Object.keys(obj);
		for (var i = 0; i < keys.length; i++) {
			mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
		}
		return mappedObj;
	}

	/**
	 * Checks if the two given objects are equal. This is done via a shallow
	 * check, including only the keys directly contained by the 2 objects.
	 * @return {boolean}
	 */
	static shallowEqual(obj1, obj2) {
		if (obj1 === obj2) {
			return true;
		}

		var keys1 = Object.keys(obj1);
		var keys2 = Object.keys(obj2);
		if (keys1.length !== keys2.length) {
			return false;
		}

		for (var i = 0; i < keys1.length; i++) {
			if (obj1[keys1[i]] !== obj2[keys1[i]]) {
				return false;
			}
		}
		return true;
	}
}

export default object;
