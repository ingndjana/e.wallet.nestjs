export class UserLoggedToken {
  constructor(userToken: string) {
    this.access_token = userToken;
  }

  access_token: string;
}
