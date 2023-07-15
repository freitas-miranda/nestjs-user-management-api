import { UsuarioRepositoryInMemory } from '../../infra/database/in-memory/usuario.repository-in-memory';
import { CriarUsuarioUseCase } from './criar-usuario.use-case';

describe('CriarUsuarioUseCase testes', () => {
  let useCase: CriarUsuarioUseCase;
  let repo: UsuarioRepositoryInMemory;

  beforeEach(async () => {
    repo = new UsuarioRepositoryInMemory();
    useCase = new CriarUsuarioUseCase(repo);
  });

  it('deve criar um usuario', async () => {
    const usuario = await useCase.execute({
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    expect(repo.items).toEqual([usuario]);
  });
});
