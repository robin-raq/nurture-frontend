import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div>
                <select onChange={(evt) => this.props.setFilteredTerm(evt.target.value)}>
                    <option value="0">Ease of Care:</option>
                    <option value="All">All</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
        )
    }
}