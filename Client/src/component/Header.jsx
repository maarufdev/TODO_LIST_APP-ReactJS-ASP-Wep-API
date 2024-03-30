import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../reduxSlices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { cleanState } from "../reduxSlices/todo/todoSlice";

const Header = () => {

    const [username, setUsername] = useState(null);
    // todo: just use the authData from redux state
    // const authData = JSON.parse(localStorage.getItem('authData'))
    const { authData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(authData){
            setUsername(authData.username)
        }
    }, [authData])

    const handleLogout = () =>{
        dispatch(logout())
        dispatch(cleanState())
        navigate("/login")
    }

    return (
        <>
            <Container className="border p-3">
                <Row className="justify-content-around">
                    <Col className="">
                        <h1 className="fw-bold">To-Do</h1>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">

                        {authData ?
                           <div className="d-flex gap-3">
                             <p className="fw-bold">{username ?? ''}</p>
                             <Link onClick={handleLogout}>Logout</Link>
                           </div>
                            :
                            (
                               <div className="d-flex gap-3">
                                    <Link to={'/login'}>
                                            Login
                                        </Link>
                                        <Link to={'/register'}>
                                            Register
                                        </Link>
                               </div>
                            )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Header;