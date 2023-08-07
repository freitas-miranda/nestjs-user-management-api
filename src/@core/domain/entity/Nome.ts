export default class Nome {
  private value: string;

  constructor(nome: string) {
    if (!nome) {
      throw new Error('Nome inválido!');
    }

    const nomePreparado = nome.trim();

    // Aceitar apenas nomes com pelo menos duas palavras
    if (nomePreparado.split(' ').length < 2) throw new Error('Nome inválido!');
    this.value = nomePreparado;
  }

  getValue() {
    return this.value;
  }
}
