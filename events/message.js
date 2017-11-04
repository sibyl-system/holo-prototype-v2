const Logger = require('../core/Util/Logger');
const { RichEmbed } = require('discord.js');
/**
 * Message Event
 * @param  {message} message 
 * @param  {object} extra 
 */
module.exports = async (message, extra) => {
	
	// Helper variables
	const { databaseManager } = extra;
	const { member, author, content, guild, channel } = message;
	const me = guild.me;
	const prefix = await databaseManager.get('main-config/prefix');
	const ghosts = await databaseManager.get('ghosts');
	let webhooks = await guild.fetchWebhooks();
	let webhook = null;

	// Filters
	if(ghosts.indexOf(author) != -1) return;

	// Permissions
	if(!me.hasPermission('MANAGE_WEBHOOKS')) return channel.send(':warning: Sibyl requires `ADMINISTRATOR` permissions in order to function.');

	// Webhooks
	if(webhooks.exists('name','holo-' + channel.id)) webhook = webhooks.find('name', 'holo-' + channel.id);
	else webhook = await channel.createWebhook(`holo-${channel.id}`, '../../../assets/logo/flat v1.png');

	// Holo
	let holo = await databaseManager.get(`users/${author.id}/holo`) || new Holo({ name: member.displayName, avatar: author.avatarURL }, user);
	if(holo.enabled && !content.startsWith(prefix)) {
		message.delete();
		webhook.send(content, { username: holo.name, avatarURL: holo.avatar });
	}

	// Edit holo
	if(content.startsWith(prefix + 'holo')) {
		switch(content.split(' ')[1]) {

			case 'enable': {
				holo.enabled = true;
				databaseManager.push(`users/${author.id}/holo`, holo);
				channel.send(`:white_check_mark:  Holo enabled`).delete(300);
				break;
			}

			case 'disable': {
				holo.enabled = false;
				databaseManager.push(`users/${author.id}/holo`, holo);
				channel.send(`:negative_squared_cross_mark: Holo disabled`).delete(300);
				break;
			}

			case 'edit': {

				if(content.split(' ').splice(1).length < 3) return channel.send(`:warning: Invalid arguments. Please format like so: \`${prefix}holo edit <name> ; <avatar-url>\``);
				var name = content.split(' ').splice(2).join(' ').split(';')[0];
				var avatar = content.split(' ').splice(2).join(' ').split(';')[1];
				if(!avatar.includes('://')) return channel.send(`:warning: Invalid avatar url`);
				holo.name = name;
				holo.avatar = avatar;			 
				var embed = new RichEmbed()
				.setTitle('Updated holo')
				.setColor(0x4b9ae1)
				.setThumbnail(holo.avatar)
				.setDescription(`Name: ${holo.name}\nAvatar: ${holo.avatar}`);

				databaseManager.push(`users/${author.id}/holo`, holo);
				channel.send({ embed });
			}

		}
	}
}