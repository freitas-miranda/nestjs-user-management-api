import Email from '@entity/Email';

describe('Email', () => {
  test('deve criar um email válido', () => {
    const emailValido = 'teste@example.com';
    const email = new Email(emailValido);
    expect(email.getValue()).toBe(emailValido);
  });

  test('deve lançar um erro para um email inválido', () => {
    const emailInvalido = 'email_invalido';
    expect(() => new Email(emailInvalido)).toThrow('Email inválido!');
  });

  test('deve lançar um erro para um email vazio', () => {
    const emailVazio = '';
    expect(() => new Email(emailVazio)).toThrow('Email inválido!');
  });

  test('deve lançar um erro para um email nulo', () => {
    const emailNulo = null;
    expect(() => new Email(emailNulo)).toThrow('Email inválido!');
  });

  test('deve ignorar espaços no início e no final do email', () => {
    const emailComEspacos = '  teste@example.com   ';
    const email = new Email(emailComEspacos);
    expect(email.getValue()).toBe('teste@example.com');
  });

  test('deve tratar emails com caracteres de caixa mista', () => {
    const emailComCaixaMista = 'tEsT@ExAmPlE.cOm';
    const email = new Email(emailComCaixaMista);
    expect(email.getValue()).toBe('test@example.com');
  });
});
