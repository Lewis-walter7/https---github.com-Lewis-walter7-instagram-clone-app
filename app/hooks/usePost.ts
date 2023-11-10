import useSWR from "swr";
import fetcher from "../lib/fetcher";

const usePost = (postId: string) =>{
    const { data, isLoading, error, mutate} = useSWR(`/api/post/${postId}`, fetcher)
    return {
        data, isLoading, mutate,error
    }
}

export default usePost;