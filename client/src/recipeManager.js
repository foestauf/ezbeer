import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const axios = require("axios")

const RecipeManager = (props) => {
    const [recipeList, setRecipeList] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchData = async (query, uri) => {
            await
                axios
                    .get(uri, {headers: {'Content-Type': 'application/json'}})
                    .then(res => {
                        const dataFromServer = res.data
                        console.log(dataFromServer);
                        query(dataFromServer)
                    })
                    .catch(err => console.log(err.response))

        }

        fetchData(setRecipeList, "/api/recipes/")
    }, [props])


    return (
        <div>Recipes
            <Button variant="primary" onClick={() => setModalShow(true)}>New Recipe</Button>
            <NewRecipeModal show={modalShow} onHide={() => setModalShow(false)}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Style</th>
                </tr>
                </thead>
                <tbody>
                {recipeList.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.style}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>
        </div>
    )
}

const NewRecipeModal = (props, ref) => {
    return (
        <Modal animation={false}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Recipe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>New Recipe</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

RecipeManager.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(RecipeManager)