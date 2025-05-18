/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ReseñaService } from './reseña.service';
import { ReseñaDTO } from './reseña.dto';
import { ReseñaEntity } from './reseña.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('resenas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseñaController {
    constructor(private readonly reseñaService: ReseñaService) {}

    @Post()
    async agregarReseña(@Body() reseñaDto: ReseñaDTO): Promise<ReseñaEntity> {
    const reseña = plainToInstance(ReseñaEntity, reseñaDto);
    return await this.reseñaService.agregarReseña(reseña);
  }
    
}
