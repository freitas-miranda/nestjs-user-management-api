import UsuarioRepositoryMemory from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import AlterarUsuario from './AlterarUsuario';
import CriarUsuario from './CriarUsuario';

const newUser = {
  nome: 'Alan Miranda',
  email: 'alan@miranda.com',
  senha: '12345678',
};

const newInfo = {
  nome: 'Alan Freitas',
  email: 'alan@freitas.com',
};

describe('AlterarUsuario testes', () => {
  let repo: UsuarioRepositoryMemory;
  let criarUsuario: CriarUsuario;
  let alterarUsuario: AlterarUsuario;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    criarUsuario = new CriarUsuario(repo);
    alterarUsuario = new AlterarUsuario(repo);
  });

  it('deve editar um usuario', async () => {
    const usuario = await criarUsuario.execute(newUser);

    await alterarUsuario.execute(usuario.id, newInfo);

    expect(repo.items[0].id).toEqual(usuario.id);
    expect(repo.items[0].nome.getValue()).toEqual(newInfo.nome);
    expect(repo.items[0].email.getValue()).toEqual(newInfo.email);
  });

  it('deve avisar que o usuário não foi encontrado ao tentar editar', async () => {
    try {
      await alterarUsuario.execute('ABC', newInfo);

      throw new Error('Não falhou!');
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain('Usuário não encontrado!');
    }
  });
});
