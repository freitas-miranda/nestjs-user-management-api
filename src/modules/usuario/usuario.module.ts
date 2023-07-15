import { UsuarioRepositoryInMemory } from '../../@core/infra/database/in-memory/usuario.repository-in-memory';
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CriarUsuarioUseCase } from 'src/@core/application/usuario/criar-usuario.use-case';
import { UsuarioRepositoryInterface } from 'src/@core/domain/usuario/usuario.repository-interface';
import { ListarUsuarioUseCase } from 'src/@core/application/usuario/listar-usuario.user-case';
import { AlterarUsuarioUseCase } from 'src/@core/application/usuario/alterar-usuario.use-case';
import { DeletarUsuarioUseCase } from 'src/@core/application/usuario/deletar-usuario.user-case';
import { ExibirUsuarioUseCase } from 'src/@core/application/usuario/exibir-usuario.user-case';

@Module({
  controllers: [UsuarioController],
  providers: [
    {
      provide: UsuarioRepositoryInMemory,
      useClass: UsuarioRepositoryInMemory,
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
      provide: AlterarUsuarioUseCase,
      useFactory: (repo: UsuarioRepositoryInterface) => {
        return new AlterarUsuarioUseCase(repo);
      },
      inject: [UsuarioRepositoryInMemory],
    },
    {
      provide: CriarUsuarioUseCase,
      useFactory: (repo: UsuarioRepositoryInterface) => {
        return new CriarUsuarioUseCase(repo);
      },
      inject: [UsuarioRepositoryInMemory],
    },
    {
      provide: DeletarUsuarioUseCase,
      useFactory: (repo: UsuarioRepositoryInterface) => {
        return new DeletarUsuarioUseCase(repo);
      },
      inject: [UsuarioRepositoryInMemory],
    },
    {
      provide: ExibirUsuarioUseCase,
      useFactory: (repo: UsuarioRepositoryInterface) => {
        return new ExibirUsuarioUseCase(repo);
      },
      inject: [UsuarioRepositoryInMemory],
    },
    {
      provide: ListarUsuarioUseCase,
      useFactory: (repo: UsuarioRepositoryInterface) => {
        return new ListarUsuarioUseCase(repo);
      },
      inject: [UsuarioRepositoryInMemory],
    },
  ],
})
export class UsuarioModule {}
