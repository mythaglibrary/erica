import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL(import.meta.resolve("content/packs.md")),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("packs")
    .setDescription("Table of paid packs value"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
