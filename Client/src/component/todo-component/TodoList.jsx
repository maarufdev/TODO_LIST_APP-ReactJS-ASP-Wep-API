import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { getTodos } from "../../reduxSlices/todo/todoActions";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {

    const [todos, setTodos] = useState([]);

    const { todos: todoList, isUpdate, selectedItem, isLoading } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    useEffect(() => {
        // call api
        dispatch(getTodos())
        .unwrap()
        .then((res) => setTodos(res))

    }, [dispatch, isUpdate, selectedItem])

    return (
        <>
           {todos.length || !isLoading
                ?
                todos.map((item) => <TodoItem 
                                        key={item.id} 
                                        id={item.id} 
                                        title={item.title} 
                                        description={item.description} 
                                    />)
                : 
                <h1>No Data</h1>
                }
        </>
    )
}

export default TodoList;