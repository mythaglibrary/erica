import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL(import.meta.resolve("content/support.md")),
  "utf8",
);

const video = new AttachmentBuilder("attachments/support.mp4");

export default {
  data: new SlashCommandBuilder()
    .setName("support")
    .setDescription("How to immediatly take a whale support unit"),

  async execute(interaction) {
    await interaction.reply({ content, files: [video] });
  },
};
