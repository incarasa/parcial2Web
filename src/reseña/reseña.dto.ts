/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsDateString } from 'class-validator';

export class ReseñaDTO {
  @IsString()
  comentario: string;

  @IsInt()
  calificacion: number;

  @IsDateString()
  fecha: string;

}