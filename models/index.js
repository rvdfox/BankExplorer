if (!global.hasOwnProperty('db')) {
	var Sequelize = require('sequelize')
		, sequelize = null

	process.env.DATABASE_URL = 'postgres://zldhvzgguaeptd:b5e31084d5a5e1a1d98232dc45858248052798a95da13cca6b4680d8c490b7cf@ec2-54-75-224-168.eu-west-1.compute.amazonaws.com:5432/d19aduk9psifpe?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';

	if (process.env.DATABASE_URL) {
		// the application is executed on Heroku ... use the postgres database
		var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
		sequelize = new Sequelize(process.env.DATABASE_URL, {
			dialect:  'postgres',
			protocol: 'postgres',
			port:     match[4],
			host:     match[3],
			logging:  true //false
		})
	} else {
		// the application is executed on the local machine ... use mysql
		sequelize = new Sequelize('example-app-db', 'root', null)
	}

	console.log('DIRNAME =====> ',__dirname);
	global.db = {
		Sequelize: Sequelize,
		sequelize: sequelize,
		bank:      sequelize.import(__dirname + '/Bank'),
		branch:    sequelize.import(__dirname + '/Branch')		 
		// add your other models here
	}

	/*
		Associations can be defined here. E.g. like this:
		global.db.User.hasMany(global.db.SomethingElse)
	*/
	global.db.bank.hasMany(global.db.branch,{
		foreignKey:'bank_id'
	})

	global.db.branch.belongsTo(global.db.bank,{
		foreignKey:'bank_id'
	})
}

module.exports = global.db