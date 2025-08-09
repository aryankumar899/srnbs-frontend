import React from "react";
import { Link } from "react-router-dom";

const ApplicationForm = () => {
  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    alert("⚠️ Please fill in all required fields before submitting the form.");
    return;
  }

  // Collect data from form
  const formData = {
    full_name: form.fullNName.value,
    father_name: form.fatherName.value,
    mother_name: form.motherName.value,
    dob: form.dob.value,

    matric_board: form.matricBoard.value,
    matric_yop: form.matricYear.value,

    intermediate_board: form.interBoard.value,
    intermediate_yop: form.interYear.value,

    ug_college: form.ugCollege.value,
    ug_yop: form.ugYear.value,

    gender: form.gender.value,
    high_qualification: form.educationLevel.value,

    phone: form.mobile.value,
    email: form.email.value,

    state_permanent: form.state.value,
  };

  // Save to localStorage
  localStorage.setItem("applicationData", JSON.stringify(formData));
  console.log(localStorage.getItem("applicationData"))
  

  alert("✅ Stage 1 data saved to localStorage!");
};


  return (
    <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded mt-40">
      {/* Stage Tracker */}
      <div className="flex justify-between mb-8 relative">
        {["BASIC DETAILS", "ADDITIONAL AND CONTACT DETAILS", "PHOTO AND SIGNATURE DETAILS"].map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold ${
                i === 0
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
      <form className="space-y-6" onSubmit={handleSubmit}>
           <Input
          label="Name of the Applicant"
          name="fullNName"
          note="Same as in Matriculation Certificate (no salutation)."
          required
        />

        <Input
          label="Father's Name"
          name="fatherName"
          note="Same as in Matriculation Certificate (no salutation)."
          required
        />
        <Input
          label="Mother's Name"
          name="motherName"
          note="Same as in Matriculation Certificate (no salutation)."
          required
        />
        <Input
          label="Date of Birth (DD/MM/YYYY)"
          name="dob"
          type="date"
          note="As mentioned in Matriculation Certificate"
          required
        />

        {/* Matriculation */}
        <h3 className="text-lg font-semibold mt-6">Matriculation (10th Class) Examination Details:</h3>
        <Select label="(i) Education Board" name="matricBoard" options={["CBSE", "ICSE", "State Board"]} required />
     
        <Select
          label="(iii) Year of Passing"
          name="matricYear"
          options={Array.from({ length: 30 }, (_, i) => 1995 + i)}
          required
        />

        {/* Intermediate */}
        <h3 className="text-lg font-semibold mt-6">Intermediate (12th Class) Examination Details:</h3>
        <Select label="(i) Education Board" name="interBoard" options={["CBSE", "ICSE", "State Board"]} required />
      
        <Select
          label="(iii) Year of Passing"
          name="interYear"
          options={Array.from({ length: 30 }, (_, i) => 1995 + i)}
          required
        />

        {/* UG */}
        <h3 className="text-lg font-semibold mt-6">Under Graduation (UG) Examination Details:</h3>
        <Select
          label="(i) College/University Name:"
          name="ugCollege"
          options={["College A", "College B", "College C"]}
          required
        />

        <Select
          label="(iii) Year of Passing"
          name="ugYear"
          options={Array.from({ length: 30 }, (_, i) => 1995 + i)}
          required
        />

        <Section title="Gender" required>
          <RadioGroup name="gender" options={["Male", "Female", "Transgender"]} required />
        </Section>

        <Select
          label="Highest Qualification"
          name="educationLevel"
          options={["10th Pass", "12th Pass", "Graduate"]}
          required
        />

        <Input label="Mobile Number" name="mobile" required />
        <Input label="Email ID" name="email" required />

        <Select
          label="State of Permanent Address"
          name="state"
          options={[
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
            "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
            "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
          ]}
          required
        />
        

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-sky-800 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Reset
          </button>
             <Link to="/application-form/additional-contact-details">
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Next
          </button>
          </Link>
        </div>

        
      </form>
    </div>
  );
};

// Reusable Components
const Input = ({ label, name, type = "text", note, required = false }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-medium mb-1">
      {label}{required && <span className="text-red-500"> *</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className="w-full border rounded px-3 py-2"
      required={required}
    />
    {note && <p className="text-sm text-blue-500 mt-1">{note}</p>}
  </div>
);

const Select = ({ label, name, options = [], note, required = false }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-medium mb-1">
      {label}{required && <span className="text-red-500"> *</span>}
    </label>
    <select id={name} name={name} className="w-full border rounded px-3 py-2" required={required}>
      <option value="">--Select--</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
    {note && <p className="text-sm text-blue-500 mt-1">{note}</p>}
  </div>
);

const RadioGroup = ({ name, options = [], required = false }) => (
  <div className="flex gap-6 p-2 mb-2 items-center justify-start flex-wrap border rounded">
    {options.map((opt, i) => (
      <label key={i} className="inline-flex items-center mr-4">
        <input type="radio" name={name} value={opt} className="mr-2" required={required} /> {opt}
      </label>
    ))}
  </div>
);

const Section = ({ title, children, required = false }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">
      {title}{required && <span className="text-red-500"> *</span>}
    </label>
    {children}
  </div>
);

export default ApplicationForm;
