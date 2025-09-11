import { useActiveTab } from "@/hooks/use-active-tab";
import { useApp } from "@/hooks/use-app";
import type { TFile } from "obsidian";
import { Notice, MarkdownView } from "obsidian";
import { useEffect, useState } from "react";
import ShareInfo from "@/components/ShareInfo";
import { useSettings } from "@/context/SettingsContext";

interface Props {
  file?: TFile | null;
  content?: string | null;
}

export const SharePopupView = ({
  file: propFile,
  content: propContent,
}: Props) => {
  const tab = useActiveTab();
  const app = useApp();
  const settings = useSettings();
  const [content, setContent] = useState<string | null>(propContent ?? null);

  // Prefer the active tab's file, otherwise fall back to prop
  const activeFile: TFile | null = tab.file ?? propFile ?? null;

  useEffect(() => {
    let mounted = true;

    if (!activeFile) {
      setContent(null);
      console.log("[42GoShare] PopupView - not a file");
      return () => {
        mounted = false;
      };
    }

    // If content was passed in via props, prefer it; otherwise read from vault
    if (propContent != null) {
      setContent(propContent);
      console.log("[42GoShare] PopupView - file name", activeFile.basename);
      console.log("[42GoShare] PopupView - file content", propContent);
      return () => {
        mounted = false;
      };
    }

    (async () => {
      try {
        // Prefer editor buffer (unsaved changes) if the active view is a MarkdownView
        const activeView = app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView && activeView.file?.path === activeFile.path) {
          const editorText = activeView.editor.getValue();
          if (!mounted) return;
          setContent(editorText);
          console.log(
            "[42GoShare] PopupView - file name (editor)",
            activeFile.basename
          );
          console.log(
            "[42GoShare] PopupView - file content (editor)",
            editorText
          );
          return;
        }

        const text = await app.vault.read(activeFile);
        if (!mounted) return;
        setContent(text);
        console.log("[42GoShare] PopupView - file name", activeFile.basename);
        console.log("[42GoShare] PopupView - file content", text);
      } catch (e) {
        console.error("[42GoShare] PopupView: failed to read file", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [app, activeFile?.path, propContent]);

  if (!activeFile) {
    return (
      <div className="p-4">
        <h2 className="text-2xl text-primary">Quick Share</h2>
        <p className="mt-2">First open a note, then click the share button!</p>
      </div>
    );
  }

  // POST result state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [autoCopied, setAutoCopied] = useState(false);

  // Auto-copy URL and show a Notice once resultUrl is available and loading finished
  useEffect(() => {
    let mounted = true;
    if (!resultUrl || loading || autoCopied) return;

    (async () => {
      try {
        await navigator.clipboard.writeText(resultUrl);
        if (!mounted) return;
        // Show Obsidian notice
        new Notice("Share link copied to clipboard");
        setAutoCopied(true);
      } catch (e) {
        console.error("[42GoShare] PopupView: auto-copy failed", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [resultUrl, loading, autoCopied]);

  useEffect(() => {
    let mounted = true;

    // Only attempt when we have content and haven't already generated a URL
    if (!activeFile || content == null || resultUrl || loading) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const body = JSON.stringify({
          title: activeFile.basename,
          body: content,
        });
        const base = settings.backendEndpoint.replace(/\/$/, "");
        const res = await fetch(`${base}/api/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (!mounted) return;
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        const data: { bucket: string; uuid: string } = await res.json();
        const url = `${base}/notes/${data.bucket}/${data.uuid}`;
        setResultUrl(url);
        console.log("[42GoShare] PopupView - created note url", url);
      } catch (e: any) {
        console.error("[42GoShare] PopupView: failed to create note", e);
        setError(e?.message ?? String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeFile, content, resultUrl]);

  return (
    <div className="pt-2 px-4 pb-4">
      <h2 className="text-xl text-primary mt-0">Share Note</h2>
      {/* <p className="mt-2">File: {activeFile.basename}</p> */}
      <hr className="my-3 border-neutral-700" />

      <ShareInfo
        fileName={activeFile.basename}
        filePath={activeFile.path}
        isLoading={loading}
        shareUrl={resultUrl}
        errorMsg={error}
      />
    </div>
  );
};
