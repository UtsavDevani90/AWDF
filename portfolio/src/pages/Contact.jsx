import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  // useState: form fields
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // useState: submission success flag
  const [submitted, setSubmitted] = useState(false);

  // useEffect: set document title
  useEffect(() => {
    document.title = "Contact | My Portfolio";
  }, []);

  // Handle input changes — event handling
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit — prevent default, show success
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Get In <span className="accent">Touch</span></h2>
        <p className="section-subtitle">Let's work together</p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Let's Talk!</h3>
            <p>
              Have a project in mind or want to collaborate? Feel free to reach out.
              I'm always open to discussing new opportunities and ideas.
            </p>

            <div className="contact-items">
              {/* External anchor tags for contact methods */}
              <a href="mailto:utsavdevani90@gmail.com" className="contact-item">
                <span className="contact-item-icon"><FaEnvelope /></span>
                your@email.com
              </a>
              <a href="https://github.com/Utsavdevani90" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-item-icon"><FaGithub /></span>
                github.com/username
              </a>
              <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-item-icon"><FaLinkedin /></span>
                linkedin.com/in/username
              </a>
              <a href="https://instagram.com/utsav_devani" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-item-icon"><FaInstagram /></span>
                @username
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            {/* Ternary: show success message or form */}
            {submitted ? (
              <div className="success-msg">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="utsav devani"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: "100%", justifyContent: "center" }}>
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
