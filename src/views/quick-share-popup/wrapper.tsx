import { App, Modal } from "obsidian";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { AppProvider } from "@/context/AppProvider";
import QuickSharePopupView from "./QuickSharePopupView";

export class QuickShareModal extends Modal {
  private root: Root | null = null;

  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    this.root = createRoot(contentEl);
    this.root.render(
      <AppProvider app={this.app}>
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
