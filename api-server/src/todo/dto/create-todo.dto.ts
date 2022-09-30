import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  title: string;
  content: string;
}
