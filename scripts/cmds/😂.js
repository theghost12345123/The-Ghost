module.exports = {
  config: {
    name: "😂",
    version: "0.0.1",
    author: "ArYAN",
    description: "Reply with audio when message starts with 😂",
    usage: "😂",
    cooldown: 5,
    role: 0,
    noPrefix: true
  },

  onStart: async () => {},

  onChat: async ({ event, message }) => {
    const text = event.body?.trim();
    if (!text || !text.startsWith("😂")) return;

    const audioUrl = "http://aryan-xy.onrender.com/raw/n-6_nUMt.mp3"

    try {
      await message.reply({
        body: " ওরে  কি সুন্দর হাসি রে 😹😂",
        attachment: await global.utils.getStreamFromURL(audioUrl)
      });
      message.react("😁");
    } catch {
      message.reply("❌ Failed to send audio. Please try again later.");
    }
  }
};