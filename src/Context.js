// context(warehouse)
// Provider(Delivery)
// consumer/(useContext(Self))
import React, { useContext, useEffect, useState } from "react";

export const API_URL=`http://www.omdbapi.com/?apikey=52f05978`;

const AppContext = React.createContext();

// we need to create a provider fun
const AppProvider = ({children})=>{

    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false", msg:""});
    const [query, setQuery] = useState("titanic");
    const [, setTimeOut] = useState();


    const getMovies= async(url)=>{
        setIsLoading(true);
        try{
            fetch(url).then(r=> r.json()).then((res)=>{setIsLoading(false);
                setIsError({
                    show:false,
                    msg: null,
                });
                setMovie(res.Search);}).catch((error)=>(console.log(error)))
            // const res = await fetch(url);
            // const data = await res.json();
            // console.log(data);
            // if(data.Response === "True"){
                
            // }else{
            //     setIsError({
            //         show:true,
            //         msg: data.Error,
            //     });

            // }
        } catch(error){
            console.log(error);
        }
    };

    
    useEffect(()=>{
    let timerOut = setTimeOut(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },800);

        return ()=> clearTimeout(timerOut);
    },[query]);
        

    return(
         <AppContext.Provider value={{movie,isLoading,isError,query,setQuery}}>
        {children}
    </AppContext.Provider>
    );
};

// Global Custom Hook

const useGlobalContext=()=>{
    return useContext(AppContext);
};

export {AppContext, AppProvider,useGlobalContext};

