const { Client, Collection } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 * @param {Collection} collection
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, collection, ascii) => {
  const TableEvents = new ascii().setHeading("Event", "Status", "Errors");

  const memberEventFiles = fs
    .readdirSync("./event/member")
    .filter((file) => file.endsWith(".js"));

  const messageEventFiles = fs
    .readdirSync("./event/message")
    .filter((file) => file.endsWith(".js"));

  const voiceEventFiles = fs
    .readdirSync("./event/voice")
    .filter((file) => file.endsWith(".js"));

  const roleEventFiles = fs
    .readdirSync("./event/role")
    .filter((file) => file.endsWith(".js"));

  memberEventFiles.forEach((files) => {
    files = files.replace(".js", "");

    const event = require(`../../event/member/${files}`);
    const exec = (...args) => event.execute(...args, client);

    if (!event.name)
      return TableEvents.addRow(
        `${files || "MISSING"}`,
        "❌ FAILED",
        "missing a name"
      );

    if (!event.once) client.on(event.name, exec);

    client.once(event.name, exec);

    return TableEvents.addRow(`${event.name}`, "✅ SUCCESSFULL");
  });

  messageEventFiles.forEach((files) => {
    files = files.replace(".js", "");

    const event = require(`../../event/message/${files}`);
    const exec = (...args) => event.execute(...args, client);

    if (!event.name)
      return TableEvents.addRow(`${files}`, "❌ FAILED", "missing a name");

    if (!event.once) client.on(event.name, exec);

    client.once(event.name, exec);

    return TableEvents.addRow(`${event.name}`, "✅ SUCCESSFULL");
  });

  voiceEventFiles.forEach((files) => {
    files = files.replace(".js", "");

    const event = require(`../../event/voice/${files}`);
    const exec = (...args) => event.execute(...args, client);

    if (!event.name)
      return TableEvents.addRow(`${files}`, "❌ FAILED", "missing a name");

    if (!event.once) client.on(event.name, exec);

    client.once(event.name, exec);

    return TableEvents.addRow(`${event.name}`, "✅ SUCCESSFULL");
  });

  roleEventFiles.forEach((files) => {
    files = files.replace(".js", "");

    const event = require(`../../event/role/${files}`);
    const exec = (...args) => event.execute(...args, client);

    if (!event.name)
      return TableEvents.addRow(`${files}`, "❌ FAILED", "missing a name");

    if (!event.once) client.on(event.name, exec);

    client.once(event.name, exec);

    return TableEvents.addRow(`${event.name}`, "✅ SUCCESSFULL");
  });

  return console.log(TableEvents.toString());
};
