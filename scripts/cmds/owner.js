const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝐍𝐈𝐑𝐎𝐁',
      gender: 'MaLe',
      age: '18+',
      height: '𝐉𝐀𝐍𝐈 𝐍𝐀',
      choise: '',
      nick: '😒'
    };

    const bold = 'https://files.catbox.moe/a86iqb.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = ` 
┏━━━━━━━━━━━━━━━━━━━┓
┃      🫧 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🫧      
┣━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : 𝙔𝙚𝙖𝙨𝙞𝙣
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐚𝐥𝐞
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝙎𝙞𝙣𝙜𝙡𝙚😞
┃ 🎂 𝐀𝐠𝐞       : 19
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐬𝐥𝐚𝐦
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝘾𝙪𝙢𝙞𝙡𝙡𝙖/𝘿𝙝𝙖𝙠𝙖 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : its_me_tufan01
┃ 🫧 𝙒𝙝𝙖𝙩𝙖𝙥𝙥 : 𝙉𝙖𝙢𝙗𝙚𝙧 𝙙𝙞𝙮𝙖 𝙠𝙖𝙟 𝙠𝙞?
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : https://www.facebook.com/profile.php?id=61552257412748
┣━━━━━━━━━━━━━━━━━━━┫
`;

    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🖤', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
