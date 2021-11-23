export enum TextValidationType {
  APLHANUMERIC = "Alphanumeric",
  NUMERIC = "Numeric",
  LETTERS = "Letters",
}

export enum DateFormat {
  DD_MM_YYYY = "DD/MM/YYYY",
  MM_DD_YYYY = "MM/DD/YYYY",
}

export enum TimeFormat {
  HH_MM_A = "hh:mm a",
  HH_mm = "HH:mm",
  h_mm_a = "h:mm a",
}

export enum DateTimeFormat {
  DD_MM_YYYY_HH_MM_P = "DD-MM-YYYY hh:mm p",
  HH_MM_P = "hh:mm p",
}

export enum DateValidationType {
  PAST_DATE = 1,
  FUTURE_DATE = 2,
}

export enum DatePickerType {
  DATE = 1,
  DATE_AND_TIME = 2,
  TIME = 3,
}

export enum ValidatorType {
  EMAIL = 1,
  LETTERS = 5,
  SINGLE_LINE_TEXT = 3,
  ALPHANUMERIC = 6,
  NUMERIC = 7,
  LETTERS_AND_SYMBOL = 8,
  NUMERIC_AND_SYMBOL = 9,
  ALPHANUMERIC_AND_SYMBOL = 10,
  CELLPHONE = 4,
  NUMBER = 7,
  DECIMAL_NUMBER = 11,
}

export enum UploadFormat {
  ANY = "Any Format",
  PDF = "PDF(.pdf)",
  IMAGE = "JPEG/JPG(.jpeg/.jpg)",
  WORD = "Word(.doc/.docx)",
  AUDIO = "Audio",
  VIDEO = "Video",
}

export enum ActivityTypeId {
  WELCOME = 12,
  EMAIL = 1,
  CELLPHONE = 1,
  SINGLE_CHOICE = 2,
  MULTI_SELECT = 3,
  TIME = 7,
  CALENDAR = 7,
  RATING = 9,
  SCALE = 10,
  MEDIA_UPLOAD = 11,
  STATEMENT = 12,
  SINGLE_LINE_TEXT = 1,
  MULTI_LINE_TEXT = 4,
  NUMBER = 1,
}

export enum ActivityType {
  WELCOME = "WELCOME",
  EMAIL = "EMAIL",
  CELLPHONE = "CELLPHONE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTI_SELECT = "MULTI_SELECT",
  TIME = "TIME",
  CALENDAR = "CALENDAR",
  RATING = "RATING",
  SCALE = "SCALE",
  MEDIA_UPLOAD = "MEDIA_UPLOAD",
  STATEMENT = "STATEMENT",
  END = "END",
  SINGLE_LINE_TEXT = "SINGLE_LINE_TEXT",
  MULTI_LINE_TEXT = "MULTI_LINE_TEXT",
  NUMBER = "NUMBER",
}

export enum ChatEvent {
  ON_CONNECT = "on_chat_connect",
  ON_INITIATE_CHAT = "initiate_chat",
  ON_LINK_ROUTE = "on_link_route",
  ON_QUESTION_RECEIVED = "question_received",
  ON_RESPONSE = "response",
  ON_RESPONSE_RECEIVED = "response_received",
  ON_END_CONVERSATION = "end_conversation",
  ON_NEXT_QUESTION = "next_question",
  ON_EDIT_RESPONSE = "edit_response",
  ON_PROCESS_RESPONSE_ERROR = "process_response_error",
  ON_PROCESS_RESPONSE_RECEIVE_ERROR = "process_response_error_received",
  ON_SKIP_QUESTION = "skip_question",
  ON_RESPONSE_STATEMENT = "response_statement",
}

export enum MediaType {
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export enum AllowedFormatFromChatEngine {
  ANY = "Any Format",
  PDF = "PDF(.pdf)",
  IMAGE = "JPEG/JPG(.jpeg/.jpg)",
  WORD = "Word(.doc/.docx)",
}

export enum FileType {
  AUDIO = "audio/wav",
  VIDEO = "video/mp4",
}

export enum MediaDevice {
  AUDIOINPUT = "audioinput",
  VIDEOINPUT = "videoinput",
}

export enum FileName {
  AUDIOFILENAME = "audio.wav",
  VIDEOFILENAME = "video.mp4",
}
export enum SelectedButton {
  AUDIOVIDEO = "Audio Video Both Buttons",
  AUDIO = "Audio",
  VIDEO = "Video",
}

export enum PlayerButtonStatus {
  START = "start",
  STOP = "stop",
  RE_RECORD = "re-record",
}

export enum DataParent {
  KAPTIVATE = "KAPTIVATE",
  BOT_WIDGET = 'BOT_WIDGET'
}