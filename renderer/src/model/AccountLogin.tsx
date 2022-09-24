class AccountLogin {
  accountUsername: string;
  accountPassword: string;
  employeeName: string;

  constructor(accountUsername: string, accountPassword: string, employeeName: string) {
    this.accountUsername = accountUsername;
    this.accountPassword = accountPassword;
    this.employeeName = employeeName
  }

  toJson(){
    return {
        accountUsername: this.accountUsername,
        accountPassword: this.accountPassword,
        employeeName: this.employeeName
    }
  }
}

export default AccountLogin;
