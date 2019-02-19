const path = require(`path`);

const webpack = require(`webpack`);

const {HotModuleReplacementPlugin, NamedModulesPlugin} = webpack;

const CopyWebpackPlugin = require(`copy-webpack-plugin`);

const configHtmls = require(`webpack-config-htmls-updated`)();
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

const {getIfUtils, removeEmpty} = require(`webpack-config-utils`);

const {ifProduction, ifDevelopment} = getIfUtils(process.env.NODE_ENV);

// change for production build on different server path
const publicPath = `/`;

const port = 3000;

const copy = new CopyWebpackPlugin(
    [
        {
            from: `./src/assets`,
            to: `assets`
        }
    ],
    {
        ignore: [`.DS_Store`]
    }
);

const config = {
    entry: removeEmpty([`./src/css/style.css`, `./src/js/script.tsx`, ifDevelopment(...configHtmls.entry)]),

    resolve: {
        extensions: [`.mjs`, `.js`, `.jsx`, `.ts`, `.tsx`, `.css`]
    },

    output: {
        path: path.join(__dirname, `/dist`),
        filename: `js/[name]${ifProduction() ? `.[hash]` : ``}.js`,
        chunkFilename: `[name].bundle.js`,
        publicPath
    },

    devtool: `source-map`,

    devServer: {
        contentBase: `./src`,
        historyApiFallback: true, // react-router
        hot: true,
        host: `0.0.0.0`,

        overlay: {
            errors: true,
            warnings: true
        },

        port
    },

    module: {
        rules: removeEmpty([
            ifDevelopment({
                test: /\.(css)$/,
                use: [
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            importLoaders: 1
                        }
                    },
                    {loader: `postcss-loader`}
                ]
            }),

            ifProduction({
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: `css-loader`,
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: `postcss-loader`
                    }
                ]
            }),
            {
                test: /\.html$/,
                loader: `html-loader`,
                options: {
                    attrs: [`audio:src`, `img:src`, `video:src`, `source:srcset`] // read src from video, img & audio tag
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: `babel-loader`
                    }
                ]
            },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: `babel-loader`
                    }
                ]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: `graphql-tag/loader`
            },
            {
                test: /\.(svg|png|jpe?g|gif|webp)$/,
                loader: `url-loader`,
                options: {
                    limit: 1000, // inline if < 1 kb
                    context: `./src`,
                    name: `[path][name].[ext]`
                }
            },
            {
                test: /\.(mp3|mp4|wav|woff(2)?|ttf|eot|svg)$/,
                loader: `file-loader`,
                exclude: [path.resolve(__dirname, `src/css/layout/images`)],
                options: {
                    context: `./src`,
                    name: `[path][name].[ext]`
                }
            },
            ifProduction({
                test: /\.(svg|png|jpe?g|gif)$/,
                loader: `image-webpack-loader`,
                enforce: `pre`,
                options: {
                    bypassOnDebug: true
                }
            })
        ])
    },

    plugins: removeEmpty([
        ...configHtmls.plugins,

        ifDevelopment(new NamedModulesPlugin()),
        ifDevelopment(new HotModuleReplacementPlugin()),

        ifProduction(copy),
        ifProduction(new MiniCssExtractPlugin(`css/style.css`))
    ])
};

module.exports = config;
