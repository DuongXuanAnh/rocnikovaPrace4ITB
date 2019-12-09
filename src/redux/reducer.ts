import * as generalTypes from './../utils/generalTypes';

const initialState: generalTypes.Reducer = {
    user: undefined,
    test: undefined,
    vysledekTestu: [],
    procentUspechuTestu: 0
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

        
        default: return state;
    }
}

