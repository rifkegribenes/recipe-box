import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


class RecipeIndex extends Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem('recipes')) || {},            
      msg: false,
      modalOpen: false,
      deleteKey: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    if (!this.state.recipes) {
      const defaultRecipes =  {
      1: {
        title: 'chocolate cake',
        ingredients: ['chocolate', 'butter', 'eggs', 'sugar', 'flour'],
        instructions: ['mix', 'bake'],
        categories: ['desserts'],
        key: '1',
      },
      2: {
        title: 'enchiladas',
        ingredients: ['corn tortillas', 'cheese', 'red chiles'],
        instructions: ['make sauce', 'shred cheese', 'fry tortillas', 'assemble', 'bake'],
        categories: ['entrees'],
        tags: ['mexican'],
        key: '2',
      },
      };
      this.setState({
        recipes: defaultRecipes,
      });
    } else {
      const cachedRecipes = JSON.parse(localStorage.getItem('recipes'));
      this.setState({
        recipes: cachedRecipes,
      });

    }
  }

  componentWillUnmount() {
  	localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  onDelete(key) {
    let recipes = {...this.state.recipes};
    delete recipes[key];
  this.setState(prevState => {
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

  onReset() {
  	localStorage.clear();
  	this.setState({
      recipes: {
      1: {
        title: 'chocolate cake',
        ingredients: ['chocolate', 'eggs', 'flour'],
        instructions: ['mix', 'bake'],
        categories: ['desserts'],
        key: '1',
      },
      2: {
        title: 'enchiladas',
        ingredients: ['corn tortillas', 'cheese', 'red chiles'],
        instructions: ['make sauce', 'shred cheese', 'fry tortillas', 'assemble', 'bake'],
        categories: ['entrees'],
        tags: ['mexican'],
        key: '2',
      },
    },
      msg: false,
      modalOpen: false,
      deleteKey: null,
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal(key) {
    this.setState({ modalOpen: true, deleteKey: key });
  }



render() {
  let recipesArr = Object.values(this.state.recipes).map(recipe => (
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
      <button onClick={() => this.onReset()}>Reset</button>
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
            {!recipesArr.length ? 
            <tr className="recipeInd__row"><td className="recipeInd__cell" colSpan={5}>No Recipes</td></tr> :
              recipesArr.reverse()

            }
            </tbody>
          </table>
      </div>
      </div>
      
    );
}
}

export default RecipeIndex;