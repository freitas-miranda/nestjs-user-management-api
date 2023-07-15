export class Usuario {
  private constructor(
    readonly id: string,
    public nome: string,
    public email: string,
    public senha: string,
  ) {}

  static async create(nome: string, email: string, senha: string) {
    const id = crypto.randomUUID();
    return new Usuario(id, nome, email, senha);
  }

  static buildExisting(input: InputBuild) {
    return new Usuario(input.id, input.nome, input.email, input.senha);
  }

  toJSON() {
    return {
      ...this,
    };
  }
}

export type InputBuild = {
  id: string;
  nome: string;
  email: string;
  senha: string;
};
