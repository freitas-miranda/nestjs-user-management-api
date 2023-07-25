import { pbkdf2Sync, randomBytes } from 'node:crypto';

export default class Senha {
  gerarSenha = 'abc';

  constructor(readonly value: string, readonly salt: string) {}

  static create(senhaAberta: string, salt?: string): Senha {
    if (senhaAberta.length < 8) throw new Error('Senha inválida!');

    const { hashedPassword, generatedSalt } = Senha.gerarSenha(
      senhaAberta,
      salt,
    );

    return new Senha(hashedPassword, generatedSalt);
  }

  async validate(senhaAberta: string) {
    // Derivar a senha passada para comparação com o salt carregado na classe
    const { hashedPassword } = Senha.gerarSenha(senhaAberta, this.salt);
    return hashedPassword === this.value;
  }

  private static gerarSenha(senhaAberta: string, salt?: string) {
    // Gera um salt aleatório de 20 bytes se não for informado
    const generatedSalt = salt || randomBytes(20).toString('hex');

    // Define o número de iterações para fortalecer o algoritmo
    const iterations = 10000;

    // Define o tamanho da chave gerada
    const keyLength = 64;

    // Aplica a função PBKDF2 para derivar a senha com o salt
    const hashedPassword = pbkdf2Sync(
      senhaAberta,
      generatedSalt,
      iterations,
      keyLength,
      'sha512',
    ).toString('hex');

    return {
      hashedPassword,
      generatedSalt,
    };
  }
}
