
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../reduxSlices/todo/todoSlice';
import { upsertTodo } from '../../reduxSlices/todo/todoActions';


const initialState = {
    id: 0,
    title: null,
    description: null,
    isDone: true,
    isActive: true,
    username: null
}



const UpsertModal = () => {

    const { selectedItem: fetchedItem, todoModal, isUpdate } = useSelector(state => state.todo)
    const { authData } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const [isToUpdate, setIsToUpdate] = useState(false);

    const [todo, setTodo] = useState(initialState);

    useEffect(() => {
        if (fetchedItem) {
            setIsToUpdate(true);
            setTodo(prev => ({ ...prev, id: fetchedItem.id, title: fetchedItem.title, description: fetchedItem.description }))
        }

    }, [dispatch, isUpdate])

    console.log(todo?.id);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setTodo(prev => ({ ...prev, [name]: value }))
    }

    const saveTodo = () => {
        let newPayload = {
            id: isToUpdate ? todo.id : 0,
            title: todo.title,
            description: todo.description,
            isDone: false,
            isActive: true,
            username: authData.username
        }

        dispatch(upsertTodo(newPayload))
            .unwrap()
            .then(() => {
                setTodo(initialState)
            })
            .catch(err => {
                console.log(err)
            })

        dispatch(closeModal())
    }

    const handleCloseModal = () => {
        dispatch(closeModal())
        setTodo(initialState)
    }

    return (
        <>
            <Modal
                show={todoModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>To-Do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3'>
                        <label>Title</label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder='Type title...'
                            name='title'
                            value={todo?.title ? todo.title : ""}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            type='text'
                            placeholder='Type description...'
                            name='description'
                            value={todo?.description ? todo.description : ""}
                            onChange={handleOnChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning px-3 fw-bold" onClick={saveTodo}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpsertModal;