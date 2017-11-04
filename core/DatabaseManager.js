/*
 * Database manager to 
 * organise and make things
 * quicker
 */

class DatabaseManager {

	/**
	 * Database manager to organise and make things quicker
	 * @param  {object} info An object containing the database information
	 */
	constructor(info) {

		this.firebase = require('firebase-admin');
		this.info = {
			credential: this.firebase.credential.cert(info.serviceaccount),
			databaseURL: info.databaseURL
		};
		this.firebase.initializeApp(this.info);
		this.database = this.firebase.database();

	}

	/**
	 * Pull data from the databse
	 * @param  {string} ref The path where to pull the data from
	 * @return {object}     The data at the given path
	 */	
	get(ref) {

		return new Promise((resolve, reject) => {
			this.database.ref(ref).once('value', snapshot => {
				let value = snapshot.val() || {};
				resolve(value);
			}).catch(err => reject);
		});

	}

	/**
	 * Push data to the database
	 * @param  {string} ref  The path where to pull the data from
	 * @param  {object} data The data that will be pushed to the database
	 * @return {Promise}
	 */
	push(ref, data) {

		return new Promise((resolve, reject) => {
			this.database.ref(ref).set(data)
			.then(resolve)
			.catch(reject);
		});

	}

}

module.exports = DatabaseManager;