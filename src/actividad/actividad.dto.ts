/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsDateString } from 'class-validator';

export class ActividadDTO {
  @IsString()
  titulo: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  cupoMaximo: number;

  @IsInt()
  estado: number;
}