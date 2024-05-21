import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/user` }),
    tagTypes: ['user', 'post'],
    endpoints: ({ mutation, query }) => ({
        getUser: query({
            query: () => ({
                url: '/myProfile',
                credentials: 'include'
            }),
            providesTags: ['user']
        }),
        getUserProfile: query({
            query: id => ({
                url: `/profile/${id}`,
                credentials: 'include'
            }),
        }),
        updateProfile: mutation({
            query: data => ({
                url: `/update/profile`,
                method: `PUT`,
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        follow: mutation({
            query: id => ({
                url: `/follow/${id}`,
                method: `PUT`,
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        changePassword: mutation({
            query: ({ old, newP }) => ({
                url: `/update/password`,
                method: `PUT`,
                body: { old, newP },
                credentials: 'include'
            }),
            invalidatesTags: ['user']
        }),
        forgotPassword: mutation({
            query: email => ({
                url: `/forgotpassword`,
                method: `POST`,
                body: { email },
                credentials: 'include'
            }),
        }),
        resetPassword: mutation({
            query: ({ token, password }) => ({
                url: `/resetpassword/${token}`,
                method: `PUT`,
                body: { password },
                credentials: 'include'
            }),
        }),
        delProfile: mutation({
            query: () => ({
                url: `/del`,
                method: `DELETE`,
                credentials: 'include'
            }),
        }),
        allUsers: query({
            query: name => ({
                url: `/all?name=${name}`,
                credentials: 'include'
            }),
        }),
        myPosts: query({
            query: () => ({
                url: `/my-posts`,
                credentials: 'include'
            }),
            providesTags: ['post']
        }),
        userPosts: query({
            query: id => ({
                url: `/user-posts/${id}`,
                credentials: 'include'
            }),
        }),
        upload: mutation({
            query: data => ({
                url: `/upload`,
                method: `POST`,
                body: data,//file
                credentials: 'include'
            }),
            invalidatesTags: ['post']
        }),
        updateCaption: mutation({
            query: ({ id, caption }) => ({
                url: `/update-caption/${id}`,
                method: `PUT`,
                body: { caption },
                credentials: 'include'
            }),
            invalidatesTags: ['post']
        }),
    })
})

export default api
export const { useAllUsersQuery, useLazyAllUsersQuery, useChangePasswordMutation, useForgotPasswordMutation, useGetUserProfileQuery, useLazyGetUserProfileQuery, useGetUserQuery,  useResetPasswordMutation, useUpdateProfileMutation, useLazyGetUserQuery, useFollowMutation, useDelProfileMutation, useMyPostsQuery, useLazyMyPostsQuery, useUserPostsQuery, useUploadMutation, useUpdateCaptionMutation } = api