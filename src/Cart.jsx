import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './CartSlice';

function Cart() {
    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.cart);

    const handleChange = (e, productId) => {
        const quantity = parseInt(e.target.value);
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleRemove = (item) => {
        console.log('Item to be removed:', item);
        if (item.id) {
            dispatch(removeFromCart(item.id));
        }
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // Calculate total (subtotal + shipping, assuming shipping is free)
    const total = subtotal;

    return (
        <>
            <button className="btn btn-outline-dark" onClick={handleShow}>
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItems.length}</span>
            </button>

            <Modal
                size="lg"
                show={lgShow}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        CART ITEMS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {cartItems.length === 0 ?
                            <div> Currently no items found in cart. </div>
                            :
                            <div>
                                {cartItems.map(item => (
                                    <div className="card mb-3" key={item.id}>
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src={item.thumbnail} style={{ width: "14rem", height: "14rem" }} alt={item.title} /> {/* Update to item.thumbnail, item.title */}
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <p><b>Brand: </b>{`${item.brand} ${item.title}`}</p> {/* Update to item.brand, item.title */}
                                                    <p>{item.description}</p>
                                                    <p><b>Discount: </b>{`${item.discountPercentage}%`}</p>
                                                    <p><b>Rating: </b>{`${item.rating}/5`}</p>
                                                    <p><b>Stock: </b>{`${item.stock} items`}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card-body">
                                                    <select name="qty" value={item.quantity} onChange={(e) => handleChange(e, item.id)}> {/* Update to item.id */}
                                                        {[...Array(item.stock)].map((_, index) => (
                                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                        ))}
                                                    </select>
                                                    <h5 className="card-title">${(item.price * item.quantity).toFixed(2)}</h5>
                                                    {console.log('Item price:', item.price)}
                                                    {console.log('Item quantity:', item.quantity)}
                                                    <h6 onClick={() => handleRemove(item)} className="text-danger">REMOVE</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="subtotal">
                                    <div className="sub">SUBTOTAL: <span>${subtotal.toFixed(2)}</span></div>
                                    <div className='shipping'>SHIPPING: <span><b>FREE</b></span></div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-12">
                                        <h5 className="total">TOTAL: <span>${total.toFixed(2)}</span></h5>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cart;
