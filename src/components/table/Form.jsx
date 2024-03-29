import React, { useState, useEffect } from "react";
import { listFile, deleteFile, uploadFile } from "../../redux/api";

const Form = ({ handlePdfClick }) => {
  const [pdfList, setPdfList] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    updatePdfList();
  }, []);

  const updatePdfList = async () => {
    try {
      const response = await listFile();
      setPdfList(response.data.data.savedPdfFiles || []);
    } catch (error) {
      console.error("Error fetching PDF list:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const response = await uploadFile(formData);
      updatePdfList();
      setUploadOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDeletePdf = async (pdfId) => {
    try {
      const response = await deleteFile({ pdfId });
      console.log(response.data); // Handle response as needed
      updatePdfList();
    } catch (error) {
      console.error("Error deleting PDF file:", error);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/2">
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-3/4 px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Name
                </th>
                <th className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pdfList.map((pdf) => (
                <tr key={pdf._id} className="bg-white">
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {pdf.fileName}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      type="button"
                      onClick={() => handlePdfClick(pdf)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePdf(pdf._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
            <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3"
          type="button"
          onClick={() => setUploadOpen(!uploadOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            ></path>
          </svg>
          {uploadOpen ? "Close" : "Upload File"}
        </button>
      </div>
      <div className="w-1/2">
    
        {uploadOpen && (
          <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                File Upload!
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Extract your pdf By Uploading{" "}
              </p>
            </div>
            <form className="mt-8 space-y-3" action="#" method="POST">
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Attach Document
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        {file ? (
                          <span>{file.name}</span>
                        ) : (
                          <span>
                            <span className="text-sm">Drag and drop</span> files
                            here <br /> or{" "}
                            <label
                              htmlFor="fileInput"
                              className="text-blue-600 hover:underline cursor-pointer"
                            >
                              select a file
                            </label>{" "}
                            from your computer
                          </span>
                        )}
                      </p>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: pdf</span>
              </p>
              <div>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  disabled={!file}
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
