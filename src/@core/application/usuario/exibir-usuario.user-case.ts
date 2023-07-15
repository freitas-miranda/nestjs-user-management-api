import { Usuario } from 'src/@core/domain/usuario/usuario.entity';
import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';

export class ExibirUsuarioUseCase {
  constructor(private repo: UsuarioRepositoryInterface) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.repo.findById(id);

    if (!usuario) {
      throw new Error('Usuario não encontrado');
    }
    return usuario;
  }
}
