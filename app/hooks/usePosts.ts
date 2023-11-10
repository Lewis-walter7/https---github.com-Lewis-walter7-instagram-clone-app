import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function usePosts(){
    const { data, isLoading, error, mutate} = useSWR("/api/post", fetcher)
    return {
        data, isLoading, mutate,error
    }
}