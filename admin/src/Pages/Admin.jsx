// import React from "react";
// import "./CSS/Admin.css";
// import Sidebar from "../Components/Sidebar/Sidebar";
// import AddProduct from "../Components/AddProduct/AddProduct";
// import { Route, Routes } from "react-router-dom";
// import ListProduct from "../Components/ListProduct/ListProduct";
// import LoginSignup from "./LoginSignup";

// const Admin = () => {

//   return (
//     <div className="admin">
//       <Sidebar />
//       <Routes>
//         <Route path="/addproduct" element={<AddProduct />} />
//         <Route path="/listproduct" element={<ListProduct />} />
//         <Route path="/login" element={<LoginSignup />} />
//       </Routes>
//     </div>
//   );
// };

// export default Admin;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import LoginSignup from "./LoginSignup";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Here, you would ideally validate the token with the server
      setIsAdmin(true);
    } else {
      navigate('/logina');
    }
  }, [navigate]);

  if (!isAdmin) {
    return <LoginSignup />;
  }

  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/logina" element={<LoginSignup />} />
      </Routes>
    </div>
  );
};

export default Admin;
