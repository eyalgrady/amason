import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

// const RichTextEditor = ({ value, onChange }) => (
//   <ReactQuill
//     value={value}
//     onChange={onChange}
//     theme="snow"
//     modules={RichTextEditor.modules}
//     formats={RichTextEditor.formats}
//   />
// );

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  return (
    <ReactQuill
      ref={quillRef} // שימוש ב-ref ישיר
      value={value}
      onChange={onChange}
      theme="snow"
      modules={RichTextEditor.modules}
      formats={RichTextEditor.formats}
    />
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
  ],
};

RichTextEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "color",
  "background",
  "align",
  "link",
  "image",
];

export default RichTextEditor;
