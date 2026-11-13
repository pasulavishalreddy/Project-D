import React, { useEffect } from "react";

export default function EmbeddedReviews() {
  useEffect(() => {
    // Dynamically inject the Featurable script tag into the page header
    const script = document.createElement("script");
    script.src = "https://cdn.featurable.com/widget/v2/embed.js";
    script.defer = true;
    script.charset = "UTF-8";

    document.head.appendChild(script);

    return () => {
      // Clean up script when user leaves the page component
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Exact DOM target the script looks for to inject your reviews */}
      <div
        // id="featurable-e8f8f972-3ccb-47eb-90b9-2ab2751aa16b"
        id="featurable-733f59a7-e14a-4a85-86da-90c5549e39f2"
        data-featurable-async
      >
        Reviews
      </div>
    </div>
  );
}
