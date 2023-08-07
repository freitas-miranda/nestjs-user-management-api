import Nome from '@entity/Nome';

describe('Nome', () => {
  test('deve criar um nome válido com pelo menos duas palavras', () => {
    const nomeValido = 'Alan Miranda';
    const nome = new Nome(nomeValido);
    expect(nome.getValue()).toBe(nomeValido);
  });

  test('deve lançar um erro para um nome com apenas uma palavra', () => {
    const nomeInvalido = 'Alan';
    expect(() => new Nome(nomeInvalido)).toThrow('Nome inválido!');
  });

  test('deve lançar um erro para um nome vazio', () => {
    const nomeVazio = '';
    expect(() => new Nome(nomeVazio)).toThrow('Nome inválido!');
  });

  test('deve lançar um erro para um nome nulo', () => {
    const nomeNulo = null;
    expect(() => new Nome(nomeNulo)).toThrow('Nome inválido!');
  });

  test('deve ignorar espaços no início e no final do nome', () => {
    const nomeComEspacos = '  Alan Miranda   ';
    const nome = new Nome(nomeComEspacos);
    expect(nome.getValue()).toBe('Alan Miranda');
  });

  test('deve criar um nome válido com múltiplas palavras', () => {
    const nomeComMultiplasPalavras = 'Alan de Freitas Miranda';
    const nome = new Nome(nomeComMultiplasPalavras);
    expect(nome.getValue()).toBe(nomeComMultiplasPalavras);
  });
});
