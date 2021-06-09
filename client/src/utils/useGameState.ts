import { useReducer } from "react";
import { Question } from "../generated/graphql";
import { isServer } from "./isServer";

export const useGameState = (questions: Question[]) => {
	return useReducer(reducer, initialState(questions));
};

export interface State {
	questions: Question[];
	hints: number;
	count: number;
	sound: string;
	score: number;
}

export interface Actions {
	type: "stopSound" | "playSound" | "nextQuestion" | "useHint" | "setState";
	payload?: State;
}

export const initialState = (questions: Question[]): State => {
	return {
		questions,
		hints: 3,
		count: 0,
		sound: !isServer() ? localStorage.getItem("sound") || "true" : "false",
		score: 0,
	};
};

const reducer = (state: State, action: Actions) => {
	switch (action.type) {
		case "stopSound":
			localStorage.setItem("sound", "false");
			return { ...state, sound: "false" };
		case "playSound":
			localStorage.setItem("sound", "true");
			return { ...state, sound: "true" };
		case "nextQuestion":
			return {
				...state,
				count: (state.count += 1),
				score: (state.score += 50),
			};
		case "useHint":
			return { ...state, hints: (state.hints -= 1) };
		case "setState":
			if (action.payload) return action.payload;
			else return state;
	}
};
