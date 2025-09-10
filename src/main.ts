import { Plugin } from "obsidian";
import { QuickShareModal } from "@/views/quick-share-popup/wrapper";

const CRM_ICON = "anchor";

export default class CRM extends Plugin {
  async onload() {
    console.clear();
    console.log("QuickShare: Loading plugin");

    this.addRibbonIcon(CRM_ICON, "Quick Share Note", () =>
      new QuickShareModal(this.app).open()
    );

    this.addCommand({
      id: "quick-share--share-note",
      name: "Quick Share Note",
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "s" }], // Cmd/Ctrl+Shift+M (user can change later)
      callback: () => {
        new QuickShareModal(this.app).open();
      },
    });
  }
}
