import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [PrismaModule, UsuarioModule],
})
export class AppModule {}
