import node_resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs-alternate';
import static_files from 'rollup-plugin-static-files';
import { terser } from 'rollup-plugin-terser';
import refresh from 'rollup-plugin-react-refresh';

let config = {
    input: './src/main.js',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
    },
    plugins: [
        babel(),
        node_resolve(),
        commonjs({
            define: {
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        process.env.NODE_ENV === 'development' && refresh()
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        static_files({
            include: ['./public']
        }),
        terser()
    ]);
}

export default config;