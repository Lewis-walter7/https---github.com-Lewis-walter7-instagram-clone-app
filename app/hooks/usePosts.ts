import fetcher from "../lib/fetcher";
import useSWR from 'swr'

const usePosts = () =>{
    const { data, isLoading, error, mutate } = useSWR('/api/post', fetcher)
    return {
        data, isLoading, mutate, error
    }
}

export default usePosts;