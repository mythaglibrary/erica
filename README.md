# Erica

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Create a `.env` file:
   ```
   APP_ID=
   TOKEN=
   ```

3. Register commands with Discord:
   ```bash
   bun run deploy
   ```

4. Run the bot:
   ```bash
   bun run dev   # development
   bun run start # production
   ```

## Creating Commands

All commands load their content from Markdown files in `content/`. Discord renders the Markdown.

1. Create the content file in `content/`:

   ```markdown
   Lorem ipsum dolor sit amet:

   - [Lorem](https://example.com/lorem)
   - [Ipsum](https://example.com/ipsum)
   ```

2. Wire it up in `commands/`:

   ```javascript
   import { MessageFlags, SlashCommandBuilder } from 'discord.js';
   import { readFile } from 'fs/promises';

   const content = await readFile(
     new URL(import.meta.resolve("content/yourFile.md")),
     "utf8",
   );

   export default {
     data: new SlashCommandBuilder()
       .setName('yourCommand')
       .setDescription('Lorem ipsum dolor sit amet'),

     async execute(interaction) {
       await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
     },
   };
   ```

   The file is read once when the bot starts.

3. Run `bun run deploy` to register the new command with Discord.

**Limit:** Discord caps messages at 2000 characters. If a file grows past that, split it across multiple messages with `interaction.followUp()`.

## Adding Character Guides

Add a Markdown file to `content/characters/`, using a lowercase character name as
the filename, such as `caraboo.md`. Every `.md` file directly in this folder is
loaded as a guide when the bot starts. No changes to `commands/character.js` are
needed to add or remove a character.

Use `/character-guide` and start typing the character name. The bot returns up
to 25 matching suggestions at a time, so the folder can contain more than 25
guides. Names are matched without regard to case. The filename without `.md` is
the option value, and its first letter is capitalized for the displayed name.

Restart the bot after adding or changing guide files. Run `bun run deploy` when
first updating to this autocomplete command; subsequent guide additions do not
change the command definition.

## Autocomplete in Other Commands

For another growing list, use `.setAutocomplete(true)` on the string option
instead of `.addChoices(...)`, and add an `async autocomplete(interaction)`
method to the command object. The bot routes autocomplete interactions to that
method automatically.

Read the user's input with `interaction.options.getFocused()`, filter your list,
and call `interaction.respond()` with at most 25 `{ name, value }` entries.
For commands with multiple autocomplete options, use
`interaction.options.getFocused(true).name` to identify the option being edited.
Validate the submitted value in `execute`, because users can enter a value
without choosing a suggestion.

## How do I do things?

More info on what can be done and how: [discord.js guide](https://discordjs.guide/)
