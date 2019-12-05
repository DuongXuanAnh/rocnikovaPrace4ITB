import * as types from '../utils/generalTypes';

export function login(user: types.User)  {
	return {
		type: "LOGIN",
		value: user
	}
}

export const createTest = (test: types.Test) => {
	return {
		type: 'CREATE_TEST',
		value: test
	}
}