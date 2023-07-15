import { UsuarioRepositoryInMemory } from './repository/usuario.repository-in-memory';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioRepositoryInMemory,
    // UsuarioRepositoryPrisma,
    // UsuarioRepositoryHttp,
    //CreateUsuarioInCrmUsuarioener,
    // PublishUsuarioCreatedUsuarioener,
    // CreateUsuarioInCrmJob,
    {
      provide: 'UsuarioPersistenceRepository',
      useExisting: UsuarioRepositoryInMemory,
    },
    // {
    //   provide: 'UsuarioIntegrationRepository',
    //   useExisting: UsuarioRepositoryHttp,
    // },
    // {
    //   provide: 'EventEmitter',
    //   useExisting: EventEmitter2,
    // },
  ],
})
export class UsuarioModule {}
