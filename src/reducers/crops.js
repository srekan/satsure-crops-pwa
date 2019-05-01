import { RECEIVE_DATA, SET_REGION } from '../actions/crops'

export default function crops(state = {}, action) {
    let nextState = state
    switch (action.type) {
        case RECEIVE_DATA:
            nextState = Object.assign({}, nextState, { user: action.user });
            nextState = Object.assign({}, nextState, { region: action.user.Regions[1] });
            break;
        case SET_REGION:
            nextState = Object.assign({}, nextState, { region: action.region });
            break;

    }
    return nextState
}