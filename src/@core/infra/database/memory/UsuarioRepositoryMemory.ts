import Usuario from '@entity/Usuario';
import UsuarioRepository from '@repository/UsuarioRepository';

export default class UsuarioRepositoryMemory implements UsuarioRepository {
  items = [];

  async save(usuario: Usuario): Promise<{ id: string }> {
    this.items.push(usuario.toJSON());
    return { id: usuario.id };
  }

  async update(usuario: Usuario): Promise<void> {
    const usuarioExistente = this.items.find((item) => item.id === usuario.id);
    if (!usuarioExistente) return;

    usuarioExistente.nome = usuario.nome;
    usuarioExistente.email = usuario.email;
    usuarioExistente.senha = usuario.senha;
  }

  async delete(id: string): Promise<void> {
    const usuarioIndex = this.items.findIndex((item) => item.id === id);
    this.items.splice(usuarioIndex, 1);
  }

  async findAll(): Promise<Usuario[]> {
    return this.items;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = this.items.find((item) => item.id === id);
    if (!usuario) throw new Error('Usuário não encontrado!');
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = this.items.find((item) => item.email === email);
    return usuario;
  }
}
