import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { setRecipe } from '../actions/recipeActions';

const axios = require('axios');

const RecipeList = (props) => {
  const [recipeList, setRecipeList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [serverRes, setServerRes] = useState();
  const dispatch = useDispatch();
  const { auth } = props;
  const { user } = auth;
  const history = useHistory();
    const recipeFocus = (recipeId) => {
        dispatch(setRecipe(recipeId));
        history.push("/recipes")
        console.log('Hello')
    }

  useEffect(() => {
    const fetchData = async (query, uri) => {
      await
        axios
          .get(uri, { headers: { 'Content-Type': 'application/json' } })
          .then(res => {
            const dataFromServer = res.data;
            query(dataFromServer);
          })
          .catch(err => console.log(err.response));

    };

    fetchData(setRecipeList, '/api/recipes/');
  }, [props, serverRes]);



  return <div>Recipes
    <Button variant="primary" onClick={() => setModalShow(true)}>New Recipe</Button>
    <NewRecipeModal
      res={setServerRes}
      show={modalShow}
      user={user}
      onHide={() => setModalShow(false)}/>
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Name</th>
        <th>Style</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      {recipeList.map((value, index) => {
        return <tr key={index}>
          <td>{value.name}</td>
          <td>{value.style}</td>
          <td><Button onClick={() => recipeFocus(value)}/>
          </td>
        </tr>;
      })}

      </tbody>
    </Table>
  </div>;
};

const NewRecipeModal = (props) => {
  const [nameField, setNameField] = useState('');
  const [styleField, setStyleField] = useState('');

  const { onHide } = props;

  const newRecipe = () => {
    const data = {
      name: nameField,
      style: styleField,
      owner: props.user.id,
    };
    axios
      .post('/api/recipes/new', data)
      .then((res, err) => {
          if (res.status === 200) {
            props.onHide();
            props.res(data);
          } else console.log(err);
        },
      );
  };
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
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={e => setNameField(e.target.value)}
                       placeholder="Beer Name"
                       aria-label="Beername"/>
          <InputGroup.Prepend>
            <InputGroup.Text>Style</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={e => setStyleField(e.target.value)}
            placeholder="Style"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={newRecipe}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

RecipeList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(RecipeList);