import * as generalTypes from './../utils/generalTypes';

const initialState: generalTypes.Reducer = {
    user: undefined,
    test: undefined,
    vysledekTestu: [],
    procentUspechuTestu: 0,
    procentUspechuKvizu: 0,
    odpovedNaKviz: []
};

export default (state = initialState, payload: { type: string, value: any }) => {
    switch (payload.type) {
  
        case 'LOGIN':{
            return {
                ...state,
                user: payload.value
            };
        };

        case 'CREATE_TEST':{
            return {
                ...state,
                test: payload.value
            };
        };

        case 'VYSLEDEK_TESTU' : {
            return {
                ...state,
                vysledekTestu: payload.value
            };
        }

        case 'PROCENT_TESTU' : {
            return {
                ...state,
                procentUspechuTestu: payload.value
            };
        }

        case 'PROCENT_KVIZU' : {
            return {
                ...state,
                procentUspechuKvizu: payload.value
            };
        }

        case 'ODPOVED_NA_KVIZ' : {
            return {
                ...state,
                odpovedNaKviz: payload.value
            };
        }

        
        default: return state;
    }
}

