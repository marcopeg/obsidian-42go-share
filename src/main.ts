import { Plugin, PluginSettingTab, Setting } from "obsidian";
import { QuickShareModal } from "@/views/quick-share-popup/wrapper";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";

const CRM_ICON = "anchor";

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

class QuickShareSettingTab extends PluginSettingTab {
  plugin: CRM;

  constructor(app: any, plugin: CRM) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Backend endpoint")
      .setDesc("QuickShare server URL:")
      .addText((text) =>
        text
          .setPlaceholder(DEFAULT_SETTINGS.backendEndpoint)
          .setValue(this.plugin.settings.backendEndpoint)
          .onChange(async (value) => {
            this.plugin.settings.backendEndpoint =
              value || DEFAULT_SETTINGS.backendEndpoint;
            await this.plugin.saveSettings();
          })
      );
  }
}
