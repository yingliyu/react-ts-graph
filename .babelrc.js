module.exports = {
    presets: [
        [
            '@babel/preset-react',
            '@babel/env',
            '@babel/react',
            {
                targets: {
                    ie: '10'
                }
            }
        ],
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                proposals: true
            }
        ]
    ],
    plugins: [
        'add-module-exports',
        '@babel/plugin-transform-typescript',
        [
            '@babel/plugin-transform-runtime'
            // {
            //     corejs: 3,
            //     proposals: true
            // }
        ]
    ]
};
