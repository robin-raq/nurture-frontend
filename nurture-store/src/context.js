import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();

// Do Fetch here
//Provider
//Consumer

    class ProductProvider extends Component {
        state ={
            products: storeProducts,
            detailProduct:detailProduct,
            plants: []
        }

        handleDetail = () =>{
            console.log("hello from detail")
        }

        addToCart = () => {
            console.log("hello from add to cart")
        }

        componentDidMount(){
            fetch("http://localhost:3000/plants")
            .then(r => r.json())
            .then((plantsArr) => {
                //console.log(plantsArr)
                this.setState({
                    plants: plantsArr
                })
            })
        }

        render() {
            console.log(this.state.plants)
            return (
                
                <ProductContext.Provider value={
                    {...this.state, 
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart
                }}>
                    {this.props.children}

                </ProductContext.Provider>
            )
        }
    }
    
    const ProductConsumer = ProductContext.Consumer

    export {ProductProvider, ProductConsumer}
