// import React from "react";

// const Home = () => {
//   return (
//     <>
//       <div className="hero border-1 pb-3">
//         <div
//           className="home-poster card text-white border-0 mx-3"
//           style={{height: "500px" }} 
//         >
//           <div className="card-img-overlay d-flex align-items-center">
//             <div className="container text-center">
//               <p className="card-text fs-5 d-none d-sm-block ">
//                 Fitness is not just about building muscles<br/>
//                 Its about training with purpose,<br />
//                 pushing limits and achieving balance in life
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Change 100 to the desired scroll position
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="hero border-1 pb-3">
        <div
          className="home-poster card text-white border-0 mx-3"
          style={{ height: "500px" }}
        >
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                {isScrolled ? "GYMNIUS" : "WE Believe"}
              </h5>
              <p className="card-text fs-5 d-none d-sm-block">
                {isScrolled
                  ? "Achieve greatness with GYMNIUS."
                  : "Fitness is not just about building muscles. Its about training with purpose, pushing limits and achieving balance in life."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
