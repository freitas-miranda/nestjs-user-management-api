import { UsuarioRepositoryMemory } from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import { CriarUsuario } from './CriarUsuario';
import { ExibirUsuario } from './ExibirUsuario';

describe('ExibirUsuario testes', () => {
  let repo: UsuarioRepositoryMemory;
  let useCaseCreate: CriarUsuario;
  let useCaseView: ExibirUsuario;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    useCaseCreate = new CriarUsuario(repo);
    useCaseView = new ExibirUsuario(repo);
  });

  it('deve exibir um usuario', async () => {
    const usuario = await useCaseCreate.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '123456',
    });

    const usuarioRetornado = await useCaseView.execute(usuario.id);

    expect(usuarioRetornado.id).toEqual(usuario.id);
    expect(usuarioRetornado).toHaveProperty('nome');
    expect(usuarioRetornado).toHaveProperty('email');
    expect(usuarioRetornado).toHaveProperty('senha');
  });

  it('deve emitir um erro quando o usuario nao existir', async () => {
    try {
      await useCaseView.execute('ABC');
      throw new Error('Não falhou!');
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('Usuário não encontrado!');
    }
  });
});
