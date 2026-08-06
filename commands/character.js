import { SlashCommandBuilder } from "discord.js";
import { readFile } from "fs/promises";

const guides = {
  arachne: await readFile(
    new URL(import.meta.resolve("content/characters/arachne.md")),
    "utf8",
  ),
    castor: await readFile(
    new URL(import.meta.resolve("content/characters/castor.md")),
    "utf8",
  ),
    pontos: await readFile(
    new URL(import.meta.resolve("content/characters/pontos.md")),
    "utf8",
  ),
    clementine: await readFile(
    new URL(import.meta.resolve("content/characters/clementine.md")),
    "utf8",
  ),
    corpo: await readFile(
    new URL(import.meta.resolve("content/characters/corpo.md")),
    "utf8",
  ),
    daffodil: await readFile(
    new URL(import.meta.resolve("content/characters/daffodil.md")),
    "utf8",
  ),
    gdoll: await readFile(
    new URL(import.meta.resolve("content/characters/gdoll.md")),
    "utf8",
  ),
    ghelot: await readFile(
    new URL(import.meta.resolve("content/characters/ghelot.md")),
    "utf8",
  ),
    gmurphy: await readFile(
    new URL(import.meta.resolve("content/characters/gmurphy.md")),
    "utf8",
  ),
    jenkin: await readFile(
    new URL(import.meta.resolve("content/characters/jenkin.md")),
    "utf8",
  ),
    kath: await readFile(
    new URL(import.meta.resolve("content/characters/kath.md")),
    "utf8",
  ),
    miryam: await readFile(
    new URL(import.meta.resolve("content/characters/miryam.md")),
    "utf8",
  ),
    mouchette: await readFile(
    new URL(import.meta.resolve("content/characters/mouchette.md")),
    "utf8",
  ),
    pollux: await readFile(
    new URL(import.meta.resolve("content/characters/pollux.md")),
    "utf8",
  ),
      glotan: await readFile(
    new URL(import.meta.resolve("content/characters/glotan.md")),
    "utf8",
  ),
    saya: await readFile(
    new URL(import.meta.resolve("content/characters/saya.md")),
    "utf8",
  ),
    vortice: await readFile(
    new URL(import.meta.resolve("content/characters/vortice.md")),
    "utf8",
  ),
    xu: await readFile(
    new URL(import.meta.resolve("content/characters/xu.md")),
    "utf8",
  ),
};

export default {
  data: new SlashCommandBuilder()
    .setName("character-guide")
    .setDescription("Look up a guide for a character")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The character name to look up")
        .setRequired(true)
        .addChoices(
          { name: "Arachne", value: "arachne" },
          { name: "Castor", value: "castor" },
          { name: "Pontos", value: "pontos" },
          { name: "Glotan", value: "glotan" },
          { name: "Clementine", value: "clementine" },
          { name: "Corpo", value: "corpo" },
          { name: "Daffodil", value: "daffodil" },
          { name: "Gdoll", value: "gdoll" },
          { name: "Ghelot", value: "ghelot" },
          { name: "Gmurphy", value: "gmurphy" },
          { name: "Jenkin", value: "jenkin" },
          { name: "Kath", value: "kath" },
          { name: "Miryam", value: "miryam" },
          { name: "Mouchette", value: "mouchette" },
          { name: "Pollux", value: "pollux" },
          { name: "Saya", value: "saya" },
          { name: "Vortice", value: "vortice" },
          { name: "Xu", value: "xu" },
        ),
    ),

  async execute(interaction) {
    const character = interaction.options.getString("character");
    const content = guides[character];

    await interaction.reply({ content });
  },
};
