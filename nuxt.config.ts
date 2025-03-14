// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'fa-IR', dir: 'rtl' },
      title: process.env.APP_NAME || 'My App',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },

  imports: {
    dirs: ['composables']
  },

  devServer: {
    port: process.env.PORT
  },

  components: [{path: '~/components', pathPrefix: false}],
  modules: [
    // Bootstrap Vue for UI components
    [
      '@bootstrap-vue-next/nuxt',
      {
        // Will include everything except useBreadcrumb & useColorMode
        composables: {
          useBreadcrumb: false,
          useColorMode: false,
          all: true
        }
      }
    ],

    // Pinia for state management
    '@pinia/nuxt',

    // Device detection (mobile vs. desktop)
    '@nuxtjs/device',

    // Form validation
    [
      '@vee-validate/nuxt',
      {
        // https://vee-validate.logaretm.com/v4/guide/overview/
        // disable or enable auto imports
        autoImports: false,
        // Use different names for components
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage'
        }
      }
    ],

    // Icons for easy UI design
    'nuxt-icons',

    // Nuxt authentication module
    '@sidebase/nuxt-auth',

    // Day.js for handling dates and times
    'dayjs-nuxt'
  ],

  // https://nuxt.com/docs/api/nuxt-config#css
  css: ['assets/styles/index.scss'],

  // https://nuxt.com/docs/guide/concepts/typescript#type-checking
  typescript: {
    typeCheck: true
  },

  // https://nuxt.com/docs/api/nuxt-config#extensions
  extensions: ['.js', '.mjs', '.ts', '.vue'],

  auth: {
    isEnabled: true,
    baseURL: `${process.env.API_GATEWAY_URL}/api/`,
    navigateUnauthenticatedTo: '/auth/signin',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'login', method: 'post' },
        signOut: { path: 'logout', method: 'post' },
        signUp: { path: 'register', method: 'post' },
        getSession: { path: 'user', method: 'get' }
      }
    }
  },

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      apiGatewayUrl: process.env.API_GATEWAY_URL
    }
  }
});
