/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ActividadService {
    constructor(
       @InjectRepository(ActividadEntity)
       private readonly actividadRepository: Repository<ActividadEntity>
   ){}

   async crearActividad(actividad: ActividadEntity): Promise<ActividadEntity> {
   
           const titulo = actividad.titulo;
   
           if (titulo.length < 15) {
               throw new BusinessLogicException("La longitud del titulo debe ser de mínimo 15", BusinessError.PRECONDITION_FAILED);
             }
   
           /* if (!correo.includes('@')) {
               throw new BusinessLogicException("El correo debe contener '@'", BusinessError.PRECONDITION_FAILED);
           } */
   
          return await this.actividadRepository.save(actividad);
    }

    async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
        return await this.actividadRepository.find({ where: { fecha } });
   }

}