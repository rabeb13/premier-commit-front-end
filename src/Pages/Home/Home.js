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
  { id: 1, name: 'Bracelet', price: '12,99', image: 'https://plus.unsplash.com/premium_photo-1681276168324-a6f1958aa191?w=600&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Bracelet', price: '17,99', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1000&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Boucles d oreilles ', price: '12,99', image: 'https://images.unsplash.com/photo-1705326454933-9685fc6888e1?w=600&auto=format&fit=crop&q=60' },
  { id: 5, name: 'Boucles d oreille ', price: '12,99', image: 'https://images.unsplash.com/photo-1610213665246-eb2df074f8e6?w=600&auto=format&fit=crop&q=60' },
];

const categories = [
  { title: 'T-Shirts', image: 'https://images.unsplash.com/photo-1643881080002-afdc695936e0?w=600&auto=format&fit=crop&q=60', link: '/tshirts' },
  { title: 'Jeans', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=880&auto=format&fit=crop', link: '/jeans' },
  { title: 'Dresses', image: 'https://plus.unsplash.com/premium_photo-1673481601147-ee95199d3896?q=80&w=687&auto=format&fit=crop', link: '/dresses' },
  { title: 'Shoes', image: 'https://plus.unsplash.com/premium_photo-1711051513016-72baa1035293?w=600&auto=format&fit=crop&q=60', link: '/shoes' },
  { title: 'Bags', image: 'https://images.unsplash.com/photo-1613482184972-f9c1022d0928?w=600&auto=format&fit=crop&q=60', link: '/bags' },
];
const newArrivals = [
  { id: 1, name: "Robe", price: 59.99, image: "https://plus.unsplash.com/premium_photo-1708276242787-387acf1bbd4b?w=600&auto=format&fit=crop&q=60"},
  { id: 2, name: "Talon", price: 89.99, image: "https://plus.unsplash.com/premium_photo-1668698471580-02f5c8eb739a?w=600&auto=format&fit=crop&q=60"},
  { id: 3, name: "Jeans", price: 49.99, image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" },
  { id: 4, name: "Veste", price: 39.99, image: "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"},
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
                <span>{p.price} TND</span>
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
              <span>{p.price} TND</span>
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
