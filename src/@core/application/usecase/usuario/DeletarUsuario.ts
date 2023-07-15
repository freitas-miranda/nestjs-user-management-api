import { UsuarioRepository } from '../../repository/UsuarioRepository';

export class DeletarUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
