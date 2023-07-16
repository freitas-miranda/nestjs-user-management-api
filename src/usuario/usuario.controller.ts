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
} from 'src/@core/application/usecase/usuario/AlterarUsuario';
import CriarUsuario, {
  CriarUsuarioInput,
} from 'src/@core/application/usecase/usuario/CriarUsuario';
import DeletarUsuario from 'src/@core/application/usecase/usuario/DeletarUsuario';
import ExibirUsuario from 'src/@core/application/usecase/usuario/ExibirUsuario';
import ListarUsuario from 'src/@core/application/usecase/usuario/ListarUsuario';

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
