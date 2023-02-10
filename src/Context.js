// context(warehouse)
// Provider(Delivery)
// consumer/(useContext(Self))
import React, { useContext, useEffect, useState } from "react";

export const API_URL=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// we need to create a provider fun
const AppProvider = ({children})=>{

    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false", msg:""});
    const [query, setQuery] = useState("titanic");
    const [timerOut, setTimeOut] = useState();


    const getMovies= async(url)=>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setIsError({
                    show:false,
                    msg: null,
                });
                setMovie(data.Search);
            }else{
                setIsError({
                    show:true,
                    msg: data.Error,
                });

            }
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
