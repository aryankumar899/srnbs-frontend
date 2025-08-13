import React, { useState } from "react";
import { Link } from "react-router-dom";

const PhotoSignatureUpload = () => {
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  // Convert file to base64 string
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read as base64
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove prefix
      reader.onerror = (error) => reject(error);
    });
  };

  // File validations
  const validateFile = (file, type) => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/jpg";
    const sizeKB = file.size / 1024;

    if (type === "photo" && (!isJPG || sizeKB < 20 || sizeKB > 50)) {
      alert("Photo must be JPG/JPEG and 20–50 KB in size.");
      return false;
    }

    if (type === "signature" && (!isJPG || sizeKB < 10 || sizeKB > 20)) {
      alert("Signature must be JPG/JPEG and 10–20 KB in size.");
      return false;
    }

    return true;
  };

 const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (file && validateFile(file, "photo")) {
    const base64 = await toBase64(file);
    setPhoto({ preview: URL.createObjectURL(file), base64, file });
  }
};

const handleSignatureChange = async (e) => {
  const file = e.target.files[0];
  if (file && validateFile(file, "signature")) {
    const base64 = await toBase64(file);
    setSignature({ preview: URL.createObjectURL(file), base64, file });
  }
};
  const removePhoto = () => setPhoto(null);
  const removeSignature = () => setSignature(null);

const handleSubmit = async () => {   // <-- add async here
  if (!photo || !signature) {
    alert("Please upload both Photo and Signature before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", photo.file);
  formData.append("signature", signature.file);

  try {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log("✅ Uploaded to Cloudinary:", data);

    if (res.ok) {
      alert("Uploaded successfully!");
    } else {
      alert("Upload failed: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error uploading files.");
  }

  const existingData = JSON.parse(localStorage.getItem("applicationData")) || {};
  const updatedData = {
    ...existingData,
    photo: photo.base64,
    signature: signature.base64,
  };

  localStorage.setItem("applicationData", JSON.stringify(updatedData));
  console.log("📦 Final Data to be sent to server:", updatedData);
  alert("✅ All data saved! Ready to be submitted to backend.");
};
  

  return (
    <div className="max-w-3xl mx-auto mt-40 p-6 bg-white shadow-md rounded">
      {/* Steps Indicator */}
      <div className="flex justify-between mb-8 relative">
        {["BASIC DETAILS", "ADDITIONAL AND CONTACT DETAILS", "PHOTO AND SIGNATURE DETAILS"].map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold ${
                i === 2
                  ? "bg-sky-800 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-400"
              }`}
            >
              {i + 1}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">{step}</span>
          </div>
        ))}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 z-0" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-blue-800">Photo and Signature</h2>

      {/* Photo Upload */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">
          19. Upload Photo <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-1">
          File Size: <strong>20 KB – 50 KB</strong> | Format: JPG/JPEG
        </p>
        <div className="flex items-center gap-4 mt-2">
          <input type="file" accept="image/jpeg, image/jpg" onChange={handlePhotoChange} />
          <button
            type="button"
            onClick={removePhoto}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
          >
            Cancel Photo
          </button>
        </div>
        {photo && (
          <div className="relative mt-4 w-32 h-40 border rounded overflow-hidden">
            <img src={photo.preview} alt="Uploaded" className="w-full h-full object-cover" />
            <button
              onClick={removePhoto}
              className="absolute top-0 right-0 bg-white rounded-full p-1 text-black shadow"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Signature Upload */}
      <div>
        <label className="block font-semibold mb-2">
          20. Upload Signature <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-1">
          File Size: <strong>10 KB – 20 KB</strong> | Format: JPG/JPEG
        </p>
        <div className="flex items-center gap-4 mt-2">
          <input type="file" accept="image/jpeg, image/jpg" onChange={handleSignatureChange} />
          <button
            type="button"
            onClick={removeSignature}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
          >
            Cancel Signature
          </button>
        </div>
        {signature && (
          <div className="relative mt-4 w-40 h-24 border rounded overflow-hidden">
            <img src={signature.preview} alt="Signature" className="w-full h-full object-cover" />
            <button
              onClick={removeSignature}
              className="absolute top-0 right-0 bg-white rounded-full p-1 text-black shadow"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/application-form/additional-contact-details">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-sky-800 hover:bg-sky-700 cursor-pointer text-white font-semibold py-2 px-6 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PhotoSignatureUpload;
