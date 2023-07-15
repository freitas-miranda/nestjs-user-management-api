import Usuario from '../usuario.entity';

export interface UsuarioRepositoryInterface {
  create(usuario: Usuario): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario>;
}
