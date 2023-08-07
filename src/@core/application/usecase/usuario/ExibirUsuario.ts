import Usuario from '@entity/Usuario';
import UsuarioRepository from '@repository/UsuarioRepository';

export default class ExibirUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.repo.findById(id);
    delete usuario['senhaHash'];
    delete usuario['senhaSalt'];
    return usuario;
  }
}
