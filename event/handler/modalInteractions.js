const {
	ChatInputCommandInteraction,
	Client,
	EmbedBuilder,
	PermissionFlagsBits,
	InteractionType,
	Collection,
} = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  client.on(
    "interactionCreate",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async (interaction) => {
      const { guild, member } = interaction;
      if (interaction.type !== InteractionType.ModalSubmit) return;

      const redEmbed = new EmbedBuilder().setColor("FF0000");

      const modal = client.modals.get(interaction.customId);

      if (!modal)
        return (
          interaction.reply({
            embeds: [
              redEmbed.setTitle("❌ Dieses Modal existiert nicht mehr."),
            ],
            ephemeral: true,
          }) && client.modals.delete(interaction.customId)
        );

      try {
        return await modal.execute(interaction, client);
      } catch (error) {
        console.log("❌ Fehler beim Ausführen der Modals\n" + error);

        return interaction.reply({
          embeds: [
            redEmbed.setTitle(
              `❌ Beim Versuch, dieses Modal auszuführen, ist ein Fehler aufgetreten. ${client.contact}`
            ),
          ],
          ephemeral: true,
        });
      }
    }
  );
};
