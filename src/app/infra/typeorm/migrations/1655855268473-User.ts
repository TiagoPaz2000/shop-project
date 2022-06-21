import {
    MigrationInterface,
    QueryRunner,
    Table,
} from 'typeorm';

export class User implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'firstName',
            type: 'string',
          },
          {
            name: 'lastName',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
          },
          {
            name: 'password',
            type: 'string',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
