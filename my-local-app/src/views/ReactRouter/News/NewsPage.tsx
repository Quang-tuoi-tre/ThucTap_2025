import { NewsItem } from "../../../components/NewsItem";
import { useState } from "react";
import React from 'react'

export function NewsPage(){
    
    const [title, setTitle] = useState("Latest News");

    // useEffect(() => {
    //     setTitle("Breaking News: Major Event Happening Now!");

    // },[title]);
       const handleClick = () => {
        setTitle(prevTitle => 
            prevTitle === "Latest News" 
            ? "Breaking News: Major Event Happening Now!" 
            : "Latest News"
        );
    };

   
    return (
        <div>
            <h1>News Page</h1>
            <p>Latest news and updates will be displayed here.</p>
            <NewsItem title={title} description="This is a breaking news item." />
            <button onClick={handleClick}>Toggle Title</button>
        </div>
    );
}