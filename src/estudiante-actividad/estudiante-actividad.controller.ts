/* eslint-disable prettier/prettier */
import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { EstudianteActividadService } from './estudiante-actividad.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteActividadController {
  constructor(private readonly estudianteActividadService: EstudianteActividadService) {}

  @Post(':idEstudiante/actividades/:idActividad')
  async inscribirseActividad(
    @Param('idEstudiante') idEstudiante: string,
    @Param('idActividad') idActividad: string): Promise<ActividadEntity> {
        return await this.estudianteActividadService.inscribirseActividad(idEstudiante, idActividad);
  }
}