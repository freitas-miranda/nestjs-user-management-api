import { Test, TestingModule } from '@nestjs/testing';
import UsuarioController from './usuario.controller';
import { createMockModule } from '../@core/infra/common/tests/moker';
import UsuarioRepositoryMemory from 'src/@core/infra/database/memory/UsuarioRepositoryMemory';
import AlterarUsuario from 'src/@core/application/usecase/usuario/AlterarUsuario';
import CriarUsuario from 'src/@core/application/usecase/usuario/CriarUsuario';
import DeletarUsuario from 'src/@core/application/usecase/usuario/DeletarUsuario';
import ExibirUsuario from 'src/@core/application/usecase/usuario/ExibirUsuario';
import ListarUsuario from 'src/@core/application/usecase/usuario/ListarUsuario';

const criarUsuario = { execute: jest.fn() };
const alterarUsuario = { execute: jest.fn() };
const deletarUsuario = { execute: jest.fn() };
const exibirUsuario = { execute: jest.fn() };
const listarUsuario = { execute: jest.fn() };

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        createMockModule([
          {
            provide: UsuarioRepositoryMemory,
            useClass: UsuarioRepositoryMemory,
          },
          {
            provide: AlterarUsuario,
            useValue: alterarUsuario,
          },
          {
            provide: CriarUsuario,
            useValue: criarUsuario,
          },
          {
            provide: DeletarUsuario,
            useValue: deletarUsuario,
          },
          {
            provide: ExibirUsuario,
            useValue: exibirUsuario,
          },
          {
            provide: ListarUsuario,
            useValue: listarUsuario,
          },
        ]),
      ],
      controllers: [UsuarioController],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('deve criar um registro', () => {
    const input = {
      nome: 'Alan',
      email: 'alan@miranda.com',
      senha: '12345678',
    };
    controller.create(input);
    expect(criarUsuario.execute).toHaveBeenCalled();
    expect(criarUsuario.execute.mock.calls[0][0]).toEqual(input);
  });

  it('deve listar todos registros', () => {
    controller.findAll();
    expect(listarUsuario.execute).toHaveBeenCalled();
  });

  it('deve exibir um registro', () => {
    const id = 'ABC';
    controller.findOne(id);
    expect(exibirUsuario.execute).toHaveBeenCalled();
    expect(exibirUsuario.execute.mock.calls[0][0]).toEqual(id);
  });

  it('deve alterar um registro', () => {
    const id = 'ABC';
    const input = {
      nome: 'Alan',
      email: 'alan@miranda.com',
      senha: '12345678',
    };
    controller.update(id, input);
    expect(alterarUsuario.execute).toHaveBeenCalled();
    expect(alterarUsuario.execute.mock.calls[0][0]).toEqual(id);
    expect(alterarUsuario.execute.mock.calls[0][1]).toEqual(input);
  });

  it('deve deletar um registro', () => {
    const id = 'ABC';
    controller.remove(id);
    expect(deletarUsuario.execute).toHaveBeenCalled();
    expect(deletarUsuario.execute.mock.calls[0][0]).toEqual(id);
  });
});
