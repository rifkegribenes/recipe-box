import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import defaultRecipes from './DefaultRecipes';


class RecipeIndex extends Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem('recipes')) || defaultRecipes,
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
    const init = JSON.parse(localStorage.getItem('recipes')) || defaultRecipes;
    this.setState({ recipes: init });
  }

  componentDidUpdate() {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  componentWillUnmount() {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  onDelete(key) {
    const recipes = { ...this.state.recipes };
    delete recipes[key];
    this.setState(prevState => ({ ...prevState, msg: true, modalOpen: false, recipes }));
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
      recipes: defaultRecipes,
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
    const recipesArr = this.state.recipes ? Object.values(this.state.recipes).map(recipe => (
      <tr key={recipe.key} className="recipeInd__row" >
        <td className="recipeInd__cell recipeInd__title">
          <Link to={`/recipes/${recipe.key}`}>
            {recipe.title}
          </Link>
        </td>
        <td className="recipeInd__cell recipeInd__categories">
          {recipe.categories}
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
      </tr>)) : [];

    return (
      <div className="recipeInd__container">
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
                  <span className="modal__times" aria-hidden="true">&times;</span>
                </button>
                <h2 className="modal__title" id="modalTitle">Confirm Delete</h2>
              </div>
              <div className="modal__body">
                <p>Delete this recipe?</p>
              </div>
              <div className="modal__footer">
                <button
                  type="button"
                  onClick={this.closeModal}
                  className="modal__button modal__close--btn"
                  data-dismiss="modal"
                ><span>Cancel</span></button>
                <button
                  type="button"
                  onClick={() => this.onDelete(this.state.deleteKey)}
                  className="modal__button modal__confirm"
                  data-dismiss="modal"
                ><span>Delete</span></button>
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
                <th className="recipeInd__tableHead">Edit</th>
                <th className="recipeInd__tableHead">Delete</th>
              </tr>
            </thead>
            <tbody>
              {!recipesArr.length ?
                <tr className="recipeInd__row"><td className="recipeInd__cell" colSpan={4}>No Recipes</td></tr> :
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
