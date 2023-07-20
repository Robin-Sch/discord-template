import { BaseInteraction, Events } from 'discord.js';

export default {
	name: Events.InteractionCreate,

	async execute(interaction: BaseInteraction) {
		if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
			return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!['ping', 'donate'].includes(interaction.commandName))
			await interaction.deferReply();
		if (['donate'].includes(interaction.commandName))
			await interaction.deferReply({ ephemeral: true });

		if (!command) return
		try {
			await command.execute(interaction);
			console.log(
				`[COMMAND] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) executed ${interaction.commandName}`
			);
		} catch (error: any) {
			return console.log(error);
		}
	},
};
