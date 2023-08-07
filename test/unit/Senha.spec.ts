import Senha from '@entity/Senha';

describe('Senha', () => {
  const senhaAbertaValida = 'senha123456';
  const senhaAbertaIncorreta = 'senha_incorreta';
  const senhaCurta = 'abc';

  test('deve criar uma senha válida', () => {
    const senha = Senha.create(senhaAbertaValida);
    expect(senha.value).toBeTruthy();
    expect(senha.value).not.toEqual(senhaAbertaValida);
    expect(senha.salt).toBeTruthy();
  });

  test('deve lançar um erro ao criar uma senha com menos de 8 caracteres', () => {
    expect(() => Senha.create(senhaCurta)).toThrow('Senha inválida!');
  });

  test('deve validar corretamente uma senha correta', async () => {
    const senha = Senha.create(senhaAbertaValida);
    const resultado = await senha.validate(senhaAbertaValida);
    expect(resultado).toBe(true);
  });

  test('deve invalidar uma senha incorreta', async () => {
    const senha = Senha.create(senhaAbertaValida);
    const resultado = await senha.validate(senhaAbertaIncorreta);
    expect(resultado).toBe(false);
  });

  test('deve validar corretamente uma senha usando o salt informado', async () => {
    const saltInformado = 'salt_informado';
    const senha = Senha.create(senhaAbertaValida, saltInformado);
    const resultado = await senha.validate(senhaAbertaValida);
    expect(resultado).toBe(true);
  });
});
