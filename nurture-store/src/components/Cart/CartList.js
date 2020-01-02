import React from 'react'
import CartItem from './CartItem'

export default function ({value}) {
    const {cartItems} = value
    console.log(value, cartItems)
    return (
        <div className = "container-fluid">
            
            {cartItems.map(item => <CartItem key ={item.id} item={item} value={value} />)}
            
        </div>
    )
}
