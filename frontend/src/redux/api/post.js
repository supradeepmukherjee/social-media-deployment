import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import server from '../../constant'

const api = createApi({
    reducerPath: 'post',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/post` }),
    endpoints: ({ mutation, query }) => ({
        comment: mutation({
            query: ({ id, comment }) => ({
                url: `/comment/${id}`,
                method: `PUT`,
                body: { comment },
                credentials: 'include'
            }),
        }),
        delComment: mutation({
            query: ({ id, commentID }) => ({
                url: `/comment/${id}`,
                method: `DELETE`,
                body: { commentID },
                credentials: 'include'
            }),
        }),
        getPosts: query({
            query: () => ({
                url: '/posts',
                credentials: 'include'
            }),
        }),
        likeUnlike: mutation({
            query: id => ({
                url: `/post/${id}`,
                method: `PUT`,
                credentials: 'include'
            }),
        }),
        delPost: mutation({
            query: id => ({
                url: `/post/${id}`,
                method: `DELETE`,
                credentials: 'include'
            }),
        }),
    })
})

export default api
export const { useCommentMutation, useDelCommentMutation, useDelPostMutation, useGetPostsQuery, useLikeUnlikeMutation } = api