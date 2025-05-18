/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsEmail, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class EstudianteDTO {

  @IsNumber()
  @IsNotEmpty()
  numeroCedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  programa: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  semestre: number;
}