const INITIAL_STATE = {
    alldata:[],
    
  };
  
  const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD':
          return { 
              alldata: action.payload,
              
            }
          break;
        default:
        return state
    }
  };

  export default testReducer;