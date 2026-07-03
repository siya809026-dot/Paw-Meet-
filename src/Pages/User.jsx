import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1&per_page=12", {
      headers: { "x-api-key": "reqres_22896dc304864dd588527ba8934372b6" },
    })
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading-wrap">
        <span className="loading-emoji">🐾</span>
        <p>Loading members...</p>
      </div>
    );
  }

  return (
    <main>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="eyebrow">Our Community</span>
            <h2>Meet the Members</h2>
            <p>Browse pet parents near you and connect for your next meetup.</p>
          </div>

          <div className="events-grid">
            {users.map((u) => (
              <Link
                to={`/User/${u.id}`}
                className="event-card"
                key={u.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="event-img" style={{ background: "#e8f4ea" }}>
                  <img
                    src={u.avatar}
                    alt={u.first_name}
                    style={{ width: 96, height: 96, borderRadius: "50%" }}
                  />
                </div>
                <div className="event-body">
                  <h3>
                    {u.first_name} {u.last_name}
                  </h3>
                  <div className="event-meta">
                    <span>✉️ {u.email}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">🐾 PawMeet</div>
        <p>Bringing dogs together across India · © 2025 PawMeet</p>
      </footer>
    </main>
  );
}
