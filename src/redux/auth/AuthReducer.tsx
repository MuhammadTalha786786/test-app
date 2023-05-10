import { createSlice, configureStore } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'userAuth',
    initialState: {
        isLoggedIn: false,
        email: null,
        name: null,
        uid: null,
        time:null,
        images:[]

    },
    reducers: {
        setSignIn: (state, action) => {
            state.email = action.payload.email;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.name = action.payload.name;
            state.uid = action.payload.uid;
            state.time = action.payload.time;


        },
        setSignOut: (state) => {
            state.email = null;
            state.name = null;
            state.isLoggedIn = false;
            state.uid = null;
            state.time=null;
           
        },

        setDataImages:(state, action)=>{
            state.images = action.payload.images

        }
    }
})

export const { setSignIn, setSignOut, setDataImages } = AuthSlice.actions;

export const selectIsLoggedIn = (state:any) => state.userAuth.isLoggedIn;
export const selectEmail = (state:any) => state.userAuth.email;
export const selectUserName = (state:any) => state.userAuth.userName;
export const selectUid = (state:any) => state.userAuth.uid;

export default AuthSlice.reducer;

// Can still subscribe to the store
