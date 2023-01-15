require("dotenv").config();
const { DISCORD_GUILD_ID } = process.env;
const { Client, ActivityType } = require("discord.js");
const { loadCommands } = require("../../loadCommands");

// Status und on "Gehen"
const message = ["mit dem Code.", "TNS Big Update | v.1.0.5 | /help"];
let current = 0;

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    loadCommands(client);
    console.log(
      `Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`
    );
    setInterval(() => {
      if (message[current]) {
        client.user.setActivity(message[0], {
          type: ActivityType.Playing,

        });
        current++;
      } else {
        client.user.setActivity(message[0], {
          type: ActivityType.Playing,

        });

        current = 0;
      }
    }, 5 * 1000);
  },
};
