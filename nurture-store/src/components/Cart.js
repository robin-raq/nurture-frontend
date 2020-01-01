import React, { Component } from 'react'
import Product from "./Product";
import Title from "./Title"
// import {storeProducts} from '../data'
import {ProductConsumer} from '../context'

export default class Cart extends Component {
    render() {
        return (
            <React.Fragment>
                <div className= "py-5">
                <div className= "container">
                <Title name= "Your" title= "plants"/>

                <div className= "row">
                <ProductConsumer>
                    {/* {value=>{
                        return value.products.map(product => {

                            return <Product key={product.id} plant = {product}/>
                        })
                        }} */}
                        {value=>{
                        return value.cartItems.map(product => {

                            return <Product key={product.id} plant = {product}/>
                        })
                        }}
                </ProductConsumer>
                </div>
                </div>

                </div>
            </React.Fragment>
        )
    }
}
