/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';


describe('ReseñaService', () => {
  let service: ReseñaService;
  let reseñaRepo: Repository<ReseñaEntity>;
  let estudianteRepo: Repository<EstudianteEntity>;
  let actividadRepo: Repository<ActividadEntity>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñaService],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    reseñaRepo = module.get(getRepositoryToken(ReseñaEntity));
    estudianteRepo = module.get(getRepositoryToken(EstudianteEntity));
    actividadRepo = module.get(getRepositoryToken(ActividadEntity));
    dataSource = module.get(DataSource);
  });

  it('debería agregar una reseña válida si el estudiante estuvo inscrito en la actividad finalizada', async () => {
    const estudiante = await estudianteRepo.save({
      nombre: 'Ana',
      correo: 'ana@uni.edu',
      programa: 'Ingeniería',
      numeroCedula: 123456789,
      semestre: 6,
    });

    const actividad = await actividadRepo.save({
      titulo: 'Actividad finalizada',
      fecha: '2025-06-01',
      estado: 2,
      cupoMaximo: 10,
    });

    // Relacionar manualmente estudiante <-> actividad
    await dataSource
      .createQueryBuilder()
      .relation(ActividadEntity, 'estudiantes')
      .of(actividad)
      .add(estudiante);

    const reseña = reseñaRepo.create({
      comentario: 'Muy buena actividad',
      calificacion: 5,
      fecha: '2025-06-10',
      estudiante: { id: estudiante.id },
      actividad: { id: actividad.id },
    });

    const result = await service.agregarReseña(reseña);
    expect(result).toBeDefined();
    expect(result.comentario).toBe('Muy buena actividad');
    expect(result.estudiante.id).toBe(estudiante.id);
    expect(result.actividad.id).toBe(actividad.id);
  });

  it('debería lanzar excepción si el estudiante no estuvo inscrito en la actividad', async () => {
    const estudiante = await estudianteRepo.save({
      nombre: 'Carlos',
      correo: 'carlos@uni.edu',
      programa: 'Matemáticas',
      numeroCedula: 987654321,
      semestre: 4,
    });

    const actividad = await actividadRepo.save({
      titulo: 'Actividad sin Carlos',
      fecha: '2025-06-01',
      estado: 2,
      cupoMaximo: 10,
    });

    const reseña = reseñaRepo.create({
      comentario: 'Intento de reseña',
      calificacion: 3,
      fecha: '2025-06-10',
      estudiante: { id: estudiante.id },
      actividad: { id: actividad.id },
    });

    await expect(service.agregarReseña(reseña)).rejects.toHaveProperty(
      'message',
      'El estudiante no estuvo inscrito en la actividad'
    );
  });
});