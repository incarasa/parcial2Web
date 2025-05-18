/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
   ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {

        const semestre = estudiante.semestre;
        const correo = estudiante.correo;

        if (semestre < 1 || semestre > 10) {
            throw new BusinessLogicException("El semestre debe estar entre 1 y 10", BusinessError.PRECONDITION_FAILED);
          }

        if (!correo.includes('@') || !correo.includes('.')) {
            throw new BusinessLogicException("El correo debe contener '@' y '.'", BusinessError.PRECONDITION_FAILED);
        }

       return await this.estudianteRepository.save(estudiante);
   }

   async findEstudianteById(id: string): Promise<EstudianteEntity> {
       const estudiante = await this.estudianteRepository.findOne({where: {id}} );
       if (!estudiante)
         throw new BusinessLogicException("El estudiante con el id dado no fue encontrado", BusinessError.NOT_FOUND);
  
       return estudiante;
   }




}
