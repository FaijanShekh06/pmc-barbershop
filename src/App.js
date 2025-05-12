import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.className = theme === "dark" ? "" : "light-mode";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-content">
          <div className="logo">
            <img className="logo" src="assets\logo.png" alt="PMC Barbershop" />
          </div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/#home">Home</Link>
            <Link to="/#about">About</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#gallery">Gallery</Link>
            <Link to="/#contact">Contact</Link>
          </div>
          <div className="contact-info">
            <span>+19408081569</span>
            <Link to="/#contact" className="btn-primary">
              Book an Appointment
            </Link>
            <div className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-6a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-16 0a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm15.071-7.071a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.343 17.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm12.728-12.728a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM6.343 6.343a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.5a9.5 9.5 0 006.354 9.146A9 9 0 1112 2.5zm0 16a7 7 0 100-14 7 7 0 000 14zm2-10a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              )}
            </div>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container hero-content">
          <div className="hero-text" data-aos="fade-right">
            <h3>Premium Barber Services in Denton</h3>
            <h1>
              Classic Cuts, <span>Modern</span> Style
            </h1>
            <p>
              At PMC Barbershop, we combine traditional barbering techniques
              with modern styling to give you the perfect look. Our experienced
              barbers deliver precision cuts, beard grooming, and relaxing hot
              towel shaves in a classic barbershop atmosphere.
            </p>
            <div className="buttons">
              <Link to="/#services" className="btn-secondary">
                Our Services
              </Link>
              <Link to="/#contact" className="btn-primary">
                Book Now
              </Link>
            </div>
            <div className="location">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 00-8 8c0 4.41 3.59 8 8 8s8-3.59 8-8a8 8 0 00-8-8zm0 14a6 6 0 01-6-6 6 6 0 0112 0 6 6 0 01-6 6zm1-9h-2v4H7v2h4V7z" />
              </svg>
              <span>Denton, TX</span>
            </div>
          </div>
          <div className="hero-image" data-aos="fade-left">
            <img className="shopimage" src="assets\bb.jpg" alt="Barbershop" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container about-content">
          <div className="about-image" data-aos="fade-right">
            <img className="shopimage" src="assets\bb1.jpg" alt="Barbershop" />
          </div>
          <div className="about-text" data-aos="fade-left">
            <h2>
              Established Since 2010, PMC Barbershop is Dedicated to the Art of
              Barbering in Denton, TX
            </h2>
            <p>
              We take pride in offering personalized barbering services,
              ensuring every client leaves with a confident smile. Visit us to
              experience a classic barbershop atmosphere with a modern twist.
            </p>
            <Link to="/#contact" className="btn-primary">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Our Barber Services</h2>
          <div className="services-grid">
            {[
              {
                title: "Haircuts",
                desc: "Our skilled barbers deliver precision haircuts tailored to your unique style, ensuring you leave looking sharp and confident.",
              },
              {
                title: "Beard Grooming",
                desc: "From trimming to shaping, we provide expert beard grooming services to keep your facial hair looking its best.",
              },
              {
                title: "Premium Services",
                desc: "Indulge in our premium offerings, including hot towel shaves and detailed styling, for a truly luxurious experience.",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="service-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 00-8 8c0 4.41 3.59 8 8 8s8-3.59 8-8a8 8 0 00-8-8zm0 14a6 6 0 01-6-6 6 6 0 0112 0 6 6 0 01-6 6zm1-9h-2v4H7v2h4V7z" />
                  </svg>
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Why Choose PMC Barbershop?</h2>
          <div className="why-choose-grid">
            {[
              {
                title: "Expert Barbers",
                desc: "Our team of skilled barbers specializes in both classic and modern styles, ensuring a perfect cut every time.",
              },
              {
                title: "Premium Tools & Products",
                desc: "We use only the best tools and high-quality products to provide a top-notch grooming experience.",
              },
              {
                title: "Classic Barbershop Experience",
                desc: "Enjoy a relaxing atmosphere with a traditional barbershop vibe, complete with hot towel shaves and personalized service.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="why-choose-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 data-aos="fade-up">What Clients Say</h2>
          <div className="testimonials-grid">
            {[
              {
                name: "Mike Johnson",
                quote:
                  "I've been getting my cuts at PMC for years. They always deliver a fresh, clean look, and the atmosphere is unbeatable!",
              },
              {
                name: "David Martinez",
                quote:
                  "The team at PMC really knows their craft. Best haircut and beard trim I’ve ever had. Highly recommend!",
              },
              {
                name: "Chris Taylor",
                quote:
                  "The hot towel shave at PMC is a game-changer. Relaxing experience and I left looking sharp. Will definitely be back!",
              },
            ].map((client, index) => (
              <div
                key={client.name}
                className="testimonial-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="quote-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 7H6v4H4V5h6v2zm10 0h-4v4h-2V5h6v2z" />
                  </svg>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p>"{client.quote}"</p>
                <h3>{client.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Our Service Prices</h2>
          <div className="pricing-grid">
            {[
              {
                title: "Classic Service",
                price: "$25",
                features: [
                  "Classic Haircut",
                  "Quick Beard Trim",
                  "Neck Shave",
                  "Styling Finish",
                ],
              },
              {
                title: "Premium Package",
                price: "$35",
                features: [
                  "Premium Haircut",
                  "Beard Sculpting",
                  "Hot Towel Shave",
                  "Scalp Massage",
                  "Styling Finish",
                ],
              },
              {
                title: "Luxury Package",
                price: "$50",
                features: [
                  "Luxury Haircut",
                  "Full Beard Grooming",
                  "Hot Towel Shave",
                  "Scalp Massage",
                  "Hair Wash",
                  "Premium Styling",
                ],
              },
            ].map((package_, index) => (
              <div
                key={package_.title}
                className="pricing-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3>{package_.title}</h3>
                <div className="price">{package_.price}</div>
                <ul>
                  {package_.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link to="/#contact" className="btn-primary">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Our Barbershop Gallery</h2>
          <div className="gallery-grid">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFyYmVyJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                image:
                  "https://plus.unsplash.com/premium_photo-1661645800024-447c809a85b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhcmJlcnNob3AlMjBnYWxsYXJ5fGVufDB8fDB8fHww",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1732314287829-f1da598a5b77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhcmJlcnNob3AlMjBnYWxsYXJ5fGVufDB8fDB8fHww",
              },
            ].map((_, index) => (
              <div
                key={index}
                className="gallery-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img className="gallaryimage" src={_.image} alt={`${_.name}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Meet Our Barbers</h2>
          <div className="team-grid">
            {[
              {
                name: "James Carter",
                role: "Master Barber",
                image:
                  "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                name: "Maria Williams",
                role: "Senior Barber",
                image:
                  "https://plus.unsplash.com/premium_photo-1671741519429-c0465c1b5c12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
              },
              {
                name: "Tom Jackson",
                role: "Barber",
                image:
                  "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="team-member"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="image">
                  <img
                    className="teamimage"
                    src={member.image}
                    alt={`${member.name}`}
                  />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section">
        <div className="container location-content">
          <div data-aos="fade-right">
            <img className="shopimage"
              src="https://images.unsplash.com/photo-1533292362155-d79af6b08b77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvY2F0aW9ufGVufDB8fDB8fHww"
              alt="location"
            />
          </div>
          <div className="location-info" data-aos="fade-left">
            <h2>Our Location</h2>
            <div className="contact-info">
              <p>
                <strong>Address:</strong> 123 Barber St, Denton, TX 76201
              </p>
              <p>
                <strong>Phone:</strong> +19408081569
              </p>
              <p>
                <strong>Email:</strong> info@pmcbarber.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {[
              {
                question: "Do I need to book an appointment or can I walk in?",
                answer:
                  "We recommend booking an appointment to ensure availability, but walk-ins are welcome based on availability.",
              },
              {
                question: "How long does a typical haircut take?",
                answer:
                  "A typical haircut takes about 30-45 minutes, depending on the style and additional services.",
              },
              {
                question: "What forms of payment do you accept?",
                answer:
                  "We accept cash, credit/debit cards, and mobile payments like Apple Pay and Google Pay.",
              },
              {
                question: "What hair products do you use?",
                answer:
                  "We use premium hair products from trusted brands to ensure the best results for your hair.",
              },
            ].map((faq, index) => (
              <div
                key={faq.question}
                className="faq-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 data-aos="fade-up">Book Appointment</h2>
          <div className="contact-form" data-aos="fade-up">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <div className="error">{errors.message}</div>}
            <button onClick={handleSubmit} className="btn-primary">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 data-aos="fade-up">Ready for a Fresh Cut?</h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Visit PMC Barbershop for a premium grooming experience. Our expert
            barbers are here to give you a look that suits your style.
          </p>
          <div className="buttons" data-aos="fade-up" data-aos-delay="200">
            <Link to="/#contact" className="btn-secondary">
              Book an Appointment
            </Link>
            &nbsp;
            <Link to="/#services" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="links">
            <Link to="/#home">Home</Link>
            <Link to="/#about">About</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#gallery">Gallery</Link>
            <Link to="/#contact">Contact</Link>
          </div>
          <div className="social-icons">
            <a href="#">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </a>
            <a href="#">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </a>
            <a href="#">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </a>
          </div>
          <div className="newsletter">
            <input type="email" placeholder="Your Email" />
            <button className="btn-primary">Subscribe</button>
          </div>
          <p>© 2025 PMC Barbershop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
