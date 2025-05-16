/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { ActividadService } from 'src/actividad/actividad.service';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';

@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity])],
    providers: [EstudianteService, ActividadService],})
export class EstudianteActividadModule {}
