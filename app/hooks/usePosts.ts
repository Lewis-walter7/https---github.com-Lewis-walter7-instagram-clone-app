import useSWR from "swr";
import fetcher from "../lib/fetcher";

const usePosts = () =>{
    const { data, isLoading, error, mutate} = useSWR("/api/post", fetcher)
    return {
        data, isLoading, mutate,error
    }
}

export default usePosts;