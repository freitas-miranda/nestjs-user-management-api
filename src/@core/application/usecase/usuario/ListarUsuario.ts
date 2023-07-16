import Usuario from 'src/@core/domain/entity/Usuario';
import UsuarioRepository from '../../repository/UsuarioRepository';

export default class ListarUsuario {
  constructor(private repo: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return this.repo.findAll();
  }
}
