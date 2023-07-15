import { Usuario } from './usuario.entity';
import { CriarUsuarioInput } from 'src/@core/application/usuario/criar-usuario.use-case';
import { AlterarUsuarioInput } from 'src/@core/application/usuario/alterar-usuario.use-case';

export interface UsuarioRepositoryInterface {
  insert(input: CriarUsuarioInput): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario>;
  update(id: string, input: AlterarUsuarioInput): Promise<void>;
  delete(id: string): Promise<void>;
}
