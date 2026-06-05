import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL("../content/pyramid.md", import.meta.url),
  "utf8",
);

const pyramidFile = new AttachmentBuilder("./attachments/pyramid.png", {
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
      .setColor(0x4f252e);

    await interaction.reply({
      embeds: [pyramid],
      files: [pyramidFile],
    });
  },
};
