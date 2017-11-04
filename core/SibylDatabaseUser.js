class SibylDatabaseUser {
	/**
	 * Sibyl Database User 
	 * @param  {ClientUser} user The discord user that is connected to the database user
	 * @param {DatabaseManager} databaseManager A database manager
	 */
	constructor(user, databaseManager) {
		this.tag = user.tag;
		this.id = user.id;
		this.holo = {};
		this.psycho_pass = {};
		this._databaseManager = databaseManager;
	}

	update() {
		return this._databaseManager.push(`users/${this.id}`, this);
	} 

}

module.exports = SibylDatabaseUser;