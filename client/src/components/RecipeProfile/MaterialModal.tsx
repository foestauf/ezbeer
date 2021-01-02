import axios from 'axios';
import React, { useState } from 'react';
import { Modal, InputGroup, Button, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient } from '../../actions/recipeActions';

interface Props {
  onHide: () => void;
}
export const MaterialModal = (props: Props) => {
  const recipe = useSelector((state: any) => state.recipe);
  const [newMaterial, setNewMaterial] = useState({ _id: recipe._id });
  const { onHide } = props;
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { value } = event.target;
    setNewMaterial((prevState1) => ({
      ...prevState1,
      [event.target.name]: value,
    }));
  };

  const saveIngredient = async () => {
    const ingredientObj = newMaterial;
    await axios.put('/api/recipes/add-ingredient', ingredientObj).then((res) => {
      if (res.status === 200) {
        console.log('Ingredient addition successful');
        props.onHide();
        props.toast();
        delete ingredientObj._id;
        dispatch(addIngredient(ingredientObj));
        setNewMaterial({ _id: recipe._id });
      }
    });
  };

  return (
    <Modal animation {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Name"
            name="name"
            aria-label="Beername"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>Quantity</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Quantity"
            name="quantity"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>Type</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Type"
            name="type"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={saveIngredient}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
