import moment from "moment";
import { ApiUrls } from "../../core/models/enums/api-urls.enum";
import {
  HttpApiService,
  httpApiService,
} from "../../core/services/api/HttpApi.service";
import { ActivityVM } from "../models/classes/activitity.classes";
import {
  CalendarAnswerVM,
  CellPhoneAnswerVM,
  EmailAnswerVM,
  MediaUploadAnswerVM,
  MultiLineTextAnswerVM,
  MultiSelectAnswerVM,
  RatingAnswerVM,
  ScaleAnswerOptionVM,
  ScaleAnswerVM,
  SingleChoiceAnswerVM,
  TimeAnswerVM,
  NumberAnswerVM,
  MultiSelectAnswerOptionVM,
} from "../models/classes/answer.classes";
import {
  ActivityDTO,
  ActivityOptionDTO,
} from "../models/classes/DTOs/activityDTO.classes";
import {
  ScaleAnswerDTO,
  ScaleAnswerOptionDTO,
} from "../models/classes/DTOs/answerDTO.classes";
import {
  CalendarVM,
  CellPhoneVM,
  EmailVM,
  MediaUploadVM,
  MultiLineTextVM,
  MultipleSelectOption,
  MultipleSelectVM,
  NumberVM,
  RatingVM,
  ScaleOption,
  ScaleVM,
  SingleChoiceOption,
  SingleChoiceVM,
  SingleLineTextVM,
  StatementVM,
  TimeVM,
} from "../models/classes/question.classes";
import {
  ActivityType,
  ActivityTypeId,
  DatePickerType,
  DateTimeFormat,
  ValidatorType,
} from "../models/enums/bot.enums";

export class BotRepository {
  private static instance: BotRepository;
  private _roomId: string = "";
  private _httpApiService: HttpApiService;

  private constructor() {
    this._httpApiService = httpApiService;
  }

  static getInstance() {
    if (!BotRepository.instance) {
      BotRepository.instance = new BotRepository();
    }
    return BotRepository.instance;
  }

  public getRoomId() {
    return this._roomId;
  }

  public setRoomId(roomId: string) {
    this._roomId = roomId;
  }

  public verifyChatId(id: string) {
    const query = `query VerifyChat($chat_id: String, $user_details: userDetailsInput) {
      verifyChatId(input:{
        chat_id: $chat_id,
        user_details: $user_details
        }) {
          room_id
          url
          variant
          campaignName
          status,
          client_member_id,
          recruiter_member_id
      }
  }`;

    const params = {
      query: query,
      variables: { chat_id: id, user_details: { name: "", email: "" } },
    };

    return this._httpApiService.post("", params);
  }

  public getTransformedActivity(activityDTO: ActivityDTO): ActivityVM {
    let activity: ActivityVM = new ActivityVM();
    activity.id = activityDTO.data.activity_id;
    activity.typeId = activityDTO.data.activity_answer_type_id;

    let activityType: any = this.getActivityTypeById(
      activity.typeId,
      activityDTO
    );

    activity.type = activityType;
    activity.question = this.getQuestion(activity.type, activityDTO);
    return activity;
  }

