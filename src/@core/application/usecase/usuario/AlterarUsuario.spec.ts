import { UsuarioRepositoryMemory } from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import { AlterarUsuario } from './AlterarUsuario';
import { CriarUsuario } from './CriarUsuario';

describe('AlterarUsuario testes', () => {
  let repo: UsuarioRepositoryMemory;
  let useCaseCreate: CriarUsuario;
  let useCaseUpdate: AlterarUsuario;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    useCaseCreate = new CriarUsuario(repo);
    useCaseUpdate = new AlterarUsuario(repo);
  });

  it('deve editar um usuario', async () => {
    const usuario = await useCaseCreate.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    const newInfo = {
      nome: 'Alan Freitas',
      email: 'alan@freitas.com',
      senha: '123455',
    };

    await useCaseUpdate.execute(usuario.id, newInfo);

    expect(repo.items).toEqual([{ id: usuario.id, ...newInfo }]);
  });
});
