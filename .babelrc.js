module.exports = {
  presets: [
    [
      '@babel/env',
      '@babel/react',
      {
        targets: {
          ie: '11'
        }
      }
    ],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: ['add-module-exports']
}
