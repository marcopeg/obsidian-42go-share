import { App, Modal, TFile } from "obsidian";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { AppProvider } from "@/context/AppProvider";
import QuickSharePopupView from "./QuickSharePopupView";

export class QuickShareModal extends Modal {
  private root: Root | null = null;
  private settings: any;
  private file: TFile | null = null;

  constructor(app: App, settings?: any, file?: TFile | null) {
    super(app);
    this.settings = settings;
    this.file = file ?? null;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    this.root = createRoot(contentEl);
    this.root.render(
      <AppProvider app={this.app} settings={this.settings}>
        <QuickSharePopupView file={this.file} />
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
