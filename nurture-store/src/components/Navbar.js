import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../logo4.svg';
import styled from 'styled-components'
import {ButtonContainer} from './Button'


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className= "navbar navbar-expand-sm navbar-light px-sm-5">
                <Link to='/'>
                    <img src ={logo} alt="store" className = "navbar-brand"/>
                </Link>

                <ul className = "navbar-nav align-items-center">
                    <li className = "nav-item ml-5">
                    <Link to = "/" className ="nav-link" >
                        PLANTS
                    </Link>
                    </li>
                    
                </ul>

                <Link to='/cart' className ="ml-auto">
                <ButtonContainer>
                <span className = "mr-2">
                        <i className = "fas fa-cart-plus"/>
                        My Cart
                </span>
                        </ButtonContainer>
                    
                </Link>

            </NavWrapper>
            
        )
    }
}


const NavWrapper = styled.nav `
background: pink;
.nav-link{
    color:purple;
    font-size: 1.3rem
    text-transform: capitalize;
}
`