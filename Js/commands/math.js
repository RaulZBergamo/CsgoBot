const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('math')
		.setDescription('Supreme math calcs!')
        .addNumberOption(option => option.setName('fnumber').setDescription('Enter a number'))
        .addNumberOption(option => option.setName('snumber').setDescription('Enter a number')),
	async execute(interaction) {

        const fnumber = interaction.options.getNumber('fnumber');
        const snumber = interaction.options.getNumber('snumber');

        const result = fnumber + snumber;

		await interaction.reply(`Resultado: ${result}`);
	},
};