export class QuestionVM {
  text: string = "";
  time: string = "";
  isError: boolean = false;
  isSkipped: boolean = false;
  mediaType?: string = "";
  mediaSourceUrl?: string = "";
  allowMedia?: boolean = false;
}

export class SingleLineTextVM extends QuestionVM {
  allowSkip: boolean = false;
  allowSymbol: boolean = false;
  allowCondition: boolean = false;
  textValidation: string = "";
  maxCharacter: number = 0;
}

export class NumberVM extends QuestionVM {
  allowSkip: boolean = false;
  allowDecimal: boolean = false;
  maxCharacter: number = 0;
}

export class SingleChoiceVM extends QuestionVM {
  allowSkip: boolean = false;
  options: SingleChoiceOption[] = [];
}

export class MultipleSelectVM extends QuestionVM {
  allowSkip: boolean = false;
  allowOther: boolean = false;
  otherOptionId: number = -1;
  options: MultipleSelectOption[] = [];
}

export class MultiLineTextVM extends QuestionVM {
  allowSkip: boolean = false;
  maximumLength: number = 0;
}

export class EmailVM extends QuestionVM {
  allowSkip: boolean = false;
}

export class CellPhoneVM extends QuestionVM {
  allowSkip: boolean = false;
  countryCode: string = "";
}

export class TimeVM extends QuestionVM {
  allowSkip: boolean = false;
}

export class CalendarVM extends QuestionVM {
  allowSkip: boolean = false;
  dateValidation: string = "";
  dateFormat: string = "";
}

export class RatingVM extends QuestionVM {
  allowSkip: boolean = false;
  noOfUnits: number = 0;
  allowPartialUnits: boolean = false;
}

export class ScaleVM extends QuestionVM {
  allowSkip: boolean = false;
  scaleLimit: number = 0;
  options: ScaleOption[] = [];
}

export class MediaUploadVM extends QuestionVM {
  allowSkip: boolean = false;
  allowedFormat: string = "";
  documentType: string = "";
}
export class StatementVM extends QuestionVM {}

export class Option {
  id: number = 0;
  label: string = "";
}
export class SingleChoiceOption extends Option {}
export class MultipleSelectOption extends Option {
  isEditable?: boolean = false;
}
export class ScaleOption extends Option {}
