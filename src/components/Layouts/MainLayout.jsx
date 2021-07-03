import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "@material-ui/core";

const MainLayout = (props) => {
    return (
        <Container>
            <Header title={"WIPCAST"} currentUser={props.user} />
            {props.children}
            <Footer />
        </Container>
    )
}

export default MainLayout;