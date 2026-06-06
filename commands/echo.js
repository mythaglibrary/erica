import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { readFile } from "fs/promises";
import { palette } from "src/palette.js";

const content = await readFile(
  new URL(import.meta.resolve("content/order.md")),
  "utf8",
);

const echoFile = new AttachmentBuilder("attachments/echo.png", {
  name: "echo.png",
});

export default {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Order of the daily rerun banner"),

  async execute(interaction) {
    const echo = new EmbedBuilder()
      .setDescription(content)
      .setImage("attachment://echo.png")
      .setColor(palette.sky);

    await interaction.reply({
      embeds: [echo],
      files: [echoFile],
    });
  },
};
