import { useReducer } from "react";
import { Question } from "../generated/graphql";

export const useGameState = (questions: Question[]) => {
	return useReducer(reducer, initialState(questions));
};

export interface State {
	questions: Question[];
	count: number;
	score: number;
}

export interface Actions {
	type: "nextQuestion" | "setState";
	payload?: State;
}

export const initialState = (questions: Question[]): State => {
	return {
		questions,
		count: 0,
		score: 0,
	};
};

const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case "nextQuestion":
			return {
				...state,
				count: (state.count += 1),
				score: (state.score += (state.count + 1) * 50),
			};
		case "setState":
			if (action.payload) return action.payload;
			else return state;
	}
};
