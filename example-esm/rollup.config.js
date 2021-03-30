import node_resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import static_files from 'rollup-plugin-static-files';
import { terser } from 'rollup-plugin-terser';
import refresh from 'rollup-plugin-react-refresh';
import alias from 'rollup-plugin-alias';

let config = {
    input: './src/main.js',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
    },
    plugins: [
        process.env.NODE_ENV === 'development' && alias({
            entries:[
                { find:'react', replacement: require.resolve('react/source.development') }, 
                { find:'react-dom', replacement: require.resolve('react-dom/source.development') },
            ]
        }),
        babel(),
        node_resolve(),
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