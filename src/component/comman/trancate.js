import React, { useState } from "react";

const TruncateText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (text.length <= maxLength || isExpanded) {
    return (
      <span>
        {text}
        {!isExpanded && text.length > maxLength && (
          <button onClick={toggleExpanded} className="text-blue-600">
            ...Show more
          </button>
        )}
        {isExpanded && (
          <button onClick={toggleExpanded} className="text-blue-600">
            Show less
          </button>
        )}
      </span>
    );
  }

  const truncatedText = text.substring(0, maxLength) + "...";

  return (
    <span>
      {truncatedText}
      <button onClick={toggleExpanded} className="text-blue-600">
        Show more
      </button>
    </span>
  );
};

export default TruncateText;
