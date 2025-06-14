module.exports = {
  config: {
    name: "alluser",
    version: "1.0.5",
    permission: 0,
    prefix: false,
    credits: "Deku",
    description: "Get all uids and names in Group.",
    category: "without prefix",
    cooldowns: 2
  },
  
  onStart: async function({ api, event, args }) {
    function reply(text) {
      api.sendMessage(text, event.threadID, event.messageID);
    }
    var ep = event.participantIDs;
    let msg = "";
    let m = 0;

    for (let id of ep) {
      m++;
      try {
        const info = await api.getUserInfo(id);
        const name = info[id]?.name || "Unknown User";

        msg += `${m}. ${name}\nUID: ${id}\nhttps://facebook.com/${id}\n\n`;
      } catch (error) {
        msg += `${m}. Unknown User (UID: ${id})\n\n`;
      }
    }

    reply("All users in this group\n\n" + msg);
  }
};