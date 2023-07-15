import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
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

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<void> {
    const usuarioExistente = this.items.find((item) => item.id === id);

    usuarioExistente.nome = updateUsuarioDto.nome;
    usuarioExistente.email = updateUsuarioDto.email;
    usuarioExistente.senha = updateUsuarioDto.senha;
  }

  async delete(id: string): Promise<void> {
    const usuarioIndex = this.items.findIndex((item) => item.id === id);
    this.items.slice(usuarioIndex, 1);
  }
}
