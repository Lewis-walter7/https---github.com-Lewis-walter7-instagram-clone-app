import fetcher from "../lib/fetcher";
import useSWR from 'swr'

export default function usePost(postId: string){
    const { data, isLoading, error, mutate} = useSWR(`/api/post/${postId}`, fetcher)

    return {
        data, isLoading, error,mutate
    }
}