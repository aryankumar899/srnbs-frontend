import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdditionalContactDetails = () => {
  const [hasDisability, setHasDisability] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Form submitted!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded mt-40">

       <div className="flex justify-between mb-8 relative">
        {["BASIC DETAILS", "ADDITIONAL AND CONTACT DETAILS", "PHOTO AND SIGNATURE DETAILS"].map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold ${
                i === 1
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
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Additional and Contact Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Section title="11. Category" required>
          <RadioGroup name="category" options={["General", "OBC", "ST", "SC"]} />
        </Section>


        <Select label="12. Nationality" name="nationality" options={["Indian", "Other"]} required />
        <Input label="13. Identification Marks" name="marks" required />

        <Section title="14a. Are you a Person with Benchmark Disability?" required>
          <RadioGroup
            name="disabilityStatus"
            options={["Yes", "No"]}
            onChange={(e) => setHasDisability(e.target.value === "Yes")}
          />
        </Section>

        {hasDisability && (
          <>
            <Select
              label="14b. Type of Disability"
              name="disabilityType"
              options={["VH", "HH", "OH", "Others"]}
              note={`VH: Blindness and low vision | HH: Deaf and hard of hearing | OH: Locomotor disability (e.g. cerebral palsy, muscular dystrophy) | Others: Autism, mental illness, etc.`}
              required
            />
            <Input label="14c. Disability Certificate Number" name="disabilityCert" required />
          </>
        )}
<h3 className="font-semibold text-lg pt-2">Permanent Address</h3>

<div className="mb-4">
  <label htmlFor="permAddress" className="block text-sm font-medium text-gray-700 mb-1">
    15a. Full Address <span className="text-red-500">*</span>
  </label>
  <textarea
    id="permAddress"
    name="permAddress"
    rows="3"
    required
    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
  ></textarea>
</div>

<Input label="15b. District" name="permDistrict" required />
<Input label="15c. PIN Code" name="permPin" type="number" required />
<Input label="15d. State/ UT" name="permState" required />



        <Section title="16. Is Present Address same as Permanent Address?" required>
          <RadioGroup
            name="sameAddress"
            options={["Yes", "No"]}
            onChange={(e) => setSameAddress(e.target.value === "Yes")}
          />
        </Section>

        {!sameAddress && (
          <>
            <h3 className="font-semibold text-lg pt-2">Present Address</h3>
            <Input label="17a. Present Address" name="presentAddress" required />
            <Input label="17b. State/ UT" name="presentState" required />
            <Input label="17c. District" name="presentDistrict" required />
            <Input label="17d. PIN Code" name="presentPin" type="number" required />
          </>
        )}

        <Input label="18. Contact details for other nationals" name="otherContact" />

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
           <Link to="/application-form">
           <button
             type="button"
             onClick={() => window.history.back()}
             className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
           >
             Previous
           </button>
           </Link>
          <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">
            Save
          </button>
          <Link to="/application-form/photo-signature-upload">
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Next
          </button>
          </Link>
          <button type="reset" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// Components
const Input = ({ label, name, type = "text", required = false }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full border px-3 py-2 rounded"
    />
  </div>
);

const Select = ({ label, name, options, required = false, note }) => (
  <div>
    <label className="block mb-1 font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select name={name} required={required} className="w-full border px-3 py-2 rounded">
      <option value="">--Select--</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
    {note && <p className="text-sm text-gray-600 mt-1">{note}</p>}
  </div>
);

const RadioGroup = ({ name, options, required = true, onChange }) => (
  <div className="flex gap-6 flex-wrap items-center">
    {options.map((opt, idx) => (
      <label key={idx} className="inline-flex items-center gap-2">
        <input
          type="radio"
          name={name}
          value={opt}
          required={required}
          onChange={onChange}
        />
        {opt}
      </label>
    ))}
  </div>
);

const Section = ({ title, required = false, children }) => (
  <div>
    <label className="block font-medium mb-1">
      {title} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export default AdditionalContactDetails;
