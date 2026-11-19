// import React, { useEffect, useState } from 'react'
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "./Products_Services.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import API from "../../services/api";
// import API from '../services/api';

// const Products_Services = () => {
// const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("services");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await API.get("/products");
//         setProducts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("PRODUCT FETCH ERROR:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleEnquiry = (product) => {
//     const message = `Hello, I'm interested in ${product.name}. Please share more details.`;

//     window.open(
//       `https://wa.me/919999999999?text=${encodeURIComponent(message)}`,
//       "_blank"
//     );
//   };

//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <div className="spinner-border text-dark" role="status">
//           <span className="visually-hidden">Loading products...</span>
//         </div>
//       </div>
//     );
//   }

//   return (


//      <section className="products-hero">
//       <Container>
//         <Row className="justify-content-center">
//           <Col lg={12}>
//             <div className="hero-content text-center">
//               <h2 className="hero-badge">
//                 Premium Tailoring Services
//               </h2>
//               {/* <span className="hero-badge">
//                 Premium Tailoring Services
//               </span> */}

//               <h1 className="hero-title">
//                 Products and Services From The Best Gents Tailor in Hyderabad
//               </h1>

//               <p className="hero-description">
//                 Explore Gents Tailor services from KGN The Stylish Designer -
//                 Manikonda. Discover custom tailoring, alterations, designer
//                 wear, and more.
//               </p>

//               <div className="search-card">
//                 <Form.Label className="search-label">
//                   Search Products & Services
//                 </Form.Label>

//                 <div className="search-wrapper">
//                   <Form.Control
//                     type="text"
//                     placeholder="Search suits, blazers, sherwanis..."
//                     className="search-input"
//                   />

//                   <Button className="search-btn">
//                     Search
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <div>
//         <div>
//           <div>
//             <h3>Services</h3>
//           </div>
//           <div>
//             {/* <h3>Products</h3> */}
//             <div className="container py-4">
//       <h2 className="mb-4 text-center">Our Collection</h2>

//       <div className="row g-4">
//         {products.map((product) => (
//           <div
//             className="col-12 col-sm-6 col-md-4 col-lg-3"
//             key={product._id}
//           >
//             <div className="card h-100 shadow-sm border-0">
//               <img
//                 src={product.images?.[0]}
//                 alt={product.name}
//                 className="card-img-top"
//                 style={{
//                   height: "280px",
//                   objectFit: "cover"
//                 }}
//               />

//               <div className="card-body d-flex flex-column">
//                 <span className="badge bg-secondary mb-2 align-self-start">
//                   {product.category}
//                 </span>

//                 <h5 className="card-title">
//                   {product.name}
//                 </h5>

//                 <p className="card-text text-muted small flex-grow-1">
//                   {product.description}
//                 </p>

//                 <button
//                   className="btn btn-dark w-100 mt-3"
//                   onClick={() => handleEnquiry(product)}
//                 >
//                   Enquiry
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default Products_Services



 


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products_Services.css";
import API from "../services/api";

const Products_Services = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("PRODUCT FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEnquiry = (product) => {
    const message = `Hello, I'm interested in ${product.name}. Please share more details.`;

    window.open(
      `https://wa.me/919999999999?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const filteredProducts = products.filter((product) =>
    [product.name, product.category, product.description]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">
            Loading products...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="products-hero">
      <Container>
        <Row>
          <Col lg={12}>
            <div>
              <h2>
                Products and Services From The Best Gents Tailor in Hyderabad
              </h2>

              <p>
                Explore Gents Tailor services from KGN The Stylish Designer -
                Manikonda. Discover custom tailoring, alterations, designer
                wear, and more.
              </p>

              <div className="search-card">
                <Form.Label className="search-label">
                  Search Products & Services
                </Form.Label>

                <div className="search-wrapper">
                  <Form.Control
                    type="text"
                    placeholder="Search suits, blazers, sherwanis..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />

                  <Button className="search-btn">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Tabs */}
      <div className="d-flex justify-content-center gap-3 my-5">
        <button
          className={`btn ${
            activeTab === "services"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>

        <button
          className={`btn ${
            activeTab === "products"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      <hr />

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="container py-4">
          {/* Add services content here later */}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="container py-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-4"
                  key={product._id}
                >
                  <div className="card h-100 shadow-sm border-0" style={{padding:'inherit'}}>
                    <h5 className="card-title">
                  {product.name}
                </h5>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="card-img-bottom card-img-top"
                      style={{
                        height: "380px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body d-flex ">
                      {/* <button
                        type="button"
                        className="btn btn-light border border-dark"
                        onClick={() =>
                          handleEnquiry(product)
                        }
                      >
                        Enquiry
                      </button> */}
                        <button
                  className="btn btn-dark"
                  onClick={() => handleEnquiry(product)}
                >
                  Enquiry
                </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Products_Services;