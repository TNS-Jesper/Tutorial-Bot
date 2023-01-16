const fs = require("fs");
const ascii = require("ascii-table");
const { Collection } = require("discord.js"); //Von Discord.js Client und Collection importieren
const { Client, Partials } = require("discord.js");
const {
  Channel,
  GuildMember,
  Message,
  Reaction,
  GuildScheduledEvent,
  ThreadMember,
} = Partials;
const client = new Client({
  partials: [
    Channel,
    GuildMember,
    Message,
    Reaction,
    GuildScheduledEvent,
    ThreadMember,
  ],
  intents: [131071],
});

const collection = new Collection();

//Collections
client.commands = collection;
client.subCommands = collection;
client.buttons = collection;
client.modals = collection;
client.selectmenus = collection;

client.voiceGenerator = collection;

client.contact = "Bitte kontaktiere den Owner vom Bot: Jesper#9999.";

[
  "commands",
  "events",
  "buttons",
  "selectmenus",
  "modals",
  "commandInteractions",
  "clientEvents",
  "buttonInteractions",
  "selectmenuInteractions",
  "modalInteractions",
].forEach((handler) =>
  require(`./event/handler/${handler}`)(client, fs, collection, ascii)
);

client.login(process.env.DISCORD_BOT_TOKEN); //Client mit dem Token aus der .env Datei einloggen lassen!
