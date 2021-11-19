
import React from "react";
import marked from "marked"; 

type KPRichTextEditorProps = {
  //
};

const KPRichTextEditor: React.FC<any> = ({ value }) => {
  const html = marked.parseInline(value);

  return <div dangerouslySetInnerHTML={{ __html: html }} />
};

export default React.memo(KPRichTextEditor);
