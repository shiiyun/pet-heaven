
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./services.css";

const initialForm = {
  ownerName: "",
  email: "",
  phone: "",
  petName: "",
  petType: "Dog",
  breed: "",
  age: "",
  gender: "Male",
  vaccinated: "Unknown",
  sterilised: "Unknown",
  temperament: "",
  reason: "",
  agree: false
};

const Services = () => {
  const [formData, setFormData] = useState(() => {
    let user = null;

    try {
      user = JSON.parse(
        sessionStorage.getItem("petHeavenSession") || "null"
      );
    } catch {
      user = null;
    }

    return {
      ...initialForm,
      ownerName: user?.name || "",
      email: user?.email || ""
    };
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const errorRef = useRef(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      errorRef.current.focus({
        preventScroll: true
      });
    }
  }, [error]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const phone = formData.phone.replace(/\s/g, "");

    if (!/^[689]\d{7}$/.test(phone)) {
      setError(
        "Please enter a valid contact number."
      );
      return;
    }

    if (formData.temperament.trim().length < 15) {
      setError(
        "Please provide at least 15 characters about your pet."
      );
      return;
    }

    if (formData.reason.trim().length < 20) {
      setError(
        "Please provide at least 20 characters explaining the reason."
      );
      return;
    }

    if (!formData.agree) {
      setError("Please confirm the declaration.");
      return;
    }

    const requestId = "RH-" + Date.now();

    const newRequest = {
      id: requestId,
      ownerName: formData.ownerName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone,
      petName: formData.petName.trim(),
      petType: formData.petType,
      breed: formData.breed.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      vaccinated: formData.vaccinated,
      sterilised: formData.sterilised,
      temperament: formData.temperament.trim(),
      reason: formData.reason.trim(),
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(
        localStorage.getItem("petHeavenReleaseRequests") || "[]"
      );

      const requests = Array.isArray(stored) ? stored : [];

      requests.push(newRequest);

      localStorage.setItem(
        "petHeavenReleaseRequests",
        JSON.stringify(requests)
      );

      setReference(requestId);
      setSubmitted(true);
    } catch {
      setError(
        "Unable to save your request. Please try again."
      );
    }
  };

  return (
    <main className="services-page">

      <section className="services-hero">
        <div className="services-container">
          <span className="services-label">OUR SERVICES</span>

          <h1>Helping Pets Find Their<span> Forever Homes.</span></h1>

          <p>
            Whether you're looking to welcome a new companion or need help 
            finding a loving home for your pet, Pet Heaven is here to support you.
          </p>

          <div className="services-hero-buttons">
            <a href="#rehome-form" className="services-primary-btn">Rehome a Pet →</a>

            <Link to="/adoption" className="services-secondary-btn">Adopt a Pet</Link>
          </div>
        </div>
      </section>

      <section className="services-offered">
        <div className="services-container">

          <div className="services-heading">
            <span className="services-label">WHAT WE OFFER</span>

            <h2>Our Services</h2>
            <p>Supporting responsible pet ownership and helping animals find loving homes.</p>
          </div>

          <div className="services-grid">

            <article className="services-card">
              <div className="services-card-icon">🐶</div>
              <h3>Pet Adoption</h3>
              <p>
                Discover dogs and cats looking for loving families. 
                Browse available pets and submit an adoption request.
              </p>

              <Link to="/adoption"> Browse Pets →</Link>
            </article>

            <article className="services-card">
              <div className="services-card-icon">🏡</div>
              <h3>Pet Rehoming</h3>
              <p>
                Unable to continue caring for your pet? Submit their 
                information to begin the rehoming process.
              </p>

              <a href="#rehome-form">Rehome a Pet →</a>
            </article>

            <article className="services-card">
              <div className="services-card-icon">♥</div>
              <h3>Pet Care Guidance</h3>
              <p>
                Learn about nutrition, exercise, health and responsible 
                pet ownership to give your companion the best care.
              </p>

              <a href="#services-tips">Learn More →</a>
            </article>

          </div>
        </div>
      </section>

      <section className="services-process">
        <div className="services-container">

          <div className="services-heading">
            <span className="services-label">REHOMING YOUR PET</span>

            <h2>How Rehoming Works</h2>
            <p>Follow these simple steps to submit a rehoming request.</p>
          </div>

          <div className="services-steps">

            <div className="services-step">
              <span className="services-step-number">01</span>
              <div className="services-step-icon">📝</div>
              <h3>Submit a Form</h3>
              <p>Provide your contact information and details about your pet.</p>
            </div>

            <div className="services-step">
              <span className="services-step-number">02</span>
              <div className="services-step-icon">🔎</div>
              <h3>Application Review</h3>
              <p>In a real rehoming process, the organisation reviews the pet's information and needs.</p>
            </div>

            <div className="services-step">
              <span className="services-step-number">03</span>
              <div className="services-step-icon">🐾</div>
              <h3>Find a New Home</h3>
              <p>
                Suitable adopters can be considered to help 
                the pet find a responsible, loving family.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="services-form-section" id="rehome-form">
        <div className="services-container">

          <div className="services-heading">
            <span className="services-label">PET RELEASE APPLICATION</span>

            <h2>Rehome Your Pet</h2>
            <p>Tell us more about your pet by completing the form below.</p>
          </div>

          <div className="services-form-card">

            {submitted ? (

              <div className="services-success" role="status">
                <div className="services-success-icon">✓</div>

                <h2>Request Submitted!</h2>
                <p>
                  Your rehoming request for{" "}
                  <strong>{formData.petName}</strong>{" "}
                  has been saved successfully.
                </p>

                <div className="services-reference">
                  <p>Reference Number</p>
                  <strong>{reference}</strong>
                  <p>Status: Pending</p>
                </div>

                <p className="services-success-note">
                  Your application has been received.
                </p>

                <button
                  type="button"
                  className="services-primary-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setReference("");
                    setFormData(initialForm);
                  }}
                >
                  Submit Another Request
                </button>
              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                <div className="services-form-header">
                  <span>01</span>
                  <h3>Owner Information</h3>
                </div>

                <div className="services-form-grid">

                  <div className="services-form-group">
                    <label htmlFor="ownerName">
                      Full Name *
                    </label>

                    <input
                      id="ownerName"
                      type="text"
                      name="ownerName"
                      placeholder="Enter your full name"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="ownerEmail">Email Address *</label>

                    <input
                      id="ownerEmail"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="ownerPhone">Contact Number *</label>                   
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Eg. 91234567"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 8);

                        setFormData({
                          ...formData,
                          phone: value
                        });
                      }}
                      inputMode="numeric"
                      maxLength={8}
                      pattern="[0-9]{8}"
                      title="Please enter exactly 8 digits"
                      required
                    />

                  </div>

                </div>

                <div className="services-form-header">
                  <span>02</span>
                  <h3>Pet Information</h3>
                </div>

                <div className="services-form-grid">

                  <div className="services-form-group">
                    <label htmlFor="petName">Pet Name *</label>

                    <input
                      id="petName"
                      type="text"
                      name="petName"
                      placeholder="Enter your pet's name"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="petType">Pet Type *</label>

                    <select
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="breed">Breed *</label>

                    <input
                      id="breed"
                      type="text"
                      name="breed"
                      placeholder="e.g. Mixed Breed"
                      value={formData.breed}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="petAge">Age (Years) *</label>

                    <input
                      id="petAge"
                      type="number"
                      name="age"
                      min="0"
                      max="35"
                      step="0.1"
                      placeholder="e.g. 2"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="petGender">Gender *</label>

                    <select
                      id="petGender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="vaccinated">Vaccination Status</label>

                    <select
                      id="vaccinated"
                      name="vaccinated"
                      value={formData.vaccinated}
                      onChange={handleChange}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Yes">Vaccinated</option>
                      <option value="No">Not Vaccinated</option>
                    </select>
                  </div>

                  <div className="services-form-group">
                    <label htmlFor="sterilised">Sterilisation Status</label>

                    <select
                      id="sterilised"
                      name="sterilised"
                      value={formData.sterilised}
                      onChange={handleChange}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="Yes">Sterilised</option>
                      <option value="No">Not Sterilised</option>
                    </select>
                  </div>

                </div>

                <div className="services-form-header">
                  <span>03</span>
                  <h3>Additional Information</h3>
                </div>

                <div className="services-form-group">
                  <label htmlFor="temperament">Pet's Personality & Behaviour *</label>

                  <textarea
                    id="temperament"
                    name="temperament"
                    rows="4"
                    placeholder="Describe your pet's personality, habits and behaviour..."
                    value={formData.temperament}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="services-form-group">
                  <label htmlFor="reason">Reason for Rehoming *</label>

                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    placeholder="Please explain why you need to rehome your pet..."
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="services-declaration">
                  <label>
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      required
                    />

                    <span>I confirm that the information provided is accurate.</span>
                  </label>
                </div>

                {error && (
                  <div
                    ref={errorRef}
                    className="services-error"
                    role="alert"
                    tabIndex={-1}
                  >
                    <strong>Unable to Submit Request</strong>
                    <p>{error}</p>
                  </div>
                )}

                <button type="submit" className="services-submit-btn">Submit Rehoming Request →</button>

              </form>

            )}

          </div>
        </div>
      </section>

      <section className="services-tips" id="services-tips">
        <div className="services-container">

          <div className="services-heading">
            <span className="services-label">RESPONSIBLE PET OWNERSHIP</span>

            <h2>Caring for Your Pet</h2>
            <p>Before considering rehoming, explore ways to support your pet's needs.</p>
          </div>

          <div className="services-tips-grid">

            <div className="services-tip-card">
              <span>🥗</span>
              <h3>Nutrition & Health</h3>
              <p>Provide appropriate food, fresh water and regular veterinary care.
              </p>
            </div>

            <div className="services-tip-card">
              <span>🦴</span>
              <h3>Training & Behaviour</h3>
              <p>
                Positive reinforcement and consistent routines 
                can help address behavioural challenges.
              </p>
            </div>

            <div className="services-tip-card">
              <span>♥</span>
              <h3>Emotional Wellbeing</h3>
              <p>Give your pet attention, enrichment and a comfortable environment.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="services-faq">
        <div className="services-container">

          <div className="services-heading">
            <span className="services-label">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Have Questions?</h2>
          </div>

          <div className="services-faq-list">

            <details>
              <summary>How do I submit a pet for rehoming?</summary>
              <p>Complete the Pet Release Application with information about yourself and your pet.</p>
            </details>

            <details>
              <summary>Can I submit more than one pet?</summary>
              <p>Yes. You can complete a separate rehoming form for each pet.</p>
            </details>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
