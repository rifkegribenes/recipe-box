import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class RecipeIndex extends Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem('recipes')) || {},
      recipesArr: Object.values(JSON.parse(localStorage.getItem('recipes'))) || [],
      msg: false,
      currentKey: '',
      modalOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
  }

  componentDidMount() {
  }

  onDelete(key) {
    let recipesArr = this.state.recipesArr;
    let index = recipes.indexOf(key);
    recipesArr.splice(index, 1);
    console.dir(recipesArr);
  this.setState(prevState => {
    let recipes = recipesArr.map(recipe => {
        console.log(recipe);
      });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return {
    msg: true,
    modalOpen: false,
    recipes,
    };
   });
      setTimeout(() => {
        this.setState({
          msg: false,
          deleteKey: null,
        });
      }, 2000);
  }

  onDeleteAll() {
  	localStorage.clear();
  	this.state = {
      recipes: {},
    };
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal(key) {
    this.setState({ modalOpen: true, deleteKey: key });
  }



render() {
  let recipesArr = this.state.recipesArr.map(recipe => (
        <tr key={recipe.key} className="recipeInd__row" >
          <td className="recipeInd__cell recipeInd__title">
            <Link to={`/recipes/${recipe.key}`}>
              {recipe.title}
            </Link>
          </td>
          <td className="recipeInd__cell recipeInd__categories">
            {recipe.categories}
          </td>
          <td className="recipeInd__cell recipeInd__tags">
            {recipe.tags}
          </td>
          <td className="recipeInd__cell recipeInd__icon-container">
            <Link
              to={`/edit/${recipe.key}`}
              className=""
            >
              <div className="recipeInd__icon recipeInd__icon--edit" />
            </Link>
          </td>
          <td className="recipeInd__cell recipeInd__icon-container">
            <button
              className="recipeInd__icon recipeInd__icon--delete"
              onClick={() => this.openModal(recipe.key)}
            />
          </td>
        </tr>)); 

    return ( 
      <div className="recipeInd__container">
      <button onClick={() => this.onDeleteAll()}>Delete All</button>
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modal"
          contentLabel="Confirm Delete"
        >
          <div className="modal__dialog">
            <div className="modal__content">
              <div className="modal__header">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__close--x"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h2 className="modal__title" id="modalTitle">Confirm Delete</h2>
              </div>
              <div className="modal__body">
                <p>Are you sure you want to delete this recipe?</p>
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__button modal__close--btn"
                  data-dismiss="modal"
                >Cancel</button>
                <button
                  type="button"
                  onClick={() => this.onDelete(this.state.deleteKey)}
                  className="modal__button modal__confirm"
                  data-dismiss="modal"
                >Delete</button>
              </div>
            </div>
          </div>
        </Modal>
        {this.state.msg && <div className="recipeInd__message">The recipe was successfully deleted.</div>}
        <div className="recipeInd__table-cont">
          <table className="recipeInd__grid">
            <thead>
              <tr>
                <th className="recipeInd__tableHead">Title</th>
                <th className="recipeInd__tableHead">Categories</th>
                <th className="recipeInd__tableHead">Tags</th>
                <th className="recipeInd__tableHead">Edit</th>
                <th className="recipeInd__tableHead">Delete</th>
              </tr>
            </thead>
            <tbody>
              {recipesArr.reverse()}
            </tbody>
          </table>
      </div>
      </div>
      
    );
}
}

export default RecipeIndex;