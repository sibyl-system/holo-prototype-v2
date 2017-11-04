// Sibyl System
// Holo prototype v2

// Discord
const Keys = require('./keychain');
const { Client, RichEmbed } = require('discord.js');
const client = new Client;
// Other
const databaseDetails = require('./database');
const databaseManager = new (require('./core/DatabaseManager'))(databaseDetails);

/*
 * Events
 */
client.on('message', message => { 
	require('./events/message.js')(message ,{ client, databaseManager })
});
client.on('messageUpdate', (old, message) => { 
	require('./events/message.js')(message ,{ client, databaseManager })
});
client.on('ready', () => { require('./events/ready.js')({ client })});

client.login(Keys.sibylAccount);

process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error.stack);
});