import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const content = await readFile(
  new URL("../content/order.md", import.meta.url),
  "utf8",
);

export default {
  data: new SlashCommandBuilder()
    .setName("order")
    .setDescription("This shows the order of the daily reruns"),

  async execute(interaction) {
    await interaction.reply({ content, flags: MessageFlags.SuppressEmbeds });
  },
};
