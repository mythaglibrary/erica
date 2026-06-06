import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { palette } from "../src/palette";

const tierlistDpsFile = new AttachmentBuilder(
  "./attachments/tierlist-dps.jpg",
  {
    name: "tierlist-dps.jpg",
  },
);

const tierlistSupportFile = new AttachmentBuilder(
  "./attachments/tierlist-support.jpg",
  {
    name: "tierlist-support.jpg",
  },
);

export default {
  data: new SlashCommandBuilder()
    .setName("tierlist")
    .setDescription("A general tierlist for dps and supports"),

  async execute(interaction) {
    const tierlistDPS = new EmbedBuilder()
      .setTitle("DPS")
      .setImage("attachment://tierlist-dps.jpg")
      .setColor(palette.red);

    const tierlistSupport = new EmbedBuilder()
      .setTitle("Support")
      .setImage("attachment://tierlist-support.jpg")
      .setColor(palette.blue);

    await interaction.reply({
      embeds: [tierlistDPS, tierlistSupport],
      files: [tierlistDpsFile, tierlistSupportFile],
    });
  },
};
