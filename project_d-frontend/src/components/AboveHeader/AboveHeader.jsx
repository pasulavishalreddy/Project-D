// import React from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { IoCallOutline } from "react-icons/io5";
// import { CiClock2 } from "react-icons/ci";


// const mapUrl = "https://www.google.com/maps/place/KGN+The+Stylish+Designer+-+Manikonda/@17.400994,78.3886631,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97c70b933829:0x4720acb853b51fb0!8m2!3d17.400994!4d78.3886631!16s%2Fg%2F11w_b_kg_y?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D";

// const AboveHeader = () => {
//   return (
 
//     <div style={{
//           background: "rgb(62, 35, 35)",color:"white",}}>
//         <div style={{display:"flex", justifyContent:"space-around"}} >

//             <div style={{display: "flex" }}><a style={{textDecoration:'none', color:"white"}} href={mapUrl} target="_blank" rel="noopener noreferrer">
//          <CiLocationOn color="white"/>
         
//          Hyderabad, Telangana, 500089 </a>
//          </div>


//             <div style={{display:"flex" , justifyContent:"space-around"}}>
//                 <div style={{display:"flex", justifyContent:"space-around"}}> <CiClock2 />
//                     <p>Monday-Sunday:10am-11pm</p>
//                 </div>
//                 <div style={{display:"flex"}}>
//                     <IoCallOutline />
//                 <p>7037983064</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default AboveHeader;




import React from "react";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import "./AboveHeader.css";

const mapUrl = "https://www.google.com/maps/place/KGN+The+Stylish+Designer+-+Manikonda/@17.400994,78.3886631,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97c70b933829:0x4720acb853b51fb0!8m2!3d17.400994!4d78.3886631!16s%2Fg%2F11w_b_kg_y?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D";


const AboveHeader = () => {
  return (
    <div
      style={{
        background: "#3e2323",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {/* Location */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CiLocationOn size={18} />
          <span>Hyderabad, Telangana 500089</span>
        </a>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <CiClock2 size={18} />
            <span>Monday - Sunday : 10 AM - 11 PM</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <IoCallOutline size={18} />
            <span>7037983064</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboveHeader;