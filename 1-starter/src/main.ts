import "reflect-metadata";
import { Intents, Interaction, Message } from "discord.js";
import { Client } from "discordx";
import { dirname, importx } from "@discordx/importer";

export const client = new Client({
  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },

  // Discord intents
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],

  // To only use global commands (use @Guild for specific guild command), comment this line
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Debug logs are disabled in silent mode
  silent: false,
});

client.once("ready", async () => {
  // Make sure all guilds are cached
  await client.guilds.fetch();

  // Synchronize applications commands with Discord
  await client.initApplicationCommands();

  // Synchronize applications command permissions with Discord
  await client.initApplicationPermissions();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await client.clearApplicationCommands(
  //    ...client.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

client.on("interactionCreate", (interaction: Interaction) => {
  client.executeInteraction(interaction);
});

client.on("messageCreate", (message: Message) => {
  client.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  await client.login(process.env.BOT_TOKEN);
}

run();
