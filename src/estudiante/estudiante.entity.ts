/* eslint-disable prettier/prettier */

import { ActividadEntity } from "../actividad/actividad.entity";
import { ReseñaEntity } from "../reseña/reseña.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 numeroCedula: number;

 @Column()
 nombre: string;

 @Column()
 correo: string;

 @Column()
 programa: string;

 @Column()
 semestre: number;

 @OneToMany(() => ReseñaEntity, reseña => reseña.estudiante)
 reseñas: ReseñaEntity[];

 @ManyToMany(() => ActividadEntity, actividad => actividad.estudiantes)
 actividades: ActividadEntity[];

}