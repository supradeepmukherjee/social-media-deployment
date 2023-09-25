import { createReducer, createAction } from "@reduxjs/toolkit";

const loginRequest = createAction('loginRequest')
const loginSuccess = createAction('loginSuccess')
const loginFailure = createAction('loginFailure')
const registerRequest = createAction('registerRequest')
const registerSuccess = createAction('registerSuccess')
const registerFailure = createAction('registerFailure')
const loadUserRequest = createAction('loadUserRequest')
const loadUserSuccess = createAction('loadUserSuccess')
const loadUserFailure = createAction('loadUserFailure')
const logoutUserRequest = createAction('logoutUserRequest')
const logoutUserSuccess = createAction('logoutUserSuccess')
const logoutUserFailure = createAction('logoutUserFailure')
const allUsersRequest = createAction('allUsersRequest')
const allUsersSuccess = createAction('allUsersSuccess')
const allUsersFailure = createAction('allUsersFailure')
const userProfileRequest = createAction('userProfileRequest')
const userProfileSuccess = createAction('userProfileSuccess')
const userProfileFailure = createAction('userProfileFailure')
const postOfFollowingRequest = createAction('postOfFollowingRequest')
const postOfFollowingSuccess = createAction('postOfFollowingSuccess')
const postOfFollowingFailure = createAction('postOfFollowingFailure')
const clearError = createAction('clearError')

const initialState = { isAuthenticated: false }

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(loginRequest, state => {
        state.loading = true
    })
    builder.addCase(loginSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loginFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(registerRequest, state => {
        state.loading = true
    })
    builder.addCase(registerSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(registerFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(loadUserRequest, state => {
        state.loading = true
    })
    builder.addCase(loadUserSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(loadUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    })
    builder.addCase(logoutUserRequest, state => {
        state.loading = true
    })
    builder.addCase(logoutUserSuccess, state => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    })
    builder.addCase(logoutUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const allUsersReducer = createReducer(initialState, builder => {
    builder.addCase(allUsersRequest, state => {
        state.loading = true
    })
    builder.addCase(allUsersSuccess, (state, action) => {
        state.loading = false
        state.users = action.payload
    })
    builder.addCase(allUsersFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const userProfileReducer = createReducer(initialState, builder => {
    builder.addCase(userProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(userProfileSuccess, (state, action) => {
        state.loading = false
        state.user = action.payload
    })
    builder.addCase(userProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})

export const postOfFollowingReducer = createReducer(initialState, builder => {
    builder.addCase(postOfFollowingRequest, state => {
        state.loading = true
    })
    builder.addCase(postOfFollowingSuccess, (state, action) => {
        state.loading = false
        state.posts = action.payload
    })
    builder.addCase(postOfFollowingFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
})