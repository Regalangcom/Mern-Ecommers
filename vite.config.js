import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// import { createHtmlPlugin } from 'vite-plugin-html';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // createHtmlPlugin({
    //   inject: {
    //     injectData: {
    //       nonce: '<meta property="csp-nonce" nonce="{{ nonce }}" />'
    //     }
    //   }
    // })
    // html({
    //   inject: {
    //     injectTo: 'body',
    //     tag: '<script nonce="{{nonce}}"></script>',
    //   },
    // }),
  ],

  // server: {
  //   headers: {


  //   },
  // },
  



  resolve: {
    alias: {
      '@eli': path.resolve(__dirname, 'src'),
      '@eli-style': path.resolve(__dirname, 'style')
    }
  }
})


