import { AlterarUsuarioInput } from 'src/@core/application/usuario/alterar-usuario.use-case';
import { UsuarioRepositoryInterface } from '../../../domain/usuario/usuario.repository-interface';
import { Usuario } from 'src/@core/domain/usuario/usuario.entity';

export class UsuarioRepositoryInMemory implements UsuarioRepositoryInterface {
  items: Usuario[] = [];

  async insert(usuario: Usuario): Promise<Usuario> {
    this.items.push(usuario);
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.items;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = this.items.find((item) => item.id === id);
    return usuario;
  }

  async update(id: string, input: AlterarUsuarioInput): Promise<void> {
    const usuarioExistente = this.items.find((item) => item.id === id);
    if (!usuarioExistente) return;

    usuarioExistente.nome = input.nome;
    usuarioExistente.email = input.email;
    usuarioExistente.senha = input.senha;
  }

  async delete(id: string): Promise<void> {
    const usuarioIndex = this.items.findIndex((item) => item.id === id);
    this.items.slice(usuarioIndex, 1);
  }
}
