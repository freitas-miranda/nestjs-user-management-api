import UsuarioRepositoryMemory from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import CriarUsuario from './CriarUsuario';

describe('CriarUsuario testes', () => {
  let criarUsuario: CriarUsuario;
  let usuarioRepository: UsuarioRepositoryMemory;

  beforeEach(async () => {
    usuarioRepository = new UsuarioRepositoryMemory();
    criarUsuario = new CriarUsuario(usuarioRepository);
  });

  it('Deve criar um usuario', async () => {
    const params = {
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '12345678',
    };

    const usuario = await criarUsuario.execute(params);

    expect(usuarioRepository.items[0].id).toEqual(usuario.id);
    expect(usuarioRepository.items[0].nome).toEqual(params.nome);
    expect(usuarioRepository.items[0].email).toEqual(params.email);
  });

  it('Não deve criar mais de um usuário com mesmo email', async () => {
    try {
      const params = {
        nome: 'Alan Miranda',
        email: 'alan@miranda.com',
        senha: '12345678',
      };

      // Garantir que o usuario exista
      await criarUsuario.execute(params);
      await criarUsuario.execute(params);

      throw new Error('Não falhou!');
    } catch (error) {
      expect(error).toHaveProperty('message');
      expect(error.message).toContain(
        'Já existe usuário cadastrado com este email!',
      );
    }
  });

  it('Não deve criar usuário com nome inválido', async () => {
    expect(
      async () =>
        await criarUsuario.execute({
          nome: 'Alan',
          email: 'alan@miranda.com',
          senha: '12345678',
        }),
    ).rejects.toThrow(new Error('Nome inválido!'));
  });
});
