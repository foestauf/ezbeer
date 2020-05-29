import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const axios = require("axios")

const RecipeManager = (props) => {
    const [recipeList, setRecipeList] = useState([]);
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
            <Button>New Recipe</Button>
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
RecipeManager.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(RecipeManager)