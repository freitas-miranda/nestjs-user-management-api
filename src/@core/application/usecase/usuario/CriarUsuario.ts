import { Usuario } from 'src/@core/domain/entity/Usuario';
import { UsuarioRepository } from '../../repository/UsuarioRepository';

export class CriarUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(input: CriarUsuarioInput): Promise<{ id: string }> {
    const usuario = await Usuario.create(input.nome, input.email, input.senha);
    const retorno = await this.repo.insert(usuario);
    return retorno;
  }
}

export type CriarUsuarioInput = {
  nome: string;
  email: string;
  senha: string;
};
