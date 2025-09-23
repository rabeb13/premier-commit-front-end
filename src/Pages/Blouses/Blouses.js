import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { getProducts } from "../../JS/Actions/product";
import { addToCart } from "../../JS/Actions/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blouses.css";

const Blouses = () => {
  const dispatch = useDispatch();
  const { listProducts, load, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filtrer uniquement les produits de la catégorie "blouses"
  const blouses = listProducts.filter(
    (product) => product.category?.toLowerCase() === "blouses"
  );

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        color: product.colors?.[0] || null,
        size: product.sizes?.[0] || null,
        quantity: 1,
      })
    );

    toast.success("✅ Article ajouté au panier !", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  if (load) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{String(error)}</p>;

  return (
    <div className="blouses-page">
      <h2 className="blouses-title">Blouses</h2>
      <div className="blouses-grid">
        {blouses.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blouses;
