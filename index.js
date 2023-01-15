const { DisTube } = require("distube");
const fs = require("fs");
const { SpotifyPlugin } = require("@distube/spotify");
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

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: false,
  leaveOnStop: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});

module.exports = client;

const collection = new Collection();

//Collections
client.commands = collection;
client.subCommands = collection;
client.buttons = collection;
client.modals = collection;
client.selectmenus = collection;

client.voiceGenerator = collection;

client.contact = "Bitte kontaktiere den Owner vom Bot: Jesper#2649.";

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
