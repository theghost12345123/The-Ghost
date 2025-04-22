const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "ɴʀʙ",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝗡𝗜𝗥𝗢𝗕',
				gender: '𝗠𝗔𝗟𝗘',
				Birthday: '18-11-𝟐𝟎𝟎5',
				religion: '𝗜𝗦𝗟𝗔𝗠',
				hobby: '𝗡𝗧𝗚',
				Fb: 'https://www.facebook.com/hatake.kakashi.NN',
				Relationship: '𝗔𝗠𝗜 𝗦𝗜𝗡𝗚𝗘𝗟 𝗛𝗘𝗛𝗘 ',
				Height: '5"5'
			};

			const bold = 'https://files.catbox.moe/rjvpjo.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
 ~Name: ${ownerInfo.name}
 ~Gender: ${ownerInfo.gender}
 ~Birthday: ${ownerInfo.Birthday}
 ~Religion: ${ownerInfo.religion}
 ~Relationship: ${ownerInfo.Relationship}
 ~Hobby: ${ownerInfo.hobby}
 ~Fb: ${ownerInfo.Fb}
 ~Height: ${ownerInfo.Height}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('😍', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
     attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/zru8qe.mp4")
      });
    }
  }
					}
