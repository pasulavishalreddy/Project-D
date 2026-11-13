import React, { useState } from 'react';
import './MensFAQAccordion.css';

const faqData = [
  {
    question: "How do I find the right size for men's shirts, t-shirts, and trousers?",
    answer:
      "Refer to the size chart on every product page for exact chest, shoulder, waist, and length measurements in inches and centimeters. For the best fit, measure a well-fitting garment you already own and compare it with our size guide."
  },
  {
    question: "What is the difference between Slim Fit, Regular Fit, and Oversized Fit in men's clothing?",
    answer:
      "Slim fit is tailored close to the body for a sharp, modern look. Regular fit provides a classic, comfortable cut with easy movement, while oversized fit offers a relaxed, dropped-shoulder streetwear style."
  },
  {
    question: "Are your men's cotton shirts and denim jeans pre-shrunk?",
    answer:
      "Yes, our cotton shirts, t-shirts, and denim jeans undergo a pre-wash treatment to prevent shrinking and fading. Wash your garments in cold water and dry them in the shade to keep the fabric soft and maintain the original fit."
  },
  {
    question: "Can I exchange a men's clothing item if the size does not fit?",
    answer:
      "Yes, we offer free and hassle-free size exchanges within 15 to 30 days of delivery. Items must be unworn, unwashed, and returned with all original price tags and packaging intact."
  },
  {
    question: "How fast is delivery, and is Cash on Delivery (COD) available?",
    answer:
      "Orders are dispatched within 24 hours and delivered within 3 to 5 business days across India. We support secure online payments via UPI, cards, and net banking, along with Cash on Delivery on eligible orders."
  }
];

function MensFAQAccordion() {
  // First item open by default (set to null if you want all closed initially)
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SEO JSON-LD Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="faq-section" aria-labelledby="mens-faq-title">
      {/* Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-header">
        <h2 id="mens-faq-title">Frequently Asked Questions</h2>
        <p>Everything you need to know about sizing, fits, fabrics, and delivery.</p>
      </div>

      <div className="faq-list">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'active' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MensFAQAccordion;
