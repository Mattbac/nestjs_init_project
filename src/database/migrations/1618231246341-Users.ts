import {getRepository, MigrationInterface, QueryRunner, Table} from "typeorm";
import * as bcrypt from 'bcrypt';

import userSeed from "../seeds/user.seed"

export class Users1618231246341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "role",
                    type: "varchar"
                },
                {
                    name: "password",
                    type: "varchar"
                }
            ]
        }), true);

        const userSeedCrypted = [];
        for (let index = 0; index < userSeed.length; index++) {
            await bcrypt.hash(userSeed[index]['password'], 10).then((value) => {
                userSeedCrypted[index] = {
                    ...userSeed[index],
                    password: value
                };
            });
        }
        await getRepository("users").save(userSeedCrypted);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('users');
    }

}
