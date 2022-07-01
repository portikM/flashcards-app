import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddCardBodyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsDefined()
  @IsString()
  hint: string;
}
