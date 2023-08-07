import Usuario from '@entity/Usuario';

// Mock das classes Email, Nome e Senha
jest.mock('@entity/Email', () => {
  return jest.fn().mockImplementation((email: string) => ({
    getValue: () => email,
  }));
});

jest.mock('@entity/Nome', () => {
  return jest.fn().mockImplementation((nome: string) => ({
    getValue: () => nome,
  }));
});

describe('Usuario', () => {
  const nome = 'Alan Miranda';
  const email = 'alan@miranda.com';
  const senhaAberta = 'senha123456';
  const senhaHash = 'hashed_password';
  const senhaSalt = 'salt';

  test('deve criar um usuário válido', async () => {
    const usuario = Usuario.create(nome, email, senhaAberta);
    expect(usuario.id).toBeTruthy();
    expect(usuario.nome.getValue()).toBe(nome);
    expect(usuario.email.getValue()).toBe(email);
    expect(usuario.senha.value).toBeTruthy();
    expect(usuario.senha.salt).toBeTruthy();
  });

  test('deve lançar um erro ao criar um usuário com dados faltantes', () => {
    expect(() => Usuario.buildExisting('', '', '', '', '')).toThrow(
      'Sem dados para carregar o usuário!',
    );
  });

  test('deve validar corretamente a senha de um usuário', async () => {
    const usuario = Usuario.create(nome, email, senhaAberta);
    const resultado = await usuario.validarSenha(senhaAberta);
    expect(resultado).toBe(true);
  });

  test('deve invalidar a senha incorreta de um usuário', async () => {
    const usuario = Usuario.create(nome, email, senhaAberta);
    const resultado = await usuario.validarSenha('senha_incorreta');
    expect(resultado).toBe(false);
  });

  test('deve criar um usuário a partir de um objeto JSON', () => {
    const id = 'ABC123';
    const inputJSON = {
      id,
      nome,
      email,
      senhaHash,
      senhaSalt,
    };
    const usuario = Usuario.fromJSON(inputJSON);
    expect(usuario.id).toBe(id);
    expect(usuario.nome.getValue()).toBe(nome);
    expect(usuario.email.getValue()).toBe(email);
    expect(usuario.senha.value).toBeTruthy();
    expect(usuario.senha.salt).toBe(senhaSalt);
  });

  test('deve lançar um erro ao criar um usuário a partir de um objeto JSON sem id', () => {
    const inputJSON: any = {
      nome: nome,
      email: email,
      senhaHash: senhaHash,
      senhaSalt: senhaSalt,
    };
    expect(() => Usuario.fromJSON(inputJSON)).toThrow(
      'Sem dados para carregar o usuário!',
    );
  });

  test('deve gerar um objeto JSON válido a partir de um usuário', async () => {
    const usuario = Usuario.create(nome, email, senhaAberta);
    const outputJSON = usuario.toJSON();
    expect(outputJSON.id).toBeTruthy();
    expect(outputJSON.nome).toBe(nome);
    expect(outputJSON.email).toBe(email);
    expect(outputJSON.senhaHash).toBeTruthy();
    expect(outputJSON.senhaSalt).toBeTruthy();
  });
});
