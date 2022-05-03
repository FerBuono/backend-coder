const fs = require('fs');
const moment = require('moment');

class Messages {
    constructor(path) {
        this.path = path;
    };

    async save(user, message) {
        try {
            const content = await fs.promises.readFile(this.path, 'utf8');
            const array = JSON.parse(content);
            
            const messages = [...array, {user, time: `${moment().format('L')} ${moment().format('LTS')}`, message}];
            await fs.promises.writeFile(this.path, JSON.stringify(messages));
        } catch (error) {
            console.log(error);
        };
    };

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(content);      
        } catch (error) {
            console.log(error);
        };
    };
};

module.exports = Messages;