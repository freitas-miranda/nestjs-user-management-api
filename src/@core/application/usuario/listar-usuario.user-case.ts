import { Usuario } from 'src/@core/domain/usuario/usuario.entity';
import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';

export class ListarUsuarioUseCase {
  constructor(private repo: UsuarioRepositoryInterface) {}

  async execute(): Promise<Usuario[]> {
    return this.repo.findAll();
  }
}
