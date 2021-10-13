const { SlashCommandBuilder } = require('@discordjs/builders');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('table')
		.setDescription('Hur i flip table, no i unflip it'),
	async execute(interaction) {
		await interaction.reply('(╯°□°）╯︵ ┻━┻');
		await sleep(1000);
		await interaction.editReply(`┬─┬ ノ( ゜-゜ノ)`);	
	}
};
