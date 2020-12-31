import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import '../css/recipes.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { addIngredient, setRecipe } from '../actions/recipeActions';
import Toaster from './toast';

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipe = useSelector((state) => state.recipe);
  const [prevState, setPrevState] = useState({ _id: recipe._id });
  const [toastShow, setToastShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const changeHandler = (event) => {
    event.persist();
    const { value } = event.target;
    setPrevState((prevState1) => ({
      ...prevState1,
      [event.target.name]: value,
    }));
  };

  const delRecipe = async (recipeId) => {
    console.log(`Deleting ${recipeId}`);
    await axios.delete('/api/recipes/delete-recipe', { data: { data: recipeId } }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log('Routing back to recipe list');
        history.push('/recipelist');
      }
    });
  };

  const saveRecipe = async () => {
    await axios.put('/api/recipes/update-recipe', prevState).then((res) => {
      if (res.status === 200) {
        dispatch(setRecipe(prevState));
        console.log('We did it');
        setToastShow(true);
        setPrevState({ _id: recipe._id });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>EZ Beer: Recipe Manager</title>
      </Helmet>
      <Container fluid>
        <NewMaterialModal
          show={modalShow}
          recipe={recipe}
          backdrop="static"
          onHide={() => setModalShow(false)}
          toast={() => setToastShow(true)}
        />

        <Row>
          <Col className="statusBar">
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl readOnly size="sm" placeholder={recipe.name} />
                <InputGroup.Prepend>
                  <InputGroup.Text>Style</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl readOnly size="sm" placeholder={recipe.style} />
              </InputGroup>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            Recipe Control Panel
            <div>INSERT ICONS</div>
          </Col>
          <Col md={8}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="profile" title="Profile">
                Profile Info
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    defaultValue={recipe.name}
                    name="name"
                    placeholder="Beer Name"
                    type="text"
                    aria-label="BeerName"
                    onChange={(e) => changeHandler(e)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>Brewer</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="brewerName"
                    defaultValue={recipe.brewerName}
                    placeholder="Brewer Name"
                    aria-label="BrewerName"
                    onChange={(e) => changeHandler(e)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Batch Size</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="batchSize"
                    defaultValue={recipe.batchSize}
                    onChange={(e) => changeHandler(e)}
                    placeholder="Size in Gallons"
                    aria-label="BatchSize"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>Boil Time</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="boilTime"
                    defaultValue={recipe.boilTime}
                    onChange={(e) => changeHandler(e)}
                    placeholder="Boil Time"
                    aria-label="BoilTime"
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text>Efficiency</InputGroup.Text>
                    <FormControl
                      name="efficiency"
                      defaultValue={recipe.efficiency}
                      onChange={(e) => changeHandler(e)}
                      placeholder="80"
                      aria-label="efficiency"
                    />
                  </InputGroup.Prepend>
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <div id="ingredients">
                  <Container>
                    <Row>
                      <Col>Amount</Col>
                      <Col>Name</Col>
                      <Col>Type</Col>
                      <Col>%</Col>
                      <Col>IBU</Col>
                      <Col>Inventory</Col>
                      <Col>Cost</Col>
                    </Row>
                    {recipe.ingredients.map((value, index) => {
                      return (
                        <IngredientView
                          key={index}
                          index={index}
                          name={value.name}
                          quantity={value.quantity}
                          type={value.type}
                        />
                      );
                    })}
                  </Container>
                </div>
              </Tab>
              <Tab eventKey="Mash" title="Mash">
                Some Info
              </Tab>

              <Tab eventKey="Water Calc" title="Water Calc">
                Wut
              </Tab>
              <Tab title="Settings" eventKey="Settings">
                Settings
                <div>
                  DANGER ZONE
                  <Button variant="danger" onClick={() => delRecipe(recipe._id)}>
                    DELETE
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </Col>
          <Col>
            <Button size="sm" block onClick={() => setModalShow(true)}>
              Add Grain
            </Button>
            <Button size="sm" block>
              Add Hops
            </Button>
            <Button size="sm" block>
              Add Misc
            </Button>
            <Button size="sm" block>
              Add Yeast
            </Button>
            <Button size="sm" block>
              Add Water
            </Button>
            <Button size="sm" block>
              Edit
            </Button>
            <Button size="sm" block>
              Delete
            </Button>
            <Button size="sm" block onClick={() => saveRecipe(recipe.id)}>
              Save
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>Recipe Infos, ABV, IBU, total weight</Col>
        </Row>
      </Container>
      <Toaster show={toastShow} recipeName={recipe.name} onHide={() => setToastShow(false)} />
    </div>
  );
}

const NewMaterialModal = (props) => {
  const recipe = useSelector((state) => state.recipe);
  const [newMaterial, setNewMaterial] = useState({ _id: recipe._id });
  const { onHide } = props;
  const dispatch = useDispatch();

  const changeHandler = (event) => {
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
            onChange={(e) => changeHandler(e)}
          />
          <InputGroup.Prepend>
            <InputGroup.Text>Style</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Quantity" name="quantity" onChange={(e) => changeHandler(e)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={saveIngredient}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

const IngredientView = (props) => {
  const { quantity, name, type } = props;
  return (
    <Row>
      <Col>{quantity}</Col>

      <Col>{name}</Col>
      <Col>{type}</Col>
      <Col />
      <Col />
      <Col />
      <Col />
    </Row>
  );
};
