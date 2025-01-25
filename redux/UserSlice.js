import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewBaseURL, axiosInstance, axiosInstanceToken, createAxiosInstance, createAxiosInstanceTwo } from './Instance';
import { stat } from 'react-native-fs';




export const UserLogin = createAsyncThunk('UserLogin',async (payload) => {
    const response = await axiosInstanceToken.post(`/auth/login`,payload);
      return response.data;
  })

  export const CreateUser = createAsyncThunk('CreateUser',async (payload) => {
    const response = await axiosInstance.post(`user_registration`,payload);
      return response.data;
  })


  const AUTH_BASE_URL = 'https://8er51l4g37.execute-api.ap-south-1.amazonaws.com/Tunemate';

export const TM_Add_userName = createAsyncThunk('TM_Add_userName', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.post('/add_username', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});
  
const GetMusicianURL = 'https://32ejd4lkxe.execute-api.ap-south-1.amazonaws.com/Tunemate'

export const GetMusician = createAsyncThunk('GetMusician', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.get('/get_musician', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});
  

const Get_GenreURL = 'https://n3x360dg9k.execute-api.ap-south-1.amazonaws.com/Tunemate'

export const Get_Genre = createAsyncThunk('Get_Genre', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.get('/get_genre', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});
  

const UpdateBioURL = 'https://9exyhjakii.execute-api.ap-south-1.amazonaws.com/Tunemate'

export const UpdateBio = createAsyncThunk('UpdateBio', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.post('/update_userbio', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});
  


const update_SocialMedia_LinkURL = 'https://ctpw1zqi2j.execute-api.ap-south-1.amazonaws.com/Tunemate'

export const update_SocialMedia_Link = createAsyncThunk('UpdateBio', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.post('/update_socialmedia', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});


const updateMusician = "https://kk0dq61s9h.execute-api.ap-south-1.amazonaws.com/Tunemate"
  

export const UpdateMusician = createAsyncThunk('UpdateMusician', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.post('/update_musician', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});

const updateGenra = 'https://s9g38qba7b.execute-api.ap-south-1.amazonaws.com/Tunemate'
  

export const UpdateGenra = createAsyncThunk('UpdateGenra', async (payload, { rejectWithValue }) => {
  try {
    const axiosInstance = await createAxiosInstance(NewBaseURL); // Create instance with base URL
    const response = await axiosInstance.post('/update_genre', payload);
    return response.data; // Return response on success
  } catch (error) {
    // Gracefully handle errors
    if (error.response) {
      return rejectWithValue(error.response.data); // Server-side error
    }
    return rejectWithValue(error.message); // Client-side or network error
  }
});




  const userSlice = createSlice({
    name: 'user',
    initialState: {
      profile: null,
      loading: false,
      error: null,
      signupSuccess: false, 
      userToken:null,
      userCreated:null,
      GetMusicianLists:null,
      Get_GenreLists:null,
      message: '', 
    },
    reducers: {
      resetError: (state) => {
        state.error = null;
      },
      resetSignupState: (state) => {
        state.signupSuccess = false;
        state.message = '';
      },
    },
    extraReducers: (builder) => {
      builder
        // Get user profile
        .addCase(UserLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(UserLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        })
        .addCase(UserLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        //Create

        .addCase(GetMusician.pending,(state,action)=>{
          state.loading =true;
          state.error =action.payload
        })
        .addCase(GetMusician.fulfilled,(state,action)=>{
          state.loading =false;
          state.GetMusicianLists =action.payload
        })
        .addCase(GetMusician.rejected,(state,action)=>{
          state.loading =false;
          state.error =action.payload
        })
        
        .addCase(Get_Genre.pending,(state,action)=>{
          state.loading =true;
          state.error =action.payload
        })
        .addCase(Get_Genre.fulfilled,(state,action)=>{
          state.loading =false;
          state.Get_GenreLists =action.payload
        })
        .addCase(Get_Genre.rejected,(state,action)=>{
          state.loading =false;
          state.error =action.payload
        })
    },
  });
  
  export const { resetError, resetSignupState } = userSlice.actions;
  export default userSlice.reducer;