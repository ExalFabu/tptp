import type { TelegramWebApps } from 'telegram-webapps-types';
declare module "redux-persist/es/persistReducer" { interface PersistPartial { _persist?: PersistState; } }

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }

  namespace NodeJS {
    interface ProcessEnv {
      /** Authorization token for the bot. This is used to validate the hash's authenticity. */
      BOT_TOKEN: string;
    }
  }
}