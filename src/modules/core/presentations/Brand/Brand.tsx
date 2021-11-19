import * as React from "react";
import KPImage from "../../../ui/widgets/KPImage";

type BrandProps = {
  image: any;
};

const Brand: React.FC<any> = (props: BrandProps) => {

  const { image } = props;

  return <div><KPImage src={image}></KPImage></div>;
};

export default Brand;
