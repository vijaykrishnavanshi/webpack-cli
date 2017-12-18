"use strict";

const utils = require("../../../utils/ast-utils");

/*
*
* Transform for parallelism. Finds the parallelism property from yeoman and creates a
* property based on what the user has given us.
*
* @param j — jscodeshift API
* @param ast - jscodeshift API
* @param { Object } webpackProperties - Object containing transformation rules
* @returns ast - jscodeshift API
*/

module.exports = function parallelismTransform(
	j,
	ast,
	webpackProperties,
	action
) {
	if (webpackProperties) {
		if (action === "init") {
			return ast
				.find(j.ObjectExpression)
				.filter(p =>
					utils.isAssignment(
						j,
						p,
						utils.pushCreateProperty,
						"parallelism",
						webpackProperties
					)
				);
		} else if (action === "add") {
			const parallelismNode = utils.findRootNodesByName(j, ast, "parallelism");
			if (parallelismNode.size() !== 0) {
				return ast
					.find(j.ObjectExpression)
					.filter(p =>
						utils.checkIfExistsAndAddValue(
							j,
							p,
							"parallelism",
							utils.createIdentifierOrLiteral(j, webpackProperties)
						)
					);
			} else {
				return parallelismTransform(j, ast, webpackProperties, "init");
			}
		} else if (action === "remove") {
			// TODO
		} else if (action === "update") {
			// TODO
		}
	} else {
		return ast;
	}
};