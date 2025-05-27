import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Avatar, Typography, Row, Col, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { featuredCategoryStore } from "../views/Store/FeaturedCategoryStore";
const { Text } = Typography;

interface CategoryType{
    id: number ;
    icon:string;
    name:string;
}

export const FeaturedCategoryItem: React.FC =observer(() =>{

    const token = localStorage.getItem("token") || "";
    const navigate = useNavigate();


    useEffect(() => {
      featuredCategoryStore.fetchFeaturedCategory(token)
        },[token])

    const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);  
  };
    if (featuredCategoryStore.fetching) return <Spin tip="Loading Category..." />;

     
        
    return(
      <div className="category-section-container">
            <h3 className="category-section-title">Danh mục nổi bật</h3>
            <Row justify="center" gutter={[24, 24]} className="category-grid">
                {(featuredCategoryStore.category as CategoryType[]).map((category) => (
                    <Col
                        key={category.id}
                        xs={12} sm={8} md={6} lg={4} xl={3} 
                        className="category-col"
                    >
                        <Card
                            hoverable
                            className="category-card"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className="category-avatar-wrapper">
                                <Avatar
                                    size={80} // Kích thước avatar cố định
                                    src={category.icon}
                                    alt={category.name}
                                    shape="circle"
                                    className="category-avatar"
                                />
                            </div>
                            <Text className="category-name-text">
                                {category.name}
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
})