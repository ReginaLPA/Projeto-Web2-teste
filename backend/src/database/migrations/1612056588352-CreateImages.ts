import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateImages1612056588352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },

                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'pontoHistorico_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImagepontoHistorico',
                    columnNames: ['pontoHistorico_id'],
                    referencedTableName: 'pontosHistoricos',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
