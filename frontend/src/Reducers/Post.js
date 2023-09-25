import { createReducer, createAction } from "@reduxjs/toolkit";

const likeRequest = createAction('likeRequest')
const likeSuccess = createAction('likeSuccess')
const likeFailure = createAction('likeFailure')
const addCommentRequest = createAction('addCommentRequest')
const addCommentSuccess = createAction('addCommentSuccess')
const addCommentFailure = createAction('addCommentFailure')
const delCommentRequest = createAction('delCommentRequest')
const delCommentSuccess = createAction('delCommentSuccess')
const delCommentFailure = createAction('delCommentFailure')
const followUserRequest = createAction('followUserRequest')
const followUserSuccess = createAction('followUserSuccess')
const followUserFailure = createAction('followUserFailure')
const newPostRequest = createAction('newPostRequest')
const newPostSuccess = createAction('newPostSuccess')
const newPostFailure = createAction('newPostFailure')
const delPostRequest = createAction('delPostRequest')
const delPostSuccess = createAction('delPostSuccess')
const delPostFailure = createAction('delPostFailure')
const updateProfileRequest = createAction('updateProfileRequest')
const updateProfileSuccess = createAction('updateProfileSuccess')
const updateProfileFailure = createAction('updateProfileFailure')
const changePasswordRequest = createAction('changePasswordRequest')
const changePasswordSuccess = createAction('changePasswordSuccess')
const changePasswordFailure = createAction('changePasswordFailure')
const delProfileRequest = createAction('delProfileRequest')
const delProfileSuccess = createAction('delProfileSuccess')
const delProfileFailure = createAction('delProfileFailure')
const forgotPasswordRequest = createAction('forgotPasswordRequest')
const forgotPasswordSuccess = createAction('forgotPasswordSuccess')
const forgotPasswordFailure = createAction('forgotPasswordFailure')
const resetPasswordRequest = createAction('resetPasswordRequest')
const resetPasswordSuccess = createAction('resetPasswordSuccess')
const resetPasswordFailure = createAction('resetPasswordFailure')
const updateCaptionRequest = createAction('updateCaptionRequest')
const updateCaptionSuccess = createAction('updateCaptionSuccess')
const updateCaptionFailure = createAction('updateCaptionFailure')
const myPostsRequest = createAction('myPostsRequest')
const myPostsSuccess = createAction('myPostsSuccess')
const myPostsFailure = createAction('myPostsFailure')
const userPostsRequest = createAction('userPostsRequest')
const userPostsSuccess = createAction('userPostsSuccess')
const userPostsFailure = createAction('userPostsFailure')
const clearError = createAction('clearError')
const clearMsg = createAction('clearMsg')

const initialState = {}

export const likeReducer = createReducer(initialState,builder=> {
    builder.addCase(likeRequest, state => {
        state.loading = true
    })
    builder.addCase(likeSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(likeFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(addCommentRequest, state => {
        state.loading = true
    })
    builder.addCase(addCommentSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(addCommentFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delCommentRequest, state => {
        state.loading = true
    })
    builder.addCase(delCommentSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delCommentFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(followUserRequest, state => {
        state.loading = true
    })
    builder.addCase(followUserSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(followUserFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(newPostRequest, state => {
        state.loading = true
    })
    builder.addCase(newPostSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(newPostFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delPostRequest, state => {
        state.loading = true
    })
    builder.addCase(delPostSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delPostFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(updateProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(updateProfileSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(updateProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(changePasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(changePasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(changePasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(delProfileRequest, state => {
        state.loading = true
    })
    builder.addCase(delProfileSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(delProfileFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(forgotPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(forgotPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(forgotPasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(resetPasswordRequest, state => {
        state.loading = true
    })
    builder.addCase(resetPasswordSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(resetPasswordFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(updateCaptionRequest, state => {
        state.loading = true
    })
    builder.addCase(updateCaptionSuccess, (state, action) => {
        state.loading = false
        state.msg = action.payload
    })
    builder.addCase(updateCaptionFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})

export const myPostsReducer = createReducer(initialState,builder=> {
    builder.addCase(myPostsRequest, state => {
        state.loading = true
    })
    builder.addCase(myPostsSuccess, (state, action) => {
        state.loading = false
        state.posts = action.payload
    })
    builder.addCase(myPostsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})

export const userPostsReducer = createReducer(initialState,builder=> {
    builder.addCase(userPostsRequest, state => {
        state.loading = true
    })
    builder.addCase(userPostsSuccess, (state, action) => {
        state.loading = false
        state.posts = action.payload
    })
    builder.addCase(userPostsFailure, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
    builder.addCase(clearError, state => {
        state.error = null
    })
    builder.addCase(clearMsg, state => {
        state.msg = null
    })
})
