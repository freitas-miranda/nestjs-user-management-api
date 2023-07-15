import { UsuarioRepositoryMemory } from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import { CriarUsuario } from './CriarUsuario';

describe('CriarUsuario testes', () => {
  let useCase: CriarUsuario;
  let repo: UsuarioRepositoryMemory;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    useCase = new CriarUsuario(repo);
  });

  it('deve criar um usuario', async () => {
    const params = {
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '123456',
    };

    const usuario = await useCase.execute(params);
    params['id'] = usuario.id;

    expect(repo.items).toEqual([params]);
  });
});
