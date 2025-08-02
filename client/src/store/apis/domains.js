import toast from 'react-hot-toast';
import apiSlice from './index.js'; 


const domainApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAllDomains : builder.query({
            query : () => ({
                url : '/domains'
            }),
            transformResponse : (response) => {
                return response?.data || [];
            },
            providesTags : ['Domains']
        }),
        addDomain : builder.mutation({
            query : (domain) => ({
                url : '/domains/add-domain',
                method : 'POST',
                body : domain
            }),
            invalidatesTags: ['Domains'],
            async onQueryStarted(domain, { dispatch, queryFulfilled }) {
                const action = dispatch(apiSlice.util.updateQueryData('getAllDomains', undefined, (draft) => {
                    draft.push({
                        ...domain, 
                        sslEnabled: false,
                        verified: false,
                        dnsVerifyToken: 'loading...',
                        _id: Math.random().toString(36).substring(2, 15)
                    });
                }))

                const toastId = toast.loading('Adding domain...');
                try {
                    await queryFulfilled;
                    toast.success('Domain added successfully');
                } catch (error) {
                    action.undo();
                    console.log(error.error.data.message);
                    toast.error(error?.error?.data?.message || 'Failed to add domain');
                }
                finally{
                    toast.dismiss(toastId);
                }
            },
        }),
        verifyDomain : builder.mutation({
            query : (domain) => {
                return ({
                url : `/domains/verify-domain?domain=${domain}`,
                method : 'GET'
                })
            },
            invalidatesTags: ['Domains'],
            async onQueryStarted(domain, { queryFulfilled }) {
                const toastId = toast.loading('Verifying domain...');
                try {
                    const { data } = await queryFulfilled;
                    toast.success(data?.message || 'Domain verified successfully');
                } catch (error) {
                    toast.error(error?.error?.data?.message || 'Failed to verify domain');
                } finally {
                    toast.dismiss(toastId);
                }
            },
        }),
        issueSSL : builder.mutation({
            query : (domain) => ({
                url : `/domains/issue-ssl-certificate`,
                method : 'POST',
                body : domain
            }),
            invalidatesTags: ['Domains'],
            async onQueryStarted(domain, { queryFulfilled }) {
                const toastId = toast.loading('Issuing SSL...');
                try {
                    const { data } = await queryFulfilled;
                    toast.success(data?.message || 'SSL issued successfully');
                } catch (error) {
                    toast.error(error?.error?.data?.message || 'Failed to issue SSL');
                } finally {
                    toast.dismiss(toastId);
                }
            },
        }),
    })
});






export const { useGetAllDomainsQuery, useAddDomainMutation, useVerifyDomainMutation, useIssueSSLMutation } = domainApiSlice;
export default domainApiSlice;