  private getActivityTypeById(
    activityTypeId: number,
    activityDTO: ActivityDTO
  ) {
    if (
      activityTypeId === ActivityTypeId.EMAIL ||
      activityTypeId === ActivityTypeId.CELLPHONE ||
      activityTypeId === ActivityTypeId.SINGLE_LINE_TEXT ||
      activityTypeId === ActivityTypeId.NUMBER
    ) {
      if (
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.EMAIL
      ) {
        return ActivityType.EMAIL;
      } else if (
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.CELLPHONE
      ) {
        return ActivityType.CELLPHONE;
      } else if (
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.NUMBER ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.DECIMAL_NUMBER
      ) {
        return ActivityType.NUMBER;
      } else if (
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.SINGLE_LINE_TEXT ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.LETTERS ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.NUMERIC ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.ALPHANUMERIC ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.LETTERS_AND_SYMBOL ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.NUMERIC_AND_SYMBOL ||
        Number(activityDTO.data.metadata.option_validator) ===
        ValidatorType.ALPHANUMERIC_AND_SYMBOL
      ) {
        return ActivityType.SINGLE_LINE_TEXT;
      }
    } else if (
      activityTypeId === ActivityTypeId.CALENDAR ||
      activityTypeId === ActivityTypeId.TIME
    ) {
      if (
        Number(activityDTO.data.metadata.date_picker_type) ===
        DatePickerType.DATE
      ) {
        return ActivityType.CALENDAR;
      } else if (
        Number(activityDTO.data.metadata.date_picker_type) ===
        DatePickerType.TIME
      ) {
        return ActivityType.TIME;
      }
    } else if (activityTypeId === ActivityTypeId.MEDIA_UPLOAD) {
      return ActivityType.MEDIA_UPLOAD;
    } else if (activityTypeId === ActivityTypeId.SINGLE_CHOICE) {
      return ActivityType.SINGLE_CHOICE;
    } else if (activityTypeId === ActivityTypeId.MULTI_SELECT) {
      return ActivityType.MULTI_SELECT;
    } else if (activityTypeId === ActivityTypeId.RATING) {
      return ActivityType.RATING;
    } else if (activityTypeId === ActivityTypeId.SCALE) {
      return ActivityType.SCALE;
    } else if (activityTypeId === ActivityTypeId.MULTI_LINE_TEXT) {
      return ActivityType.MULTI_LINE_TEXT;
    } else if (activityTypeId === ActivityTypeId.STATEMENT) {
      return ActivityType.STATEMENT;
    }
  }

  private getQuestion(activityType: string, activityDTO: ActivityDTO) {
    switch (activityType) {
      case ActivityType.EMAIL:
        return this.getEmailQuestion(activityDTO);
      case ActivityType.CELLPHONE:
        return this.getCellPhoneQuestion(activityDTO);
      case ActivityType.NUMBER:
        return this.getNumberQuestion(activityDTO);
      case ActivityType.SINGLE_CHOICE:
        return this.getSingleChoiceQuestion(activityDTO);
      case ActivityType.MULTI_SELECT:
        return this.getMultiSelectQuestion(activityDTO);
      case ActivityType.TIME:
        return this.getTimeQuestion(activityDTO);
      case ActivityType.CALENDAR:
        return this.getCalendarQuestion(activityDTO);
      case ActivityType.RATING:
        return this.getRatingQuestion(activityDTO);
      case ActivityType.SCALE:
        return this.getScaleQuestion(activityDTO);
      case ActivityType.MEDIA_UPLOAD:
        return this.getMediaUploadQuestion(activityDTO);
      case ActivityType.STATEMENT:
        return this.getStatementQuestion(activityDTO);
      case ActivityType.SINGLE_LINE_TEXT:
        return this.getSingleLineQuestion(activityDTO);
      case ActivityType.MULTI_LINE_TEXT:
        return this.getMultiLineQuestion(activityDTO);
      default:
        return null;
    }
  }

