import { Row, Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showModal } from "../../reduxSlices/todo/todoSlice";

const TodoHeader = () => {

    const dispatch = useDispatch();

    return (
        <>
            <Row>
                <Col className="col-10 col-sm-6 col-md-8 col-lg-8 p-2">
                    <input className="form-control" type="text" name="search" placeholder="Search to do." />
                </Col>
                <Col className="col-md-3 d-flex justify-content-center gap-3 p-2">
                    <button className="btn btn-dark px-4 fw-bold text-uppercase">Find</button>
                    <button className="btn btn-warning px-4 fw-bold text-uppercase" onClick={() => dispatch(showModal())}>Add</button>
                </Col>
            </Row>
        </>
    )
}


export default TodoHeader;