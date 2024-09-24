'use client';

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";

/****************************************
 * ImageToHtml Component
 * 
 * This component is responsible for rendering
 * an HTML input field and converting that HTML
 * content into a previewable image.
 ****************************************/

const ImageToHtml = () => {

  // ***************** State Declarations *****************
  // htmlInput stores the raw HTML entered by the user
  const [htmlInput, setHtmlInput] = useState<string>("");

  // image holds the generated Base64 string for the PNG image
  const [image, setImage] = useState<string | null>(null);

  // Ref to the div that renders the HTML preview before conversion
  const previewRef = useRef<HTMLDivElement>(null);

  // ***************** Core Functionality *****************
  // handleConvert is responsible for converting the HTML to an image.
  // It uses the 'toPng' method from 'html-to-image' library and logs the
  // time taken for the conversion process.
  const handleConvert = async () => {
    // Start measuring conversion time
    console.time("html-to-image");

    if (previewRef.current) {
      try {
        // Convert the HTML content inside previewRef to PNG format
        const png = await toPng(previewRef.current?.firstChild as any);

        // Set the generated image to be displayed on the page
        setImage(png);
        console.log("HTML successfully converted to PNG:", png);
      } catch (error) {
        // Log any potential errors in the conversion process
        console.error("Error during HTML to image conversion:", error);
      }
    }

    // End the timer and log the total time taken
    console.timeEnd("html-to-image");
  };

  return (
    <div className="container">
      {/* ***************** Preview Side ***************** */}
      <div className="preview-container">
        <h2>Preview</h2>
        {/* Render the HTML content entered by the user */}
        <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: htmlInput }}
          className="preview"
        />

        {/* If an image has been generated, display it */}
        {image && (
          <div className="output-image">
            <img src={image} alt="Converted" />
          </div>
        )}
      </div>

      {/* ***************** HTML Input Side ***************** */}
      <div className="text-area-container">
        <h2>HTML Input</h2>
        {/* Text area for user to input raw HTML content */}
        <textarea
          rows={15}
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value.trim())}
        />

        {/* Button to trigger the HTML-to-image conversion process */}
        <button onClick={handleConvert}>Submit</button>
      </div>
    </div>
  );
};

export default ImageToHtml;
