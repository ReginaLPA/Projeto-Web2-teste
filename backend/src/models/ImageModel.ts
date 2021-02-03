//  Esse modul vai criar a relação do nosse server com uma tabela do db, nesse caso vai ser com a tabela ' Pontos Historicos'
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import PontoHistorico from './PontosHistoricosModel'

// Com o @Entity o typeorm vai entender que a classe criada está associada com a tabela chamada ' Pontos Historicos'
@Entity('images')
export default class Images {

  // Coluna primaria do banco de dados
  @PrimaryGeneratedColumn('increment')
  id: number;

  // indica uma coluna qualquer do db
  @Column()
  path: string;

  // * Relacionamento
  // como não é um campo que existe no banco de dados não vamos colocar o @Column nele
  /*
    ManyToOne() n-1, Varias imagens para um ponto historico
    o primeiro parametro é uma função que retornar qual o tipo do retorno 
    o segundo parametro é = dado um orfanato que recebeu, qual o campo desse ponto Historico que retorna o relacionamento inverso, ou seja, o ponto historico em si. 
  */
  
  // vai ter apenas um ponto historico
  @ManyToOne(() => PontoHistorico, pontoHistorico => pontoHistorico.images)
    @JoinColumn({ name: 'pontoHistorico_id' })
    pontoHistorico: PontoHistorico
}