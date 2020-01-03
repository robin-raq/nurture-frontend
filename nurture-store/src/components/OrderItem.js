import React, { Component } from 'react'

export default class OrderItem extends Component {
    
    render() {
        //console.log(this.props.order)
        return (
            <div className="container-fluid ">
                <ul>
                    <li>
                        <h3>
                        
                        <strong>  Order Number: </strong> {this.props.order.id}<br/>
                        <strong>  Customer: </strong>{this.props.order.customer.name}
                            <br/>
                            <strong> Date: </strong>{this.props.order.created_at}<br/>
                            <strong> Items: </strong>
                            <ul>
                                {this.props.order.plant_orders.map(plantO => <li>{plantO.plant.name}</li>)}
                            </ul>
                            <button 
                                className ="btn btn-outline-danger text-uppercase mb-3 px-5" type = "button" onClick = {()=>this.props.cancelOrder(this.props.order.id)} >
                                cancel order
                            </button>

                            

                        </h3>
                    </li>
                </ul>
            </div>
        )
    }
}
