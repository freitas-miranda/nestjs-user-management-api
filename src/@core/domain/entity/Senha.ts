import { pbkdf2, randomBytes } from 'crypto';

export default class Senha {
  constructor(readonly value: string, readonly salt: string) {}

  static create(senha: string, salt?: string): Promise<Senha> {
    if (senha.length < 8) throw new Error('Senha inválida!');

    const generatedSalt = salt || randomBytes(20).toString('hex');

    return new Promise((resolve) => {
      pbkdf2(senha, generatedSalt, 100, 64, 'sha512', (error, value) => {
        resolve(new Senha(value.toString('hex'), generatedSalt));
      });
    });
  }

  async validate(plainSenha: string) {
    return new Promise((resolve) => {
      pbkdf2(plainSenha, this.salt, 100, 64, 'sha512', (error, value) => {
        resolve(this.value === value.toString('hex'));
      });
    });
  }
}
