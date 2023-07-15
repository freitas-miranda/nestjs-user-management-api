import { AlterarUsuarioInput } from 'src/@core/application/usecase/usuario/AlterarUsuario';
import { UsuarioRepository } from '../../../application/repository/UsuarioRepository';
import { Usuario } from 'src/@core/domain/entity/Usuario';
import { PrismaService } from 'src/prisma/prisma.service';

export class UsuarioRepositoryPrisma implements UsuarioRepository {
  constructor(private prismaService: PrismaService) {}

  async insert(usuario: Usuario): Promise<{ id: string }> {
    const inserido = await this.prismaService.usuario.create({
      data: usuario,
    });
    return { id: inserido.id };
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prismaService.usuario.findMany();
    const list: Usuario[] = [];

    usuarios.map((item) => {
      const usuario = Usuario.buildExisting(item);
      list.push(usuario);
    });

    return list;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    return Usuario.buildExisting(usuario);
  }

  async update(id: string, input: AlterarUsuarioInput): Promise<void> {
    await this.prismaService.usuario.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.usuario.delete({
      where: { id },
    });
  }
}
