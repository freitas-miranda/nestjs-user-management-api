import Usuario from '@entity/Usuario';
import UsuarioRepository from '@repository/UsuarioRepository';

export default class CriarUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(input: CriarUsuarioInput): Promise<{ id: string }> {
    const { nome, email, senha } = input;

    if (nome.split(' ').length < 2) {
      throw new Error(`Nome inválido!`);
    }

    const usuarioExistente = await this.repo.findByEmail(email);
    if (usuarioExistente) {
      throw new Error(`Já existe usuário cadastrado com este email!`);
    }

    const usuario = await Usuario.create(nome, email, senha);

    const retorno = await this.repo.save(usuario);
    return retorno;
  }
}

export type CriarUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
};
