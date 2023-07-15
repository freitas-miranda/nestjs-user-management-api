import { UsuarioRepositoryInMemory } from './../repository/usuario.repository-in-memory';
import { UsuarioService } from '../usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepositoryInMemory: UsuarioRepositoryInMemory;

  beforeEach(async () => {
    usuarioRepositoryInMemory = new UsuarioRepositoryInMemory();
    service = new UsuarioService(usuarioRepositoryInMemory);
  });

  it('deve criar um usuario', async () => {
    const usuario = await service.create({
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    expect(usuarioRepositoryInMemory.items).toEqual([usuario]);
  });
});
