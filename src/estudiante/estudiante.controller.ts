/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteDTO } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDTO) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':id')
    async findEstudianteById(@Param('id') id: string): Promise<EstudianteEntity> {
        return await this.estudianteService.findEstudianteById(id);
    }
}
