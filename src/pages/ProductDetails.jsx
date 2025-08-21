import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCart"; 

const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail,] = useState(null);

  //  Find product by _id
  const product = products.find((item) => String(item._id) === String(id));

  //  Find related products
  useEffect(() => {
    if (products.length > 0 && product) {
      const productsCopy = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  //  Set default thumbnail
  useEffect(() => {
    if (!product) return;

    if (Array.isArray(product.image) && product.image.length > 0) {
      setThumbnail(product.image[0]); // first image
    } else if (typeof product.image === "string") {
      setThumbnail(product.image); // single image
    } else {
      setThumbnail(null);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  return (
    <div className="mt-12">
      {/*  Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link to={`/products/${product.category?.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-primary-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/*  Left Side: Thumbnails + Main Image */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) && product.image.length > 0 ? (
              product.image.map((img, index) => (
                <div
                  key={`thumb-${index}`}
                  onClick={() => setThumbnail(img)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer hover:border-primary-400 transition"
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))
            ) : typeof product.image === "string" ? (
              <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden">
                <img src={product.image} alt="Single Product" />
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No images</p>
            )}
          </div>

          {/*  Main Image */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 p-4">No Image Available</p>
            )}
          </div>
        </div>

        {/*  Right Side: Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          {/*  Star Rating (Always 4 filled) */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={`star-${product._id}-${i}`}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          {/*  Pricing */}
          <div className="mt-6">
            {product.price && (
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
            )}
            <p className="text-2xl font-medium">
              Offer: {currency}{product.offerPrice || product.price}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/*  Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {Array.isArray(product.description) && product.description.length ? (
              product.description.map((desc, index) => (
                <li key={`desc-${product._id}-${index}`}>{desc}</li>
              ))
            ) : (
              <li>No description available</li>
            )}
          </ul>

          {/*  Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-30 mt-6  align-middle w-full">
          {relatedProducts
            .filter((prod) => prod.inStock !== false) 
            .map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0); 
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
