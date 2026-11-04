import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL(import.meta.resolve("content/formulas.md")),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("important-formulas")
    .setDescription("Full damage formula and others"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
