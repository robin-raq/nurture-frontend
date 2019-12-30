import React, { Component } from 'react'
import Product from "./Product";
import Title from "./Title"
// import {storeProducts} from '../data'
import {ProductConsumer} from '../context'

export default class ProductList extends Component {
    render() {
        //console.log(this.state)
        return (
            <React.Fragment>
                <div className= "py-5">
                <div className= "container">
                <Title name= "our" title= "plants"/>

                <div className= "row">
                <ProductConsumer>
                    {value=>{
                        return value.products.map(product => {

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
