import CriarUsuario from 'src/@core/application/usecase/usuario/CriarUsuario';
import ExibirUsuario from 'src/@core/application/usecase/usuario/ExibirUsuario';
import UsuarioRepositoryMemory from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';

describe('ExibirUsuario testes', () => {
  let repo: UsuarioRepositoryMemory;
  let criarUsuario: CriarUsuario;
  let exibirUsuario: ExibirUsuario;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    criarUsuario = new CriarUsuario(repo);
    exibirUsuario = new ExibirUsuario(repo);
  });

  it('deve exibir um usuario', async () => {
    const usuario = await criarUsuario.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '12345678',
    });

    const usuarioRetornado = await exibirUsuario.execute(usuario.id);

    expect(usuarioRetornado.id).toEqual(usuario.id);
    expect(usuarioRetornado).toHaveProperty('nome');
    expect(usuarioRetornado).toHaveProperty('email');
    expect(usuarioRetornado).not.toHaveProperty('senhaHash');
    expect(usuarioRetornado).not.toHaveProperty('senhaSalt');
  });

  it('deve emitir um erro quando o usuario nao existir', async () => {
    try {
      await exibirUsuario.execute('ABC');
      throw new Error('Não falhou!');
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('Usuário não encontrado!');
    }
  });
});
