import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/$/, '')

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
      ...(siteUrl
        ? [
            {
              name: 'inject-og-absolute-url',
              transformIndexHtml(html: string) {
                const imageUrl = `${siteUrl}/favicon.png`
                const block = `      <meta property="og:url" content="${siteUrl}/" />
      <meta property="og:image" content="${imageUrl}" />
      <meta name="twitter:image" content="${imageUrl}" />
`
                return html.replace('    </head>', `${block}    </head>`)
              },
            },
          ]
        : []),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (
              id.includes("framer-motion") ||
              id.includes(`${path.sep}motion${path.sep}`)
            ) {
              return "motion";
            }
            if (id.includes("lenis")) return "lenis";
            if (id.includes("ogl")) return "ogl";
            if (id.includes("@supabase")) return "supabase";
          },
        },
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
