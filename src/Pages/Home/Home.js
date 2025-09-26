import React, { useEffect, useState } from 'react';
import { fetchProducts } from "../../JS/Services/api";
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import CardCategory from '../../Components/CardCategory/CardCategory';
import Suggestions from '../../Components/Suggestions/Suggestions';
import Footer from '../../Components/Footer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const suggestionsData = [
  { id: 1, name: 'Lunette', image: 'lunette.jpg' },
  { id: 2, name: 'Bracelet', image: 'oreille.jpg' },
  { id: 4, name: 'Boucles d oreilles ', image: 'boucledoreilles.jpg '},
  { id: 5, name: 'Boucles d oreille ', image: 'boucle.jpg' },
];

const categories = [
  { title: 'T-Shirts', image: 'tshirtgris.jpg', link: '/tshirts' },
  { title: 'Jeans', image: 'jeans2.webp', link: '/jeans' },
  { title: 'Dresses', image: 'dress.jpg', link: '/dresses' },
  { title: 'Shoes', image: 'shoes2.jpg', link: '/shoes' },
  { title: 'Bags', image: 'bags.webp', link: '/bags' },
];
const newArrivals = [
  { id: 1, name: "Robe",  image: "./dress1.webp"},
  { id: 2, name: "Sandales Talon", image: "shoes1.jpg"},
  { id: 3, name: "Jeans", image: "./jeans1.webp" },
  { id: 4, name: "Veste",  image: "blouses1.webp"},
];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 }},
      { breakpoint: 768, settings: { slidesToShow: 1 }},
    ]
  };

  return (
    <div className="home-container">

      {/* Slider catégories */}
      <Slider {...settings} className="slider-categories">
        {categories.map(cat => (
          <CardCategory
            key={cat.title}
            title={cat.title}
            image={cat.image}
            link={cat.link}
          />
        ))}
      </Slider>


      {/* Nouveautés */}
{/* Nouveautés - produits depuis backend */}
      <section className="new-arrivals">
        <h2>NEW ARRIVALS</h2>
        <div className="products-grid">
          {newArrivals.map(p => {
            let link = "";
            switch(p.id) {
              case 1: link = "/dresses"; break;
              case 2: link = "/shoes"; break;
              case 3: link = "/jeans"; break;
              case 4: link = "/veste"; break;
              default: link = "/"; 
            }
            return (
              <div 
                key={p.id} 
                className="product-card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(link)}
              >
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
                {/* <span>{p.price} TND</span> */}
              </div>
            );
          })}
        </div>
      </section>

      {/* Promotions */}
      <section 
        className="promotions-section" 
        onClick={() => navigate('/veste')}
      >
        <img src="https://plus.unsplash.com/premium_photo-1674718917175-70e7062732e5?w=600&auto=format&fit=crop&q=60" alt="Sale Banner" />
        <div className="promo-text">
          <h2>UP TO 50% OFF</h2>
          <p>WOMEN'S CLOTHING</p>
        </div>
      </section>

      {/* Suggestions */}
      <section 
        className="suggestions-section"
        onClick={() => navigate('/accessories')}
      >
        <h2>Suggestions</h2>
        <div className="suggestions-grid">
          {suggestionsData.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              {/* <span>{p.price} TND</span> */}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
