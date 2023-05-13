import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface UserAttribute {
  id: number;
  username: string,
  role: string,
  email: string,
  password: string,
}

export type UserCreationalAttributes = Omit<UserAttribute, 'id'>;

export default class User extends Model<UserAttribute, UserCreationalAttributes> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});
