
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {UserRound, Mail, Phone, PawPrint, Heart, House, ClipboardList, CalendarDays, ArrowRight} from "lucide-react";
import "./profile.css";

function getSavedRequests(key) {
  try {
    const data = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("all");

  const email = String(user?.email || "")
    .trim()
    .toLowerCase();

  const displayName =
    user?.name || user?.fullName || "Pet Heaven Member";

  const applications = useMemo(() => {
    if (!email) return [];

    const adoptionRequests = getSavedRequests(
      "petHeavenAdoptionRequests"
    );

    const rehomingRequests = getSavedRequests(
      "petHeavenReleaseRequests"
    );

    const matchesEmail = (request) => {
      const requestEmail =
        request.email ||
        request.applicantEmail ||
        request.formData?.email ||
        "";

      return String(requestEmail)
        .trim()
        .toLowerCase() === email;
    };

    const adoption = adoptionRequests
      .filter(matchesEmail)
      .map((request, index) => ({
        ...request,
        recordKey: `adoption-${index}`,
        requestType: "adoption"
      }));

    const rehoming = rehomingRequests
      .filter(matchesEmail)
      .map((request, index) => ({
        ...request,
        recordKey: `rehoming-${index}`,
        requestType: "rehoming"
      }));

    return [...adoption, ...rehoming].sort((a, b) => {
      const first = new Date(
        a.submittedAt || a.createdAt || 0
      ).getTime() || 0;

      const second = new Date(
        b.submittedAt || b.createdAt || 0
      ).getTime() || 0;

      return second - first;
    });
  }, [email]);

  const adoptionCount = applications.filter(
    (item) => item.requestType === "adoption"
  ).length;

  const rehomingCount = applications.filter(
    (item) => item.requestType === "rehoming"
  ).length;

  const displayedApplications =
    activeTab === "all"
      ? applications
      : applications.filter(
          (item) => item.requestType === activeTab
        );

  return (
    <main className="ph-page">

      <section className="ph-hero">
        <div className="ph-container">
          <span className="ph-label">MEMBER DASHBOARD</span>

          <h1>My Profile</h1>
          <p>
            Welcome back, {displayName}! Manage your personal 
            information and view your applications.
          </p>
        </div>
      </section>

      <div className="ph-container ph-content">

        <section className="ph-member-card">
          <div className="ph-avatar"><UserRound size={36} /></div>

          <div className="ph-member-details">
            <h2>{displayName}</h2>

            <p>
              <Mail size={16} />
              {user?.email || "No email provided"}
            </p>

            {user?.phone && (
              <p>
                <Phone size={16} />
                {user.phone}
              </p>
            )}

            <span className="ph-member-badge">
              <PawPrint size={14} />
              Pet Heaven Member
            </span>
          </div>
        </section>

        <section className="ph-stats">

          <div className="ph-stat-card">
            <div className="ph-stat-icon">
              <ClipboardList size={26} />
            </div>
            <h3>{applications.length}</h3>
            <p>Total Applications</p>
          </div>

          <div className="ph-stat-card">
            <div className="ph-stat-icon">
              <Heart size={26} />
            </div>
            <h3>{adoptionCount}</h3>
            <p>Adoption Requests</p>
          </div>

          <div className="ph-stat-card">
            <div className="ph-stat-icon">
              <House size={26} />
            </div>
            <h3>{rehomingCount}</h3>
            <p>Rehoming Requests</p>
          </div>

        </section>

        <section className="ph-applications">

          <div className="ph-section-heading">
            <h2>My Applications</h2>
            <p>View your adoption and rehoming application history.</p>
          </div>

          <div className="ph-tabs">
            {[
              { value: "all", label: "All Requests" },
              { value: "adoption", label: "Adoption" },
              { value: "rehoming", label: "Rehoming" }
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={
                  activeTab === tab.value ? "active" : ""
                }
                onClick={() => setActiveTab(tab.value)}
                aria-pressed={activeTab === tab.value}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {displayedApplications.length > 0 ? (
            <div className="ph-request-list">

              {displayedApplications.map((request) => {
                const isAdoption =
                  request.requestType === "adoption";

                const petName =
                  request.petName ||
                  request.pet?.name ||
                  request.animalName ||
                  "Pet";

                return (
                  <article className="ph-request-card" key={request.recordKey}>
                    <div className="ph-request-icon">
                      {isAdoption
                        ? <Heart size={24} />
                        : <House size={24} />}
                    </div>

                    <div className="ph-request-details">
                      <span className="ph-request-type">
                        {isAdoption
                          ? "Adoption Application"
                          : "Rehoming Application"}
                      </span>

                      <h3>{petName}</h3>

                      <p>
                        {isAdoption
                          ? `Type: ${
                              request.petType ||
                              request.pet?.type ||
                              "Not specified"
                            }`
                          : `Breed: ${
                              request.breed ||
                              "Not specified"
                            }`}
                      </p>

                      <div className="ph-request-date">
                        <CalendarDays size={15} />
                        Submitted:{" "}
                        {formatDate(
                          request.submittedAt ||
                          request.createdAt
                        )}
                      </div>
                    </div>

                    <span className="ph-status">
                      {request.status || "Pending"}
                    </span>
                  </article>
                );
              })}

            </div>
          ) : (
            <div className="ph-empty">
              <PawPrint size={48} />

              <h3>No Applications Yet</h3>

              <p>
                {activeTab === "all"
                  ? "You have not submitted any applications."
                  : `You have no ${activeTab} applications.`}
              </p>

              <Link
                to={
                  activeTab === "rehoming"
                    ? "/services"
                    : "/adoption"
                }
                className="ph-primary-button"
              >
                {activeTab === "rehoming"
                  ? "Rehome a Pet"
                  : "Explore Pets"}

                <ArrowRight size={17} />
              </Link>
            </div>
          )}

        </section>

        <section className="ph-quick-actions">
          <div className="ph-section-heading">
            <h2>Quick Actions</h2>
            <p>What would you like to do next?</p>
          </div>

          <div className="ph-action-grid">

            <Link
              to="/adoption"
              className="ph-action-card"
            >
              <Heart size={30} />

              <div>
                <h3>Find a Pet</h3>
                <p>Explore dogs and cats in our directory.</p>
              </div>

              <ArrowRight size={20} />
            </Link>

            <Link to="/services" className="ph-action-card">
              <House size={30} />

              <div>
                <h3>Rehome a Pet</h3>
                <p>Submit a rehoming application.</p>
              </div>

              <ArrowRight size={20} />
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Profile;
