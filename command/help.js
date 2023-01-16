//Wir importieren SlashCommandBuilder von Discordjs Builders, um damit einfach Slash Commands zu erstellen
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js"); //Von Discord.js Client und Collection importieren
//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
  //Wir erstellen den Slash Command
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Der Globale Hilfe Command"),
  //Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
  async execute(interaction) {
    //Mit Pong antworten

    const helpimage = new EmbedBuilder()
      .setImage("https://share.creavite.co/QUi6UpGTCNn1HwIx.png")
      .setColor("#6a5acd");

    const helpmessage = new EmbedBuilder()
      .setThumbnail(
        "https://images-ext-2.discordapp.net/external/bAqOP8y6CziWCdbW1TuQkUQaIUygVE2hoL3-1eHMBqo/https/forum.the-networks.tk/uploads/avatars/defaults/63920c813b6c25.98101629_elpgjqonkimhf.png"
      )
      .setTitle("<:networkicon:1052240789746495500> TNS Hilfe/Help System")
      .setColor("#6a5acd")
      .setDescription(
        "Willkommen zum TNS Help Menü! Hier erhälst du alle Infos." +
          "\n Die nur zum Benutzen von TNS brauchts!"
      );

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("hepmenu")
        .setPlaceholder("Bitte Wähle aus")
        .setMaxValues(1)
        .addOptions([
          {
            label: "HELP GLOBAL",
            description: "Globale Infos und Hilfe (DISCORD und Server)",
            value: "help_sec",
          },
          {
            label: "Commands",
            description: "Alle Commdas Und Infos",
            value: "commdans_sec",
          },
          {
            label: "Server Hilfe",
            description: "Alle Hilfe zu TNS Networks",
            value: "server_sec",
          },
        ])
    );

    interaction.reply({
      embeds: [helpimage, helpmessage],
      components: [row],
      ephemeral: true,
    });
  },
};
