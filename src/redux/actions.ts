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

export const vysledekTestu = (vysledekTestu: types.VysledekTestu[]) => {
	return {
		type: 'VYSLEDEK_TESTU',
		value: vysledekTestu
	}
}

export const procentUspechuTestu = (procentUspechuTestu: number) => {
	return {
		type: 'PROCENT_TESTU',
		value: procentUspechuTestu
	}
}
