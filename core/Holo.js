/*
 * Holo class
 */

class Holo {
	/**
	 * Holo class
	 * @param  {object} settings The settings 
	 * @param  {ClientUser} user A discord user
	 */
	constructor(settings, user) {
		this.name = settings.name;
		this.avatar = settings.avatar;
		this.user = user;
		this.enabled = false;
	}
	
}

module.exports = Holo;