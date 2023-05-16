import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface TeamAttributes {
  id: number;
  teamName: string;
}

export type TeamCreationalAttributes = Omit<TeamAttributes, 'id'>;

export default class TeamModel extends Model
  <TeamAttributes, TeamCreationalAttributes> implements TeamAttributes {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});
