import { UsuarioRepositoryMemory } from '../@core/infra/database/memory/UsuarioRepositoryMemory';
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { AlterarUsuario } from 'src/@core/application/usecase/usuario/AlterarUsuario';
import { UsuarioRepository } from 'src/@core/application/repository/UsuarioRepository';
import { CriarUsuario } from 'src/@core/application/usecase/usuario/CriarUsuario';
import { DeletarUsuario } from 'src/@core/application/usecase/usuario/DeletarUsuario';
import { ExibirUsuario } from 'src/@core/application/usecase/usuario/ExibirUsuario';
import { ListarUsuario } from 'src/@core/application/usecase/usuario/ListarUsuario';

@Module({
  controllers: [UsuarioController],
  providers: [
    {
      provide: UsuarioRepositoryMemory,
      useClass: UsuarioRepositoryMemory,
    },
    // UsuarioRepositoryPrisma,
    // UsuarioRepositoryHttp,
    //CreateUsuarioInCrmUsuarioener,
    // PublishUsuarioCreatedUsuarioener,
    // CreateUsuarioInCrmJob,
    // {
    //   provide: 'UsuarioIntegrationRepository',
    //   useExisting: UsuarioRepositoryHttp,
    // },
    // {
    //   provide: 'EventEmitter',
    //   useExisting: EventEmitter2,
    // },
    {
      provide: AlterarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new AlterarUsuario(repo);
      },
      inject: [UsuarioRepositoryMemory],
    },
    {
      provide: CriarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new CriarUsuario(repo);
      },
      inject: [UsuarioRepositoryMemory],
    },
    {
      provide: DeletarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new DeletarUsuario(repo);
      },
      inject: [UsuarioRepositoryMemory],
    },
    {
      provide: ExibirUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new ExibirUsuario(repo);
      },
      inject: [UsuarioRepositoryMemory],
    },
    {
      provide: ListarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new ListarUsuario(repo);
      },
      inject: [UsuarioRepositoryMemory],
    },
  ],
})
export class UsuarioModule {}
