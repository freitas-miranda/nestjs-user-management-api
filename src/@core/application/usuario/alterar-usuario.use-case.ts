import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';

export class AlterarUsuarioUseCase {
  constructor(private repo: UsuarioRepositoryInterface) {}

  async execute(id: string, input: AlterarUsuarioInput) {
    const usuario = await this.repo.findById(id);

    usuario.nome = input.nome;
    usuario.email = input.email;
    usuario.senha = input.senha;

    await this.repo.update(id, usuario);
  }
}

export type AlterarUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
};
