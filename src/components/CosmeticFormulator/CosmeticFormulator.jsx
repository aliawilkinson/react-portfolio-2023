import React, { useState } from 'react';
import css from './CosmeticFormulator.module.scss';

const CosmeticFormulator = () => {
  const [ingredients, setIngredients] = useState([{ name: '', percentage: '' }]);
  const [batchSize, setBatchSize] = useState('');

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', percentage: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleInputChange = (index, event) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [event.target.name]: event.target.value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const calculateAmounts = () => {
    return ingredients.map(ingredient => ({
      ...ingredient,
      amount: (batchSize * ingredient.percentage) / 100
    }));
  };

  return (
    <div>
      <h1>Cosmetic Formulator</h1>
      <input
        type="number"
        placeholder="Batch Size (oz or ml)"
        value={batchSize}
        onChange={(e) => setBatchSize(e.target.value)}
      />
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="number"
            name="percentage"
            placeholder="Percentage"
            value={ingredient.percentage}
            onChange={(e) => handleInputChange(index, e)}
          />
          <button onClick={() => handleRemoveIngredient(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <div>
        <h2>Calculated Amounts</h2>
        {calculateAmounts().map((ingredient, index) => (
          <div key={index}>
            {ingredient.name}: {ingredient.amount} (oz or ml)
          </div>
        ))}
      </div>
    </div>
  );
};

export default CosmeticFormulator;