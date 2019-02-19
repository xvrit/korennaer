module.exports = {
    plugins: [
        require(`postcss-import`),
        require(`postcss-reporter`)({clearMessages: true}),
        require(`postcss-preset-env`),
        require(`postcss-will-change`),
        require(`postcss-nested`)
    ]
};
