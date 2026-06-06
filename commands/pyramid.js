import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { readFile } from "fs/promises";
import { palette } from "src/palette.js";

const content = await readFile(
  new URL(import.meta.resolve("content/pyramid.md")),
  "utf8",
);

const pyramidFile = new AttachmentBuilder("attachments/pyramid.png", {
  name: "pyramid.png",
});

export default {
  data: new SlashCommandBuilder()
    .setName("pyramid")
    .setDescription("Explanation of the Origin of Time item"),

  async execute(interaction) {
    const pyramid = new EmbedBuilder()
      .setDescription(content)
      .setImage("attachment://pyramid.png")
      .setColor(palette.amber);

    await interaction.reply({
      embeds: [pyramid],
      files: [pyramidFile],
    });
  },
};
