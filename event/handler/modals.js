const { Client, Collection } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  const TableModals = new ascii().setHeading("Modal", "Status", "Errors");

  await client.modals.clear();

  const modalFiles = fs
    .readdirSync(`${process.cwd()}/event/modal`)
    .filter((file) => file.endsWith(".js"));

  modalFiles.forEach((files) => {
    files = files.replace(".js", "");

    const modal = require(`${process.cwd()}/event/modal/${files}`);

    if (!modal.id)
      return TableModals.addRow(
        `${files || "MISSING"}`,
        "❌ FAILED",
        "missing a id"
      );

    client.modals.set(modal.id, modal);

    return TableModals.addRow(`${modal.id}`, "✅ SUCCESSFULL");
  });

  return console.log(TableModals.toString());
};
