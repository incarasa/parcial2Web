/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseñaModule } from './reseña/reseña.module';
import { EstudianteActividadService } from './estudiante-actividad/estudiante-actividad.service';
import { EstudianteActividadModule } from './estudiante-actividad/estudiante-actividad.module';

@Module({
  imports: [EstudianteModule, ActividadModule, ReseñaModule, EstudianteActividadModule],
  controllers: [AppController],
  providers: [AppService, EstudianteActividadService],
})
export class AppModule {}
