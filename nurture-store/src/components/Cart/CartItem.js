import React from 'react'

export default function ({item, value, total, count}) {
    const{ id, name, price, image} = item
    const{increment, decrement, removeItem} = value
    return (
        <div className ="row my-2 text-capitalize text-center">
            <div className ="col-10 mx-auto col-lg-2 ">
            <img className ="img-fluid" alt="plant" src ={image} style ={{width:'5rem', height:"5rem"}}/>
            
            </div>
            <div className ="col-10 mx-auto col-lg-2 ">
                <span className= "d-lg-none"> product: </span> {name}

            </div>
            <div className ="col-10 mx-auto col-lg-2 ">
            <span className= "d-lg-none"> price: </span>
            ${price}
                </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className= "d-flex justify-content-center">
                <div>

                </div>
                <span className = "btn btn-black mx-1" onClick ={()=>decrement(id)}>
                -
                </span>
                <span className = "btn btn-black mx-1">{count}</span>
                <span className = "btn btn-black mx-1" onClick ={()=>increment(id)}>
                +
                </span>

                </div>
            </div>
            {/*  */}
            <div className ="col-10 mx-auto col-lg-2 ">
            <div className= "cart-icon" onClick= {()=>removeItem(id)}>
                <i className="fas fa-trash"/>
            </div>
            </div>
            <div className ="col-10 mx-auto col-lg-2 ">
            <strong className= "d-lg-none"> item total: </strong> $ {total}
            </div>

        </div>
    )
}
