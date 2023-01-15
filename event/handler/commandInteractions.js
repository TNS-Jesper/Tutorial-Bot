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
			if (
				interaction.isChatInputCommand() ||
				interaction.isContextMenuCommand()
			) {
				const redEmbed = new EmbedBuilder().setColor("FF0000");

				const command = client.commands.get(interaction.commandName);

				const subCommand = interaction.options.getSubcommand(false);

				const subCommandFile = client.subCommands.get(
					`${interaction.commandName}.${subCommand}`
				);

				if (!command)
					return (
						interaction.reply({
							embeds: [
								redEmbed.setTitle("❌ Dieser Command existiert nicht mehr."),
							],
							ephemeral: true,
						}) && client.commands.delete(interaction.commandName)
					);

				try {
					if (subCommand) {
						if (!subCommandFile)
							return interaction.reply({
								embeds: [
									redEmbed.setTitle(
										"❌ Dieser Subcommand existiert nicht mehr."
									),
								],
								ephemeral: true,
							});

						return subCommandFile.execute(interaction, client);
					} else return command.execute(interaction, client);
				} catch (error) {
					console.log("❌ Fehler beim Ausführen des Commands\n" + error);

					if (interaction.deferred || interaction.replied)
						return interaction.editReply({
							embeds: [
								redEmbed.setTitle(
									`❌ Fehler beim Ausführen des Commands. ${client.contact}`
								),
							],
							ephemeral: true,
						});

					return interaction.reply({
						embeds: [
							redEmbed.setTitle(
								`❌ Fehler beim Ausführen des Commands. ${client.contact}`
							),
						],
						ephemeral: true,
					});
				}
			}
		}
	);
};
