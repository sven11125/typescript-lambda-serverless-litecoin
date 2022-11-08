import {MigrationInterface, QueryRunner} from "typeorm";

export class baseStructure1623318640866 implements MigrationInterface {
    name = 'baseStructure1623318640866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `app_setting` (`id` int NOT NULL, `code` varchar(100) NOT NULL, `value` text NOT NULL, `created_at` int NOT NULL, `updated_at` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL, `wallet_id` varchar(255) NULL, `wallet_address` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_wallet` (`id` int NOT NULL, `user_id` int NOT NULL, `wallet_code` varchar(50) NOT NULL, `address` varchar(150) NOT NULL, `created_at` int NOT NULL, `updated_at` int NOT NULL, `status` varchar(30) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user_wallet`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `app_setting`");
    }

}
