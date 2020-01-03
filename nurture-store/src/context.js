import React, { Component } from 'react'
import {detailProduct2} from './data'

const ProductContext = React.createContext();

// Do Fetch here
//Provider
//Consumer

    class ProductProvider extends Component {
        state ={
            //products: storeProducts, this gets objects as a reference instead of a copy
            products: [],
            orders: [],
            detailProduct: detailProduct2,
            plants: [],
            cartItems: [],
            modalOpen: false,
            modalProduct: detailProduct2,
            cartSubTotal:0,
            cartTax: 0,
            cartTotal: 0

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
            plant.count = 1
            const price = plant.price

            plant.total = price;

            this.setState({
                cartItems: [...this.state.cartItems,plant]
            },
            () => {
                this.addTotals()
                
            }
            
            )
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
            //console.log('this is from the increment method')
            let tempCart = [...this.state.cartItems]
            const selectedPlant = tempCart.find((item) => item.id === id)
            
            const index = tempCart.indexOf(selectedPlant)
            const plant = tempCart[index]

            plant.count = plant.count +1
            plant.total = plant.count * plant.price


            this.setState({
                cartItems: [...tempCart]
            }, () => {
                this.addTotals()
                
            }
            )


        }

        decrement = (id) =>{
           // console.log('this is from the decrement method')
            let tempCart = [...this.state.cartItems]
            const selectedPlant = tempCart.find((item) => item.id === id)
            
            const index = tempCart.indexOf(selectedPlant)
            const plant = tempCart[index]

                
            plant.count = plant.count - 1
            if (plant.count === 0){
                this.removeItem(id)
            }
            else{

                plant.total = plant.count * plant.price
                this.setState({
                    cartItems: [...tempCart]
                }, () => {
                    this.addTotals()
                    
                }
                )
            
            }


                


            


        }

        removeItem =(id) =>{
           // console.log('item Removed')
            let tempPlants = [...this.state.plants]
            let tempCart = [...this.state.cartItems]

           // return new array of all plants whose ids don't match removed item
            tempCart = tempCart.filter(item => item.id !== id)
            const index = tempPlants.indexOf(this.getItem(id))
            let removedProduct = tempPlants[index];
            removedProduct.inCart = false;
            this.setState({
                cartItems: [...tempCart],
                plants: [...tempPlants]
            }, ()=>{
                this.addTotals()
            })
        }

        clearCart =() =>{
            //console.log('cart cleared')
            this.setState({
                cartItems: [],
                
            }, ()=>{
                this.setProducts();
                this.addTotals();
            })
        }

        addTotals = () => {
            let subTotal = 0;
            this.state.cartItems.map(item => (subTotal += item.total))
            const tempTax = subTotal * 0.1
            const tax = parseFloat(tempTax.toFixed(2))
            const total = subTotal + tax
            this.setState({
                cartSubTotal:subTotal,
                cartTax: tax,
                cartTotal: total
            })
        }

        createOrder = () =>{
           // console.log("hello from createOrder")
            let plantIds = [...this.state.cartItems].map(plant => plant.id)
            //console.log(plantOrders)
            fetch(`http://localhost:3000/orders`, {
                method:'POST',
                headers: { 
                    'Content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    customer_id: 1,
                    plant_ids: plantIds
                })
            })
            .then(resp => resp.json())
            .then(newOrder => {
                console.log(newOrder)
                this.setState({
                    orders:[newOrder, ...this.state.orders]
                }, ()=>{ 
                    this.clearCart()
                })
        })

        }
        

        
        setProducts =() =>{
            // fetch data from the rails backend
            fetch("http://localhost:3000/plants")
            .then(r => r.json())
            .then((plantsArr) => {
                //console.log(plantsArr)
                this.setState({
                    plants: plantsArr
                })
            })
            //  grab a copy of products from local dataset
            // let tempProducts = []
            // storeProducts.forEach(item =>{
            //     const singleItem = {...item}
            //     tempProducts = [...tempProducts, singleItem]
            // })
            // this.setState(() => {
            //     return {products: tempProducts}
                
            // }
            // )

        }

        setOrders =() =>{
            // fetch data from the rails backend
            fetch("http://localhost:3000/orders")
            .then(r => r.json())
            .then((ordersArr) => {
                //console.log(plantsArr)
                this.setState({
                    orders: ordersArr
                })
            })
        }

        cancelOrder =(id) =>{
            let tempOrders = [...this.state.orders]
            
            tempOrders = tempOrders.filter(order => order.id !== id)
            //console.log("Your order has been cancelled")
            //adv fetch to backend to delete
            fetch(`http://localhost:3000/orders/${id}`, {
                method:'DELETE',
                headers: { 
                    'Content-type': 'application/json',
                    'accept': 'application/json'
                }
                
            })
            .then(resp => resp.json())
            .then(json_resp => {
                //console.log(json_resp)
                this.setState({
                    orders: tempOrders
                })

            })
        }


        componentDidMount(){
            this.setProducts(); // copies product from database
            this.setOrders();

            // fetch data from the rails backend
            // fetch("http://localhost:3000/plants")
            // .then(r => r.json())
            // .then((plantsArr) => {
            //     //console.log(plantsArr)
            //     this.setState({
            //         plants: plantsArr
            //     })
            // })
        }

        render() {
            //console.log(this.state.orders)
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
                    clearCart: this.clearCart,
                    createOrder: this.createOrder,
                    cancelOrder: this.cancelOrder


                }}>
                    {this.props.children}

                </ProductContext.Provider>
            )
        }
    }
    
    const ProductConsumer = ProductContext.Consumer

    export {ProductProvider, ProductConsumer}
