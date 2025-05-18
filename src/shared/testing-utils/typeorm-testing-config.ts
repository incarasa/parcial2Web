/* eslint-disable prettier/prettier */
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActividadEntity } from "../../actividad/actividad.entity";
import { EstudianteEntity } from "../../estudiante/estudiante.entity";
import { ReseñaEntity } from "../../reseña/reseña.entity";

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, ActividadEntity, ReseñaEntity],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity, ReseñaEntity]),
];
