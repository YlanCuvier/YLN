function ProfileCard({ profile }) {
  return (
    <section id="personal-info" className="profile-card-wrap" aria-label="Personal information">
      <article className="profile-card">
        <div className="profile-photo-shell">
          <img className="profile-photo" src="/lowpolly.png" alt={`${profile.name} portrait`} />
          <p className="profile-status">{profile.availability}</p>
        </div>

        <div className="profile-content">
          <p className="profile-kicker">Personal Card</p>
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-title">{profile.title}</p>
          <p className="profile-summary">{profile.summary}</p>

          <dl className="profile-meta">
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  View profile
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}

export default ProfileCard;
