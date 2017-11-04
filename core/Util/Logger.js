const chalk = require('chalk');
const moment = require('moment');
const notifier = require('node-notifier');

const toUpper = string => string;

class Logger {

    /**
     * Generate a time stamp
     * @return {string} Returns a timestamp
     */        
	static time() {

		return moment().format('HH:mm:ss');

	}

    /**
     * Logger
     * @param  {function} style   A chalk function
     * @param  {string} name    The name of the log
     * @param  {string} message The content of the log
     */
	static log(style, name, message) {

		if(typeof style !== "function") {
			style = chalk.white;
		}

		// Log multiple

		if(Array.isArray(message)) {
			for(const item of message) console.log(style.bold(`• ${Logger.time()} ${toUpper(name)} »`), style(item));
			return false;
		} else {

			return console.log(style.bold(`• ${Logger.time()} ${toUpper(name)} »`), style(message));

		}

		// Log normally

	}

	static success(name, message) {
        return Logger.log(chalk.green, name, message);
    }

    static error(name, message, stacktrace) {
    	notifier.notify({
    	  'title': `Error: ${name}`,
    	  'message': message
    	});
        return Logger.log(chalk.red, name, message, stacktrace);

    }

    static warn(name, message) {
        return Logger.log(chalk.yellow, name, message);
    }

    static info(name, message) {
        return Logger.log(chalk.blue, name, message);
    }

    static debug(name, message) {
        return Logger.log(chalk.magenta, name, message);
    }

    static fatal(name, message, stacktrace) {
        return Logger.log(chalk.bgRed.white, name, message, stacktrace);
    }

}

module.exports = Logger;