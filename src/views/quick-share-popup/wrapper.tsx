import { App, Modal } from "obsidian";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { AppProvider } from "@/context/AppProvider";
import QuickSharePopupView from "./QuickSharePopupView";

export class QuickShareModal extends Modal {
  private root: Root | null = null;
  private settings: any;

  constructor(app: App, settings?: any) {
    super(app);
    this.settings = settings;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    this.root = createRoot(contentEl);
    this.root.render(
      <AppProvider app={this.app} settings={this.settings}>
        <QuickSharePopupView />
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
