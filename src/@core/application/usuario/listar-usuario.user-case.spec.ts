import { UsuarioRepositoryInMemory } from '../../infra/database/in-memory/usuario.repository-in-memory';
import { CriarUsuarioUseCase } from './criar-usuario.use-case';

describe('ListarUsuarioUseCase testes', () => {
  let useCase: CriarUsuarioUseCase;
  let repo: UsuarioRepositoryInMemory;

  beforeEach(async () => {
    repo = new UsuarioRepositoryInMemory();
    useCase = new CriarUsuarioUseCase(repo);
  });

  it('deve listar usuarios', async () => {
    await useCase.execute({
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    await useCase.execute({
      nome: 'Raiane Bele',
      email: 'raiane@bele.com',
      senha: '123456',
    });

    expect(repo.items.length).toEqual(2);
  });
});
