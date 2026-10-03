import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile, readdir } from "fs/promises";

function normalizeCharacterName(name) {
  return name.trim().toLowerCase();
}

const charactersDir = new URL("../content/characters/", import.meta.url);
const files = (await readdir(charactersDir, { withFileTypes: true }))
  .filter((file) => file.isFile() && file.name.endsWith(".md"))
  .map((file) => file.name)
  .sort();

const guides = new Map();

for (const file of files) {
  const character = normalizeCharacterName(file.slice(0, -3));

  if (!character || character.length > 100) {
    throw new Error(
      `Character guide filename must have 1–100 characters before .md: ${file}`,
    );
  }

  if (guides.has(character)) {
    throw new Error(`Duplicate character guide name "${character}": ${file}`);
  }

  const content = await readFile(
    new URL(encodeURIComponent(file), charactersDir),
    "utf8",
  );
  guides.set(character, content);
}

const characters = [...guides.keys()].map((value) => ({
  name: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

export default {
  data: new SlashCommandBuilder()
    .setName("character-guide")
    .setDescription("Look up a guide for a character")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The character name to look up")
        .setRequired(true)
        .setAutocomplete(true),
    ),

  async autocomplete(interaction) {
    const query = normalizeCharacterName(interaction.options.getFocused());
    const matches = characters.filter((character) =>
      character.value.includes(query),
    );

    await interaction.respond(matches.slice(0, 25));
  },

  async execute(interaction) {
    const character = normalizeCharacterName(
      interaction.options.getString("character", true),
    );
    const content = guides.get(character);

    if (!guides.has(character)) {
      await interaction.reply({
        content:
          "I couldn't find that character guide. Choose a character from the suggestions.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({ content });
  },
};
