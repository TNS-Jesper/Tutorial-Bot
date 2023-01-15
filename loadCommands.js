require("dotenv").config();
const { DISCORD_BOT_TOKEN, DISCORD_APPLICATION_ID, DISCORD_GUILD_ID } =
	process.env;
const { Client } = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const cmdlist = [];

/**
 *
 * @param {Client} client
 */
async function loadCommands(client) {
	const commandFiles = fs
		.readdirSync(`${process.cwd()}/command`)
		.filter((file) => file.endsWith(".js"));

	const subCommandFiles = fs
		.readdirSync(`${process.cwd()}/command/subCommand`)
		.filter((file) => file.endsWith(".js"));

	commandFiles.forEach((file) => {
		const command = require(`${process.cwd()}/command/${file}`);
		client.commands.set(command.data.name, command);
		return cmdlist.push(command.data.toJSON());
	});

	subCommandFiles.forEach((file) => {
		const command = require(`${process.cwd()}/command/subCommand/${file}`);
		return client.subCommands.set(command.subCommand, command);
	});

	const restClient = new REST({ version: `9` }).setToken(DISCORD_BOT_TOKEN);

	restClient
		.put(
			Routes.applicationGuildCommands(DISCORD_APPLICATION_ID, DISCORD_GUILD_ID),
			{
				body: cmdlist,
			}
		)
		.then(() =>
			console.log(
				`✅ SUCCESSFULL (re)-loaded Commands: ${
					commandFiles.length >= 1 ? "(" + commandFiles.length + ")" : "None"
				} / SubCommands: ${
					subCommandFiles.length >= 1
						? "(" + subCommandFiles.length + ")"
						: "None"
				} all Commands.`
			)
		)
		.catch(console.error());
}

module.exports = { loadCommands };
