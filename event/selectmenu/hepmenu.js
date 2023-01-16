require("dotenv").config(); //Dotenv Importieren und die config() Methode ausführen um die .env Datei zu laden
const {
  ButtonInteraction,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  PermissionsBitField,
  ModalBuilder,
  TextInputBuilder,
  PermissionFlagsBits,
  TextInputStyle,
  ModalSubmitFields,
} = require("discord.js");
const { execute } = require("../../command/help");

module.exports = {
  id: "hepmenu",

  /**
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const { guild, member } = interaction;
    const { me } = guild.members;
    const kate = "1030765041345118319";
    const { SendMessages, ViewChannel, ReadMessageHistory, ManageMessages } =
      PermissionsBitField.Flags;

    interaction.values.forEach(async (value) => {
      switch (value) {
        case "help_sec":
          guild.channels
            .create({
              name: "testhelp",
              parent: kate,
              permissionOverwrites: [
                {
                  id: member.id,
                  allow: [SendMessages, ViewChannel, ReadMessageHistory],
                },
                {
                  id: interaction.guild.roles.everyone.id,
                  deny: [ViewChannel],
                },
                {
                  id: interaction.guild.roles.cache.get("1064558422999183401"),
                  allow: [
                    SendMessages,
                    ViewChannel,
                    ReadMessageHistory,
                    ManageMessages,
                  ],
                },
              ],
            })
            .then((channels) => {
              interaction.reply({
                content: `TEST Cannel ${member.tag}`,
              });
              channels.send({
                content: "TEST",
                ephemeral: true,
              });
            });
          break;
        case "commdans_sec":
          interaction.reply({
            content: "ES gibt keine Commands",
            ephemeral: true,
          });
      }
    });
  },
};
