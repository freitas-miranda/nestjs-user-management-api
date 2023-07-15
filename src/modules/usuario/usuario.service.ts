import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRepositoryInterface } from './repository/usuario.repository-interface';
import Usuario from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('UsuarioPersistenceRepository')
    private usuarioPersistenceRepository: UsuarioRepositoryInterface, //porta UsuarioRepositorySequelize // @Inject('EventEmitter') // private eventEmitter: EventEmitter,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { nome, email, senha } = createUsuarioDto;
    const usuario = Usuario.create({ nome, email, senha });
    await this.usuarioPersistenceRepository.create(usuario);
    return usuario;
  }

  findAll() {
    return this.usuarioPersistenceRepository.findAll();
  }

  async findOne(id: string) {
    const usuario = await this.usuarioPersistenceRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario não encontrado');
    }
    return usuario;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioPersistenceRepository.update(id, updateUsuarioDto);
  }

  remove(id: string) {
    return `This action removes a #${id} usuario`;
  }
}
