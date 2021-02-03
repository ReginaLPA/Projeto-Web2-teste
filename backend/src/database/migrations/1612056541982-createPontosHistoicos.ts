import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createPontosHistoicos1612056541982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // REALIZAR ALTERAÇÕES
        // CRIAR TABELA, CAMPO, ETC

        await queryRunner.createTable(new Table({
            name: 'pontosHistoricos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //NÚMEROS POSITIVO
                    isPrimary: true, // PRIMARRY KEY
                    isGenerated: true, // GERADA AUTOMATICAMENTE
                    generationStrategy: 'increment' //AUTOINCREMENT
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text'
                },
                {
                    name: 'opening_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: "accepted",
                    type: 'boolean',
                    default: false
                  }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // DESFAZER O QUE FOI FEITO NO UP

        await queryRunner.dropTable('pontosHistoricos')
    }

}
