import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';
const initialState = {
	logged: false,
	user: null,
};
const loginAction = {
	type: types.login,
	payload: {
		id: 1,
		name: 'test',
	},
};
const loggedState = {
	logged: true,
	user: loginAction.payload,
};
const logoutAction = {
	type: types.logout,
	payload: {},
};

test('debe retornar el estado inicial', () => {
	const state = authReducer(initialState, {});
	expect(state).toEqual(initialState);
});

test('debe retornar un estado de login', () => {
	const state = authReducer(initialState, loginAction);
	expect(state).toEqual(loggedState);
});

test('debe retornar un estado de logout', () => {
	const state = authReducer(loggedState, logoutAction);
	expect(state).toEqual(initialState);
});
