import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {FaPen, FaTrash} from 'react-icons/fa'


const Home = () => {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [task, setTask] = useState({ title: '', id: null })
    const inputRef = useRef(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => dispatch({ type: "FETCH_TODOS", payload: json }))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.id) {
            const todo = todos.find(todo => todo.id === task.id)
            dispatch({ type: "EDIT_TODO", payload: { ...todo, title: e.target[0].value } })
            setTask({ title: '', id: null })
        } else {
            const todo = {
                id: Date.now(),
                title: e.target[0].value,
                completed: false
            }
            dispatch({ type: "ADD_TODO", payload: todo })
            setTask({ title: '', id: null })
        }
    }

    const handleEdit = (id) => {
        const todo = todos.find(todo => todo.id === id)
        setTask(todo)
        inputRef.current.value = todo.title
    }

    return (
        <div className='container'>
            <h1 className='text-center my-5'>What The Plan For Today</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input className='form-control mx-3' type="text" placeholder="Add todo" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} ref={inputRef}/>
                <button type="submit" className='btn btn-outline-dark my-3 mx-3 w-100'>{task.id ? "Edit Todo" : "Add Todo"}</button>
            </form>
            {todos ? (
                <ul className='list-group mx-3 w-100'>
                    {todos.map(todo => (
                        <li key={todo.id} className='my-2 list-group-item d-flex justify-content-between border-2 rounded'>
                            {todo.title}
                            <div>
                                <FaTrash className='text-danger fs-5 mx-3' onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}/>
                                <FaPen className='text-warning fs-5' onClick={() => handleEdit(todo.id)}/>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            ): (
                <p>Not todos</p>
            )}
        </div>
    )
}

export default Home


