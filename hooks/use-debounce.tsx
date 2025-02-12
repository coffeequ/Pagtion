import Document from "next/document";
import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number){
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }

    }, [value, delay]);
    
    return debounceValue;
}