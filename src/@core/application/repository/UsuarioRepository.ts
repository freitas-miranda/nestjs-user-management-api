import { Usuario } from '../../domain/entity/Usuario';
import { AlterarUsuarioInput } from '../usecase/usuario/AlterarUsuario';
import { CriarUsuarioInput } from '../usecase/usuario/CriarUsuario';

export interface UsuarioRepository {
  insert(input: CriarUsuarioInput): Promise<{ id: string }>;
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario>;
  update(id: string, input: AlterarUsuarioInput): Promise<void>;
  delete(id: string): Promise<void>;
}
