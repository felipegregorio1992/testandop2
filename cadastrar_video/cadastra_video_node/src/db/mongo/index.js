const startDB = require('./mongo');

class Loaders {
    start() {
        startDB();
    }
}

module.exports = new Loaders();