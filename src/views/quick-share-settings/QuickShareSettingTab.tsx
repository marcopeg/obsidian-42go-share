import { PluginSettingTab, Setting } from "obsidian";
import type CRM from "@/main";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";

export class QuickShareSettingTab extends PluginSettingTab {
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
          .setValue((this.plugin as any).settings.backendEndpoint)
          .onChange(async (value) => {
            (this.plugin as any).settings.backendEndpoint =
              value || DEFAULT_SETTINGS.backendEndpoint;
            await (this.plugin as any).saveSettings();
          })
      );
  }
}

export default QuickShareSettingTab;
