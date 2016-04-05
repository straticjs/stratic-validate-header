/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

function throwInvalid(next, text) {
	next(new Error('not well-formed: ' + text));
}

function validate (ast, file, next) {
	// Validate first heading
	if (ast.children[0].type !== 'heading') {
		throwInvalid(next, 'first element is not of type header');
	} else if (ast.children[0].depth !== 1) {
		throwInvalid(next, 'header is not of depth 1');
	} else if (ast.children[0].children[0].type !== 'text') {
		// I can't imagine when this would happen, but...
		throwInvalid(next, 'header child is not of type text');
	} else if (ast.children[0].children[0].value !== 'Post information') {
		throwInvalid(next, 'header text does not have value "Post information"');
	}

	// Find the second heading...
	for (var index in ast.children) {
		var node = ast.children[index];
		if (node.type === 'heading'
		    && index > 0) {
			// ...and validate it
			if (node.depth !== 1) {
				throwInvalid(next, 'header is not of depth 1');
			} else if (node.children[0].type !== 'text') {
				// I can't imagine when this would happen, but...
				throwInvalid(next, 'header child is not of type text');
			} else if (node.children[0].value !== 'Post text') {
				throwInvalid(next, 'header text does not have value "Post text"');
			}

			break;
		}
	}

	next();
};

module.exports = function() {
	return validate;
};
