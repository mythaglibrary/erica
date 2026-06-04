import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL("../content/covenant.md", import.meta.url),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("covenant")
    .setDescription("A general guide for covenants building"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
