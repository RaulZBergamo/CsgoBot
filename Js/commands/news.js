const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default
const express = require('express')

const newsEmbed = {
	color: 0x0049ff,
	title: 'Notícias de hoje',
	url: 'https://www.hltv.org/',
	author: {
		name: 'HLTV',
		icon_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4102e83a14a6b68a-profile_image-300x300.jpeg',
		url: 'https://www.hltv.org/',
	},
	thumbnail: {
		url: 'https://play-lh.googleusercontent.com/chI-8vX4CIbO-pm14tb5UAjip20CwmytQPdz8sBmqNjPqTp1tptpBOZc-aGyYqDesw',
	},
	fields: [],
	footer: {
		text: 'Half-Life TV Unofficial.',
	},
};

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
		
		// let news_list = [];

		newsEmbed.fields = []

		// news.forEach(e => news_list.push('', e['title'] + '.'))

		news.forEach(e => newsEmbed.fields.push({ name: e['title'], value: '\u200b' }))

		// const new_string = news_list.toString().replace(/,/g, '\n');

		// const new_string = news.reduce((acc, cur) => acc += `${cur.title}.\n\n`, "");

		if (interaction.options.getSubcommand() === 'geral') {

			await interaction.reply({ embeds: [newsEmbed] });

		} else if (interaction.options.getSubcommand() === 'especifica') {

			const index = interaction.options.getInteger('index');

			if (index >= 0 && index < news.length) {
				await interaction.reply(`${news[index]['title']}\n\n${news[index]['description']}\n${news[index]['link']}`);
			} else if (index < 0 || index >= news.length) {
				await interaction.reply({ content: `O índice colocado não existe, tenta entre 0 e ${news.length - 1}.`, ephemeral: true });
			}
		}
	},
};