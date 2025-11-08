import { useApp } from "../hooks/use-app";
import { useEffect, useState } from "react";
import type { TFile, App } from "obsidian";

interface UseFilesOptions {
  /**
   * Optional filter applied after type filtering.
   * Receives the file and the Obsidian App so callers can inspect metadata/cache.
   */
  filter?: (file: TFile, app: App) => boolean;
}

export function useFiles(type: string, options?: UseFilesOptions) {
  const app = useApp();
  const [files, setFiles] = useState<TFile[]>([]);

  useEffect(() => {
    const update = () => {
      const all = app.vault.getMarkdownFiles();
      const filtered = all.filter((f) => {
        const fm = app.metadataCache.getFileCache(f)?.frontmatter;
        if (fm?.type !== type) return false;
        if (!options?.filter) return true;
        try {
          return options.filter(f, app);
        } catch (e) {
          // If user filter throws, exclude the file and don't break the hook
          console.error("useFiles filter error:", e);
          return false;
        }
      });
      setFiles(filtered);
    };

    // run immediately
    update();

    // rerun when *any* metadata changes
    const refMeta = app.metadataCache.on("changed", update);

    return () => {
      app.metadataCache.offref(refMeta);
    };
    // options?.filter intentionally included so callers can pass a stable callback
    // (they should wrap it in useCallback if needed).
  }, [app, type, options?.filter]);

  return files;
}
