
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTodoById, removeTodoById } from "../../reduxSlices/todo/todoActions"
import { showModal } from "../../reduxSlices/todo/todoSlice"
import Swal from "sweetalert2"

const TodoItem = ({id, title, description}) => {


    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(true)

    const handleSelect = () => {
        dispatch(getTodoById(id))

        // setSelectedId(id)

        dispatch(showModal(isUpdate));
    } 

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(removeTodoById(id))
                .unwrap()
                .then(res => {
                    Swal.fire("Delete", "", "success");
                })
                .catch(err => {
                    Swal.fire("Delete", "", "failed");
                })

                
                return
            } 
          });
    }



    return (
        <>
            <div className="row m-0 align-items-center mb-2 p-3 border">
                <div className="col">
                    <p className="m-0">{title}</p>
                </div>
                <div className="col-3 gap-2 d-flex">
                    <button 
                        className="btn btn-dark px-4 text-uppercase fw-bold rounded-0"
                        onClick={handleSelect}
                        >Edit</button>
                    <button 
                        className="btn btn-danger px-4 text-uppercase fw-bold rounded-0"
                        onClick={handleDelete}
                        >Delete</button>
                </div>
            </div>
        </>
    )
}

export default TodoItem;