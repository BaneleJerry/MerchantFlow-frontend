import React, { useState } from "react";
import API from "../../axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const AddProduct = () => {
  // Hibernate: select p1_0.id,p1_0.available,p1_0.brand,p1_0.category,p1_0.description,p1_0.image_date,p1_0.image_name,p1_0.image_type,p1_0.name,p1_0.price,p1_0.quantity,p1_0.release from product p1_0
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    available: false,
    release: new Date(),
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagefile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    API.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);
        alert("Product added successfully");
        navigator("/")
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        console.log(product);
        alert("Error adding product");
      });
  };

  return (
    <Container className="fluid">
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter Product Name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                onChange={handleChange}
                placeholder="Enter Brand Name"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={handleChange}
                placeholder="Enter Product Description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Enter Product Price"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" onChange={handleChange}>
                <option value="">Select category</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Mobile">Mobile</option>
                <option value="Electronics">Electronics</option>
                <option value="Toys">Toys</option>
                <option value="Fashion">Fashion</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                onChange={handleChange}
                placeholder="Enter Product Quantity"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="release">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="release"
                onChange={handleChange}
                placeholder="Enter Release Date"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="available">
              <Form.Check
                type="checkbox"
                name="available"
                label="Available"
                checked={product.available}
                onChange={(e) =>
                  setProduct({ ...product, available: e.target.checked})
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
