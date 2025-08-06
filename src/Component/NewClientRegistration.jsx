// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Correct import

// const generateCaptcha = () =>
//   Math.floor(10000 + Math.random() * 90000).toString();

// const NewClientRegistration = () => {
//   const navigate = useNavigate(); // ✅ Moved inside component

//   const [form, setForm] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     mobile: "",
//     email: "",
//     nationality: "",
//     dob: "",
//     captchaInput: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [captcha, setCaptcha] = useState(generateCaptcha());

//   useEffect(() => {
//     setCaptcha(generateCaptcha());
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.firstName) newErrors.firstName = "Enter your first name.";
//     if (!/^\d{10}$/.test(form.mobile))
//       newErrors.mobile = "Enter a valid 10-digit phone number.";
//     if (!/^\S+@\S+\.\S+$/.test(form.email))
//       newErrors.email = "Enter a valid email address.";
//     if (!form.nationality)
//       newErrors.nationality = "Please select your nationality.";
//     if (!form.dob) newErrors.dob = "Please enter the valid date of birth.";
//     if (form.captchaInput !== captcha)
//       newErrors.captchaInput = "Captcha doesn't match.";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const foundErrors = validate();
//     setErrors(foundErrors);

//     if (Object.keys(foundErrors).length === 0) {
//       const fullName =
//         `${form.firstName} ${form.middleName} ${form.lastName}`.trim();

//       fetch("http://localhost:5000/api/clients/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: fullName,
//           mobile: form.mobile,
//           email: form.email,
//           nationality: form.nationality,
//           dob: form.dob,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.message === "User already exists") {
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               email: "Email already exists.",
//               mobile: "Mobile Number already exists.",
//             }));
//             return;
//           }

//           // ✅ Show credentials after successful registration
//           if (data.credentials) {
//             alert(
//               "Registered!\nUsername: " +
//                 data.credentials.username +
//                 "\nPassword: " +
//                 data.credentials.password
//             );
//           }

//           alert("Registration successful!");

//           setForm({
//             firstName: "",
//             middleName: "",
//             lastName: "",
//             mobile: "",
//             email: "",
//             nationality: "",
//             dob: "",
//             captchaInput: "",
//           });
//           setCaptcha(generateCaptcha()); // regenerate captcha

//           // ✅ This will now work
//           navigate("/client-registration", {
//             state: {
//               mobile: form.mobile,
//               email: form.email,
//               username: data.credentials.username,
//               password: data.credentials.password,
//             },
//           });
//         })
//         .catch((err) => {
//           alert("Error submitting form");
//           console.error(err);
//         });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 mt-30">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
//       >
//         <div className="grid md:grid-cols-3 gap-4">
//           {/* First Name */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               आवेदन का पहला नाम / Applicant's First Name{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${
//                 errors.firstName ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your first name"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//             )}
//           </div>

//           {/* Middle Name */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               आवेदक का मध्य नाम / Applicant's Middle Name
//             </label>
//             <input
//               type="text"
//               name="middleName"
//               value={form.middleName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//               placeholder="Enter your middle name"
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               आवेदक का अंतिम नाम / Applicant's Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//               placeholder="Enter your last name"
//             />
//           </div>
//         </div>

//         {/* Auto-filled Full Name */}
//         <div className="bg-yellow-100 p-3 rounded border">
//           <label className="block font-semibold text-gray-800 mb-1">
//             आवेदक का पूरा नाम / Applicant's Full Name
//           </label>
//           <input
//             type="text"
//             readOnly
//             value={`${form.firstName} ${form.middleName} ${form.lastName}`.trim()}
//             className="w-full px-3 py-2 border border-gray-300 rounded bg-yellow-50"
//           />
//           <p className="text-green-700 text-sm mt-1">
//             This name is auto-filled based on the details above.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           {/* Mobile */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               मोबाइल नंबर / Mobile Number{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="tel"
//               name="mobile"
//               value={form.mobile}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${
//                 errors.mobile ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="10-digit phone number"
//             />
//             {errors.mobile && (
//               <p className="text-red-500 text-sm">{errors.mobile}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               ईमेल आईडी / E-Mail ID <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Valid email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           {/* Nationality */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               भारतीय नागरिक / Indian Citizen{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="nationality"
//               value={form.nationality}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${
//                 errors.nationality ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">--- Select ---</option>
//               <option value="Indian">Yes</option>
//               <option value="Other">No</option>
//             </select>
//             {errors.nationality && (
//               <p className="text-red-500 text-sm">{errors.nationality}</p>
//             )}
//           </div>

