/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('EstudianteActividadService', () => {
  let service: EstudianteActividadService;
  let estudianteRepository: Repository<EstudianteEntity>;
  let actividadRepository: Repository<ActividadEntity>;
  let estudiante: EstudianteEntity;
  let actividad: ActividadEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteActividadService],
    }).compile();

    service = module.get<EstudianteActividadService>(EstudianteActividadService);
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    actividadRepository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));

    // Crear estudiante y actividad base para los tests
    estudiante = await estudianteRepository.save({
      numeroCedula: 123456789,
      nombre: 'Test Estudiante',
      correo: 'test@uni.edu',
      programa: 'Ingeniería',
      semestre: 5,
    });

    actividad = await actividadRepository.save({
      titulo: 'Actividad de prueba',
      fecha: '2024-05-17',
      cupoMaximo: 10,
      estado: 0,
      estudiantes: [],
    });
  });

  // Caso positivo
  it('debería inscribir exitosamente a un estudiante en una actividad abierta', async () => {
    const result = await service.inscribirseActividad(estudiante.id, actividad.id);
    expect(result).toBeDefined();
    expect(result.estudiantes.length).toBe(1);
    expect(result.estudiantes[0].id).toBe(estudiante.id);
  });

  // Caso negativo: estudiante ya inscrito
  it('debería lanzar error si el estudiante ya está inscrito', async () => {
  // Primera inscripción válida
  await service.inscribirseActividad(estudiante.id, actividad.id);

  // Segunda debe fallar
  try {
    await service.inscribirseActividad(estudiante.id, actividad.id);
    fail('No lanzó la excepción esperada');
  } catch (error) {
    expect(error).toBeInstanceOf(BusinessLogicException);
    expect(error.message).toBe('Ya existe información previa del estudiante');
  }
});
});