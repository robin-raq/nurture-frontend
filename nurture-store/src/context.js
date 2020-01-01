import React, { Component } from 'react'
import {storeProducts, detailProduct, detailProduct2} from './data'

const ProductContext = React.createContext();

// Do Fetch here
//Provider
//Consumer

    class ProductProvider extends Component {
        state ={
            //products: storeProducts, this gets objects as a reference instead of a copy
            products: [],
            detailProduct: detailProduct2,
            plants: [],
            cartItems: []
        }

        //helper function to get plant by id
        getItem = (id) =>{
            const selectedPlant = this.state.plants.find(plant => plant.id=== id)
            return selectedPlant
        }

        handleDetail = (id) =>{
            const plant = this.getItem(id)
            this.setState({
                detailProduct: plant
            })
            console.log("hello from detail")
        }

        addToCart = (id) => {
            //console.log(`hello from add to cart.id is ${id}`)
            const plant = this.getItem(id)
            this.setState({
                cartItems: [...this.state.cartItems,plant]
            })
        }

        // function to grab a copy of products from local dataset
        setProducts =() =>{
            let tempProducts = []
            storeProducts.forEach(item =>{
                const singleItem = {...item}
                tempProducts = [...tempProducts, singleItem]
            })
            this.setState(() => {
                return {products: tempProducts}
                
            }
            )
        }

        componentDidMount(){
            this.setProducts(); // copies product from local dataset

            // fetch data from the rails backend
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
            console.log(this.state.detailProduct)
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
