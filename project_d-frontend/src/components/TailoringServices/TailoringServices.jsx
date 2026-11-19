
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import EnquiryModal from "./EnquiryModal";
import "./TailoringServices.css";

const services = [
  "Coats And Jackets",
  "Custom Made Clothing",
  "Formal Wear",
  "Embroidering",
  "Pants",
  "Jodhpuri Suit Tailoring",
];

const TailoringServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="tailoring-services">
      <h2>
        Services From The Best Gents Tailor in Hyderabad
      </h2>

          <div className="row g-3 justify-content-center services-row">
          {services.map((service) => (
            <div
              className="col-12 col-md-6 col-lg-4 service-column"
              key={service}
            >
              <div className="card service-card h-100">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <h3 className="service-title">
                    {service}
                  </h3>

                  <button
                    className="enquire-btn"
                    onClick={() => setSelectedService(service)}
                  >
                    <FaWhatsapp />
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


      <div className="services-footer">
        <button className="view-services-btn">
          <FiGrid />
          View all services
        </button>
      </div>

      {selectedService && (
        <EnquiryModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default TailoringServices;
