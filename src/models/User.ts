import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string; // <--- CAMBIO: Agrega 'declare' y quita el '!'

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string; // <--- CAMBIO

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string; // <--- CAMBIO IMPORTANTE
    
    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare confirmed: boolean; // <--- CAMBIO
}

export default User;