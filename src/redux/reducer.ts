import * as generalTypes from './../utils/generalTypes';

const initialState: generalTypes.Reducer = {
    user: undefined
};

export default (state = initialState, payload: { type: string, value: any }) => {
    switch (payload.type) {
  
        case 'LOGIN':{
            return {
                ...state,
                user: payload.value
            };
        };
        
        default: return state;
    }
}

