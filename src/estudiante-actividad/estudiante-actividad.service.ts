/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
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
       const estudiante = await this.estudianteRepository.findOne({where: {id: estudianteId}});
       if (!estudiante)
         throw new BusinessLogicException("El estudiante no existe", BusinessError.NOT_FOUND);
     
       const actividad = await this.actividadRepository.findOne({where: {id: actividadId}})
       if (!actividad)
         throw new BusinessLogicException("La actividad no fue encontrada", BusinessError.NOT_FOUND);
   
       if (actividad.cupoMaximo <= 0)
        throw new BusinessLogicException("La actividad no tiene cupos disponibles", BusinessError.PRECONDITION_FAILED);

       if (actividad.estado !== 0)
        throw new BusinessLogicException("La actividad no está disponible para inscripción", BusinessError.PRECONDITION_FAILED);

       actividad.estudiantes = [...(actividad.estudiantes || []), estudiante];
       return await this.actividadRepository.save(estudiante);
     }

}
