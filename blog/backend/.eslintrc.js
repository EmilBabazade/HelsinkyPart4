module.exports = {
  env: {
    commonjs: true,
    es6: true,
	node: true,
	jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'consistent-return': 'off',
		'no-tabs': 'off',
		'no-underscore-dangle': 'off',
		'no-param-reassign': 'off'
	}
};
