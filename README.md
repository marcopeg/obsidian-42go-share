# 42GoShare Plugin for Obsidian

Share a note with an ephimeral public link.

## Usage

- Chose "Share note" from any note's contextual menu
- it the shortcut "Shift+Cmd+s" to share the note and open the popup with the note's link.
- type "Share note" in the _Command Palette_.

## Be Careful What You Share!

The shared note _title_ and _content_ **is copied** to a temporary record on the _42Go's Sync Server_ and the URL gives full read access to such note.

> Notes are not redable after 60 minutes and are automatically pruned from the server after 4 hours.

🧨 Nevertheless, be careful what you share because **it is your own responsibility**.

## Settings

In the plugin's setting you can change the sync server to any compatible server.

The default sync server is `https://notes.42go.dev` that is a small utility that lets share temporary Markdown notes without any account.

🚧 You can change the server at will and the specs to build your own server will be published soon 🚧.

## Development

```bash
# Clone this repo in your development vault's plugins folder:
git@github.com:marcopeg/obsidian-42go-share.git
cd obsidian-42go-share

# Start the dev environment
yarn install
yarn dev

# Or build the plugin
yarn install
yarn build
```
