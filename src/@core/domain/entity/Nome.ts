export default class Nome {
  private value: string;

  constructor(nome: string) {
    if (nome.split(' ').length < 2) throw new Error('Nome inválido!');
    this.value = nome;
  }

  getValue() {
    return this.value;
  }
}
