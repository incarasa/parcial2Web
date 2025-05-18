/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActividadEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 titulo: string;

 @Column()
 fecha: string;

 @Column()
 cupoMaximo: number;

 @Column()
 estado: number;

 @OneToMany(() => ReseñaEntity, reseña => reseña.actividad)
  reseñas: ReseñaEntity[];

  @ManyToMany(() => EstudianteEntity, estudiante => estudiante.actividades)
  @JoinTable()
    estudiantes: EstudianteEntity[];

}