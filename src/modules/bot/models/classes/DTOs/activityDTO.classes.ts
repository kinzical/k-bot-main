export class ActivityDTO {
  user: string[] = ["frontend", "backend"];
  time_stamp: string = "";
  event: string = "";
  chat_room_id: string = "";
  master_room_id: string = "";
  language_id: number = 1;
  data: DataDTO = new DataDTO();
  created_by: string = "";
}

export class DataDTO {
  metadata: MetaDataDTO = new MetaDataDTO();
  activity_answer_type_id: number = 1;
  message: string = "";
  activity_id: number = 0;
  hint: string = "";
  overriden_loading_message: string = "";
  is_skip_message: string = "";
  answer_help_text: string = "";
  preferred_answer_medium: string = "";
  allow_skip: number = 0;
  activity_option: ActivityOptionDTO[] = [];
}

export class MetaDataDTO {
  min: number = 0;
  max: number = 10;
  should_allow_rate: number = 0;
  date_selection_type: string = "";
  date_picker_type: string = "";
  should_allow_multiple_files: string = "";
  option_validator: string = "";
  allow_partial_selection: number = 0;
  date_format: string = "";
  country_code: string = "+1";
  allowOther: string = "0";
  otherOptionId: string = "-1";
  allow_media: string | number = "";
  media_type: string = "";
  media_url: string = "";
  allowed_media_format: string = "";
  document_type: string = "";
}

export class ActivityOptionDTO {
  option_id: number = 0;
  value: string = "";
}
