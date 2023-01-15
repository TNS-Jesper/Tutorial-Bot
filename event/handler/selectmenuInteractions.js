const {
	AnySelectMenuInteraction,
	Client,
	EmbedBuilder,
	PermissionsBitField,
	Collection,
	Events,
} = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  client.on(
    Events.InteractionCreate,

    /**
     *
     * @param {AnySelectMenuInteraction} interaction
     */
    async (interaction) => {
      const { guild, member } = interaction;

      const redEmbed = new EmbedBuilder().setColor("FF0000");

      if (!interaction.isAnySelectMenu()) return;

      const selectmenu = client.selectmenus.get(interaction.customId);

      if (!selectmenu)
        return (
          interaction.reply({
            embeds: [
              redEmbed.setTitle(
                `${client.redCross} Dieses Select Menu existiert nicht mehr.`
              ),
            ],
            ephemeral: true,
          }) && client.selectmenus.delete(interaction.customId)
        );

      if (
        selectmenu.admin &&
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      )
        return interaction.reply({
          embeds: [
            redEmbed
              .setTitle("Nicht genügend Rechte")
              .setDescription(
                `${client.redCross} Du hast keine Rechte dieses Select Menu zu benutzen.`
              ),
          ],
          ephemeral: true,
        });

      if (selectmenu.ownerOnly && interaction.member.id !== guildOwnerData)
        return interaction.reply({
          embeds: [
            redEmbed
              .setTitle("Nicht genügend Rechte")
              .setDescription(
                `${client.redCross} Nur Owner können dieses Select Menu benutzen.`
              ),
          ],
          ephemeral: true,
        });

      if (
        selectmenu.supportOnly &&
        !interaction.member.roles.cache.has(supportRoleData)
      )
        return interaction.reply({
          embeds: [
            redEmbed
              .setTitle("Nicht genügend Rechte")
              .setDescription(
                `${client.redCross} Nur Supporter können dieses Select Menu benutzen.`
              ),
          ],
          ephemeral: true,
        });

      try {
        return await selectmenu.execute(interaction, client);
      } catch (error) {
        console.log(
          `${client.redCross} FAILED to execute the Select Menus\n${error}`
        );

        return interaction.reply({
          embeds: [
            redEmbed.setTitle(
              `${client.redCross} Beim Versuch, dieses Select Menu auszuführen, ist ein Fehler aufgetreten. ${client.contactMSG}`
            ),
          ],
          ephemeral: true,
        });
      }
    }
  );
};