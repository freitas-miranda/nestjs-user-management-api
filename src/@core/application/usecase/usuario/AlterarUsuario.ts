import Nome from '@src/@core/domain/entity/Nome';
import Email from '@src/@core/domain/entity/Email';
import UsuarioRepository from '../../repository/UsuarioRepository';

export default class AlterarUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(id: string, input: AlterarUsuarioInput) {
    const { nome, email } = input;
    const usuario = await this.repo.findById(id);

    if (nome) usuario.nome = new Nome(nome);
    if (email) usuario.email = new Email(email);

    await this.repo.update(usuario);
  }
}

export type AlterarUsuarioInput = {
  nome: string;
  email: string;
};
