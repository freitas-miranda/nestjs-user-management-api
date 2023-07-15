import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../usuario.controller';
import { UsuarioService } from '../usuario.service';
import { UsuarioRepositoryInMemory } from '../repository/usuario.repository-in-memory';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        UsuarioRepositoryInMemory,
        {
          provide: 'UsuarioPersistenceRepository',
          useExisting: UsuarioRepositoryInMemory,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
