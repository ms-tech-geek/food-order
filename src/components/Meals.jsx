import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestConfig = {
	method: "GET",
};

const Meals = () => {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp({
		url: "http://localhost:3000/meals",
		config: requestConfig,
		initialData: [],
	});

	if (isLoading) {
		return <p>Fetching Meals...</p>;
	}

	if (!loadedMeals) {
		return <p>No meals found...</p>;
	}

	return (
		<ul id="meals">
			{loadedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
};

export default Meals;
