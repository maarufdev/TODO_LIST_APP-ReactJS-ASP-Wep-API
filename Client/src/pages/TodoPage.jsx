
import { Row, Col, Container } from "react-bootstrap";
import TodoList from "../component/todo-component/TodoList";
import UpsertModal from "../component/todo-component/UpsertModal";
import TodoHeader from "../component/todo-component/TodoHeader";

const TodoPage = () => {

    return (
        <>
            <Container className="border mb-2">
                <TodoHeader />
            </Container>
            <Container className="border p-2">
                <TodoList />
            </Container>
            <UpsertModal />
        </>
    )
}

export default TodoPage;