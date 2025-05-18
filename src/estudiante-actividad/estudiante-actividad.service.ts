/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteActividadService {
    constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>,
   
       @InjectRepository(ActividadEntity)
       private readonly actividadRepository: Repository<ActividadEntity>
   ) {}

   async inscribirseActividad(estudianteId: string, actividadId: string): Promise<ActividadEntity> {

      //Encontrar al estudiante
       const estudiante = await this.estudianteRepository.findOne({
         where: {id: estudianteId},
         relations: ['actividades']
        });
       
       if (!estudiante)
         throw new BusinessLogicException("El estudiante no existe", BusinessError.NOT_FOUND);


      //Encontrar la actividad
      const actividad = await this.actividadRepository.findOne({
       where: {id: actividadId},
       relations: ['estudiantes']
      })
      
      if (!actividad)
        throw new BusinessLogicException("La actividad no fue encontrada", BusinessError.NOT_FOUND);
  
      //Estado de la actividad
      if (actividad.estado !== 0)
       throw new BusinessLogicException("La actividad no está disponible para inscripción", BusinessError.PRECONDITION_FAILED);

      //Cupos de la actividad
      if (actividad.estudiantes.length >= actividad.cupoMaximo) {
        throw new BusinessLogicException("La actividad no tiene cupos disponibles", BusinessError.PRECONDITION_FAILED);
      }

      //Validar inscripción previa
      if(actividad.estudiantes.some(e => e.id === estudiante.id)) {
        throw new BusinessLogicException("Ya existe información previa del estudiante", BusinessError.PRECONDITION_FAILED);
      }

      actividad.estudiantes.push(estudiante);
      await this.actividadRepository.save(actividad);

      return actividad;
     }

}
