import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';

export class DeletarUsuarioUseCase {
  constructor(private repo: UsuarioRepositoryInterface) {}

  async execute(id: string) {
    await this.repo.delete(id);
  }
}
