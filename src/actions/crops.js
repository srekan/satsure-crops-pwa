import userData from '../tempData/userResponse.json'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SET_REGION = 'SET_REGION'
export function getData() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: RECEIVE_DATA,
                user: userData.user,
            })
        }, 50);
    }
}
export function setRegion(region) {
    return {
        type: SET_REGION,
        region,
    }
}