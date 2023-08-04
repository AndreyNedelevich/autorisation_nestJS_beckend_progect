import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, POSTS} from "../utils/const";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {isAdmin} from "../utils/isAdmin";

const NavBar = observer(() => {


    const navigate = useNavigate()
    const {user, post} = useContext(Context)


    let showAdminMenu = user.user.roles && isAdmin(user.user.roles)


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('accessTokens');
        navigate('/login')
    }


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Button
                    variant={"outline-light"}
                    onClick={() => {
                        post.setPage(1)
                        navigate(POSTS)
                    }}
                    className="ml-2 px-4"
                >
                    Posts
                </Button>

                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {showAdminMenu && <Button
                            style={{marginRight: '20px'}}
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin menu
                        </Button>}
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Sign out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"}
                                onClick={() => navigate(`${LOGIN_ROUTE}`)}>Authorization</Button>

                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export {NavBar};