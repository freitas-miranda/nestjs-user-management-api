import Usuario from '../../domain/entity/Usuario';

export default interface UsuarioRepository {
  save(usuario: Usuario): Promise<{ id: string }>;
  update(usuario: Usuario): Promise<void>;
  delete(id: string): Promise<void>;

  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario>;
}
