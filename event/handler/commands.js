const { Client, Collection } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  const TableCommands = new ascii().setHeading("Command", "Status", "Errors");
  const TableSubCommands = new ascii().setHeading(
    "SubCommand",
    "Status",
    "Errors"
  );

  await client.commands.clear();
  await client.subCommands.clear();

  const commandFiles = fs
    .readdirSync(`${process.cwd()}/command`)
    .filter((file) => file.endsWith(".js"));

  const subCommandFiles = fs
    .readdirSync(`${process.cwd()}/command/subCommand`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((files) => {
    files = files.replace(".js", "");

    const command = require(`${process.cwd()}/command/${files}`);

    if (!command.data.name)
      return TableCommands.addRow(
        `${files || "MISSING"}`,
        "❌ FAILED",
        "missing a name"
      );

    if (!command.context && !command.data.description)
      return TableCommands.addRow(
        `${command.data.name}`,
        "❌ FAILED",
        "missing a description"
      );

    client.commands.set(command.data.name, command);

    return TableCommands.addRow(`${command.data.name}`, "✅ SUCCESSFULL");
  });

  subCommandFiles.forEach((files) => {
    files = files.replace(".js", "");

    const command = require(`${process.cwd()}/command/subCommand/${files}`);

    if (!command.subCommand)
      return TableSubCommands.addRow(
        `${files || "MISSING"}`,
        "❌ FAILED",
        "missing a subCommand"
      );

    client.subCommands.set(command.subCommand, command);

    return TableSubCommands.addRow(`${command.subCommand}`, "✅ SUCCESSFULL");
  });

  console.log(TableCommands.toString());
  console.log(TableSubCommands.toString());
};
