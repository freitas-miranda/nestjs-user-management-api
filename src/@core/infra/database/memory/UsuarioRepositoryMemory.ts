import { AlterarUsuarioInput } from 'src/@core/application/usecase/usuario/AlterarUsuario';
import { UsuarioRepository } from '../../../application/repository/UsuarioRepository';
import { Usuario } from 'src/@core/domain/entity/Usuario';

export class UsuarioRepositoryMemory implements UsuarioRepository {
  items: Usuario[] = [];

  async insert(usuario: Usuario): Promise<{ id: string }> {
    this.items.push(usuario);
    return { id: usuario.id };
  }

  async findAll(): Promise<Usuario[]> {
    return this.items;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = this.items.find((item) => item.id === id);
    return Usuario.buildExisting(usuario);
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = this.items.find((item) => item.email === email);
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
    this.items.splice(usuarioIndex, 1);
  }
}
