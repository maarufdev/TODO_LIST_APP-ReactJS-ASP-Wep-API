import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../reduxSlices/auth/authActions";
import { useDispatch } from "react-redux";

const RegisterPage = () => {

    const [register, setRegister] = useState({
        username: null,
        email: null,
        password: null
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setRegister(prev => ({ ...prev, [name]: value }))
    }

    const validateRegister = () => {
        const validUsername = (register.username == "" || register.username == null) ? false : true;
        const validEmail = (register.email == "" || register.email == null) ? false : true;
        const validPassword = (register.password == "" || register.password == null) ? false : true

        return (validUsername && validEmail && validPassword)
    }
    const handleRegister = (e) => {
        e.preventDefault();

        if(!validateRegister()) return;
        
        // dispatch login state here
        dispatch(registerUser(register))
        .unwrap()
        .then(() => {
            navigate("/login")
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
        <>
           <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col className="col-7 border p-4">
                        <h2 className="text-center">Register</h2>
                        <form className="form">
                            <div className="mb-3">
                                <label>Username</label>
                                <input
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    required    
                                    placeholder="Type your username"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Type your email"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Type your password"
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-warning px-3 fw-bold text-uppercase"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default RegisterPage;