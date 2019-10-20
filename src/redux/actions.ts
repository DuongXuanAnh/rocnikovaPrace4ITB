import * as types from '../utils/generalTypes';

export function login(user: types.User)  {
	return {
		type: "LOGIN",
		value: user
	}
}