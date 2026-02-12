/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly CONSOLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
