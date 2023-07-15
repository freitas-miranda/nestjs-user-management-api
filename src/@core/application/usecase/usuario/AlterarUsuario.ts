import { UsuarioRepository } from '../../repository/UsuarioRepository';

export class AlterarUsuario {
  constructor(private repo: UsuarioRepository) {}

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
