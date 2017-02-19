# `stratic-validate-header`

[remark][1] plugin to validate a standard [Stratic][2] header

## DEPRECATED

This module is deprecated. It turns out that the Stratic header just isn't expressive enough and is t
here for no good reason, really.

You should use [gulp-grey-matter](https://www.npmjs.com/package/gulp-gray-matter/) to parse YAML frontmatter instead. Accordingly, this package is unmaintained.

## Installation

    npm install stratic-validate-header

## Usage

```js
var remark = require('remark');
var validateHeader = require('stratic-validate-header');

var processor = remark().use(validateHeader);

// No output
processor.process([
    '# Post information',
    '"Title", "0 UTC-0","Jane Doe", "some, categories"',
	'# Post text',
	'Some arbitrary Markdown content'
].join('\n'));

// Throws an Error
processor.process([
    '# Invalid',
    'Some other Markdown'
].join('\n'));
```

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: https://github.com/wooorm/remark
 [2]: https://github.com/strugee/generator-stratic
