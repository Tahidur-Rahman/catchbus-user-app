import apiSlice from "../apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMe: builder.query({
            query: token => ({
                method: "GET",
                url: "/users/me",
                headers: {
                    authorization: `Bearer ${token}`
                },
            }),
        }),
        signIn: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/users/login",
                body: data,
            }),
        }),
        signUp: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/users/register",
                body: data,
            }),
        }),
        updateProfile: builder.mutation({
            query: ({ token: authToken, ...others }) => ({
                method: "POST",
                url: "/users/updateProfile",
                body: others,
                headers: {
                    authorization: `Bearer ${authToken}`
                },
            }),
        })
    }),
});

export const {
    useGetMeQuery,
    useSignInMutation,
    useSignUpMutation,
    useUpdateProfileMutation,
} = authApi;