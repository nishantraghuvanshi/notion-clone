import { useEffect,useState } from "react";


// origin is the protocol, hostname, and port number of the URL
export const useOrigin = () => {
    const [mounted,setMounted]=useState(false);
    const origin= typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted){
        return null;
    }

    return origin;
}