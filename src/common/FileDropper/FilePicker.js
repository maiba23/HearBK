import React from "react";

export default function FilePicker({ onUpload, block, style, children, className, accept }) {
  const fileRef = React.useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (onUpload) onUpload(files);
  };

  return (
    <div onClick={() => fileRef.current.click()} style={{ display: "inline-block", width: "100%", height: "100%" }}>
      <input accept={accept} style={{ display: "none" }} onChange={handleFileChange} ref={fileRef} type="file" />
      {children}
    </div>
  );
}
