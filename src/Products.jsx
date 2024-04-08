import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux'; // Importing useSelector
import { addToCart, removeFromCart } from './CartSlice';

function Products() {
    const [products, setProducts] = useState([]);
    const cartItems = useSelector(state => state.cart.cart); // Selecting cart items from the Redux store

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const finalRes = await res.json();
                setProducts(finalRes.products);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    const handleCartAction = (product) => {
        if (isInCart(product.id)) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="d-flex flex-wrap justify-content-between">
                    <h1>SHOP</h1>
                    <h1><Cart /></h1>
                </div>
            </div>

            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center">
                    {products.map(product => (
                        <div className="col mb-5" key={product.id}>
                            <div className="card h-100" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={product.thumbnail} style={{ width: "17.8rem", height: "15rem" }} alt={product.title} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{product.title}</h5>
                                        {product.price ? `$${product.price}.00` : 'Price not available'}
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        {isInCart(product.id) ? (
                                            <button className="btn btn-outline-danger" onClick={() => handleCartAction(product)}>Remove from cart</button>
                                        ) : (
                                            <button className="btn btn-outline-primary" onClick={() => handleCartAction(product)}>Add to cart</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Products;