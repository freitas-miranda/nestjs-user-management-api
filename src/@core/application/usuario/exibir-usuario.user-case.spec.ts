import { UsuarioRepositoryInMemory } from '../../infra/database/in-memory/usuario.repository-in-memory';
import { CriarUsuarioUseCase } from './criar-usuario.use-case';
import { ExibirUsuarioUseCase } from './exibir-usuario.user-case';

describe('ExibirUsuarioUseCase testes', () => {
  let repo: UsuarioRepositoryInMemory;
  let useCaseCreate: CriarUsuarioUseCase;
  let useCaseView: ExibirUsuarioUseCase;

  beforeEach(async () => {
    repo = new UsuarioRepositoryInMemory();
    useCaseCreate = new CriarUsuarioUseCase(repo);
    useCaseView = new ExibirUsuarioUseCase(repo);
  });

  it('deve editar um usuario', async () => {
    const usuario = await useCaseCreate.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    const usuarioRetornado = await useCaseView.execute(usuario.id);

    expect(usuarioRetornado).toEqual(usuario);
  });
});
