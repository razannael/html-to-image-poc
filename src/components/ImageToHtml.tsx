"use client";

import React from "react";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
const ImageToHtml = () => {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    console.time("html-to-image");
    if (previewRef.current) {
      try {
        const png = await toPng(previewRef.current?.firstChild as any);
        setImage(png); // Set the converted image state
        console.log("HTML converted to PNG:", png);
      } catch (error) { 
        console.error("Error converting HTML to image:", error);
      }
    }
    console.timeEnd("html-to-image");
  };

  return (
    <div className="container">
      {/* Preview Side */}
      <div className="preview-container">
        <h2>Preview</h2>
        <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: htmlInput }}
          className="preview"
        />
        {/* Display the converted image only after submission */}
        {image && (
          <div className="output-image">
            <img src={image} alt="Converted" />
          </div>
        )}
      </div>
      {/* Text Area Side */}
      <div className="text-area-container">
        <h2>HTML Input</h2>
        <textarea
          rows={15}
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value.trim())}
        />
        <button onClick={handleConvert}>Submit</button>
      </div>
    </div>
  );
};

export default ImageToHtml;
