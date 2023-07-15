import { Usuario } from 'src/@core/domain/usuario/usuario.entity';
import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';

export class CriarUsuarioUseCase {
  constructor(private repo: UsuarioRepositoryInterface) {}

  async execute(input: CriarUsuarioInput): Promise<Usuario> {
    const usuario = Usuario.create(input.nome, input.email, input.senha);
    await this.repo.insert(usuario);
    return usuario.toJSON();
  }
}

export type CriarUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
};
