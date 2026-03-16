/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: number;
  readonly CONSOLE_DEBUG: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_ADMIN_PANEL_NAME: string;
  readonly VITE_ADMIN_PANEL_VERSION: number;
}
