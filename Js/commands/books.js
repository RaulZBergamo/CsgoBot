const { SlashCommandBuilder } = require('@discordjs/builders');

const books = [
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "imageLink": "images/things-fall-apart.jpg",
        "language": "English",
        "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "imageLink": "images/fairy-tales.jpg",
        "language": "Danish",
        "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
    {
        "author": "Dante Alighieri",
        "country": "Italy",
        "imageLink": "images/the-divine-comedy.jpg",
        "language": "Italian",
        "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
    {
        "author": "Unknown",
        "country": "Sumer and Akkadian Empire",
        "imageLink": "images/the-epic-of-gilgamesh.jpg",
        "language": "Akkadian",
        "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
        "pages": 160,
        "title": "The Epic Of Gilgamesh",
        "year": -1700
    },
    {
        "author": "Unknown",
        "country": "Achaemenid Empire",
        "imageLink": "images/the-book-of-job.jpg",
        "language": "Hebrew",
        "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
        "pages": 176,
        "title": "The Book Of Job",
        "year": -600
    },
]
    
const exampleEmbed = {
	color: 0x0099ff,
	title: 'Matchs',
	url: 'https://discord.js.org',
	author: {
		name: 'HLTV',
		icon_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4102e83a14a6b68a-profile_image-300x300.jpeg',
		url: 'https://www.hltv.org/',
	},
	fields: []
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('books')
		.setDescription('Replies with a book list!'),
	async execute(interaction) {

        exampleEmbed.fields.push

        // books.forEach(e => exampleEmbed.fields.push( {name: e['title'], value: e['author']} ));

        for (let i = 0; i < books.length; i++) {

            exampleEmbed.fields.push( {name: books[i]['title'], value: books[i]['author']} );
            // exampleEmbed.fields.push( {name: '\u200b', value: '\u200b'} );
        }

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};