  private getEmailQuestion(activityDTO: ActivityDTO) {
    let question = new EmailVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getCellPhoneQuestion(activityDTO: ActivityDTO) {
    let question = new CellPhoneVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.countryCode = activityDTO.data.metadata.country_code;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getSingleChoiceQuestion(activityDTO: ActivityDTO) {
    let question = new SingleChoiceVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    if (
      activityDTO.data.activity_option &&
      activityDTO.data.activity_option.length > 0
    ) {
      activityDTO.data.activity_option.forEach(
        (activityOptionDTO: ActivityOptionDTO) => {
          const singleChoiceOption: SingleChoiceOption =
            new SingleChoiceOption();
          singleChoiceOption.id = activityOptionDTO.option_id;
          singleChoiceOption.label = activityOptionDTO.value;
          question.options.push(singleChoiceOption);
        }
      );
    }
    return question;
  }

  private getMultiSelectQuestion(activityDTO: ActivityDTO) {
    let question = new MultipleSelectVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowOther =
      activityDTO.data.metadata.allowOther === "1" ? true : false;
    question.otherOptionId = +activityDTO.data.metadata.otherOptionId;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    if (
      activityDTO.data.activity_option &&
      activityDTO.data.activity_option.length > 0
    ) {
      activityDTO.data.activity_option.forEach(
        (activityOptionDTO: ActivityOptionDTO) => {
          const multipleSelectOption: MultipleSelectOption =
            new MultipleSelectOption();
          multipleSelectOption.id = activityOptionDTO.option_id;
          multipleSelectOption.label = activityOptionDTO.value;
          multipleSelectOption.isEditable =
            +activityDTO.data.metadata.otherOptionId ===
              activityOptionDTO.option_id
              ? true
              : false;
          question.options.push(multipleSelectOption);
        }
      );
    }
    return question;
  }

  private getTimeQuestion(activityDTO: ActivityDTO) {
    let question = new TimeVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getCalendarQuestion(activityDTO: ActivityDTO) {
    let question = new CalendarVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.dateFormat = activityDTO.data.metadata.date_format;
    question.dateValidation = activityDTO.data.metadata.date_selection_type;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getRatingQuestion(activityDTO: ActivityDTO) {
    let question = new RatingVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.noOfUnits = activityDTO.data.metadata.max;
    question.allowPartialUnits = activityDTO.data.metadata
      .allow_partial_selection
      ? true
      : false;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getScaleQuestion(activityDTO: ActivityDTO) {
    let question = new ScaleVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.scaleLimit = activityDTO.data.metadata.max;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    if (
      activityDTO.data.activity_option &&
      activityDTO.data.activity_option.length > 0
    ) {
      activityDTO.data.activity_option.forEach(
        (activityOptionDTO: ActivityOptionDTO) => {
          const scaleOption: ScaleOption = new ScaleOption();
          scaleOption.id = activityOptionDTO.option_id;
          scaleOption.label = activityOptionDTO.value;
          question.options.push(scaleOption);
        }
      );
    }
    return question;
  }

  private getMediaUploadQuestion(activityDTO: ActivityDTO) {
    let question = new MediaUploadVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    question.allowedFormat = activityDTO.data.metadata.allowed_media_format || "";
    question.documentType = activityDTO.data.metadata.document_type || "";
    return question;
  }

  private getStatementQuestion(activityDTO: ActivityDTO) {
    let question = new StatementVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getSingleLineQuestion(activityDTO: ActivityDTO) {
    let question = new SingleLineTextVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    // question.allowCondition =
    // question.allowSymbol =
    // question.textValidation =
    question.maxCharacter = activityDTO.data.metadata.max;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getNumberQuestion(activityDTO: ActivityDTO) {
    let question = new NumberVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.allowDecimal =
      activityDTO.data.metadata.option_validator == "11" ? true : false;
    question.maxCharacter = activityDTO.data.metadata.max;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  private getMultiLineQuestion(activityDTO: ActivityDTO) {
    let question = new MultiLineTextVM();
    question.text = activityDTO.data.message;
    question.time = activityDTO.time_stamp;
    question.allowSkip = activityDTO.data.allow_skip ? true : false;
    question.maximumLength = activityDTO.data.metadata.max;
    question.allowMedia =
      activityDTO.data.metadata.allow_media?.toString() === "1"
        ? true
        : false || false;
    question.mediaType = activityDTO.data.metadata.media_type || "";
    question.mediaSourceUrl = activityDTO.data.metadata.media_url || "";
    return question;
  }

  public getTransformedAnswer(activityType: string, answer: any) {
    switch (activityType) {
      case ActivityType.SINGLE_LINE_TEXT:
        return this.getSingleLineAnswerDTO(answer);
      case ActivityType.EMAIL:
        return this.getEmailAnswerDTO(answer);
      case ActivityType.CELLPHONE:
        return this.getCellPhoneAnswerDTO(answer);
      case ActivityType.NUMBER:
        return this.getNumberAnswerDTO(answer);
      case ActivityType.SINGLE_CHOICE:
        return this.getSingleChoiceAnswerDTO(answer);
      case ActivityType.MULTI_SELECT:
        return this.getMultiSelectAnswerDTO(answer);
      case ActivityType.TIME:
        return this.getTimeAnswerDTO(answer);
      case ActivityType.CALENDAR:
        return this.getCalendarAnswerDTO(answer);
      case ActivityType.RATING:
        return this.getRatingAnswerDTO(answer);
      case ActivityType.SCALE:
        return this.getScaleAnswerDTO(answer);
      case ActivityType.MEDIA_UPLOAD:
        return this.getMediaUploadAnswerDTO(answer);
      case ActivityType.STATEMENT:
        return this.getStatementAnswerDTO(answer);
      case ActivityType.MULTI_LINE_TEXT:
        return this.getMultiLineAnswerDTO(answer);
      default:
        return null;
    }
  }

  private getEmailAnswerDTO(answer: EmailAnswerVM) {
    let data: any = {};
    data = answer.email;
    return data;
  }

  private getCellPhoneAnswerDTO(answer: CellPhoneAnswerVM) {
    let data: any = {};
    data = answer.phone;
    return data;
  }

  private getSingleChoiceAnswerDTO(answer: SingleChoiceAnswerVM) {
    let data: any = {};
    data = { option_id: answer.option.id };
    return data;
  }

  private getMultiSelectAnswerDTO(answer: MultiSelectAnswerVM) {
    let data: any = {};
    if (answer?.options && Array.isArray(answer?.options)) {
      data = answer.options.map((option: MultiSelectAnswerOptionVM) => {
        return {
          id: option.id,
          input: option.input,
        };
      });
    }
    return data;
  }

  private getTimeAnswerDTO(answer: TimeAnswerVM) {
    let data: any = {};
    // return data = answer.selectedTime;
    data = moment(answer.selectedTime).format(DateTimeFormat.HH_MM_P);
    return data;
  }

  private getCalendarAnswerDTO(answer: CalendarAnswerVM) {
    let data: any = {};
    return (data = answer.date);
  }

  private getRatingAnswerDTO(answer: RatingAnswerVM) {
    let data: any = {};
    data = answer.rate;
    return data;
  }

  private getScaleAnswerDTO(answer: ScaleAnswerVM) {
    let data: ScaleAnswerDTO = new ScaleAnswerDTO();

    if (answer && answer.scales?.length > 0) {
      answer.scales.forEach((scale: ScaleAnswerOptionVM) => {
        const option = new ScaleAnswerOptionDTO();
        option.optionName = scale.label;
        option.rating = scale.unit;

        data.options.push(option);
      });
    }

    return data;
  }

  private getMediaUploadAnswerDTO(answer: MediaUploadAnswerVM) {
    let data: any = {};
    data["url"] = answer.url;
    data["name"] = answer.file.name;
    data["status"] = "done";
    return data;
  }

  private getStatementAnswerDTO(answer: any) {
    let data: any = {};
    data = answer.text;
    return data;
  }

  private getSingleLineAnswerDTO(answer: any) {
    let data: any = {};
    data = answer.answer;
    return data;
  }

  private getNumberAnswerDTO(answer: NumberAnswerVM) {
    let data: any = {};
    data = answer.answer;
    return data;
  }

  private getMultiLineAnswerDTO(answer: MultiLineTextAnswerVM) {
    let data: any = {};
    data = answer.answer;
    return data;
  }

  public uploadFile(
    file: File,
    clientMemberId: string = "123",
    candidateId = "456",
    fileType: string,
  ) {
    let path = "";
    if (fileType !== "") {
      path = `${ApiUrls.MEDIA_UPLOAD}?clientMemberId=${clientMemberId}&fileName=${file.name}&candidateId=${candidateId}&fileType=${fileType}`;
    } else {
      path = `${ApiUrls.MEDIA_UPLOAD}?clientMemberId=${clientMemberId}&fileName=${file.name}&candidateId=${candidateId}`;
    }
    const formData = new FormData();
    formData.append("file", file);
    return this._httpApiService.postFormData(path, formData);
  }
}

export const botRepository = BotRepository.getInstance();
