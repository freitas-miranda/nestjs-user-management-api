export default class Email {
  private value: string;

  constructor(email: string) {
    if (!email) {
      throw new Error('Email inválido!');
    }

    const emailPreparado = email.trim().toLowerCase();

    if (
      !String(emailPreparado).match(
        /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      )
    ) {
      throw new Error('Email inválido!');
    }

    this.value = emailPreparado;
  }

  getValue() {
    return this.value;
  }
}
