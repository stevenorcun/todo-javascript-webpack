module.exports = {
    "presets": [
        [
            "@babel/preset-env", {
                useBuiltIns: 'usage',
                corejs: 3,
                debug: true,
                targets: "> 1.5%, not dead"
            }
        ]
    ]
}