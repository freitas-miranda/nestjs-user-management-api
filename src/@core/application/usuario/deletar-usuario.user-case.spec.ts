import { UsuarioRepositoryInMemory } from '../../infra/database/in-memory/usuario.repository-in-memory';
import { CriarUsuarioUseCase } from './criar-usuario.use-case';
import { DeletarUsuarioUseCase } from './deletar-usuario.user-case';

describe('DeletarUsuarioUseCase testes', () => {
  let repo: UsuarioRepositoryInMemory;
  let useCaseCreate: CriarUsuarioUseCase;
  let useCaseDelete: DeletarUsuarioUseCase;

  beforeEach(async () => {
    repo = new UsuarioRepositoryInMemory();
    useCaseCreate = new CriarUsuarioUseCase(repo);
    useCaseDelete = new DeletarUsuarioUseCase(repo);
  });

  it('deve deletar um usuario', async () => {
    const usuario = await useCaseCreate.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    await useCaseDelete.execute(usuario.id);

    expect(repo.items).toEqual([]);
  });
});
