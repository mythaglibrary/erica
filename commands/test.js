import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("this is a test command"),

  async execute(interaction) {
    await interaction.reply(`
- HVGX-HLDX-QKKN **\`never expire\`**
- QKBQ-SSDG-JZYU **\`never expire\`**
- Catsgift  **\`never expire\`**
- Dc5000  **\`never expire\`**
- Silverkey  **\`never expire\`**
- SayaNoUta <t:1786895940:R>
- YouSavedMorimens <t:1787500740:R>
- CCNP-AHXY-YMHF <t:1780934340:R>
- FHFW-WVQQ-SVSG <t:1781107140:R>
- MSBL-TEWJ-PUBC <t:1781193540:R>
- YZRC-WVVY-FKQZ <t:1781366340:R>
- DC50000 <t:1781798340:R>`);
  },
};
