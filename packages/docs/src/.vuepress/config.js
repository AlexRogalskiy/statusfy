const axios = require('axios')
const webpack = require('webpack')

const { path, postcss } = require('@statusfy/common')

const partners = require('./partners.json')

module.exports = {
  title: 'Statusfy Documentation',
  description: 'A marvelous open source Status Page system',
  evergreen: true,
  postcss: {
    puglins: postcss.plugins()
  },
  extendMarkdown(md) {
    md.use(require('markdown-it-imsize'));
    md.use(require("markdown-it-block-image"), {
      outputContainer: 'p',
      containerClassName: 'img-container'
    });
  },
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/icons/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/icons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/assets/icons/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/assets/icons/android-icon-192x192.png' }],
    ['meta', { name: 'theme-color', content: '#3e4e88' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/assets/icons/apple-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/assets/icons/safari-pinned-tab.svg', color: '#3e4e88' }],
    ['meta', { name: 'msapplication-TileImage', content: '/assets/icons/ms-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Statusfy Documentation',
      description: 'A marvelous open source Status Page system'
    },
    '/es/': {
      lang: 'es-US',
      title: 'Documentación de Statusfy',
      description: 'Un estupendo sistema de Página de Estado de código abierto'
    }
  },
  themeConfig: {
    repo: 'bazzite/statusfy',
    docsRepo: 'bazzite/statusfy',
    docsDir: 'packages/docs/src',
    docsBranch: 'develop',
    editLinks: true,
    algolia: process.env.ALGOLIA_APIKEY ? {
      apiKey: process.env.ALGOLIA_APIKEY,
      indexName: process.env.ALGOLIA_INDEX_NAME
    } : null,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Help us improve this page!',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Config Reference',
            link: '/config/',
          },
          {
            text: 'Contributing',
            link: '/contributing/',
          },
          {
            text: 'Support',
            link: 'https://statusfy.co/support'
          },
          {
            text: 'Demo',
            link: 'https://demo.statusfy.co'
          }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide'),
          '/config/': genSidebarConfig('Config Reference', 'config'),
        }
      },
      '/es/': {
        selectText: 'Idiomas',
        label: 'Español',
        editLinkText: '¡Ayúdanos a mejorar esta página!',
        lastUpdated: 'Última Actualización',
        nav: [
          {
            text: 'Guía',
            link: '/es/guide/',
          },
          {
            text: 'Configuración',
            link: '/es/config/',
          },
          {
            text: 'Contribución',
            link: '/es/contributing/',
          },
          {
            text: 'Soporte',
            link: 'https://statusfy.co/es/support'
          },
          {
            text: 'Demo',
            link: 'https://demo.statusfy.co/es/'
          }
        ],
        sidebar: {
          '/es/guide/': genSidebarConfig('Guía'),
          '/es/config/': genSidebarConfig('Configuración', 'config'),
        }
      }
    }
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            'PARTNERS': JSON.stringify(partners)
          }
        })
      )
    }
  },
  chainWebpack (config) {
    const themePath = path.resolve(__dirname, "../../../../", "node_modules/@vuepress/theme-default")

    config.resolve.alias.set('@theme', themePath)
    config.resolve.alias.set('@', path.resolve(themePath, "components"))
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/google-analytics', {
      ga: process.env.GA_TRACKING_ID
    }],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: "New content is available.",
          buttonText: "Refresh"
        },
        '/es/': {
          updatePopup: {
            message: "Nuevo contenido está disponible.",
            buttonText: "Actualizar"
          }
        }
      }
    }],
    ['container', {
      type: 'statusfy',
      before: '<pre class="statusfy-container"><code>',
      after: '</code></pre>',
    }],
  ]
}

function genSidebarConfig(title, section = 'guide') {
  const children = {
    guide: [
      '',
      'getting-started',
      'architecture',
      'directory-structure',
      'configuration',
      'i18n',
      'incidents',
      'notifications',
      'theme-customization',
      'pwa',
      'api',
      'commands',
      'deploy',
    ],
    config: [
      ''
    ]
  }

  return [{
    title,
    collapsable: false,
    children: children[section]
  }]
}
