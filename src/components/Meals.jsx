import React, { useEffect, useState } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../Hooks/useHttp.jsx";
import Error from "./UI/Error.jsx";

const requestConfig = {}
function Meals() {
  const {
    data: availableMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",requestConfig);

  if(isLoading){
   return <p className="loading">Loading meals.....</p>
  }

  if(error){
    return <Error title={"Failed to fetch meals"} message={error}/>
  }
  return (
    <ul id="meals">
      {availableMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}

export default Meals;
