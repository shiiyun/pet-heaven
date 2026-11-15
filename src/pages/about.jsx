
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Heart, House, ShieldCheck, Users, HandHeart, ArrowRight, Mail, CheckCircle} from "lucide-react";
import "./about.css";

// Pet Heaven's core values
const values = [
  {
    id: 1,
    icon: Heart,
    title: "Compassion",
    description: "We believe every animal deserves kindness, respect and a chance to experience love."
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Responsibility",
    description: "We encourage responsible pet ownership and thoughtful adoption decisions."
  },
  {
    id: 3,
    icon: Users,
    title: "Community",
    description: "We aim to bring together people who share a passion for animal welfare."
  },
  {
    id: 4,
    icon: HandHeart,
    title: "Second Chances",
    description: "Every pet deserves an opportunity to find a safe and loving forever home."
  }
];

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setError("Please enter at least 10 characters.");
      return;
    }

    const enquiry = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      submittedAt: new Date().toISOString(),
      status: "Received (Demo)"
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("petHeavenEnquiries") || "[]"
      );

      const enquiries = Array.isArray(existing)
        ? existing
        : [];

      enquiries.push(enquiry);

      localStorage.setItem(
        "petHeavenEnquiries",
        JSON.stringify(enquiries)
      );

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch {
      setError(
        "Unable to save your enquiry. Please try again."
      );
    }
  };

  return (
    <main className="about-page">

      <section className="about-hero">
        <div className="about-container">

          <div className="about-hero-content">

            <span className="about-label">
              <PawPrint size={17} />
              ABOUT PET HEAVEN
            </span>

            <h1>
              A Better World for
              <span> Every Paw.</span>
            </h1>

            <p>
              At Pet Heaven, we believe that every animal deserves love, 
              care and a safe place to call home. Our purpose is to connect 
              pets in need with compassionate individuals and families.
            </p>

            <div className="about-hero-buttons">
              <a href="#about-mission" className="about-primary-btn">
                Our Mission <ArrowRight size={18} />
              </a>

              <a href="#about-contact" className="about-secondary-btn">
                Contact Us
              </a>
            </div>

          </div>

          <div className="about-hero-visual">
            <img src="/images/about-hero.jpg" alt="Dog and cat together" className="about-hero-photo"/>

            <div className="about-visual-badge">
              <Heart size={21} fill="currentColor" />
              <span>Adopt Love. Give Hope.</span>
            </div>
          </div>

        </div>
      </section>

      <section className="about-story">
        <div className="about-container about-story-grid">

          <div className="about-story-image">
            <img src="/images/about-story.jpg" alt="A person caring for a dog" loading="lazy"/>
          </div>

          <div className="about-story-text">
            <span className="about-section-label">WHO WE ARE</span>

            <h2>More Than Just Pet Adoption</h2>

            <p>
              Pet Heaven is a pet adoption and rehoming platform designed 
              to help animals find suitable and caring homes. We aim to make 
              pet adoption more accessible while promoting responsible pet ownership.
            </p>

            <p>
              Through our platform, potential adopters can explore pet profiles,
              learn about their personalities and submit adoption requests. Pet owners
              who can no longer care for their companions can also submit rehoming requests.
            </p>

            <p>
              Beyond adoption, we believe that education and community awareness
              are important in creating a better future for animals.
            </p>

          </div>
        </div>
      </section>

      <section className="about-mission-section" id="about-mission">
        <div className="about-container">

          <div className="about-section-heading">
            <span className="about-section-label">
              WHAT DRIVES US
            </span>

            <h2>Our Mission & Vision</h2>

            <p>
              Building a compassionate future for pets and the people who love them.
            </p>
          </div>

          <div className="about-mission-grid">

            <article className="about-mission-card">
              <div className="about-card-icon">
                <Heart size={32} />
              </div>

              <h3>Our Mission</h3>

              <p>
                To provide an accessible platform that connects pets in need 
                with responsible and loving adopters, while raising awareness 
                about animal welfare and responsible pet ownership.
              </p>
            </article>

            <article className="about-mission-card">
              <div className="about-card-icon">
                <House size={32} />
              </div>

              <h3>Our Vision</h3>
              <p>
                To build a community where every pet has the opportunity to live in a safe, 
                caring environment and where adoption is recognised as a meaningful commitment.
              </p>
            </article>

          </div>

        </div>
      </section>

      <section className="about-values">
        <div className="about-container">

          <div className="about-section-heading">
            <span className="about-section-label">
              WHAT WE BELIEVE IN
            </span>

            <h2>Our Core Values</h2>
            <p>
              The principles behind our commitment to pets and their future families.
            </p>
          </div>

          <div className="about-values-grid">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  className="about-value-card"
                  key={value.id}
                >
                  <div className="about-value-icon">
                    <Icon size={30} />
                  </div>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      <section className="about-process">
        <div className="about-container">

          <div className="about-section-heading">
            <span className="about-section-label">YOUR JOURNEY WITH US</span>

            <h2>How Pet Heaven Works</h2>
            <p>Helping you take the first step towards responsible pet adoption.</p>
          </div>

          <div className="about-process-grid">

            <div className="about-process-card">
              <div className="about-process-number">01</div>
              <h3>Discover a Pet</h3>
              <p>Browse our pet directory to find dogs and cats that match your lifestyle and preferences.</p>
            </div>

            <div className="about-process-card">
              <div className="about-process-number">02</div>
              <h3>Submit a Request</h3>
              <p>Complete an adoption or rehoming application through our online forms.</p>
            </div>

            <div className="about-process-card">
              <div className="about-process-number">03</div>
              <h3>Take the Next Step</h3>
              <p>Learn about the responsibilities involved in providing a safe and loving home for a pet.</p>
            </div>

          </div>

          <div className="about-process-action">
            <Link to="/adoption" className="about-primary-btn">Find a Companion<ArrowRight size={18} /></Link>

            <Link to="/services" className="about-secondary-btn">Rehome a Pet</Link>
          </div>

        </div>
      </section>

      <section className="about-contact" id="about-contact">
        <div className="about-container">

          <div className="about-section-heading">
            <span className="about-section-label">GET IN TOUCH</span>

            <h2>We'd Love to Hear from You</h2>
            <p>
              Have a question about pet adoption, rehoming or 
              responsible pet ownership? Send us a message below.
            </p>
          </div>

          <div className="about-contact-grid">

            <div className="about-contact-info">
              <div className="about-contact-icon">
                <Mail size={34} />
              </div>

              <h3>Let's Connect</h3>

              <p>
                Whether you're looking to adopt, need information about rehoming,
                or simply want to learn more about Pet Heaven, we're happy to hear from you.
              </p>

              <div className="about-contact-note">
                <PawPrint size={22} />

                <span>Every small act of kindness can make a big difference in an animal's life.</span>
              </div>

            </div>

            <div className="about-contact-form">

              {submitted ? (
                <div className="about-success" role="status">
                  <CheckCircle size={55} />

                  <h3>Message Saved!</h3>
                  <p> Your enquiry has been Save.</p>

                  <button type="button" className="about-primary-btn" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  <h3>Send Us a Message</h3>

                  <div className="about-form-group">
                    <label htmlFor="contact-name">Full Name</label>

                    <input id="contact-name" type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required/>
                  </div>

                  <div className="about-form-group">
                    <label htmlFor="contact-email">Email Address</label>

                    <input id="contact-email" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
                  </div>

                  <div className="about-form-group">
                    <label htmlFor="contact-subject">Subject</label>

                    <select id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select a subject</option>
                      <option value="Adoption">Pet Adoption</option>
                      <option value="Rehoming">Pet Rehoming</option>
                      <option value="Pet Care">Pet Care</option>
                      <option value="General">General Enquiry</option>
                    </select>
                  </div>

                  <div className="about-form-group">
                    <label htmlFor="contact-message">Your Message</label>

                    <textarea id="contact-message" name="message" rows="5" 
                    placeholder="How can we help you?" value={formData.message} 
                    onChange={handleChange} required/>
                  </div>

                  {error && (
                    <div className="about-error" role="alert">
                      {error}
                    </div>
                  )}

                  <button type="submit" className="about-submit-btn">
                    Send Message<ArrowRight size={18}/></button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutUs;
