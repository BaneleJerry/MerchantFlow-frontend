import "./App.css";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/home";
import AddPoduct from "./Components/Home/addProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Home/Product";
import { useState } from "react";
import UpdateProduct from "./Components/Home/UpdateProduct";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect} />
        <Routes>
          <Route
            path="/"
            element={<Home selectedCategory={selectedCategory} />}
          />
          <Route path="/addProduct" element={<AddPoduct />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
