module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry'
            }
        ]
    ],
    plugins: [
        'add-module-exports',
        '@babel/plugin-transform-typescript',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
                version: '^7.7.4'
            }
        ]
    ]
};
