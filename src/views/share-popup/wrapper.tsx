import { App, Modal, TFile } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { AppProvider } from "@/context/AppProvider";
import { SharePopupView } from "./SharePopupView";
import { DEFAULT_SETTINGS } from "@/context/SettingsContext";

export class QuickShareModal extends Modal {
  private root: Root | null = null;
  private settings: typeof DEFAULT_SETTINGS;
  private file: TFile | null = null;

  constructor(app: App, settings?: typeof DEFAULT_SETTINGS, file?: TFile | null) {
    super(app);
    this.settings = settings ?? DEFAULT_SETTINGS;
    this.file = file ?? null;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    this.root = createRoot(contentEl);
    this.root.render(
      <AppProvider app={this.app} settings={this.settings}>
        <SharePopupView file={this.file} />
      </AppProvider>
    );
  }

  onClose() {
    this.root?.unmount();
    this.root = null;
    const { contentEl } = this;
    contentEl.empty();
  }
}
