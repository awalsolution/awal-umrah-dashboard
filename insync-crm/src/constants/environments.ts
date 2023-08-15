/**
 * Global environment variable
 */
export const GlobalEnvConfig = Object.freeze({
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL ?? '',
  PORT: import.meta.env.VITE_PORT ?? '',
  BASE_API_PREFIX: import.meta.env.VITE_BASE_API_PREFIX ?? '',
  BASE_API_PROXY: import.meta.env.VITE_BASE_API_PROXY ?? '',
  ICON_API_PREFIX: import.meta.env.VITE_ICON_API_PREFIX ?? '',
  ICON_API_PROXY: import.meta.env.VITE_ICON_API_PROXY ?? '',
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID ?? '',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
})
