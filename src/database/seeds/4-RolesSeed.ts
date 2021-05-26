import { MigrationInterface, QueryRunner } from "typeorm";

import { Role } from "src/modules/roles/role.entity";

export class RolesSeed implements MigrationInterface {

    public name = '4-ROLES-SEED';

    public async up(queryRunner: QueryRunner): Promise<void> {

        const roles = [
            "SUP_ADMIN",
            "ADMIN"
        ].map(item => {
            const role = new Role();
            role.name = item;
            return role;
        });

        await queryRunner.manager.save(roles);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
