'use strict'
module.exports = function(sequelize, DataTypes) {
	var branch = sequelize.define('branch', {
  		ifsc: {
  			type:DataTypes.STRING,
  			primaryKey: true
  		},
  		branch: DataTypes.STRING,
  		address: DataTypes.STRING,
  		city: DataTypes.STRING,
  		district: DataTypes.STRING,
  		state: DataTypes.STRING
  	},{
  		timestamps:false,
  		tableName:'branches'
  	})

  	branch.associate = function(models){
  		branch.belongsTo(models.bank,{
  			foreignKey:'bank_id',
  			sourceKey:'id'
  		})
  	}

  	return branch;
}