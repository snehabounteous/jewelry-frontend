'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        
        :root {
          --color-primary: #1C1C1C;
          --color-primary-foreground: #FFFFFF;
          --color-secondary: #8E8E8E;
          --color-secondary-foreground: #1C1C1C;
          --color-background: #F9F9F9;
          --color-foreground: #1C1C1C;
          --color-highlight: #E5E5E5;
          --color-accent: #D4AF37;
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Playfair Display', serif;
          --radius: 0.625rem;
        }
        
        body {
          font-family: var(--font-body);
          background-color: var(--color-background);
          color: var(--color-foreground);
          line-height: 1.6;
        }
        
        .elegant-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        
        .elegant-text {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          line-height: 1.8;
          letter-spacing: 0.01em;
        }
      `}</style>

      <div className="min-h-screen bg-[#F9F9F9]">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <h1 className="elegant-heading text-5xl md:text-6xl text-[#1C1C1C] mb-8">
                Contact Us
              </h1>
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-8"></div>
              <p className="elegant-text text-lg text-[#8E8E8E] max-w-2xl mx-auto">
                We would love to hear from you. Reach out to us for inquiries, 
                consultations, or to schedule a private viewing.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-32 px-6">
          <div className="max-w-5xl mx-auto">
            
            <div className="grid md:grid-cols-2 gap-20">
              
              {/* Contact Form */}
              <div>
                <h2 className="elegant-heading text-2xl text-[#1C1C1C] mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border border-[#E5E5E5] rounded-[var(--radius)] bg-white text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37] transition-colors font-light"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-[#E5E5E5] rounded-[var(--radius)] bg-white text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37] transition-colors font-light"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-4 border border-[#E5E5E5] rounded-[var(--radius)] bg-white text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37] transition-colors font-light"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                     
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-4 border border-[#E5E5E5] rounded-[var(--radius)] bg-white text-[#1C1C1C] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37] transition-colors font-light resize-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#1C1C1C] text-white py-4 px-6 rounded-[var(--radius)] font-medium hover:bg-[#2A2A2A] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="elegant-heading text-2xl text-[#1C1C1C] mb-8">Visit Our Atelier</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="elegant-heading text-lg text-[#1C1C1C] mb-3">Address</h3>
                      <p className="elegant-text text-[#8E8E8E]">
                        123 Jewelry Quarter<br />
                        Mayfair, London<br />
                        W1K 5SA, United Kingdom
                      </p>
                    </div>
                    <div>
                      <h3 className="elegant-heading text-lg text-[#1C1C1C] mb-3">Contact</h3>
                      <p className="elegant-text text-[#8E8E8E] mb-2">+44 20 7123 4567</p>
                      <p className="elegant-text text-[#8E8E8E]">hello@lumiere.com</p>
                    </div>
                    <div>
                      <h3 className="elegant-heading text-lg text-[#1C1C1C] mb-3">Hours</h3>
                      <p className="elegant-text text-[#8E8E8E]">
                        Monday - Friday: 10:00 - 18:00<br />
                        Saturday: 10:00 - 16:00<br />
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Private Consultations */}
                <div className="pt-8 border-t border-[#E5E5E5]">
                  <h3 className="elegant-heading text-lg text-[#1C1C1C] mb-4">Private Consultations</h3>
                  <p className="elegant-text text-[#8E8E8E] text-sm mb-6">
                    Schedule a personal consultation with our jewelry experts to discuss 
                    bespoke designs, repairs, or to view our exclusive collections.
                  </p>
                  <button className="border border-[#D4AF37] text-[#D4AF37] py-3 px-6 rounded-[var(--radius)] font-medium hover:bg-[#D4AF37] hover:text-white transition-colors">
                    Book Consultation
                  </button>
                </div>
              </div>

            </div>

            {/* Quote Section */}
            <div className="text-center py-20 mt-20 border-t border-[#E5E5E5]">
              <blockquote className="elegant-heading text-xl md:text-2xl text-[#1C1C1C] italic mb-6">
               <p>&quot;Every conversation begins a journey toward something extraordinary.&quot;</p>

              </blockquote>
              <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}