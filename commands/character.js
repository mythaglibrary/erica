import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile, readdir } from "fs/promises";

const charactersDir = new URL("../content/characters/", import.meta.url);
const files = (await readdir(charactersDir, { withFileTypes: true }))
  .filter((file) => file.isFile() && file.name.endsWith(".md"))
  .map((file) => file.name)
  .sort();

const guides = new Map(
  await Promise.all(
    files.map(async (file) => [
      file.slice(0, -3),
      await readFile(new URL(encodeURIComponent(file), charactersDir), "utf8"),
    ]),
  ),
);

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
    const query = interaction.options.getFocused().trim().toLowerCase();
    const matches = characters.filter((character) =>
      character.value.includes(query),
    );

    await interaction.respond(matches.slice(0, 25));
  },

  async execute(interaction) {
    const character = interaction.options
      .getString("character", true)
      .trim()
      .toLowerCase();
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
