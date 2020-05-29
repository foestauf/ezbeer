import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import Table from "react-bootstrap/Table";
const axios = require("axios")

const RecipeManager = (props) => {
    useEffect(() => {
        fetchData(setRecipeList, "/api/recipes")
    },[])

    const fetchData = async (query, uri) => {
        await
            axios
                .get(uri)
                .then(res => {
                    const dataFromServer = res.data
                    query(dataFromServer)
                })

    }

    const { user } = props.auth;
    console.log(user);
    const [recipeList, setRecipeList] = useState();
    return (
        <div>Recipes
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Style</th>
                </tr>
                </thead>
                <tbody>

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