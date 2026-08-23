import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { palette } from "src/palette";

const tierlistDpsFile = new AttachmentBuilder(
  "attachments/tierlist-dps.png",
  {
    name: "tierlist-dps.png",
  },
);

const tierlistSupportFile = new AttachmentBuilder(
  "attachments/tierlist-support.png",
  {
    name: "tierlist-support.png",
  },
);

export default {
  data: new SlashCommandBuilder()
    .setName("tierlist")
    .setDescription("A general tierlist for dps and supports"),

  async execute(interaction) {
    const tierlistDPS = new EmbedBuilder()
      .setTitle("DPS")
      .setImage("attachment://tierlist-dps.png")
      .setColor(palette.red);

    const tierlistSupport = new EmbedBuilder()
      .setTitle("Support")
      .setImage("attachment://tierlist-support.png")
      .setColor(palette.blue);

    await interaction.reply({
      embeds: [tierlistDPS, tierlistSupport],
      files: [tierlistDpsFile, tierlistSupportFile],
    });
  },
};
