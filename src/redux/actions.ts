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

export const procentUspechuKvizu = (procentUspechuKvizu: number) => {
	return {
		type: 'PROCENT_KVIZU',
		value: procentUspechuKvizu
	}
}

export const odpovedNaKviz = (odpovedNaKviz: any) => {
	return {
		type: 'ODPOVED_NA_KVIZ',
		value: odpovedNaKviz
	}
}

