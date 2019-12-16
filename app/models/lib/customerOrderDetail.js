/* jshint indent: 1 */

export default function(sequelize, DataTypes) {
	return sequelize.define('customerOrderDetail', {
		customerOrderDetailID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'customerOrderDetailID'
		},
		customerOrderID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'customerOrder',
				key: 'customerOrderID'
			},
			field: 'customerOrderID'
		},
		foodID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'food',
				key: 'foodID'
			},
			field: 'foodID'
		},
		foodSizeTypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'foodSizeTypeID'
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'count'
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
		tableName: 'customerOrderDetail'
	});
};
