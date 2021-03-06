import axios from 'axios';
import {fetchCampus} from './currentCampus'

// Action Types
const GET_CAMPUSES = 'GET_CAMPUSES';
const NEW_CAMPUS = 'NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const EDIT_CAMPUS = 'EDIT_CAMPUS';

// Action Creator
export function getCampuses(campuses) {
    const action = {
        type: GET_CAMPUSES,
        campuses: campuses
    };
    return action;
}

export function newCampuses(campus) {
    const action = {
        type: NEW_CAMPUS,
        campus: campus
    }
    return action;
}

export function removeCampuses(campusId) {
    const action = {
        type: REMOVE_CAMPUS,
        campusId: campusId
    }
    return action;
}

export function editCampuses(campuses) {
    const action = {
        type: EDIT_CAMPUS,
        campuses: campuses
    }
    return action;
}

// Thunk Middleware
export function fetchCampuses() {    
        return function thunk(dispatch) {
            return axios.get('/api/campus')
                .then(res => res.data)
                .then(campuses => {
                    const action = getCampuses(campuses);
                    dispatch(action);
                });
        }
}

export function postCampus(campusName) {
    return function thunk(dispatch) {
        return axios.post('/api/campus', {
            name: campusName,
            image: '/images/mars.jpeg'
        })
            .then(res => res.data)
            .then(campus => {
                const action = newCampuses(campus);
                dispatch(action);
                return campus;
            })
    }
}

export function putCampus(campusName, campusId) {
    return function thunk(dispatch) {
        return axios.put(`/api/campus/${campusId}`, {name: campusName})
            .then(res => {
                return res.data
            })
            .then(campus => {
                dispatch(fetchCampus(campus.id));
            })
    }
}

export function deleteCampuses(campusId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campus/${campusId}`)
            .then((res) => {
                console.log('RES: ', res.data)
                console.log('IN DELETE, CAMPUS ID: ', campusId)
                const action = removeCampuses(campusId);
                dispatch(action);
            })
    }
}

// Reducer
export default function campuses(state = [], action) {   
        switch (action.type) {
            case GET_CAMPUSES:
                return action.campuses
            case NEW_CAMPUS:
                return [...state, action.campus]
            case REMOVE_CAMPUS:
                let newState = state.filter((campus) => campus.id !== action.campusId);
                console.log(newState)
                return newState;
            case EDIT_CAMPUS:
                return action.campuses
            default:
                return state;
        }    
}