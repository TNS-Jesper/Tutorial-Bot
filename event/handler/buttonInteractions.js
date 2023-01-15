const {
	ChatInputCommandInteraction,
	Client,
	EmbedBuilder,
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
      if (!interaction.isButton()) return;

      const redEmbed = new EmbedBuilder().setColor("FF0000");

      const button = client.buttons.get(interaction.customId);

      if (!button)
        return (
          interaction.reply({
            embeds: [
              redEmbed.setTitle("❌ Dieser Button existiert nicht mehr."),
            ],
            ephemeral: true,
          }) && client.buttons.delete(interaction.customId)
        );

      try {
        return await button.execute(interaction, client);
      } catch (error) {
        console.log("❌ FAILED to execute the Buttons\n" + error);

        return interaction.reply({
          embeds: [
            redEmbed.setTitle(
              `❌ Beim Versuch, diesen Button auszuführen, ist ein Fehler aufgetreten. ${client.contact}`
            ),
          ],
          ephemeral: true,
        });
      }
    }
  );
};
