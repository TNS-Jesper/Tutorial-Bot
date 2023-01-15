const { Client, Collection } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  const TableSelectmenus = new ascii().setHeading(
    "SelectMenu",
    "Status",
    "Errors"
  );

  await client.selectmenus.clear();

  const selectmenuFiles = fs
    .readdirSync(`${process.cwd()}/event/selectmenu`)
    .filter((file) => file.endsWith(".js"));

  selectmenuFiles.forEach((files) => {
    files = files.replace(".js", "");

    const selectmenu = require(`${process.cwd()}/event/selectmenu/${files}`);

    if (!selectmenu.id)
      return TableSelectmenus.addRow(
        `${files || "MISSING"}`,
        `${client.redCross} FAILED`,
        "missing a id"
      );

    client.selectmenus.set(selectmenu.id, selectmenu);

    return TableSelectmenus.addRow(
      `${selectmenu.id}`,
      `${client.greenTick} SUCCESSFULL`
    );
  });

  return console.log(TableSelectmenus.toString());
};
