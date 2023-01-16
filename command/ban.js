// code von hier https://discordjs.guide/slash-commands/permissions.html#member-permissions
//Wir importieren SlashCommandBuilder von Discordjs Builders, um damit einfach Slash Commands zu erstellen
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  PermissionFlagsBits,
} = require("discord.js"); //Von Discord.js Client und Collection importieren
//Wir exportieren in unserem File, den Command mit module.exports
module.exports = {
  //Wir erstellen den Slash Command
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Der Ban command.")

    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  //Das ist unsere Methode, wo wir unsere Interaction abfangen, diese ist async
  async execute(interaction) {
    const { member } = interaction;
    member.kick;
  },
};
