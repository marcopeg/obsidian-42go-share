import { createContext, PropsWithChildren, useContext } from "react";

interface Settings {
  backendEndpoint: string;
}

export const DEFAULT_SETTINGS: Settings = {
  backendEndpoint: "https://notes.42go.dev",
};

export const SettingsContext = createContext<Settings | undefined>(undefined);

export const SettingsProvider = ({
  settings,
  children,
}: PropsWithChildren<{ settings: Settings }>) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): Settings => {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used within <SettingsProvider>");
  return ctx;
};

export default SettingsContext;
