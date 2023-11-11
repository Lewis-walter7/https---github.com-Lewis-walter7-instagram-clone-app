'use client'

import useSWR from "swr"
import fetcher from "../lib/fetcher"


const useUser = (userId: string) => {
    const {data, isLoading,error, mutate} = useSWR(`/api/user/${userId}`, fetcher)

    return {
        data, isLoading,error,mutate
    }
}

export default useUser