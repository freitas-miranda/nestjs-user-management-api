export default class Usuario {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
