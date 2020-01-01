import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button'



export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
            {(value) => {
                //console.log(value.detailProduct)
                const {id, name ,image, price, description, care_category, inCart} = value.detailProduct
                return(
                    <div className = "container py-5">
                        {/* title */}
                        <div className = "row">
                            <div className = "col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{name}</h1>

                        </div>
                    </div>
                        {/* end title */}
                        {/* product info */}
                        <div className = "row">
                            <div className = "col-10 mx-auto col-md-6 my-3">
                            <img src={image} alt="product" className="img-fluid"/>
                        </div>
                        {/* product text */}
                            <div className = "col-10 mx-auto col-md-6 my-3 text-capitalize">
                            <h2> name: {name}</h2>
                            <h4 className= "text-title text-uppercase text-muted mt-3 mb-2"> Care Category: <span className="text-uppercase">{care_category}</span></h4>
                            <h4 className = "text-blue">
                                <strong>
                                    price: <span>${price}</span>
                                </strong>
                            </h4>
                            <p className = "text-capitalize font-weight-bold mt-3 mb-0"> description: 
                            </p>
                            <p className = "text-muted lead">
                            {description}

                            </p>
                            {/* buttons */}
                            <div>
                            <Link to="/">
                                <ButtonContainer> back to products
                                </ButtonContainer>
                            </Link>
                            <ButtonContainer cart
                            disabled = {inCart? true: false}
                            onClick = {()=> value.addToCart(id)}
                            > 
                            {inCart ? "inCart" :"add to cart"}
                            </ButtonContainer>

                            </div>
                            </div>


                        </div>
                    </div>

                )
            }}

            </ProductConsumer>
        )
    }
}
