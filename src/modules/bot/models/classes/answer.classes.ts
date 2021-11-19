export class AnswerVM {
  time: string = "";
  isResponseReceived?: boolean = false;
}

export class SingleLineTextAnswerVM extends AnswerVM {
  answer: string = "";
}

export class MultiLineTextAnswerVM extends AnswerVM {
  answer: string = "";
}

export class EmailAnswerVM extends AnswerVM {
  email: string = "";
}

export class CellPhoneAnswerVM extends AnswerVM {
  phone: string = "";
  countryCode: string = "";
}

export class CalendarAnswerVM extends AnswerVM {
  date: string = "";
}

export class SingleChoiceAnswerVM extends AnswerVM {
  option: SingleChoiceAnswerOptionVM = { id: 0, label: "" };
}

export class SingleChoiceAnswerOptionVM {
  id: number = 0;
  label: string = "";
}

export class MultiSelectAnswerVM extends AnswerVM {
  options: MultiSelectAnswerOptionVM[] = [];
}

export class MultiSelectAnswerOptionVM {
  id: number = 0;
  input:string[] = [];
  label: string = "";
}

export class RatingAnswerVM extends AnswerVM {
  rate: number = 0;
}

export class ScaleAnswerVM extends AnswerVM {
  scales: ScaleAnswerOptionVM[] = [];
}

export class ScaleAnswerOptionVM {
  id: number = 0;
  label: string = "";
  unit: number = 0;
}

export class MediaUploadAnswerVM extends AnswerVM {
  file: File = {} as any;
  url: string = "";
  type: string = "";
}

export class TimeAnswerVM extends AnswerVM {
  selectedTime: string = "";
}

export class NumberAnswerVM extends AnswerVM {
  answer: string = "";
}
