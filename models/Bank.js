'use strict'
module.exports = function(sequelize, DataTypes) {
  	var bank = sequelize.define('bank', {
  		id: {
  			type: DataTypes.INTEGER,
  			primaryKey:true
  		},
  		name: DataTypes.STRING
	},{
		timestamps:false,
		tableName:'banks'
	})

  	bank.associate = function(models){
  		bank.hasMany(models.branch,{
  			foreignKey:'bank_id',
  			targetKey:'id'
  		});
  	}

	return bank;
}