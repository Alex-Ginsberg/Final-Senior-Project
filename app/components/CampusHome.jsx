import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {fetchCampuses, deleteCampuses} from '../reducers/campuses';

export default class CampusList extends Component{
    constructor(props) {
        super(props);
        this.state = store.getState();
        console.log(this.state)
    }

    componentDidMount() {
        const campusesThunk = fetchCampuses();
        store.dispatch(campusesThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                <Link to={`/campus/add`}>
                <button id="addCampus" className="btn btn-info">Add Campus</button>
                </Link>
                {this.state.campuses.map(campus => (
                    <div key={campus.id} className='col-lg-6' >
                        <Link to={`/campus/${campus.id}`}>
                            <img src={campus.image} alt="image" height="150" width="150" />
                            <h2>{campus.name}</h2>
                        </Link>
                        <button className="btn btn-danger" onClick={() => {
                            const removeThunk = deleteCampuses(campus.id);
                            store.dispatch(removeThunk);
                            const campusesThunk = fetchCampuses();
                            store.dispatch(campusesThunk);}}>DELETE '{campus.name}' CAMPUS</button>
                    </div>
                ))}
            </div>
        )
    }
}
