import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the ping of the bot'),

	category: 'General',

	async execute(interaction) {
		const start = Date.now();
		await interaction.deferReply();
		const end = Date.now();

		return interaction.editReply(
			`Pong!
API Latency (Bot): ${Math.round(interaction.client.ws.ping)} ms
Message Latency: ${Math.round(end - start)} ms`
		);
	},
};
