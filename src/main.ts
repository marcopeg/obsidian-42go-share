import { Plugin } from "obsidian";
import { QuickShareModal } from "@/views/quick-share-popup/wrapper";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";
import { QuickShareSettingTab } from "@/views/quick-share-settings/QuickShareSettingTab";

const CRM_ICON = "share";

interface QuickShareSettings {
  backendEndpoint: string;
}

export default class CRM extends Plugin {
  settings: QuickShareSettings = DEFAULT_SETTINGS;

  async onload() {
    console.clear();
    console.log("QuickShare: Loading plugin");

    await this.loadSettings();

    this.addRibbonIcon(CRM_ICON, "Quick Share Note", () =>
      new QuickShareModal(this.app, this.settings).open()
    );

    this.addCommand({
      id: "quick-share--share-note",
      name: "Quick Share Note",
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "s" }], // Cmd/Ctrl+Shift+M (user can change later)
      callback: () => {
        new QuickShareModal(this.app, this.settings).open();
      },
    });

    this.addSettingTab(new QuickShareSettingTab(this.app, this));
  }

  async loadSettings() {
    const data = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings = data;
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
