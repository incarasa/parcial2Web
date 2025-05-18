/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseñaModule } from './reseña/reseña.module';
import { EstudianteActividadModule } from './estudiante-actividad/estudiante-actividad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ActividadEntity } from './actividad/actividad.entity';
import { ReseñaEntity } from './reseña/reseña.entity';


@Module({
  imports: [EstudianteModule, ActividadModule, ReseñaModule, EstudianteActividadModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'parcial2',
     entities: [EstudianteEntity, ActividadEntity, ReseñaEntity],
     dropSchema: true,
     synchronize: true,
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
