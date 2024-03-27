import React, { useState } from "react";

const TruncateTextLimited = ({ text, maxLength }) => {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text.substring(0, maxLength) + "...";

  return <span>{truncatedText}</span>;
};

export default TruncateTextLimited;
