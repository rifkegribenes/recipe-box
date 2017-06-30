import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditRecipe extends Component {

  static adjustTextArea(target) {
    const el = target;
    let adjustedHeight = el.clientHeight;
    adjustedHeight = Math.max(el.scrollHeight, adjustedHeight);
    if (adjustedHeight > el.clientHeight) { el.style.height = `${adjustedHeight + 20}px`; }
  }

  constructor(props) {
    super(props);
    this.state = {
      key: props.match.params.key,
      recipes: { ...JSON.parse(localStorage.getItem('recipes')) },
      recipe: JSON.parse(localStorage.getItem('recipes'))[props.match.params.key],
      msg: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    EditRecipe.adjustTextArea(this.textInput);
    EditRecipe.adjustTextArea(this.textInput2);
  }

  handleChange({ target }) {
    this.setState({ recipe: { ...this.state.recipe, [target.name]: target.value } });
    EditRecipe.adjustTextArea(target);
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipes = { ...this.state.recipes };
    const key = this.state.key;
    const ingredients = this.state.recipe.ingredientString.split('\n');
    const instructions = this.state.recipe.instructionString.split('\n');
    this.setState(prevState => ({
      recipe: { ...prevState.recipe, ingredients, instructions },
      msg: true,
    }));
    recipes[key] = this.state.recipe;
    this.setState((prevState) => {
      localStorage.setItem('recipes', JSON.stringify(recipes));
      setTimeout(() => {
        this.setState({ ...prevState, msg: false });
        this.props.history.push('/');
      }, 2000);
      return { recipes };
    });
  }

  render() {
    const {
			title,
			ingredientString,
			ingredients,
			instructions,
			instructionString,
			categories,
		} = this.state.recipe;
    const lineLength = window.innerWidth > 920 ? 90 : (window.innerWidth - 100) / 10;
    const ingOverflow = ingredients.filter(ing => ing.length > lineLength);
    const instOverflow = instructions.filter(inst => inst.length > lineLength);
    return (
      <div>
        <h2 className="newRecipe__banner">.:: Update Recipe ::.</h2>
        <div className="newRecipe__container">
          <form className="newRecipe__form">
            {this.state.msg && <div className="recipeInd__message">Your recipe was saved.</div>}
            <input
              className="newRecipe__input c1"
              type="text"
              name="title"
              onChange={e => this.handleChange(e)}
              placeholder="Recipe Title"
              value={title}
            />
            <textarea
              className="newRecipe__input c2 newRecipe__textarea"
              name="ingredientString"
              ref={(input) => { this.textInput = input; }}
              onChange={e => this.handleChange(e)}
              placeholder="List of ingredients, one per line"
              value={ingredientString}
              rows={ingredients.length + ingOverflow.length}
            />
            <textarea
              className="newRecipe__input c3 newRecipe__textarea"
              type="text"
              name="instructionString"
              ref={(input) => { this.textInput2 = input; }}
              onChange={e => this.handleChange(e)}
              placeholder="List of instructions, one per line"
              value={instructionString}
              rows={instructions.length + instOverflow.length}
            />
            <input
              className="newRecipe__input c4"
              type="text"
              name="categories"
              onChange={e => this.handleChange(e)}
              placeholder="List of categories, separated by commas"
              value={categories}
            />
            <div className="newRecipe__buttoncont">
              <button
                className="newRecipe__submit newRecipe__button"
                type="submit"
                onClick={e => this.handleSubmit(e)}
              ><span>Save Recipe</span></button>
              <Link
                to="/"
                className="newRecipe__cancel newRecipe__button"
              ><span>Cancel</span></Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditRecipe;
