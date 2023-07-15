import { Usuario } from 'src/@core/domain/entity/Usuario';
import { UsuarioRepository } from '../../repository/UsuarioRepository';

export class ExibirUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.repo.findById(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado!');
    }
    return usuario;
  }
}
