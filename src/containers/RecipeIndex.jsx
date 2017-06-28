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
        title: 'Almost Flourless Chocolate Cake',
        ingredients: ['7 oz. dark chocolate, roughly chopped', '7 oz. unsalted butter', '1 1/3 cup (250 grams) granulated sugar', '5 large eggs', '1 TB flour'],
        instructions: ['Preheat oven to 375° F, and butter an 8-inch round cake pan. Line the base of the pan with parchment, and butter the parchment too.', 'Set a bowl above a pot of simmering water, to create a double boiler. Place the chocolate and butter in the bowl, and let melt, stirring occasionally. When melted, stir in the chocolate, and set aside to cool for a few minutes. Then add the eggs, one by one, stirring well after each addition, and then add the flour.', 'Pour batter into the buttered cake pan and bake for 20-25 minutes, or until most of the cake is somewhat set, and only the center jiggles. Remove to a rack, and let cool.', 'To serve, run a knife along the edge, turn upside-down onto a plate, peel the paper off the bottom, then flip right side up onto another plate.'],
        categories: ['Desserts'],
        key: '1',
      },
      2: {
        title: 'Enchiladas',
        ingredients: ['20-24 corn tortillas', '1 lb red chiles', '16 oz Monterey Jack and/or Cheddar cheese', '1 white onion', '1 clove garlic', 'Salt to taste', 'Oil for frying', 'Avocado slices and cilantro for garnish'],
        instructions: ['Preheat oven to 350° F. Soak dried chiles in hot water.', 'When chiles are soft, pull off stems and rinse out seeds. Reserve soaking water.', 'Put chiles in blender with enough soaking water to cover. Puree.', 'Push pureed chiles through wire strainer into medium saucepan.', 'Add pressed or minced garlic clove and salt to taste.', 'Cook over low heat for 10-15 minutes.', 'Mince onion, grate cheese.', 'Heat oil in cast iron skillet to 350°.', 'Fry tortillas in oil until just pliable, not crisp.', 'Dip each tortilla in sauce to coat, roll around cheese and minced onions, and lay in baking pan.', 'Pour remaining sauce and cheese over top.', 'Cover with aluminum foil.', 'Bake 20 minutes or until cheese is melted.', 'Garnish with avocado slices and cilantro.',],
        categories: ['entrees'],
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
        title: 'Almost Flourless Chocolate Cake',
        ingredients: ['7 oz. dark chocolate, roughly chopped', '7 oz. unsalted butter', '1 1/3 cup (250 grams) granulated sugar', '5 large eggs', '1 TB flour'],
        instructions: ['Preheat oven to 375° F, and butter an 8-inch round cake pan. Line the base of the pan with parchment, and butter the parchment too.', 'Set a bowl above a pot of simmering water, to create a double boiler. Place the chocolate and butter in the bowl, and let melt, stirring occasionally. When melted, stir in the chocolate, and set aside to cool for a few minutes. Then add the eggs, one by one, stirring well after each addition, and then add the flour.', 'Pour batter into the buttered cake pan and bake for 20-25 minutes, or until most of the cake is somewhat set, and only the center jiggles. Remove to a rack, and let cool.', 'To serve, run a knife along the edge, turn upside-down onto a plate, peel the paper off the bottom, then flip right side up onto another plate.'],
        categories: ['Desserts'],
        key: '1',
      },
      2: {
        title: 'Enchiladas',
        ingredients: ['20-24 corn tortillas', '1 lb red chiles', '16 oz Monterey Jack and/or Cheddar cheese', '1 white onion', '1 clove garlic', 'Salt to taste', 'Oil for frying', 'Avocado slices and cilantro for garnish'],
        instructions: ['Preheat oven to 350° F. Soak dried chiles in hot water.', 'When chiles are soft, pull off stems and rinse out seeds. Reserve soaking water.', 'Put chiles in blender with enough soaking water to cover. Puree.', 'Push pureed chiles through wire strainer into medium saucepan.', 'Add pressed or minced garlic clove and salt to taste.', 'Cook over low heat for 10-15 minutes.', 'Mince onion, grate cheese.', 'Heat oil in cast iron skillet to 350°.', 'Fry tortillas in oil until just pliable, not crisp.', 'Dip each tortilla in sauce to coat, roll around cheese and minced onions, and lay in baking pan.', 'Pour remaining sauce and cheese over top.', 'Cover with aluminum foil.', 'Bake 20 minutes or until cheese is melted.', 'Garnish with avocado slices and cilantro.',],
        categories: ['Entrees'],
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