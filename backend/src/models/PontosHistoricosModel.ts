//  Esse modul vai criar a relação do nosse server com uma tabela do db, nesse caso vai ser com a tabela ' PontoHistoricos'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import Image from './ImageModel'

// Com o @Entity o typeorm vai entender que a classe criada está associada com a tabela chamada ' PontoHistoricos'
@Entity('pontosHistoricos')
export default class  PontoHistorico {

  // Coluna primaria do banco de dados
  @PrimaryGeneratedColumn('increment')
  id: number;

  // indica uma coluna qualqeur do db
  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  accepted: boolean;

  
  @OneToMany( () => Image, image => image.pontoHistorico, {
    cascade: ['insert', 'update', 'remove'] // cascade = fazer algo automaticament, sempre que a gnt criar um ponto Historico ou alterar o cascade vai automaticamente realizar as alterações nas imagens relacionadas com ele
  })
  @JoinColumn({ name: 'pontoHistorico_id'}) // nome da coluna que vai armazena o relacionamento do ponto historico com a imagem
  images: Image[]; // Image[] porque pode ter varias imagens então é um array
}