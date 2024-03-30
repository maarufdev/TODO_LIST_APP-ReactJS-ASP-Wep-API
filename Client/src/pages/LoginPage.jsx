import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../reduxSlices/auth/authActions"
import { Container, Form, Row, Col } from "react-bootstrap"

const LoginPage = () => {

    const [login, setLogin] = useState({
        username: null,
        password: null
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setLogin(prev => ({ ...prev, [name]: value }))
    }

    const validateLogin = () => {

        const validUsername = (login.username == null || login.username == '') ? false : true
        const validPassword = (login.password == null || login.password == '') ? false : true

        return (validUsername && validPassword)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const validCredentials = validateLogin();
        if(!validCredentials) return;

        // dispatch login state here
        dispatch(loginUser(login))
        .unwrap()
        .then(() => {
            navigate("/")
            return
        })
        .catch(err => {
            navigate("/login")
            console.log(err)
        })

    }

    return (
        <>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col className="col-7 border p-4">
                        <h2 className="text-center">Login</h2>
                        <form className="form">
                            <div className="mb-3">
                                <label>Username</label>
                                <input
                                    className="form-control"
                                    name="username"
                                    placeholder="Type username"
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    placeholder="Type password"
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-warning px-3 fw-bold text-uppercase rounded-0"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )

}


export default LoginPage;