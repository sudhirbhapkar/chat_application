import { DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/database';

export const Message = getSequelizeInstance().define('messages', {
    message_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sender_user_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_user_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    epoch: { type: DataTypes.BIGINT, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.DATE,  allowNull: false },
    updated_at: {  type: DataTypes.DATE,  allowNull: true }
},{
    timestamps: false // Disable automatic createdAt/updatedAt fields
});
