import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL(import.meta.resolve("content/tierlist.md")),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("tierlist")
    .setDescription("Tierlist for new players (and endgame on the site)"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
