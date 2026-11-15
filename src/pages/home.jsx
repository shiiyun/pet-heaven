
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Pets from "../data/pets";



const Home = () => {
  const [filter, setFilter] = useState("All");
  const { pets, loading, fetchError } = Pets();

  const featuredPets = [
    ...pets.filter((pet) => pet.type === "Dog").slice(0, 2),
    ...pets.filter((pet) => pet.type === "Cat").slice(0, 2)
  ];

  const filteredPets =
    filter === "All"
      ? featuredPets
      : featuredPets.filter((pet) => pet.type === filter);

  return (
    <main className="home-page">

      <section className="home-hero">
        <div className="home-container home-hero-content">

          <div className="home-hero-text">
            <span className="home-tagline">🐾 WELCOME TO PET HEAVEN</span>

            <h1>Every Pet Deserves<br />a <span>Loving Home.</span></h1>

            <p>
              Meet your new best friend at Pet Heaven. Discover adorable 
              dogs and cats waiting for a second chance at happiness.
            </p>

            <div className="home-hero-buttons">
              <Link to="/adoption" className="home-btn home-btn-primary">
                Find Your Companion →
              </Link>

              <Link to="/services" className="home-btn home-btn-secondary">
                Rehome a Pet
              </Link>
            </div>

            <div className="home-hero-highlights">
              <span>♥ Compassion</span>
              <span>🐾 Care</span>
              <span>⌂ Forever Homes</span>
            </div>
          </div>

          <div className="home-hero-image">
            <img src="/images/dog1.jpg" alt="Happy dog looking for a loving home"
            />

            <div className="home-image-badge">
              <span>♥</span>
              <div>
                <strong>Adopt Love</strong>
                <small>Give them a second chance</small>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="home-featured" id="featured-pets">
        <div className="home-container">

          <div className="home-section-header">
            <div>
              <span className="home-section-label">MEET YOUR NEW FRIEND</span>
              <h2>Pets Looking for Love</h2>
              <p>These adorable companions are ready to find their forever homes.</p>
            </div>

            <Link to="/adoption" className="home-view-all">View All Pets →</Link>
          </div>

          <div className="home-pet-grid">
            {filteredPets.map((pet) => (
              <article className="home-pet-card" key={pet.id}>

                <div className="home-pet-image">
                  <img src={pet.image} alt={pet.name} loading="lazy"/>
                  <span className="home-pet-category">{pet.type}</span>
                </div>

                <div className="home-pet-info">
                  <div className="home-pet-title">
                    <h3>{pet.name}</h3>
                    <span>♥</span>
                  </div>

                  <p className="home-pet-breed">{pet.breed}</p>

                  <div className="home-pet-details">
                      <span>{pet.origin}</span>
                      <span>{pet.lifeSpan} Lifespan</span>
                  </div>

                  <p className="home-pet-description">{pet.description}</p>

                  <Link to="/adoption" className="home-pet-button">Meet {pet.name} →</Link>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-mission">
        <div className="home-container home-mission-content">

          <div className="home-mission-icon">🐾</div>

          <div className="home-mission-text">
            <span className="home-section-label">OUR MISSION</span>

            <h2>Giving Every Paw a Second Chance</h2>
            <p>
              At Pet Heaven, we believe that every animal deserves love, care and 
              a safe place to call home. Our mission is to connect pets in need 
              with compassionate families while encouraging responsible pet ownership.
            </p>

            <Link to="/aboutus" className="home-btn home-btn-primary">Learn About Us →</Link>
          </div>

        </div>
      </section>

      <section className="home-steps">
        <div className="home-container">

          <div className="home-centered-heading">
            <span className="home-section-label">YOUR ADOPTION JOURNEY</span>

            <h2>How Adoption Works</h2>
            <p>Finding your new family member is simple.</p>
          </div>

          <div className="home-steps-grid">

            <div className="home-step-card">
              <div className="home-step-icon">🐶</div>
              <span className="home-step-number">01</span>
              <h3>Find Your Pet</h3>
              <p>Explore our available dogs and cats to find your perfect companion.</p>
            </div>

            <div className="home-step-card">
              <div className="home-step-icon">📝</div>
              <span className="home-step-number">02</span>
              <h3>Apply to Adopt</h3>
              <p>Complete an adoption form and share why you would make a great owner.</p>
            </div>

            <div className="home-step-card">
              <div className="home-step-icon">🏡</div>
              <span className="home-step-number">03</span>
              <h3>Welcome Them Home</h3>
              <p>Once approved, prepare to welcomeyour new furry family member.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="home-care">
        <div className="home-container">

          <div className="home-centered-heading">
            <span className="home-section-label">RESPONSIBLE PET OWNERSHIP</span>
            <h2>Pet Care Essentials</h2>
            <p>A happy pet begins with a caring owner.</p>
          </div>

          <div className="home-care-grid">

            <div className="home-care-card">
              <span>🥗</span>
              <h3>Healthy Nutrition</h3>
              <p>Provide balanced meals and fresh water to keep your pet healthy.</p>
            </div>

            <div className="home-care-card">
              <span>🩺</span>
              <h3>Regular Health Checks</h3>
              <p>Schedule veterinary visits and keep vaccinations up to date.</p>
            </div>

            <div className="home-care-card">
              <span>🦴</span>
              <h3>Exercise & Play</h3>
              <p>Keep your pet mentally stimulated and physically active every day.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="home-reviews">
        <div className="home-container">

          <div className="home-centered-heading">
            <span className="home-section-label">COMMUNITY FEEDBACK</span>
            <h2>Happy Tails, Happy Homes</h2>
            <p>Members sharing their adoption experiences.</p>
          </div>

          <div className="home-reviews-grid">
            <div className="home-review-card">
              <div className="home-stars">★★★★★</div>
              <p>
                "The adoption process was easy to understand. We are so 
                happy to welcome a new member to our family!"
              </p>
              <strong>Tommy</strong>
            </div>

            <div className="home-review-card">
              <div className="home-stars">★★★★★</div>
              <p>
                "The pet profiles helped us find a companion that 
                matched our lifestyle and home environment."
              </p>
              <strong>Sara</strong>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;
