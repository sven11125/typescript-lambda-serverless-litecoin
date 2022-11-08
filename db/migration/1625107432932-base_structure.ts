import {MigrationInterface, QueryRunner} from "typeorm";

export class baseStructure1625107432932 implements MigrationInterface {
    name = 'baseStructure1625107432932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_wallet` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `user_wallet` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `user_wallet` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_wallet` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `user_wallet` ADD `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user_wallet` ADD PRIMARY KEY (`id`)");
    }

}
