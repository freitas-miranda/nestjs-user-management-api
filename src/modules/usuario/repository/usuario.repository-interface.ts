import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import Usuario from '../usuario.entity';

export interface UsuarioRepositoryInterface {
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario>;
  update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<void>;
  delete(id: string): Promise<void>;
}
