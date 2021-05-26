import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles implements MigrationInterface {

    public name = '2-ROLES';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
    }

}
