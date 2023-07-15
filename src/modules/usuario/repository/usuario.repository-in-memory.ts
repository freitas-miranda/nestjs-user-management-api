import Usuario from '../usuario.entity';
import { UsuarioRepositoryInterface } from './usuario.repository-interface';

export class UsuarioRepositoryInMemory implements UsuarioRepositoryInterface {
  items: Usuario[] = [];

  async create(usuario: Usuario): Promise<Usuario> {
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

  async update(usuario: Usuario): Promise<Usuario> {
    const usuarioExistente = this.items.find((item) => item.id === usuario.id);

    usuarioExistente.nome = usuario.nome;
    usuarioExistente.email = usuario.email;
    usuarioExistente.senha = usuario.senha;

    return usuario;
  }
}
