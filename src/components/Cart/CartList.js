import React from 'react';
import CartItem from './CartItem';

export default function CartList(props) {
    const { cart, getCartDetails} =props;
   console.log(cart, "cart")
    return (
     <div className="container-fluid">
         {cart && cart.map(item=>{
            console.log(item, "item")
             return <CartItem getCartDetails={getCartDetails} key={item._id} item={item} />
         })} 
        
    </div>
    );
}
