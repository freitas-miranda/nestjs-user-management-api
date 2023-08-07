import Usuario from '@entity/Usuario';
import UsuarioRepository from '@repository/UsuarioRepository';
import { PrismaService } from 'src/prisma/prisma.service';

export default class UsuarioRepositoryPrisma implements UsuarioRepository {
  constructor(private prisma: PrismaService) {}

  async save(usuario: Usuario): Promise<{ id: string }> {
    const inserido = await this.prisma.usuario.create({
      data: usuario.toJSON(),
    });
    return { id: inserido.id };
  }

  async update(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: usuario.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();
    const list: Usuario[] = [];

    usuarios.map((item) => {
      const usuario = Usuario.fromJSON(item);
      list.push(usuario);
    });

    return list;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return Usuario.fromJSON(usuario);
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) return undefined;
    return Usuario.fromJSON(usuario);
  }
}
