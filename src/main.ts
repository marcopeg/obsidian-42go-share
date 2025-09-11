import { Plugin, TFile } from "obsidian";
import { QuickShareModal } from "@/views/share-popup/wrapper";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";
import { ShareSettingTab } from "@/views/share-settings/ShareSettingTab";

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
      name: "Share Note",
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "s" }], // Cmd/Ctrl+Shift+M (user can change later)
      callback: () => {
        new QuickShareModal(this.app, this.settings).open();
      },
    });

    // Add context menu item for files in the file explorer / note tabs
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        // Only add for files (not folders)
        if (!(file instanceof TFile)) return;
        menu.addItem((item) => {
          item.setTitle("Share note");
          item.setIcon("share");
          item.onClick(() => {
            new QuickShareModal(this.app, this.settings, file as TFile).open();
          });
        });
      })
    );

    this.addSettingTab(new ShareSettingTab(this.app, this));
  }

  async loadSettings() {
    const data = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings = data;
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
