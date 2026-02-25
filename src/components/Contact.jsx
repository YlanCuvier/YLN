import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  budget: '<$3k',
  message: ''
};

function Contact({ profile, contact }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Email format is invalid.';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Message is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <section id="contact" className="section reveal">
      <div className="section-head">
        <p className="eyebrow">Let&apos;s Work Together</p>
        <h2>Start a Project Conversation</h2>
      </div>

      <div className="contact-layout">
        <article className="panel-card contact-panel">
          <h3>Direct Contact</h3>
          <p>
            Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p>Phone: {profile.phone}</p>
          <p>{profile.availability}</p>
        </article>

        <form className="panel-card contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name ? <p className="input-error">{errors.name}</p> : null}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          {errors.email ? <p className="input-error">{errors.email}</p> : null}

          <label htmlFor="budget">Budget</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
            {contact.budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} />
          {errors.message ? <p className="input-error">{errors.message}</p> : null}

          <button type="submit">Submit</button>
          {submitted ? <p className="form-success">Message captured. Reach out via email for direct follow-up.</p> : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;
