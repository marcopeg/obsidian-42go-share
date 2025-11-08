import { createContext, PropsWithChildren } from "react";
import type { App } from "obsidian";
import { SettingsProvider, DEFAULT_SETTINGS } from "./SettingsContext";

export const AppContext = createContext<App | undefined>(undefined);

type AppProviderProps = PropsWithChildren<{
  app: App;
  settings?: typeof DEFAULT_SETTINGS;
}>;

export const AppProvider = ({ app, settings, children }: AppProviderProps) => (
  <AppContext.Provider value={app}>
    <SettingsProvider settings={settings ?? DEFAULT_SETTINGS}>
      <div className="crm">{children}</div>
    </SettingsProvider>
  </AppContext.Provider>
);
