import { MigrationInterface, QueryRunner } from "typeorm";

import { Role } from "src/modules/roles/role.entity";
import { User } from "src/modules/users/user.entity";

export class UsersSeed implements MigrationInterface {

    public name = '5-USERS-SEED';

    public async up(queryRunner: QueryRunner): Promise<void> {

        const roles = await queryRunner.connection
        .getRepository(Role)
        .createQueryBuilder("role")
        .getMany();

        const users = [
            {
                email: "supadmin@project.fr",
                password: "secret",
                roles: [ 'SUP_ADMIN', 'ADMIN' ]
            },
            {
                email: "admin@project.fr",
                password: "secret",
                roles: [ 'ADMIN' ]
            },
        ].map(item => {
            const user = new User();
            user.email = item.email;
            user.password = item.password;
            user.roles = roles.filter((role) => item.roles.includes(role.name));
            return user;
        });

        await queryRunner.manager.save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
