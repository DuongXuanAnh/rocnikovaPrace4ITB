import * as generalTypes from './../utils/generalTypes';

const initialState: generalTypes.Reducer = {
    user: undefined,
    test: undefined,
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
        
        default: return state;
    }
}

