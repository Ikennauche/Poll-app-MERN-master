const mongoose = require('mongoose');

let db = 'vote';



mongoose.set('useCreateIndex',true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
//mongoose.connect(`mongodb://localhost/${db}`, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error'));
mongoose.connection.once('open', () => console.log('mongodb connected'));

module.exports.User =  require('./user');
module.exports.Poll =  require('./poll');
