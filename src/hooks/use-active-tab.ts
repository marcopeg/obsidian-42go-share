import { useApp } from "@/hooks/use-app";
import { useEffect, useState } from "react";
import type { TFile, CachedMetadata, App } from "obsidian";

interface TabInfo {
  file: TFile | null;
  meta: CachedMetadata["frontmatter"] | null;
  links: CachedMetadata["links"] | null;
  tags: CachedMetadata["tags"] | null;
}

export function useActiveTab(): TabInfo {
  const app = useApp();

  // initialize from current active editor tab
  const [meta, setMeta] = useState<TabInfo>(() => {
    const file = app.workspace.getActiveFile();
    return { file, ...getMeta(app, file) };
  });

  useEffect(() => {
    const update = () => {
      const file = app.workspace.getActiveFile();
      setMeta({ file, ...getMeta(app, file) });
    };

    // react when user switches editor tabs
    const refOpen = app.workspace.on("file-open", update);

    // react when *any* file metadata changes
    const refMeta = app.metadataCache.on("changed", update);

    return () => {
      app.workspace.offref(refOpen);
      app.metadataCache.offref(refMeta);
    };
  }, [app]);

  return meta;
}

function getMeta(app: App, file: TFile | null) {
  if (!file) return { meta: null, links: null, tags: null };
  const cache = app.metadataCache.getFileCache(file);
  return {
    meta: cache?.frontmatter ?? null,
    links: cache?.links ?? null,
    tags: cache?.tags ?? null,
  };
}
