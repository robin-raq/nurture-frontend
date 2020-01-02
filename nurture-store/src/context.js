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
            cartItems: [detailProduct2, detailProduct2],
            modalOpen: false,
            modalProduct: detailProduct2,
            cartSubTotal:0,
            cartTax:0,
            cartTotal:0

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
            let tempPlants = [...this.state.plants]
            const index = tempPlants.indexOf(this.getItem(id))
            const plant = tempPlants[index]
            plant.inCart = true
            let count = 1
            const price = plant.price

            let total = price * count;

            this.setState({
                cartItems: [...this.state.cartItems,plant]
            })
            // const plant = this.getItem(id)
            // this.setState({
            //     cartItems: [...this.state.cartItems,plant]
            // })
        }

        openModal = id =>{
            const plant = this.getItem(id)
            this.setState({
                modalProduct: plant,
                modalOpen: true
            })
        }

        closeModal = () =>{
            this.setState({
                modalOpen: false
            })
        }

        increment = (id) =>{
            console.log('this is from the increment method')

        }

        decrement = (id) =>{
            console.log('this is from the decrement method')

        }

        removeItem =(id) =>{
            console.log('item Removed')
        }

        clearCart =() =>{
            console.log('cart cleared')
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
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart

                }}>
                    {this.props.children}

                </ProductContext.Provider>
            )
        }
    }
    
    const ProductConsumer = ProductContext.Consumer

    export {ProductProvider, ProductConsumer}
