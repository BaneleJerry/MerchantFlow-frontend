import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/Context";
import API from "../../axios";
import { Button } from "react-bootstrap";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data); // Updates product state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.imageName) {
      const fetchImage = async () => {
        try {
          const response = await API.get(`/products/${id}/image`, {
            responseType: "blob",
          });
          setImageUrl(URL.createObjectURL(response.data));
        } catch (error) {
          console.error("Error fetching product image:", error);
        }
      };

      fetchImage();
    }
  }, [product?.imageName, id]); // Runs only when product.imageName is set

  const deleteProduct = async () => {
    try {
      await API.delete(`/products/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("Product added to cart");
    }
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {imageUrl && (
            <img className="img-fluid" src={imageUrl} alt={product.imageName} />
          )}
        </div>
        <div className="col-md-6">
          <div className="product-description">
            <span className="badge bg-secondary">{product.category}</span>
            <h1>{product.name}</h1>
            <h5>{product.brand}</h5>
            <p>{product.description}</p>
          </div>
          <div className="product-price">
            <span className="h4">{"R" + product.price}</span>
            <Button
              variant="primary"
              className="mt-3"
              onClick={handleAddToCart}
              disabled={!product.available}>
              {product.available ? "Add to cart" : "Out of Stock"}
            </Button>
            <h6 className="mt-3">
              Stock Available:{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.quantity}
              </i>
            </h6>
            <h6>Product listed on:</h6>
            <p className="release-date mt-3">
              <i> {new Date(product.release).toLocaleDateString()}</i>
            </p>
          </div>
          <div className="mt-3">
            <Button
              variant="warning"
              className="me-2"
              onClick={handleEditClick}>
              Update
            </Button>
            <Button variant="danger" onClick={deleteProduct}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
