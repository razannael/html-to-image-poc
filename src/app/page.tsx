'use client';
 
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./globals.css";


const Home: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>(""); 
  const [images, setImages] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    console.time("html-to-image");
    if (previewRef.current) {
      try {
        // Adjust the width and height based on the preview element's dimensions
        const scaleFactor = Math.min( 
          400 / previewRef.current.clientWidth,
          400 / previewRef.current.clientHeight
        );

        const png = await toPng(previewRef.current, {
          cacheBust: true,
          height: 100,
          width: 100,
        });
  
        setImages((prevImages) => [...prevImages, png]);
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
          style={{
            border: "1px solid green-alpha-200",
            padding: "10px",
            width: "100%",
            height: "100%",
          }}
          className="preview"
        />
        {images.length > 0 && (
          <>
            <h3>Output Images</h3>
            <div className="output-images">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Converted ${index}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Text Area Side */}
      <div className="text-area-container">
        <h2>HTML Input</h2>
        <textarea
          rows={15}
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
        />
        <button onClick={handleConvert}>Submit</button>
      </div>
    </div>
  );
};

export default Home;


