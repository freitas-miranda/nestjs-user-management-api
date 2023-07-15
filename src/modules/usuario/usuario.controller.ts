import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  AlterarUsuarioInput,
  AlterarUsuarioUseCase,
} from 'src/@core/application/usuario/alterar-usuario.use-case';
import {
  CriarUsuarioInput,
  CriarUsuarioUseCase,
} from 'src/@core/application/usuario/criar-usuario.use-case';
import { DeletarUsuarioUseCase } from 'src/@core/application/usuario/deletar-usuario.user-case';
import { ExibirUsuarioUseCase } from 'src/@core/application/usuario/exibir-usuario.user-case';
import { ListarUsuarioUseCase } from 'src/@core/application/usuario/listar-usuario.user-case';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly alterar: AlterarUsuarioUseCase,
    private readonly criar: CriarUsuarioUseCase,
    private readonly deletar: DeletarUsuarioUseCase,
    private readonly exibir: ExibirUsuarioUseCase,
    private readonly listar: ListarUsuarioUseCase,
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
