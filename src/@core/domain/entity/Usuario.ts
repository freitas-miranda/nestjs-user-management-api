import { log } from 'console';
import Email from './Email';
import Nome from './Nome';
import Senha from './Senha';

export default class Usuario {
  private constructor(
    readonly id: string,
    public nome: Nome,
    public email: Email,
    public senha: Senha,
  ) {}

  static async create(nome: string, email: string, senha: string) {
    const id = crypto.randomUUID();
    return new Usuario(
      id,
      new Nome(nome),
      new Email(email),
      await Senha.create(senha),
    );
  }

  static buildExisting(
    id: string,
    nome: string,
    email: string,
    hashSenha: string,
    salt: string,
  ) {
    if (!id) throw new Error('Sem dados para carregar o usuário!');

    return new Usuario(
      id,
      new Nome(nome),
      new Email(email),
      new Senha(hashSenha, salt),
    );
  }

  async validarSenha(senha: string) {
    return this.senha.validate(senha);
  }

  static fromJSON(input: InputLoad) {
    if (!input?.id) throw new Error('Sem dados para carregar o usuário!');
    return new Usuario(
      input.id,
      new Nome(input.nome),
      new Email(input.email),
      new Senha(input.senhaHash, input.senhaSalt),
    );
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome.getValue(),
      email: this.email.getValue(),
      senhaHash: this.senha.value,
      senhaSalt: this.senha.salt,
    };
  }
}

type InputLoad = {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  senhaSalt: string;
};
