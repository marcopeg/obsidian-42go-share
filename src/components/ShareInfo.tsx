import { Notice } from "obsidian";
import { Icon } from "@/components/Icon";

interface Props {
  fileName: string;
  filePath: string;
  isLoading: boolean;
  shareUrl: string | null;
  errorMsg: string | null;
}

export const ShareInfo = ({
  fileName,
  filePath,
  isLoading,
  shareUrl,
  errorMsg,
}: Props) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      new Notice("Share link copied to clipboard");
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="mt-2 text-xs font-mono text-neutral-400 break-words">
          {filePath}
        </div>

        <div className="mt-4 inline-flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Generating share link…</span>
        </div>

        <hr className="my-3 border-neutral-700" />

        <div className="flex items-start gap-2 text-xs text-neutral-400">
          <Icon name="triangle-alert" />
          <div>
            Anyone with the link can read the note for the next 60 minutes!
          </div>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div>
        <div className="mt-2 text-xs font-mono text-neutral-400 break-words">
          {filePath}
        </div>

        <div className="mt-4 text-sm text-red-400">Error: {errorMsg}</div>

        <hr className="my-3 border-neutral-700" />

        <div className="flex items-start gap-2 text-xs text-neutral-400">
          <Icon name="triangle-alert" />
          <div>
            Anyone with the link can read the note for the next 60 minutes!
          </div>
        </div>
      </div>
    );
  }

  if (shareUrl) {
    return (
      <div>
        <div className="mt-2 text-xs font-mono text-neutral-400 break-words">
          {filePath}
        </div>

        <div className="mt-2">
          <div className="flex items-start">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-base text-neutral-200 break-words inline-flex items-center"
              style={{ fontSize: "0.85rem" }}
            >
              {/* external link icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2 opacity-90"
                aria-hidden
              >
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
              </svg>
              Open shared note
            </a>

            <div className="ml-4 flex-shrink-0">
              <button
                className="mod-cta"
                onClick={() => copyToClipboard(shareUrl)}
                type="button"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>

        <hr className="my-3 border-neutral-700" />

        <div className="flex items-start gap-2 text-xs text-neutral-400">
          <Icon name="triangle-alert" />
          <div>
            Anyone with the link can read the note for the next 60 minutes!
          </div>
        </div>
      </div>
    );
  }

  // default empty state (no loading, no error, no url)
  return (
    <div>
      <div className="mt-2 text-xs font-mono text-neutral-400 break-words">
        {filePath}
      </div>

      <hr className="my-3 border-neutral-700" />

      <div className="flex items-start gap-2 text-xs text-neutral-400">
        <Icon name="triangle-alert" />
        <div>
          Anyone with the link can read the note for the next 60 minutes!
        </div>
      </div>
    </div>
  );
};

export default ShareInfo;
