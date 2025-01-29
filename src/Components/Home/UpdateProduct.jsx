import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../axios";
import { Container } from "react-bootstrap";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null);
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    available: false,
    release: new Date(),
  });

  const convertUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
        setUpdateProduct(response.data);

        const responseImage = await API.get(`/products/${id}/image`, {
          responseType: "blob",
        });
        const imageFile = await convertUrlToFile(
          responseImage.data,
          response.data.imageName
        );
        setImage(imageFile);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    if (image) updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    try {
      await API.put(`/products/${id}`, updatedProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container>
      <div className="update-product-container">
        <div className="center-container">
          <h1>Update Product</h1>
          <form className="row g-3 pt-5" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">
                <h6>Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={product?.name || ""}
                value={updateProduct.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <h6>Brand</h6>
              </label>
              <input
                type="text"
                name="brand"
                className="form-control"
                placeholder={product?.brand || ""}
                value={updateProduct.brand}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">
                <h6>Description</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={product?.description || ""}
                name="description"
                value={updateProduct.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-5">
              <label className="form-label">
                <h6>Price</h6>
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={updateProduct.price}
                onChange={handleChange}
                placeholder={product?.price || 0}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <h6>Category</h6>
              </label>
              <select
                className="form-select"
                name="category"
                value={updateProduct.category}
                onChange={handleChange}>
                <option value="">Select category</option>
                <option value="laptop">Laptop</option>
                <option value="headphone">Headphone</option>
                <option value="mobile">Mobile</option>
                <option value="electronics">Electronics</option>
                <option value="toys">Toys</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">
                <h6>Stock Quantity</h6>
              </label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={updateProduct.quantity}
                onChange={handleChange}
                placeholder={product?.quantity || 0}
              />
            </div>
            <div className="col-md-8">
              <label className="form-label">
                <h6>Image</h6>
              </label>
              <img
                src={image ? URL.createObjectURL(image) : "Image unavailable"}
                alt={product?.imageName || "Product Image"}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  padding: "5px",
                }}
              />
              <input
                className="form-control"
                type="file"
                onChange={handleImageChange}
                name="image"
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="available"
                  checked={updateProduct.available}
                  onChange={(e) =>
                    setUpdateProduct((prev) => ({
                      ...prev,
                      available: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label">Product Available</label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateProduct;
