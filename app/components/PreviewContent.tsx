"use client";

import MDEditor from "@uiw/react-md-editor";
import React from "react";

const RenderContent = ({ content }) => {
  return <MDEditor.Markdown source={content} />;
};

export default RenderContent;
