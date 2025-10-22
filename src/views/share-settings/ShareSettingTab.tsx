import { App, PluginSettingTab, Setting } from "obsidian";
import type QuickSharePlugin from "@/main";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";

export class ShareSettingTab extends PluginSettingTab {
  plugin: QuickSharePlugin;

  constructor(app: App, plugin: QuickSharePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName("Server URL:").addText((text) =>
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
