// import React, { useEffect, useState } from "react";
// import "./CSS/ShopCategory.css";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import Item from "../Components/Item/Item";
// import { Link } from "react-router-dom";

// const ShopCategory = (props) => {

//   const [allproducts, setAllProducts] = useState([]);

//   const fetchInfo = () => { 
//     fetch('http://localhost:4000/allproducts') 
//             .then((res) => res.json()) 
//             .then((data) => setAllProducts(data))
//     }

//     useEffect(() => {
//       fetchInfo();
//     }, [])
    
//   return (
//     <div className="shopcategory">
//       <img src={props.banner} className="shopcategory-banner" alt="" />
//       <div className="shopcategory-indexSort">
//         <p><span>Showing 1 - 12</span> out of 54 Products</p>
//         <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
//       </div>
//       <div className="shopcategory-products">
//         {allproducts.map((item,i) => {
//             if(props.category===item.category)
//             {
//               return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>;
//             }
//             else
//             {
//               return null;
//             }
//         })}
//       </div>
//       <div className="shopcategory-loadmore">
//       <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
//       </div>
//     </div>
//   );
// };

// export default ShopCategory;




import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  const fetchInfo = () => { 
    fetch('http://localhost:4000/allproducts') 
      .then((res) => res.json()) 
      .then((data) => {
        setAllProducts(data);
        setSortedProducts(data.filter(item => item.category === props.category));
      })
  }

  useEffect(() => {
    fetchInfo();
  }, [props.category]);

  useEffect(() => {
    fetchInfo();
  }, [])

  useEffect(() => {
    sortProducts(sortOption);
  }, [allProducts, sortOption])

  const sortProducts = (option) => {
    let sorted = [...sortedProducts];
    switch(option) {
      case "alphabetical":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low-high":
        sorted.sort((a, b) => a.new_price - b.new_price);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        // Keep the default order
        sorted = allProducts.filter(item => item.category === props.category);
    }
    setSortedProducts(sorted);
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  }
    
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - {sortedProducts.length}</span> out of {sortedProducts.length} Products</p>
        <div className="shopcategory-sort">
          Sort by 
          <select onChange={handleSortChange} className="selectsort" value={sortOption}>
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
          {/* <img src={dropdown_icon} alt="" /> */}
        </div>
      </div>
      <div className="shopcategory-products">
      
        {sortedProducts.map((item, i) => (
          <Item 
            id={item.id} 
            key={i} 
            name={item.name} 
            image={item.image}  
            new_price={item.new_price} 
            old_price={item.old_price}
          />
        ))}
        

      </div>
      <div className="shopcategory-loadmore">
        <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;