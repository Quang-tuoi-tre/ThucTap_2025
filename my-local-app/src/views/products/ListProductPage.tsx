import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Spin } from "antd";
import { Card, Row, Col, Typography } from "antd";
import { productListStore } from "../Store/ProductListStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Select } from "antd";

const { Meta } = Card;
const { Title, Text } = Typography;

export const ListProductPage: React.FC = observer(() => {
  const { categoryId } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate()

   useEffect(() => {
      productListStore.fetchListProduct(token, categoryId)
  }, [categoryId, token]);

    console.log("product is: ", toJS(productListStore.products));

      const handleSortChange = (value: "asc" | "desc" | undefined) => {
      productListStore.setSortOrder(value);
    };
    
    if (productListStore.loading) return <Spin tip="Loading Product..." />;

    return(
        <div className="product-list-page-container">
            {/* Breadcrumb cho điều hướng */}
            <Breadcrumb className="product-list-breadcrumb">
                <Breadcrumb.Item onClick={() => navigate('/')}>Trang chủ</Breadcrumb.Item>
                {/* Có thể thêm Breadcrumb.Item cho danh mục cha nếu có */}
                <Breadcrumb.Item>{productListStore.categoryName || "Sản phẩm"}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="product-list-header">
                <Title level={2} className="product-list-title">
                    {productListStore.categoryName || "Tất cả sản phẩm"}
                </Title>

                <Select
                    placeholder="Sắp xếp theo giá"
                    className="product-sort-select"
                    onChange={handleSortChange}
                    value={productListStore.sortOrder}
                    allowClear
                >
                    <Select.Option value="asc">Giá: Thấp đến Cao</Select.Option>
                    <Select.Option value="desc">Giá: Cao đến Thấp</Select.Option>
                </Select>
            </div>

            {productListStore.sortedProducts.length > 0 ? (
                <Row gutter={[24, 24]} className="product-grid"> 
                    {productListStore.sortedProducts.map((product, index) => (
                        <Col key={product.id || index} xs={24} sm={10} md={8} lg={7} xl={5}  className="product-grid-col"> {/* Thêm xl={5} để có 5 cột trên màn hình lớn */}
                            <Card
                                hoverable
                                className="product-item-card"
                                onClick={() => navigate(`/product/${product.id}`)}
                                cover={
                                    <div className="product-item-image-wrapper">
                                        <img
                                            alt={product.name}
                                            src={product.image}
                                            className="product-item-image"
                                        />
                                    </div>
                                }
                            >
                                <Meta
                                   title={
                                        <Text className="product-item-name" >
                                            {product.name}
                                        </Text>
                                    }
                                    description={
                                        <Text className="product-item-price">
                                            {`Giá: ${product.finalPrice.toLocaleString("vi-VN")} VNĐ`}
                                        </Text>
                                    }
                                    className="product-item-meta"
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="product-list-empty">
                    <Text className="product-list-empty-text">
                        Không có sản phẩm nào trong danh mục này hoặc phù hợp với tiêu chí tìm kiếm của bạn.
                    </Text>
                </div>
            )}
        </div>
    )

})