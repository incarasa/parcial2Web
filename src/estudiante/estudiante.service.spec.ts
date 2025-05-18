/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un estudiante válido', async () => {
    const estudiante = repository.create({
      numeroCedula: 123456789,
      nombre: 'Laura Gómez',
      correo: 'laura@uni.edu',
      programa: 'Ingeniería',
      semestre: 5,
    });

    const result = await service.crearEstudiante(estudiante);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.nombre).toBe('Laura Gómez');
  });

  it('create should throw an exception if semestre is not between 1 and 10', async () => {
  const estudianteInvalido = {
    numeroCedula: 123456789,
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    programa: 'Ingeniería',
    semestre: 0, // Inválido
  };

  await expect(service.crearEstudiante(estudianteInvalido as any)).rejects.toHaveProperty(
    'message',
    expect.stringContaining('El semestre debe estar entre 1 y 10') // o mensaje según el validador
    );
  });
  
});
