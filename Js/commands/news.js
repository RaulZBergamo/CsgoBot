const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default
const express = require('express')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Return the today news!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('geral')
				.setDescription('Mostra todas as notícias!')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('especifica')
				.setDescription('Mostra uma notícia especifica')
				.addIntegerOption(option => option.setName('index').setDescription('índice da notícia!'))	
		),
	async execute(interaction) {

		const news = await HLTV.getNews()	
		
		let news_list = [];

		news.forEach(e => news_list.push('', e['title'] + '.'))

		const new_string = news_list.toString().replace(/,/g, '\n')

		if (interaction.options.getSubcommand() === 'geral') {

			await interaction.reply(`${new_string}`);

		} else if (interaction.options.getSubcommand() === 'especifica') {

			const index = interaction.options.getInteger('index');

			if (index >= 0 && index < news.length) {
				await interaction.reply(`${news[index]['title']}\n\n${news[index]['description']}\n${news[index]['link']}`);
			} else if (index < 0 || index >= news.length) {
				await interaction.reply({ content: `O índice colocado não existe, tenta outro :3`, ephemeral: true });
			}
		}
	},
};