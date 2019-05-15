const initialState = {
  activeMarker: {},
  selectedPlace: {},
  infoWindowVisible: false,
  breweries: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'GET_BREWERIES':
    return {
      ...state,
      breweries: action.payload
    }
    case 'SELECT_MARKER':
    return {
      ...state,
      activeMarker: action.marker,
      selectedPlace: action.props,
      infoWindowVisible: true
    }
    default:
    return state
  }
}

export default reducer
