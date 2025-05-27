import { useLocation } from "react-router-dom";
import { BannerItem } from "../components/BannerItem"
import { FeaturedCategoryItem } from "../components/FeaturedCategoryItem"
import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
// import { Spin } from "antd";

export const HomePage: React.FC = observer(() => {
    // const location = useLocation();
    // console.log('Render HomePage', locaion.pathname);
    

    return(
        <div style={{ display: 'flex', flexDirection: 'column' }} >
            <BannerItem  />
            <br />
            <FeaturedCategoryItem/>
            
        </div>
    )
})
