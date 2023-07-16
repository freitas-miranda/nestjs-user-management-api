import { UsuarioRepositoryMemory } from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import { CriarUsuario } from './CriarUsuario';

describe('CriarUsuario testes', () => {
  let useCase: CriarUsuario;
  let repo: UsuarioRepositoryMemory;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    useCase = new CriarUsuario(repo);
  });

  it('Deve criar um usuario', async () => {
    const params = {
      nome: 'Alan Miranda',
      email: 'alan@miranda.com',
      senha: '123456',
    };

    const usuario = await useCase.execute(params);
    params['id'] = usuario.id;

    expect(repo.items).toEqual([params]);
  });

  it('Não deve criar mais de um usuário com mesmo email', async () => {
    try {
      const params = {
        nome: 'Alan Miranda',
        email: 'alan@miranda.com',
        senha: '123456',
      };

      // Garantir que o usujário exista
      await useCase.execute(params);

      await useCase.execute(params);

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
        await useCase.execute({
          nome: 'Alan',
          email: 'alan@miranda.com',
          senha: '123456',
        }),
    ).rejects.toThrow(new Error('Nome inválido!'));
  });
});