//           {/* DOB */}
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">
//               जन्मतिथि / Date of Birth <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="dob"
//               value={form.dob}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded ${
//                 errors.dob ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
//           </div>
//         </div>

//         {/* Captcha */}
//         <div className="grid md:grid-cols-3 gap-4 items-end">
//           <div className="bg-green-400 text-white font-bold text-center py-2 rounded">
//             {captcha}
//           </div>
//           <input
//             type="text"
//             name="captchaInput"
//             value={form.captchaInput}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${
//               errors.captchaInput ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter the captcha"
//           />
//           {errors.captchaInput && (
//             <p className="text-red-500 text-sm col-span-2">
//               {errors.captchaInput}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
//           >
//             Register Now
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewClientRegistration;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const generateCaptcha = () =>
  Math.floor(10000 + Math.random() * 90000).toString();

const NewClientRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    email: "",
    nationality: "",
    dob: "",
    captchaInput: "",
  });

  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim())
      newErrors.firstName = "Enter your first name.";

    if (!/^\d{10}$/.test(form.mobile.trim()))
      newErrors.mobile = "Enter a valid 10-digit phone number.";

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      newErrors.email = "Enter a valid email address.";

    if (!form.nationality)
      newErrors.nationality = "Please select your nationality.";

    if (!form.dob) {
      newErrors.dob = "Please enter date of birth.";
    } else {
      const enteredDate = new Date(form.dob);
      const today = new Date();
      if (enteredDate >= today)
        newErrors.dob = "Date of birth must be in the past.";
    }

    if (form.captchaInput.trim() !== captcha) {
      newErrors.captchaInput = "Captcha doesn't match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const fullName = `${form.firstName.trim()} ${form.middleName.trim()} ${form.lastName.trim()}`.trim();

    try {
      const response = await fetch("http://localhost:5000/api/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          nationality: form.nationality,
          dob: form.dob,
        }),
      });

      const data = await response.json();

      if (data.message === "User already exists") {
        setErrors({
          email: "Email already exists.",
          mobile: "Mobile number already exists.",
        });
        return;
      }

      if (data.credentials) {
  // ✅ Save token to localStorage (if it exists)
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }
}

      if (data.credentials) {
        alert(
          `✅ Registration Successful!\n\nUsername: ${data.credentials.username}\nPassword: ${data.credentials.password}`
        );

        navigate("/client-registration", {
          state: {
            mobile: form.mobile,
            email: form.email,
            username: data.credentials.username,
            password: data.credentials.password,
          },
        });

        setForm({
          firstName: "",
          middleName: "",
          lastName: "",
          mobile: "",
          email: "",
          nationality: "",
          dob: "",
          captchaInput: "",
        });
        setCaptcha(generateCaptcha());
        setErrors({});
      } else {
        alert("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-30">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
      >
       <div className="grid md:grid-cols-3 gap-4">
         {/* First Name */}
         <div>
           <label className="block font-semibold text-gray-700 mb-1">
             आवेदन का पहला नाम / Applicant's First Name{" "}
             <span className="text-red-500">*</span>
           </label>
             <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Middle Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              आवेदक का मध्य नाम / Applicant's Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your middle name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              आवेदक का अंतिम नाम / Applicant's Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Auto-filled Full Name */}
        <div className="bg-yellow-100 p-3 rounded border">
          <label className="block font-semibold text-gray-800 mb-1">
            आवेदक का पूरा नाम / Applicant's Full Name
          </label>
          <input
            type="text"
            readOnly
            value={`${form.firstName} ${form.middleName} ${form.lastName}`.trim()}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-yellow-50"
          />
          <p className="text-green-700 text-sm mt-1">
            This name is auto-filled based on the details above.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Mobile */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              मोबाइल नंबर / Mobile Number{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="10-digit phone number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              ईमेल आईडी / E-Mail ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Valid email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Nationality */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              भारतीय नागरिक / Indian Citizen{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.nationality ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">--- Select ---</option>
              <option value="Indian">Yes</option>
              <option value="Other">No</option>
            </select>
            {errors.nationality && (
              <p className="text-red-500 text-sm">{errors.nationality}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              जन्मतिथि / Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>
        </div>

        {/* Captcha */}
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="bg-green-400 text-white font-bold text-center py-2 rounded">
            {captcha}
          </div>
          <input
            type="text"
            name="captchaInput"
            value={form.captchaInput}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.captchaInput ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter the captcha"
          />
          {errors.captchaInput && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.captchaInput}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewClientRegistration;

