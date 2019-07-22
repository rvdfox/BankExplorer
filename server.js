var app = require('./app'),
	port = process.env.PORT || 5000,
	server = require('http').createServer(app),
	db = require('./models');

db.sequelize.sync().then(function(){
	server.listen(port,function(){
		console.log('Server listening on ',port);
	});
})
