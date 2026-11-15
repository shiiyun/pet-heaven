import React, { useState, useEffect } from "react";
import "./adoption.css";
import Pets from "../data/pets";


const dogNames = [
  "Milo", "Buddy", "Charlie", "Max", "Rocky", "Bailey", "Teddy",
  "Cooper", "Lucky", "Archie", "Oscar", "Finn"];

const catNames = [
  "Luna", "Mochi", "Simba", "Coco", "Oliver", "Nala", "Mimi",
  "Leo", "Bella", "Oreo", "Kitty", "Misty"];

const Adoption = () => {

  const { pets, loading, fetchError } = Pets();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  // Filter pets by category and search 
  const filteredPets = pets.filter((pet) => {
    const matchCategory =
      category === "All" || pet.type === category;

    const searchText = search.toLowerCase().trim();

    const matchSearch =
      pet.name.toLowerCase().includes(searchText) ||
      pet.breed.toLowerCase().includes(searchText) ||
      pet.origin.toLowerCase().includes(searchText);

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    if (!selectedPet) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPet(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPet]);

  const openPetDetails = (pet) => {
    setSelectedPet(pet);
    setShowApplication(false);
    setSubmitted(false);
    setError("");
  };

  const closeModal = () => {
    setSelectedPet(null);
    setShowApplication(false);
    setSubmitted(false);
    setError("");
  };

  const startApplication = () => {
    let user = null;

    try {
      user = JSON.parse(
        sessionStorage.getItem("petHeavenSession") || "null"
      );
    } catch {
      user = null;
    }

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      reason: ""
    });

    setShowApplication(true);
    setError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleAdoptionSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (formData.phone.replace(/\D/g, "").length < 8) {
      setError("Please enter a valid contact number.");
      return;
    }

    if (formData.reason.trim().length < 15) {
      setError(
        "Please explain your reason for adopting (at least 15 characters)."
      );
      return;
    }

    const application = {
      id: Date.now(),
      petId: selectedPet.id,
      petName: selectedPet.name,
      petType: selectedPet.type,
      applicantName: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      reason: formData.reason.trim(),
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem("petHeavenAdoptionRequests") || "[]"
      );

      const applications = Array.isArray(saved) ? saved : [];

      applications.push(application);

      localStorage.setItem(
        "petHeavenAdoptionRequests",
        JSON.stringify(applications)
      );

      setSubmitted(true);
      setShowApplication(false);
    } catch {
      setError("Unable to save your request. Please try again.");
    }
  };

  return (
    <main className="products-page">

      <section className="products-hero">
        <div className="products-container">
          <span className="products-label">FIND YOUR COMPANION</span>

          <h1>Meet Your New Best Friend</h1>
          <p>
            Every pet deserves a second chance at happiness. Browse our lovely 
            dogs and cats waiting for their forever homes.
          </p>
        </div>
      </section>

      <section className="products-directory">
        <div className="products-container">

          <div className="products-heading">
            <div>
              <h2>Available Pets</h2>
              <p>Find a furry companion who matches your lifestyle.</p>
            </div>

            <span className="products-count">
              {filteredPets.length} Pets Found
            </span>
          </div>

          <div className="products-filter-bar">

            <div className="products-search">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or breed..."
                aria-label="Search pets by name or breed"/>
            </div>

            <div className="products-categories">
              {["All", "Dog", "Cat"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    category === item ? "active" : ""
                  }
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item === "All" ? "All Pets" : `${item}s`}
                </button>
              ))}
            </div>
          
          </div>

          {loading ? (
            <p role="status">Loading pet information...</p>
          ) : fetchError ? (
            <p role="alert">{fetchError}</p>
          ) : filteredPets.length > 0 ? (
            <div className="products-grid">
              {filteredPets.map((pet) => (
                <article className="products-card" key={pet.id}>

                  <div className="products-card-image">
                    <img
                      src={pet.image}
                      alt={`${pet.name}, ${pet.breed}`}
                      loading="lazy"
                    />

                    <span className="products-status">
                      Available
                    </span>
                  </div>

                  <div className="products-card-body">

                    <div className="products-card-header">
                      <h3>{pet.name}</h3>
                      <span>{pet.type}</span>
                    </div>

                    <p className="products-breed">
                      {pet.breed}
                    </p>

                    <div className="products-pet-info">
                      <span>{pet.origin}</span>
                      <span>{pet.lifeSpan} Lifespan</span>
                    </div>

                    <p className="products-description">
                      <strong>Temperament:</strong> {pet.personality}
                    </p>

                    <button type="button" className="products-details-btn" onClick={() => openPetDetails(pet)}>
                      View Details →
                    </button>

                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <h3>No pets found</h3>
              <p>Try changing your search or filters.</p>

              <button type="button" onClick={() => {setSearch(""); setCategory("All"); setAgeFilter("All");}}>
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {selectedPet && (
        <div
          className="products-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="products-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="products-modal-title"
          >

            <button
              type="button"
              className="products-modal-close"
              onClick={closeModal}
              aria-label="Close pet details"
              autoFocus
            >
              ×
            </button>

            {submitted ? (
              <div className="products-success">
                <span>✓</span>
                <h2 id="products-modal-title">Application Submitted!</h2>
                <p>Your adoption request for{" "}<strong>{selectedPet.name}</strong> has been saved successfully.</p>
                <p>Application Status: <strong>Pending</strong></p>

                <button className="products-apply-btn" onClick={closeModal}>Done</button>
              </div>
            ) : showApplication ? (
              <div className="products-application">

                <h2 id="products-modal-title">Adopt {selectedPet.name}</h2>
                <p>Complete the form below to submityour adoption request.</p>

                {error && (
                  <div className="products-error" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleAdoptionSubmit}>

                  <div className="products-form-group">
                    <label htmlFor="adopt-name">
                      Full Name
                    </label>
                    <input
                      id="adopt-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="products-form-group">
                    <label htmlFor="adopt-email">
                      Email Address
                    </label>
                    <input
                      id="adopt-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="products-form-group">
                    <label htmlFor="adopt-phone">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Eg. 12345678"
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

                  <div className="products-form-group">
                    <label htmlFor="adopt-reason">
                      Why do you want to adopt?
                    </label>
                    <textarea
                      id="adopt-reason"
                      name="reason"
                      rows="4"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Tell us why you would like to adopt..."
                      required
                    />
                  </div>

                  <button type="submit" className="products-apply-btn">
                    Submit Application
                  </button>

                  <button type="button" className="products-back-btn"
                    onClick={() => {
                      setShowApplication(false);
                      setError("");
                    }}
                  >
                    Back to Pet Details
                  </button>
                </form>
              </div>
            ) : (
              <div className="products-modal-content">

                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  className="products-modal-image"
                />

                <div className="products-modal-details">
                  <span className="products-label">MEET YOUR COMPANION</span>

                  <h2 id="products-modal-title">{selectedPet.name}</h2>
                  <p className="products-modal-breed">{selectedPet.breed}</p>
                  
                  <div className="products-modal-facts">
                    <p><strong>Animal:</strong> {selectedPet.type}</p>
                    <p><strong>Breed:</strong> {selectedPet.breed}</p>
                    <p><strong>Origin:</strong> {selectedPet.origin}</p>
                    <p><strong>Typical Lifespan:</strong> {selectedPet.lifeSpan}</p>
                    <p><strong>Typical Weight:</strong> {selectedPet.weight}</p>
                    <p><strong>Individual Age:</strong> {selectedPet.age}</p>
                    <p><strong>Gender:</strong> {selectedPet.gender}</p>
                  </div>

                  <h3>About the Breed</h3>
                  <p>{selectedPet.description}</p>

                  <h3>Temperament & Personality</h3>
                  <p>{selectedPet.personality}</p>

                  {selectedPet.type === "Dog" &&
                  selectedPet.bredFor !== "Not available" && (
                    <>
                      <h3>Originally Bred For</h3>
                      <p>{selectedPet.bredFor}</p>
                    </>
                  )}

                  <button type="button" className="products-apply-btn" onClick={startApplication}>
                    Apply to Adopt {selectedPet.name}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
};

export default Adoption;
