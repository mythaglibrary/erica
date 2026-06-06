import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { readFile } from "fs/promises";
import { palette } from "src/palette.js";

const content = await readFile(
  new URL(import.meta.resolve("content/covenant.md")),
  "utf8",
);

const covenantFile = new AttachmentBuilder("attachments/covenant.png", {
  name: "covenant.png",
});

export default {
  data: new SlashCommandBuilder()
    .setName("covenant")
    .setDescription("A general guide for covenants building"),

  async execute(interaction) {
    const covenant = new EmbedBuilder()
      .setDescription(content)
      .setImage("attachment://covenant.png")
      .setColor(palette.purple);

    await interaction.reply({
      embeds: [covenant],
      files: [covenantFile],
    });
  },
};
