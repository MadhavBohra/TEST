import axios from 'axios';
import { Dispatch } from 'redux';

interface FormData {
  username: string;
  profilePicture: File | null;
  address: string;
  bloodGroup: string;
  height: string;
  weight: string;
  email: string;
  phone: string;
}

interface UpdateUserSuccessAction {
  type: 'UPDATE_USER_SUCCESS';
  payload: any; // Replace `any` with the appropriate type for your response data
}

interface UpdateUserFailureAction {
  type: 'UPDATE_USER_FAILURE';
  error: string;
}

export const updateUserDetails = (formData: FormData) => {
  return async (dispatch: Dispatch<UpdateUserSuccessAction | UpdateUserFailureAction>) => {
    try {
      // Example Axios request (replace with actual backend API call)
      const response = await axios.post('/api/updateUser', formData);

      // Dispatch an action to update Redux state (if needed)
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
    } catch (error: any) {
      dispatch({ type: 'UPDATE_USER_FAILURE', error: error.message });
    }
  };
};
