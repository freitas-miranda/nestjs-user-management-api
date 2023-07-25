import UsuarioRepositoryMemory from '@database/memory/UsuarioRepositoryMemory';
import AlterarUsuario from '@usecase/usuario/AlterarUsuario';
import CriarUsuario from '@usecase/usuario/CriarUsuario';

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
  let usuarioRepository: UsuarioRepositoryMemory;
  let criarUsuario: CriarUsuario;
  let alterarUsuario: AlterarUsuario;

  beforeEach(async () => {
    usuarioRepository = new UsuarioRepositoryMemory();
    criarUsuario = new CriarUsuario(usuarioRepository);
    alterarUsuario = new AlterarUsuario(usuarioRepository);
  });

  it('deve editar um usuario', async () => {
    const usuario = await criarUsuario.execute(newUser);

    await alterarUsuario.execute(usuario.id, newInfo);

    expect(usuarioRepository.items[0].id).toEqual(usuario.id);
    expect(usuarioRepository.items[0].nome.getValue()).toEqual(newInfo.nome);
    expect(usuarioRepository.items[0].email.getValue()).toEqual(newInfo.email);
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
