export class BotConstants {
  static readonly REGEX_SYMBOL = new RegExp(/[A-Za-z0-9]+$/);
  static readonly REGEX_ALPHANUMERIC = new RegExp(/[A-Za-z0-9]+$/);
  static readonly REGEX_NUMERIC = new RegExp(/[A-Za-z0-9]+$/);
  static readonly REGEX_LETTERS = new RegExp(/[A-Za-z0-9]+$/);
  static readonly REGEX_EMAIL = new RegExp(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/);
  static readonly DOC_TYPE = "RESUME"
  static readonly COMPARISON_DOC_TYPE = "Resume"
}