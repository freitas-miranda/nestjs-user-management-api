import { AlterarUsuarioInput } from 'src/@core/application/usecase/usuario/AlterarUsuario';
import { UsuarioRepository } from '../../../application/repository/UsuarioRepository';
import { Usuario } from 'src/@core/domain/entity/Usuario';
import { PrismaService } from 'src/prisma/prisma.service';

export class UsuarioRepositoryPrisma implements UsuarioRepository {
  constructor(private prisma: PrismaService) {}

  async insert(usuario: Usuario): Promise<{ id: string }> {
    const inserido = await this.prisma.usuario.create({
      data: usuario,
    });
    return { id: inserido.id };
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();
    const list: Usuario[] = [];

    usuarios.map((item) => {
      const usuario = Usuario.buildExisting(item);
      list.push(usuario);
    });

    return list;
  }

  async findById(id: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return Usuario.buildExisting(usuario);
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) return undefined;
    return Usuario.buildExisting(usuario);
  }

  async update(id: string, input: AlterarUsuarioInput): Promise<void> {
    await this.prisma.usuario.update({
      where: { id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }
}
