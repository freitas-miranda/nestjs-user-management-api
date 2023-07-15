import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [PrismaModule, UsuarioModule],
})
export class AppModule {}
