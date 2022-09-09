import { React, useEffect, useState } from "react";
import "./App.css";
import BuyNow from "./BuyNow";
// The function that makes the fetch request to the Products API
import { getProducts } from "./services/getProducts";

function App() {
  // use the products variable to read all of your products
  // and display them on your page
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    loadData();
  }, []);

  const Product = ({ name, description, image, price, priceId }) => {
    return (
      <li className="product">
        <div className="imageContainer">
          <img className=" productImage" src={image} alt={name}></img>
        </div>
        <div className="text">
          <div className="productInformation">
            <h2 className="productName font">{name}</h2>
            <p className="productDescription font">{description}</p>
          </div>
          <div className="purchase">
            <p className="productPrice font">{price}</p>
            <BuyNow id={priceId} />
          </div>
        </div>
      </li>
    );
  };
  const AllProducts = ({ products }) => {
    return (
      <ul className=" productList">
        {products.map((product) => {
            product.price = parseFloat(product.prices[0].unit_amount / 100);
            product.price = `${product.price}.00 NZ$`;
          return (
            <Product
              key={product.id}
              priceId={product.prices[0].id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.images[0]}
            />
          );
        })}
      </ul>
    );
  };
  return (
    <div className=" container">
      <header className=" heading">
        <h1>Screen Time</h1>
        <p className="tagLine">An Online Monitor Shop</p>
      </header>
      <AllProducts products={products} />
    </div>
  );
}
export default App;
