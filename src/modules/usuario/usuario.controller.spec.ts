import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { createMockModule } from './moker';
import { UsuarioRepositoryInMemory } from 'src/@core/infra/database/in-memory/usuario.repository-in-memory';
import { AlterarUsuarioUseCase } from 'src/@core/application/usuario/alterar-usuario.use-case';
import { CriarUsuarioUseCase } from 'src/@core/application/usuario/criar-usuario.use-case';
import { DeletarUsuarioUseCase } from 'src/@core/application/usuario/deletar-usuario.user-case';
import { ExibirUsuarioUseCase } from 'src/@core/application/usuario/exibir-usuario.user-case';
import { ListarUsuarioUseCase } from 'src/@core/application/usuario/listar-usuario.user-case';

const criarUsuarioUseCase = { execute: jest.fn() };
const alterarUsuarioUseCase = { execute: jest.fn() };
const deletarUsuarioUseCase = { execute: jest.fn() };
const exibirUsuarioUseCase = { execute: jest.fn() };
const listarUsuarioUseCase = { execute: jest.fn() };

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createMockModule([
          {
            provide: UsuarioRepositoryInMemory,
            useClass: UsuarioRepositoryInMemory,
          },
          {
            provide: AlterarUsuarioUseCase,
            useValue: alterarUsuarioUseCase,
          },
          {
            provide: CriarUsuarioUseCase,
            useValue: criarUsuarioUseCase,
          },
          {
            provide: DeletarUsuarioUseCase,
            useValue: deletarUsuarioUseCase,
          },
          {
            provide: ExibirUsuarioUseCase,
            useValue: exibirUsuarioUseCase,
          },
          {
            provide: ListarUsuarioUseCase,
            useValue: listarUsuarioUseCase,
          },
          {
            provide: CriarUsuarioUseCase,
            useValue: criarUsuarioUseCase,
          },
        ]),
      ],
      controllers: [UsuarioController],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('deve criar um registro', () => {
    const input = { nome: 'Alan', email: 'alan@miranda.com', senha: '123456' };
    controller.create(input);
    expect(criarUsuarioUseCase.execute).toHaveBeenCalled();
    expect(criarUsuarioUseCase.execute.mock.calls[0][0]).toEqual(input);
  });

  it('deve listar todos registros', () => {
    controller.findAll();
    expect(listarUsuarioUseCase.execute).toHaveBeenCalled();
  });

  it('deve exibir um registro', () => {
    const id = 'ABC';
    controller.findOne(id);
    expect(exibirUsuarioUseCase.execute).toHaveBeenCalled();
    expect(exibirUsuarioUseCase.execute.mock.calls[0][0]).toEqual(id);
  });

  it('deve alterar um registro', () => {
    const id = 'ABC';
    const input = { nome: 'Alan', email: 'alan@miranda.com', senha: '123456' };
    controller.update(id, input);
    expect(alterarUsuarioUseCase.execute).toHaveBeenCalled();
    expect(alterarUsuarioUseCase.execute.mock.calls[0][0]).toEqual(id);
    expect(alterarUsuarioUseCase.execute.mock.calls[0][1]).toEqual(input);
  });

  it('deve deletar um registro', () => {
    const id = 'ABC';
    controller.remove(id);
    expect(deletarUsuarioUseCase.execute).toHaveBeenCalled();
    expect(deletarUsuarioUseCase.execute.mock.calls[0][0]).toEqual(id);
  });
});
