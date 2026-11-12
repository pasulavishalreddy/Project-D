import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


import "swiper/css";


const newArrivals = [
  {
    name: "FORMAL\nWEAR",
    tagline: "SUITS • BLAZERS\nFORMAL SHIRTS",
    price: null,
    image:
      "https://plus.unsplash.com/premium_photo-1661663780706-9ad6190f66f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    name: "ETHNIC\nWEAR",
    tagline: "KURTA PYJAMAS\nMODI & NEHRU JACKETS",
    price: null,
    image:
      "https://images.unsplash.com/photo-1783923134298-5a202299a7c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    name: "CASUAL\nWEAR",
    tagline: "SHIRTS • TROUSERS\nCHINOS",
    price: null,
    image:
      "https://plus.unsplash.com/premium_photo-1683134470713-3312a7420401?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    name: "JACKETS",
    tagline: "jacket • TROUSERS\nCHINOS",
    price: null,
    image:
      "https://images.unsplash.com/photo-1555583743-991174c11425?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
];

export default function NewArrivalsSection() {
  return (
    <section className="py-5 bg-white">
      {/* Section Header */}
      <div className="container-fluid px-4 mb-3 d-flex justify-content-between align-items-end">
        <div>
          {/* <span
            className="text-uppercase text-muted d-block"
            style={{ fontSize: "0.75rem", letterSpacing: "2px" }}
          >
            Just Dropped
          </span> */}
          <h2
            className="fw-bold text-uppercase m-0"
            style={{ letterSpacing: "1px", fontSize: "1.75rem" }}
          >
            New Arrivals
          </h2>
        </div>

        <a
          href="/collections/new-arrivals"
          className="text-dark text-uppercase text-decoration-none fw-semibold border-bottom border-dark pb-1"
          style={{ fontSize: "0.8rem", letterSpacing: "1px" }}
        >
          View All
        </a>
      </div>

      {/* 3-Column Snitch Carousel */}
      <div className="container-fluid px-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={2}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {newArrivals.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="position-relative overflow-hidden d-flex align-items-center text-white"
                style={{
                  height: "540px",
                  cursor: "pointer",
                  backgroundColor: "#222",
                }}
              >
                {/* Layer 1: Background Image */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    zIndex: 1,
                    transition: "transform 0.5s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                {/* Layer 2: Left Name & Right Tagline (Vertically Centered) */}
                <div
                  className="position-relative w-100 px-4 d-flex justify-content-between align-items-center"
                  style={{ zIndex: 2, pointerEvents: "none" }}
                >
                  {/* Left Side: Bold Stacked Name */}
                  <h3
                    className="fw-bold text-uppercase m-0 text-start text-white"
                    style={{
                      fontSize: "1.65rem",
                      lineHeight: "1.05",
                      letterSpacing: "0.5px",
                      whiteSpace: "pre-line",
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.85)",
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Right Side: Tagline & Price */}
                  <div
                    className="text-end text-uppercase text-white"
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: "1.3",
                      letterSpacing: "0.5px",
                      whiteSpace: "pre-line",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    <div>{item.tagline}</div>
                    {/* <div className="fw-bold mt-1 fs-6">₹{item.price}</div> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
