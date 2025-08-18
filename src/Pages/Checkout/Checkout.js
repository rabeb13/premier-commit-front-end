import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items = [] } = useSelector((state) => state.cart || {});
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    delivery: "standard",
    payment: "card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const fmt = (n) => Number(n || 0).toFixed(2);
  const itemTotal = (it) => (it?.productId?.price || 0) * (it?.quantity || 0);
  const grandTotal = items.reduce((sum, it) => sum + itemTotal(it), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.phone) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    // Ici tu peux envoyer les données au backend pour créer la commande

  const order = {
    userId: "ID_utilisateur", // si tu as Redux ou JWT, prends l'ID réel
    userInfo: form,
    items,
    total: grandTotal,
    delivery: form.delivery,
    paymentMethod: form.payment,
    status: "pending",
  };

  try {
    // ✅ Envoi de la commande au backend
    const res = await axios.post("http://localhost:5901/api/orders", order);

    console.log("Commande créée:", res.data);
    toast.success("Commande confirmée ✔");

    // Optionnel : vider le panier et rediriger
    // dispatch(clearCart());
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error(err);
    toast.error("Erreur lors de la création de la commande");
  }
};

  return (
    <div className="checkout-wrap">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2>Checkout / Validation de commande</h2>

      <div className="checkout-grid">
        {/* Résumé panier */}
        <div className="checkout-cart">
          <h3>Résumé du panier</h3>
          {items.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <>
              {items.map((it) => (
                <div
                  key={`${it._id}-${it.color}-${it.size}`}
                  className="checkout-item"
                >
                  <img
                    src={it.image || it.productId?.image}
                    alt={it.productId?.name}
                    className="checkout-img"
                  />
                  <div>
                    <p>{it.productId?.name}</p>
                    <p>
                      {it.color} • {it.size}
                    </p>
                    <p>
                      {it.quantity} × {fmt(it.productId?.price)} DT ={" "}
                      {fmt(itemTotal(it))} DT
                    </p>
                  </div>
                </div>
              ))}
              <div className="checkout-total">
                Total général : <strong>{fmt(grandTotal)} DT</strong>
              </div>
            </>
          )}
        </div>

        {/* Formulaire infos client */}
        <div className="checkout-form">
          <h3>Vos informations</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nom et prénom"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={form.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Code postal"
              value={form.postalCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            {/* Livraison */}
            <select
              name="delivery"
              value={form.delivery}
              onChange={handleChange}
            >
              <option value="standard">Livraison standard</option>
              <option value="express">Livraison express</option>
              <option value="pickup">Retrait en magasin</option>
            </select>

            {/* Paiement */}
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
            >
              <option value="cod">Paiement à la livraison En Espèces</option>
            </select>

            <button type="submit" className="confirm-btn">
              Confirmer la commande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
