import React from "react";
import "./fileDropper.style.scss";
import { FileDrop } from "react-file-drop";
import FilePicker from "./FilePicker";

export default function FileDropper({ onDrop, className, children, accept }) {
  return (
    <div className={className}>
      <FilePicker onUpload={onDrop} accept={accept ? accept : "*"}>
        <FileDrop onDrop={(files, event) => onDrop(files)}>{children}</FileDrop>
      </FilePicker>
    </div>
  );
}
