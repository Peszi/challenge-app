export class Utility {

  static readonly WINNER = 'wygranko';
  static readonly LOOSER = 'przegranko';

  static readonly WINNER_COLOR = 'rgb(253, 220, 45)';
  static readonly LOOSER_COLOR = 'rgb(45, 196, 253)';

  static isWinnerPage(): boolean {
    return (location.host.indexOf('wygranko') >= 0);
  }

  static getPageTitle(): string {
    return (Utility.isWinnerPage() ? this.WINNER : this.LOOSER);
  }

  static getPageBackground(): string {
    return (Utility.isWinnerPage() ? this.WINNER_COLOR : this.LOOSER_COLOR);
  }
}
