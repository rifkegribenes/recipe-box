import React, { Component } from 'react';
import shortid from 'shortid';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.match.params.key,
      recipes: { ...JSON.parse(localStorage.getItem('recipes')) },
      recipe: {},
    };
  }

  componentWillMount() {
    const key = this.state.key;
    const recipe = this.state.recipes[key];
    this.setState({
      recipe,
    });
  }


  render() {
    const { title, ingredients, instructions, source } = this.state.recipe;
    return (
      <div>
        {!title ?
          <div className="vr__loader">Loading...</div> :
          <div className="vr__container">
            <h2 className="vr__title">{title}</h2>
            {source && <p className="vr__meta">SOURCE: <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a></p> }
            <h3 className="vr__subhead">Ingredients</h3>
            <div className="vr__listcont">
              <ul className="vr__list">{ingredients.map(ingredient => (
                <li className="vr__listItem" key={shortid.generate()}>{ingredient}</li>
					))}</ul>
            </div>
            <h3 className="vr__subhead">Instructions</h3>
            <div className="vr__listcont">
              <ul className="vr__list">{instructions.map((instruction, index) => (
                <li className={`vr__listItem c${index + 1}`} key={shortid.generate()}>{instruction}</li>
					))}</ul>
            </div>
          </div>
				}
      </div>
    );
  }
}

export default ViewRecipe;
