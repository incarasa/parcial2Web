/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ActividadDTO } from './actividad.dto';
import { ActividadEntity } from './actividad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)

export class ActividadController {
    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async crearActividad(@Body() actividadDto: ActividadDTO): Promise<ActividadEntity> {
      const actividad = plainToInstance(ActividadEntity, actividadDto);
      return await this.actividadService.crearActividad(actividad);
    }
  
    @Post(':id/estado')
    async cambiarEstado(
      @Param('id') id: string,
      @Body() body: { estado: number },
    ): Promise<ActividadEntity> {
      return await this.actividadService.cambiarEstado(id, body.estado);
    }
  
    @Get('fecha/:fecha')
    async findAllActividadesByDate(
      @Param('fecha') fecha: string,
    ): Promise<ActividadEntity[]> {
      return await this.actividadService.findAllActividadesByDate(fecha);
    }

    @Get()
    async findAll(): Promise<ActividadEntity[]> {
    return await this.actividadService.findAll(); // esta función debe existir en tu servicio
}
}
