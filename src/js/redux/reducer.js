import { createStore } from 'redux'


// Store
const store = createStore(reducer);

export {store};

// Reducer
function reducer(state = {}, action) {
    let newState = state;
    switch (action.type) {
        case 'SUBMIT':
            return action.data;
        case 'WEATHER':
            return action.newState;
        case 'GETFULLSITE' :
            return action;
        case 'GETPATHSITE':
            return action;
        case 'LOGINSUCCESS':
            return action.data;
        case 'LOGINERROR':
            return action.data;
        case 'MSGERROR':
            return action.data;
        case 'STORAGESUCCESS':
            return action;
        case 'STORAGEERROR':
            newState.storage = action.data;
            return newState;
        case 'DELETEITEM':
            return action.data;
        case 'UPDATESHOWFORM':
            return action
        case 'CONFIRM':
            return action
        default:
            return state
    }
}