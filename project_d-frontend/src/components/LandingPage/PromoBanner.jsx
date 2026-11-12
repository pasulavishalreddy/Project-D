


import React from "react";
import PromoImage from "../../assets/banner.jpeg";

export default function PromoBanner() {
  return (
    <section
      className="container-fluid my-4 overflow-hidden"
      style={{ backgroundColor: "#f6f6f6", cursor: "pointer" }}
    >
      <div className="row align-items-center justify-content-center text-dark">
 
        <div className="col-12 d-flex justify-content-center align-items-end">
          <img
            // src="https://images.unsplash.com/photo-1767164520704-fc2a44498a11?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
             src={PromoImage}
            alt="Bestseller Blue Shirt"
            className="img-fluid"
            style={{
              height: "360px",
            //   width:"100%",
              objectFit: "cover",
              objectPosition: "top",
              mixBlendMode: "multiply", // Blends white/light photo backgrounds into #f6f6f6
            }}
          />
        </div>


      </div>
    </section>
  );
}
