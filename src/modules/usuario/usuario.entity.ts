export default class Usuario {
  constructor(
    readonly id: string,
    public nome: string,
    public email: string,
    public senha: string,
  ) {}

  static create(input: Input) {
    const id = crypto.randomUUID();
    return new Usuario(id, input.nome, input.email, input.senha);
  }
}

type Input = {
  nome: string;
  email: string;
  senha: string;
};
