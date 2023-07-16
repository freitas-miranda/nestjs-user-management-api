import CriarUsuario from 'src/@core/application/usecase/usuario/CriarUsuario';
import DeletarUsuario from 'src/@core/application/usecase/usuario/DeletarUsuario';
import UsuarioRepositoryMemory from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';

describe('DeletarUsuario testes', () => {
  let repo: UsuarioRepositoryMemory;
  let criarUsuario: CriarUsuario;
  let useCaseDelete: DeletarUsuario;

  beforeEach(async () => {
    repo = new UsuarioRepositoryMemory();
    criarUsuario = new CriarUsuario(repo);
    useCaseDelete = new DeletarUsuario(repo);
  });

  it('deve deletar um usuario', async () => {
    const usuario = await criarUsuario.execute({
      nome: 'Alan Miranda - Alteração',
      email: 'alan@miranda.com',
      senha: '12345678',
    });

    await useCaseDelete.execute(usuario.id);

    expect(repo.items).toEqual([]);
  });
});
