module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag}\nServer: ${interaction.guild.name}\nChannel: #${interaction.channel.name}\nTriggered: ${interaction.id}`);
	},
};