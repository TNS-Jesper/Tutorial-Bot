const { Client, Collection } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  const TableButtons = new ascii().setHeading("Button", "Status", "Errors");

  await client.buttons.clear();

  const buttonFiles = fs
    .readdirSync(`${process.cwd()}/event/button`)
    .filter((file) => file.endsWith(".js"));

  buttonFiles.forEach((files) => {
    files = files.replace(".js", "");

    const button = require(`${process.cwd()}/event/button/${files}`);

    if (!button.id)
      return TableButtons.addRow(
        `${files || "MISSING"}`,
        "❌ FAILED",
        "missing a id"
      );

    client.buttons.set(button.id, button);

    return TableButtons.addRow(`${button.id}`, "✅ SUCCESSFULL");
  });

  return console.log(TableButtons.toString());
};
