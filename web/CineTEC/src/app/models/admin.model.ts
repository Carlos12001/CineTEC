export class Admin {
  public email: string;
  public password: string;
  public name?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export const admin = new Admin('', '');
