import React, { useEffect } from "react";
import { Typography } from '@mui/material';
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Choose the theme

// Import languages you need
import "prismjs/components/prism-javascript.min.js"; // For JavaScript, change it based on the language

const CodeDisplay = ({ code }) => {
  useEffect(() => {
    // Highlight the code block after it has been rendered
    Prism.highlightAll();
  }, [code]);

  const splitDescription = code.split(/(<.*?>)/); // Split the description to separate code from text

  return (
    <Typography variant="body1" sx={{ marginTop: 1 }}>
      {/* Render text and highlight only the code part */}
      {splitDescription.map((part, index) => {
        if (part.startsWith("<") && part.endsWith(">")) {
          // Code block
          return (
            <pre
              key={index}
              style={{
                backgroundColor: "#2d2d2d", // Dark background like a code editor
                color: "#dcdcdc", // Light text color
                padding: "16px", // Padding for readability
                borderRadius: "4px", // Rounded corners for a nicer look
                whiteSpace: "pre-wrap", // Preserve spaces and line breaks
                wordWrap: "break-word", // Allow long lines to wrap
                overflowY: "auto", // Make it scrollable
                maxHeight: "300px", // Set max height for scrolling
                fontFamily: "'Courier New', Courier, monospace", // Monospace font
                fontSize: "14px", // Adjust font size
              }}
            >
              <code className="language-javascript">{part}</code> {/* Highlighted code */}
            </pre>
          );
        } else {
          // Regular text
          return <span key={index}>{part}</span>;
        }
      })}
    </Typography>
  );
};

export default CodeDisplay;
