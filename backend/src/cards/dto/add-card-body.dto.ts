import { IsNotEmpty, IsString } from 'class-validator';

export class AddCardBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  hint: string;
}
