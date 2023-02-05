import apiSlice from "../apiSlice";

const familyApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFamily: builder.query({
            query: (fd) => `/family/${fd?.trim()}`,
            providesTags: ["Family"]
        }),
        addMember: builder.mutation({
            query: ({ family_id: fd, ...others }) => ({
                method: "POST",
                url: `${!fd ? "/family/addMember" : `/family/addMember?family_id=${fd.trim()}`}`,
                body: others,
            }),
            invalidatesTags: ["Family"]
        }),
        updateMember: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: `/family/member/${data._id}`,
                body: data,
            }),
            invalidatesTags: ["Family"]
        }),
        uploadFile: builder.mutation({
            query: formdata => ({
                method: "POST",
                url: "/family/fileUploader",
                body: formdata,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            }),
        }),
    }),
});

export const {
    useGetFamilyQuery,
    useAddMemberMutation,
    useUpdateMemberMutation,
    useUploadFileMutation,
} = familyApi;