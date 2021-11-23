/**
 * This is the babel configuration file for javascript transpiling.
 * Babel is now using corejs to manage automatically polyfills according to your target browsers
 * @see https://github.com/zloirock/core-js/blob/v3.6.5/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
 */

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // "targets" are defined as a browserslist property in package.json
                useBuiltIns: 'usage',
                corejs: '3.19.1' // the corejs version should be aligned with the one installed in package.json
            }
        ]
    ]
};
