import { configureStore } from '@reduxjs/toolkit'
import phytolexSlise from './reducers/appReducer';

export default configureStore({
  reducer: {
      phytolex: phytolexSlise,
  }
});