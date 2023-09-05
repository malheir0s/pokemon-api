// use pipes, delete deps
import { IsArray, IsNumber, IsNumberString, IsString } from 'class-validator';

export class PokemonDTO {
  @IsNumberString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsArray()
  types: string[];

  @IsString()
  url: string;

  @IsArray()
  abilities: string[];
}
