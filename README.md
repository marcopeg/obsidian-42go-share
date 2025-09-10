# Obsidian QuickShare Plugin

QuickShare plugin for Obsidian - share a note with a temporary public link.

## Usage

From any note chose "Share note" from the note's contextual menu, or hit the shortcut "Shift+Cmd+s" to share the note and open the popup with the note's link.

> You can achieve the same result with the command palette "Share note".

## Be Careful What You Share!

The shared note _title_ and _content_ **is copied** to a temporary record on the Sync Server and the URL gives full read access to such note.

Notes are not redable after 60 minutes and are automatically pruned from the server after 4 hours.

Nevertheless, be careful what you share because **it is your own responsibility**.

## Settings

In the plugin's setting you can change the sync server to any compatible server.

The default sync server is `https://notes.42go.dev` that is a small utility that lets share temporary Markdown notes without any account.

## Development

```bash
# Clone this repo in your development vault's plugins folder:
git@github.com:marcopeg/obsidian-quick-share.git
cd obsidian-quick-share

# Start the dev environment
yarn install
yarn dev

# Or build the plugin
yarn install
yarn build
```
