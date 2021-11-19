import {
  DeleteFilled,
  PaperClipOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { message, Tooltip, Upload } from "antd";
import * as React from "react";
import { UploadFormat } from "../../../bot/models/enums/bot.enums";
import KPButton from "../buttons/KPButton";

type KPFileMediaUploadProps = {
  allowedMediaFormat?: string;
  onFileUpload: (file: File) => void;
  onRemove: () => void;
  file: File;
  setSelectedButton: any;
  selectedButton: any;
};

const KPFileMediaUpload: React.FC<KPFileMediaUploadProps> = (
  props: KPFileMediaUploadProps
) => {
  const { allowedMediaFormat, onFileUpload, file, onRemove } = props;

  const isLessThanOrEqualTo10MB = (size: number) => {
    return size / 1024 / 1024 < 10;
  };

  const isValidFileType = (type: string) => {
    if (allowedMediaFormat === UploadFormat.ANY || !allowedMediaFormat) {
      return true;
    } else if (
      allowedMediaFormat === UploadFormat.IMAGE &&
      (type === "image/jpeg" || type === "image/jpg")
    ) {
      return true;
    } else if (
      allowedMediaFormat === UploadFormat.PDF &&
      type === "application/pdf"
    ) {
      return true;
    } else if (
      allowedMediaFormat === UploadFormat.WORD &&
      (type === "application/msword" ||
        type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      return true;
    } else if (
      allowedMediaFormat === UploadFormat.AUDIO &&
      (type === "audio/mpeg" || type === "audio/wav") // .mp3 type is mpeg
    ) {
      return true;
    } else if (
      allowedMediaFormat === UploadFormat.VIDEO &&
      (type === "video/mp4" || type === "video/quicktime") // .mov type is quicktime
    ) {
      return true;
    }
    return false;
  };

  const uploadProps = {
    onRemove: (file: any) => {
      onRemove();
    },
    beforeUpload: (file: File) => {
      if (!isLessThanOrEqualTo10MB(file.size)) {
        message.error("File must be smaller than 10MB!");
        return false;
      } else {
        if (isValidFileType(file.type)) {
          onFileUpload(file);
          return false;
        }
      }
      if (allowedMediaFormat === UploadFormat.AUDIO) {
        message.warn(
          "Valid file type is " + allowedMediaFormat + "(.mp3, .wav)"
        );
      } else if (allowedMediaFormat === UploadFormat.VIDEO) {
        message.warn(
          "Valid file type is " + allowedMediaFormat + "(.mp4, .mov)"
        );
      } else {
        message.warn("Valid file type is " + allowedMediaFormat);
      }
      return false;
    },
    multiple: false,
    showUploadList: false,
  };

  const handleOnDelete = () => {
    onRemove();
  };

  return (
    <div>
      {file && (
        <span className="flex items-center justify-center text-white -mb-6">
          <span className="mr-1 -mt-2">
            <PaperClipOutlined />
          </span>
          <span>{file.name}</span>
          <span onClick={handleOnDelete} className="ml-2 -mt-2 cursor-pointer">
            <DeleteFilled />
          </span>
        </span>
      )}
      <Upload {...uploadProps}>
        <Tooltip title="Click to upload here">
          {!file && (
            <KPButton
              type="text"
              className="flex items-center justify-center text-international bg-white rounded-lg ml-1"
              icon={<UploadOutlined />}
            ></KPButton>
          )}
        </Tooltip>
      </Upload>
    </div>
  );
};

export default KPFileMediaUpload;
