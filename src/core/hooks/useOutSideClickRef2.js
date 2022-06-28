import {useEffect} from "react";

export function useOutsideRef2(ref,targetId= "") {
    useEffect(() => {
        function handleClickOutside(event) {
            //console.log('event',event.target.id)
            if (ref.current && !ref.current.contains(event.target) ) {
                if(targetId && targetId===event.target.id){

                    if(ref.current.classList.contains("active")){
                        ref.current.classList.remove("active");
                    }else{
                        ref.current.classList.add("active");
                    }
                }else{
                    if(ref.current.classList.contains("active")){
                        ref.current.classList.remove("active");
                    }
                }
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
