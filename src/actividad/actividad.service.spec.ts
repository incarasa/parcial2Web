/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una actividad válida', async () => {
    const actividad = repository.create({
      titulo: 'Taller de introduccion a NestJS',
      fecha: '2025-06-01',
      cupoMaximo: 10,
      estado: 0,
    });

    const result = await service.crearActividad(actividad);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.titulo).toBe(actividad.titulo);
  });

  it('debería lanzar excepción si el título es muy corto', async () => {
    const actividadInvalida = {
      titulo: 'Corto',
      fecha: '2025-06-01',
      cupoMaximo: 10,
      estado: 0,
    };

    await expect(service.crearActividad(actividadInvalida as any)).rejects.toHaveProperty(
      'message',
      'La longitud del titulo debe ser de mínimo 15'
    );
  });

  it('debería lanzar excepción si el título contiene símbolos', async () => {
    const actividadInvalida = {
      titulo: 'Taller con @Nest!',
      fecha: '2025-06-01',
      cupoMaximo: 10,
      estado: 0,
    };

    await expect(service.crearActividad(actividadInvalida as any)).rejects.toHaveProperty(
      'message',
      'El titulo no debe contener símbolos'
    );
  });


});