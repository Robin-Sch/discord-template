import { Events } from 'discord.js';

export default {
	name: Events.MessageCreate,

	listener: async (_client, message) => {
		if (
			message.guild === null ||
			message.member?.user.bot ||
			message.member?.user.id === undefined
		)
			return;
		console.log(`Message from ${message.author.tag} in ${message.channel.id}`);
	},
};
