import * as React from "react";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import KPInput from "../KPInput";
import "./KPOption.less";

type KPOptionProps = {
  id: number;
  label: string;
  isSelected: boolean;
  onSelect: Function;
  isEditable?: boolean;
  onValueChange?: Function;
  validateOption?: Function;
  onDelete?: Function;
};

const KPOption: React.FC<KPOptionProps> = (props: KPOptionProps) => {
  const {
    id,
    label,
    isSelected,
    onSelect,
    isEditable,
    onValueChange,
    onDelete,
    validateOption,
  } = props;
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleOnSelect = () => {
    onSelect(id);
  };
  const handleEdit = () => {
    setShowEdit((previousState) => !previousState);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (
      inputValue.trim().length > 0 &&
      inputValue.trim().toLocaleLowerCase() !== label.trim().toLocaleLowerCase()
    ) {
   
      if (validateOption) {
        if (validateOption(inputValue, id)) {
          if (onValueChange) {
            onValueChange(id, inputValue.trim());
          }
          onSelect(id, true);
        } else {
          setInputValue("");
        }
      }
    }
    setShowEdit(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setInputValue("");
    onSelect(id);
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    React.useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref?.current && !ref?.current.contains(event.target)) {
          setShowEdit(false);
        }
      }
      //Binding the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        //removing the event listener
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      {!isEditable ? (
        <div
          className={
            "cursor-pointer inline-block py-1 px-4 m-1 text-center rounded-lg border hover:bg-gray-400 hover:text-white transition duration-300" +
            (isSelected
              ? "bg-turquoisesea text-white"
              // : "border-turquoisesea text-turquoisesea bg-whitesolid shadow-lg")
              // : "border-turquoisesea text-white bg-turquoisesea shadow-lg")
              // : " text-white border-international bg-international shadow-lg")
              : " text-white border-wolverine bg-wolverine shadow-lg")
          }
          onClick={handleOnSelect}
        >
          {label}
        </div>
      ) : (
        <>
          {showEdit ? (
            <span ref={wrapperRef}>
              <KPInput
                suffix={<CheckOutlined onClick={handleSubmit} />}
                onChange={handleInputChange}
                value={inputValue}
                onPressEnter={handleSubmit}
                autoFocus={true}
                className="rounded-lg w-36"
              />
            </span>
          ) : (
            <>
              <div className="edit-overlay text-center mb-1 cursor-pointer min-w-1/6">
                <div
                  className={
                    "inline-block cursor-pointer p-2 w-full rounded-lg border hover:bg-turquoisesea hover:text-white " +
                    (isSelected
                      ? "bg-turquoisesea text-white"
                      : "border-turquoisesea text-turquoisesea bg-transparent")
                  }
                >
                  {label}
                </div>
                <div
                  className={
                    "overlay space-x-2 flex items-center justify-center min-w-1/6"
                  }
                >
                  <div
                    onClick={handleEdit}
                    className="text-lg flex items-center justify-center"
                  >
                    <EditOutlined />
                  </div>
                  {isSelected ? (
                    <div
                      onClick={handleDelete}
                      className="text-lg flex items-center justify-center"
                    >
                      <DeleteOutlined />
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default KPOption;
