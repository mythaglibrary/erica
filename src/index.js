import { Client, Collection, GatewayIntentBits } from "discord.js";
import { createServer } from "node:http";
import { commands } from "./commands.js";

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
}).listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.info(
    `Health server listening on 0.0.0.0:${process.env.PORT || 3000}`,
  );
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const command of await commands()) {
  client.commands.set(command.data.name, command);
}

client.on("clientReady", () => {
  console.info(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;

  const command = client.commands.get(interaction.commandName);

  try {
    if (interaction.isAutocomplete()) {
      if (command?.autocomplete) {
        await command.autocomplete(interaction);
      } else {
        await interaction.respond([]);
      }
      return;
    }

    if (!command) return;

    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.isAutocomplete()) {
      if (!interaction.responded) {
        await interaction.respond([]).catch(console.error);
      }
      return;
    }

    await interaction.reply("An error occurred while executing the command");
  }
});

client.login(process.env.TOKEN);
