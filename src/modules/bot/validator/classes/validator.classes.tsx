export class Validator {
  static isOptionSame = (
    questionOptions: Array<any>,
    inputValue: string,
    id: number
  ) => {
    return questionOptions.some(
      (key: any) =>
        key.label.trim().toLocaleLowerCase() ===
          inputValue.trim().toLocaleLowerCase() && key.id !== id
    );
  };

  static checkOptionLength = (inputValue: string) => {
    return inputValue.trim().length > 50;
  };
}
