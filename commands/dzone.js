import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL(import.meta.resolve("content/dzone.md")),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("d-zone")
    .setDescription("Current D-Zone breakdown and suggestions"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
