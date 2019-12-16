/* jshint indent: 1 */

export default function(sequelize, DataTypes) {
	return sequelize.define('customerOrder', {
		customerOrderID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'customerOrderID'
		},
		customerID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'customer',
				key: 'customerID'
			},
			field: 'customerID'
		},
		refID: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'refID'
		},
		statusID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'statusID'
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updatedAt'
		}
	}, {
		tableName: 'customerOrder'
	});
};
