/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

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
           if (/[^a-zA-Z0-9\s]/.test(titulo)) {
               throw new BusinessLogicException("El titulo no debe contener símbolos", BusinessError.PRECONDITION_FAILED);
           }
   
          return await this.actividadRepository.save(actividad);
    }

    async cambiarEstado(actividadId: string, estado: number): Promise<ActividadEntity>{

        const actividad = await this.actividadRepository.findOne({
            where : {id: actividadId},
            relations: ['estudiantes']
        });

        if (!actividad) {
            throw new BusinessLogicException("La actividad no fue encontrada", BusinessError.NOT_FOUND);
        }

        const inscritos = actividad.estudiantes.length;
        const cupo = actividad.cupoMaximo;

        if (estado === 1) { // Cerrada
          const porcentajeLleno = inscritos / cupo;
          if (porcentajeLleno < 0.8) {
            throw new BusinessLogicException(
              'No se puede cerrar la actividad: menos del 80% del cupo está lleno',
              BusinessError.PRECONDITION_FAILED,
            );
          }
        }
    
        if (estado === 2) { // Finalizada
          if (inscritos < cupo) {
            throw new BusinessLogicException(
              'No se puede finalizar la actividad: aún hay cupos disponibles',
              BusinessError.PRECONDITION_FAILED,
            );
          }
        }
    
        // Si pasa las validaciones, se permite el cambio
        actividad.estado = estado;
        return await this.actividadRepository.save(actividad);
    }

    async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
        return await this.actividadRepository.find({ where: { fecha } });
    }

    async findAll(): Promise<ActividadEntity[]> {
  return await this.actividadRepository.find();
}

}