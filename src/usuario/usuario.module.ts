import UsuarioRepositoryMemory from '../@core/infra/database/memory/UsuarioRepositoryMemory';
import { Module } from '@nestjs/common';
import UsuarioController from './usuario.controller';
import AlterarUsuario from 'src/@core/application/usecase/usuario/AlterarUsuario';
import UsuarioRepository from 'src/@core/application/repository/UsuarioRepository';
import CriarUsuario from 'src/@core/application/usecase/usuario/CriarUsuario';
import DeletarUsuario from 'src/@core/application/usecase/usuario/DeletarUsuario';
import ExibirUsuario from 'src/@core/application/usecase/usuario/ExibirUsuario';
import ListarUsuario from 'src/@core/application/usecase/usuario/ListarUsuario';
import UsuarioRepositoryPrisma from 'src/@core/infra/database/prisma/UsuarioRepositoryPrisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [
    {
      provide: UsuarioRepositoryMemory,
      useClass: UsuarioRepositoryMemory,
    },
    {
      provide: UsuarioRepositoryPrisma,
      useFactory: (prisma: PrismaService) => {
        return new UsuarioRepositoryPrisma(prisma);
      },
      inject: [PrismaService],
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
      inject: [UsuarioRepositoryPrisma],
    },
    {
      provide: CriarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new CriarUsuario(repo);
      },
      inject: [UsuarioRepositoryPrisma],
    },
    {
      provide: DeletarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new DeletarUsuario(repo);
      },
      inject: [UsuarioRepositoryPrisma],
    },
    {
      provide: ExibirUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new ExibirUsuario(repo);
      },
      inject: [UsuarioRepositoryPrisma],
    },
    {
      provide: ListarUsuario,
      useFactory: (repo: UsuarioRepository) => {
        return new ListarUsuario(repo);
      },
      inject: [UsuarioRepositoryPrisma],
    },
  ],
})
export class UsuarioModule {}
