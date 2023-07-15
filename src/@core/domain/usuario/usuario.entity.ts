export class Usuario {
  constructor(
    readonly id: string,
    public nome: string,
    public email: string,
    public senha: string,
  ) {}

  static create(nome: string, email: string, senha: string) {
    const id = crypto.randomUUID();
    return new Usuario(id, nome, email, senha);
  }

  toJSON() {
    return {
      ...this,
    };
  }
}
