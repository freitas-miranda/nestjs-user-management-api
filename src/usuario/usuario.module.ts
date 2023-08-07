import { Module } from '@nestjs/common';
import UsuarioController from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import UsuarioRepositoryMemory from '@database/memory/UsuarioRepositoryMemory';
import UsuarioRepositoryPrisma from '@database/prisma/UsuarioRepositoryPrisma';
import AlterarUsuario from '@usecase/usuario/AlterarUsuario';
import UsuarioRepository from '@repository/UsuarioRepository';
import CriarUsuario from '@usecase/usuario/CriarUsuario';
import DeletarUsuario from '@usecase/usuario/DeletarUsuario';
import ExibirUsuario from '@usecase/usuario/ExibirUsuario';
import ListarUsuario from '@usecase/usuario/ListarUsuario';

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
