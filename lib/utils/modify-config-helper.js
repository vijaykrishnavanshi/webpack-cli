"use strict";

const yeoman = require("yeoman-environment");
/**
 *
 * Looks up the webpack.config in the user's path and runs a given
 * generator scaffold followed up by a transform
 *
 * @param {String} action — action to be done (add, remove, update, init)
 * @param {Class} name - Name for the given function
 * @returns {Function} runTransform - Returns a transformation instance
 */

module.exports = function modifyHelperUtil(action, generator) {
	const env = yeoman.createEnv("webpack", null);
	const generatorName = `webpack-${action}-generator`;
	env.registerStub(generator, generatorName);
	env.run(generatorName);
};
