const Logger = require('../core/Util/Logger');

/**
 * Ready event
 * @param  {object} extra
 */
module.exports = (extra) => {

	const { client } = extra;
	Logger.info('Ready', `Sibyl system is ready on the bot: ${client.user.tag}`)

}