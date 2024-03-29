import React, { useState } from "react";
import { extractFile ,listFile} from "../../redux/api";
const PdfViewer = ({ filePath, pdfId, onClosePdf }) => {
    const [extractPageNumbers, setExtractPageNumbers] = useState("");
  
    const handleExtract = async () => {
      try {
        const response = await extractFile({
          pdfId: pdfId,
          selectedPages: extractPageNumbers.split(",").map(Number),
        });
        console.log(response.data); // Handle response as needed
        onClosePdf(); 
      } catch (error) {
        console.error("Error extracting PDF pages:", error);
      }
    };
  
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-xl font-semibold mb-4">PDF Viewer</h1>
        <iframe
          title="pdfFrame"
          src={`http://localhost:4001/uploads/${filePath}`}
          frameBorder="0"
          className="w-full"
          style={{ height: "500px" }}
        />
        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Enter page numbers (comma-separated)"
            value={extractPageNumbers}
            onChange={(e) => setExtractPageNumbers(e.target.value)}
            className="border border-gray-300 px-4 py-2 mr-2 rounded-md w-1/2"
          />
          <button
            onClick={handleExtract}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Extract Pages
          </button>
          <button
            onClick={onClosePdf}
            className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Close PDF
          </button>
        </div>
      </div>
    );
  };
  
  export default PdfViewer;