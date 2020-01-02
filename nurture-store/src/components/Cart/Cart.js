import React, { Component } from 'react';
import Product from "../Product";
import Title from "../Title";
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';


export default class Cart extends Component {
    render() {
        return (
            <section>
            <ProductConsumer>
            {value  => {
                const {cartItems} = value;
                if(cartItems.length > 0){
                    return (
                        <React.Fragment>
                            <Title name="Your" title ="Cart"/>
                            <CartColumns />
                            <CartList value = {value}/>
                            <CartTotals value = {value}/>
                        </React.Fragment>

                    )
                }
                else{
                    return <EmptyCart/>
                }


            }}

            </ProductConsumer>
                

            </section>
        )
    }
}
