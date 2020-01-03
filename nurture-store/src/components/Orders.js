import React, { Component } from 'react'
import Title from "./Title"
import {ProductConsumer} from '../context'
import OrderItem from './OrderItem'

export default class Orders extends Component {
    render() {
        return (
            <React.Fragment>
                <div className= "py-5">
                <div className= "container">
                <Title name= "past" title= "orders"/>
                
                <div className = "col-10 mx-auto text-left text-title text-uppercase pt-5 flex">
                <ProductConsumer>
                    
                        {value=>{
                        return value.orders.map(order => {

                            return <OrderItem key={order.id}  cancelOrder= {value.cancelOrder} order = {order} />
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
