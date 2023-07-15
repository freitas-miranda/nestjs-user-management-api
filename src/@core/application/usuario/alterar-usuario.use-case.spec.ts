import { UsuarioRepositoryInMemory } from '../../infra/database/in-memory/usuario.repository-in-memory';
import { AlterarUsuarioUseCase } from './alterar-usuario.use-case';
import { CriarUsuarioUseCase } from './criar-usuario.use-case';

describe('AlterarUsuarioUseCase testes', () => {
  let repo: UsuarioRepositoryInMemory;
  let useCaseUpdate: AlterarUsuarioUseCase;
  let useCaseCreate: CriarUsuarioUseCase;

  beforeEach(async () => {
    repo = new UsuarioRepositoryInMemory();
    useCaseUpdate = new AlterarUsuarioUseCase(repo);
    useCaseCreate = new CriarUsuarioUseCase(repo);
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
