import React, {useState, useEffect} from 'react'
import '../styles/cart.css';

const Cart = ({cart, setCart}) => {

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const calculateTotalPrice = (cart) => {
        const total = cart.reduce((acc, curr) => acc + curr.price, 0);
        setPrice(total);
    };

    const handleRemove = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };

    const addItem = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? setQuantity(quantity + 1) : item
        );
        setQuantity(quantity);
        calculateTotalPrice(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity > 1 ? setQuantity(quantity - 1) : item
        );
        calculateTotalPrice(updatedCart);
    };

    useEffect(() => {
        calculateTotalPrice(cart);
    }, [cart]); 

  return (
    <div>
        {
            cart?.map((item) => (
                <div className="cart_box" key={item.id}>
                <div className="cart_img">
                    <img src={item.img} alt={item.title} />
                    <p>{item.title}</p>
                </div>
                <div className='cartBtn'>
                    <p className='item_num'>+{quantity}</p>
                    <div className="cart_price">
                        <button className='addBtn' onClick={() => addItem(item.id)}>+</button>
                        <button className='deleteBtn' onClick={() => removeItem(item.id)}>-</button>
                    </div>
                    <div className="cart_quantity">
                        <span>{item.price} Rs</span>
                        <br />
                        <button className='removeBtn' onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            </div>
            ))
        }
            <div className='total_box'>
                <h3>Total Price: {price} Rs</h3>
                <button>Checkout</button>
            </div>
    </div>
  )
}

export default Cart;