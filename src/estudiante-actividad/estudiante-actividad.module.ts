/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { EstudianteActividadController } from './estudiante-actividad.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity])],
    providers: [EstudianteActividadService],
    exports: [EstudianteActividadService],
    controllers: [EstudianteActividadController],})
export class EstudianteActividadModule {}
