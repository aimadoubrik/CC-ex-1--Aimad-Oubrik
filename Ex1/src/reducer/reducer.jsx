import React from 'react'

const initialState = {
    todos : []
}

const Reducer = (state = initialState, action) => {

    switch(action.type) {
        case "FETCH_TODOS":
            return {
                ...state,
                todos : action.payload
            }
        case "ADD_TODO":
            return {
                ...state,
                todos : [...state.todos, action.payload]
            }
        case "EDIT_TODO":
            return {
                ...state,
                todos : state.todos.map(todo => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos : state.todos.filter(todo => todo.id !== action.payload)
            }
        default:
            return state
    }
    
}

export default Reducer
