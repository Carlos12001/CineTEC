/* The Admin class represents an administrator with an email, password, and optional name. */
export class Admin {
  public email: string;
  public password: string;
  public name?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

/* The line `const admin = new Admin('', '');` is creating a new instance of the `Admin` class and assigning it to the constant variable `admin`. The `Admin` class requires an email and password as parameters in its constructor, so the empty strings `''` are being passed as arguments to create the instance. */
export const admin = new Admin('', '');
