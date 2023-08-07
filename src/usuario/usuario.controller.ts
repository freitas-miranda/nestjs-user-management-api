import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import AlterarUsuario, {
  AlterarUsuarioInput,
} from '@usecase/usuario/AlterarUsuario';
import CriarUsuario, { CriarUsuarioInput } from '@usecase/usuario/CriarUsuario';
import DeletarUsuario from '@usecase/usuario/DeletarUsuario';
import ExibirUsuario from '@usecase/usuario/ExibirUsuario';
import ListarUsuario from '@usecase/usuario/ListarUsuario';

@Controller('usuario')
export default class UsuarioController {
  constructor(
    private readonly alterar: AlterarUsuario,
    private readonly criar: CriarUsuario,
    private readonly deletar: DeletarUsuario,
    private readonly exibir: ExibirUsuario,
    private readonly listar: ListarUsuario,
  ) {}

  @Post()
  create(@Body() input: CriarUsuarioInput) {
    return this.criar.execute(input);
  }

  @Get()
  findAll() {
    return this.listar.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exibir.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: AlterarUsuarioInput) {
    return this.alterar.execute(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletar.execute(id);
  }
}
