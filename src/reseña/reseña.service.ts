/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';

@Injectable()
export class ReseñaService {
    constructor(
       @InjectRepository(ReseñaEntity)
       private readonly reseñaRepository: Repository<ReseñaEntity>,

       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>,

       @InjectRepository(ActividadEntity)
       private readonly actividadRepository: Repository<ActividadEntity>

   ){}

    async agregarReseña(reseña: ReseñaEntity): Promise<ReseñaEntity> {
        // Validación básica: debe tener estudiante y actividad (al menos los IDs)
        if (!reseña.estudiante?.id || !reseña.actividad?.id) {
          throw new BusinessLogicException(
            'La reseña debe tener un estudiante y una actividad asociados',
            BusinessError.PRECONDITION_FAILED,
          );
        }
    
        // Buscar el estudiante completo con sus actividades
        const estudiante = await this.estudianteRepository.findOne({
          where: { id: reseña.estudiante.id },
          relations: ['actividades'],
        });
    
        if (!estudiante) {
          throw new BusinessLogicException(
            'Estudiante no encontrado',
            BusinessError.NOT_FOUND,
          );
        }
    
        // Buscar la actividad completa con sus estudiantes
        const actividad = await this.actividadRepository.findOne({
          where: { id: reseña.actividad.id },
          relations: ['estudiantes'],
        });
    
        if (!actividad) {
          throw new BusinessLogicException(
            'Actividad no encontrada',
            BusinessError.NOT_FOUND,
          );
        }
    
        // Validar estado de la actividad
        if (actividad.estado !== 2) {
          throw new BusinessLogicException(
            'La actividad no está finalizada',
            BusinessError.PRECONDITION_FAILED,
          );
        }
    
        // Validar que el estudiante haya estado inscrito
        const inscrito = actividad.estudiantes.some(e => e.id === estudiante.id);
        if (!inscrito) {
          throw new BusinessLogicException(
            'El estudiante no estuvo inscrito en la actividad',
            BusinessError.PRECONDITION_FAILED,
          );
        }
    
        // Asignar entidades completas (no solo el id)
        reseña.estudiante = estudiante;
        reseña.actividad = actividad;
    
        return await this.reseñaRepository.save(reseña);
}       


}
