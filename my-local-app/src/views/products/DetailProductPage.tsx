import { useEffect } from "react";
import {   useNavigate, useParams } from "react-router-dom";
import { Spin, Carousel, Row, Col, Divider, Image, Button, Card, Breadcrumb, Typography, notification } from "antd";

import { detailProductStore } from "../Store/DetailProductStore";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { cartStore } from "../Store/CartStore";
// import { toJS } from "mobx";

const { Meta } = Card;
const { Title, Text } = Typography;

export const DetailProductPage = observer(() => {
  const { productId } = useParams();
    const [not, contextHolder] = notification.useNotification();
  const token = localStorage.getItem("token") || "";

  const navigate = useNavigate()
  const openNotification = (
    type: "success" | "error",
    pauseOnHover: boolean,
    message: string,
    description: string
  ) => {
    return () => {
      not.open({
        message,
        description,
        type,
        showProgress:true,
        pauseOnHover,
        placement: "top",
      });
    };
  };
  useEffect(() => {
    detailProductStore.fetchDetailProduct(token, productId)
  }, [productId,token]);

  if (detailProductStore.loading) return <Spin tip="Loading product..." />;

  const product = detailProductStore.product
  if (!product) return <div>Can't find product</div>;

  const handleAddToCart = () => {
    if(!cartStore.token){
        navigate('/login')
        return
    }
    cartStore.addItem(product);
     openNotification(
        "success",  
        true,       
        "Thêm giỏ hàng thành công",
        `Sản phẩm đã được thêm vào giỏ hàng.`
    )();

  }

    const handleBuyNow = () => {
    if(!cartStore.token){
        navigate('/login')
        return
    }
    cartStore.addItem(product);
    navigate('/cart')

  }

//   console.log('Sản phẩm là:', toJS(detailProductStore.product));
  

  const allImages = product.images && product.images.length > 0
  ? [product.image, ...product.images.map((imgObj: any) => imgObj.url)]
  : [product.image];


  return (
    <>
        {contextHolder}
       <div className="detail-page-container">
            <Breadcrumb className="product-detail-breadcrumb" style={{cursor:"pointer"}}>
                <Breadcrumb.Item onClick={() => navigate('/')}>Trang chủ</Breadcrumb.Item>
                {product.productCategory.name && ( 
                    <Breadcrumb.Item onClick={() => navigate(`/category/${product.productCategory.id}`)}>
                        {product.productCategory.name}
                    </Breadcrumb.Item>
                )}
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[48, 32]} className="product-main-info-row"> {/* Tăng gutter để có khoảng cách lớn hơn */}
                <Col xs={24} md={12} className="product-image-carousel-col">
                    <Carousel autoplay autoplaySpeed={3000} className="product-image-carousel"> {/* Tăng autoplaySpeed */}
                        {allImages.map((imgSrc: string, index: number) => (
                            <div key={index} className="carousel-image-wrapper">
                                <Image
                                    src={imgSrc}
                                    alt={`${product.name} image ${index + 1}`}
                                    className="product-main-image"
                                    preview={false} // Tắt preview mặc định để tự quản lý click
                                />
                            </div>
                        ))}
                    </Carousel>
                </Col>

                <Col xs={24} md={12} className="product-details-col">
                    <Title level={2} className="product-name-title">{product.name}</Title>

                    {product.oldPrice && product.oldPrice > product.finalPrice && (
                        <div className="product-price-section">
                            {/* <Text delete className="product-old-price">
                                {product.oldPrice.toLocaleString("vi-VN")} VNĐ
                            </Text> */}
                            <Text strong className="product-current-price">
                                {product.finalPrice.toLocaleString("vi-VN")} VNĐ
                            </Text>
                              {/* <span className="product-discount-tag">
                                  Tiết kiệm {((1 - product.finalPrice / product.oldPrice) * 100).toFixed(0)}%
                              </span> */}
                        </div>
                    )}
                    {!product.oldPrice || product.oldPrice <= product.finalPrice ? (
                         <div className="product-price-section">
                            <Text strong className="product-current-price">
                                Giá: {product.finalPrice.toLocaleString("vi-VN")} VNĐ
                            </Text>
                         </div>
                    ) : null}


                    <Divider className="section-divider" /> {/* Divider tinh tế hơn */}

                    <Title level={4}  className="section-heading">Mô tả sản phẩm</Title>
                    <Text className="product-description-text">
                        {product.description || "Sản phẩm này chưa có mô tả chi tiết."}
                    </Text>

                    <Divider className="section-divider" />

                    <Title level={4} className="section-heading">Thông số kỹ thuật</Title>
                    <Row gutter={[24, 12]} className="product-specs-grid"> {/* Gutter lớn hơn */}
                        <Col span={12} className="product-spec-item">
                            <Text strong>Chiều cao:</Text> <Text>{product.height || 'N/A'} cm</Text>
                        </Col>
                        <Col span={12} className="product-spec-item">
                            <Text strong>Chiều dài:</Text> <Text>{product.length || 'N/A'} cm</Text>
                        </Col>
                        <Col span={12} className="product-spec-item">
                            <Text strong>Chiều rộng:</Text> <Text>{product.width || 'N/A'} cm</Text>
                        </Col>
                        <Col span={12} className="product-spec-item">
                            <Text strong>Cân nặng:</Text> <Text>{product.weight || 'N/A'} gr</Text>
                        </Col>
                        {/* <Col span={12} className="product-spec-item">
                            <Text strong>Thương hiệu:</Text> <Text>{product.brand || 'Đang cập nhật'}</Text>
                        </Col> */}
                        <Col span={12} className="product-spec-item">
                            <Text strong>Mã sản phẩm:</Text> <Text>{product.id || 'N/A'}</Text>
                        </Col>
                    </Row>

                    <Divider className="section-divider" />

                    <Row gutter={[16, 16]} className="product-actions">
                        <Col>
                            <Button
                                type="primary"
                                size="large"
                                icon={<FontAwesomeIcon icon={faCartPlus} />}
                                className="add-to-cart-button"
                                onClick={handleAddToCart}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="default"
                                size="large"
                                icon={<FontAwesomeIcon icon={faBolt} />} 
                                className="buy-now-button"
                                onClick={handleBuyNow}
                            >
                                Mua ngay
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Divider orientation="left" className="related-products-divider">
                Sản phẩm liên quan
            </Divider>

            {detailProductStore.loadingRelated ? (
                <div className="related-products-loading">
                    <Spin tip="Đang tải sản phẩm liên quan..." />
                </div>
            ) : detailProductStore.relatedProducts.length === 0 ? (
                <div className="related-products-empty">
                    <Text className="related-products-empty-text">
                        Không có sản phẩm liên quan nào trong danh mục này.
                    </Text>
                </div>
            ) : (
                <Row gutter={[24, 24]} className="related-products-grid"> 
                    {detailProductStore.relatedProducts.map((p) => ( 
                        <Col key={p.id} xs={24} sm={12} md={8} lg={6} xl={5} className="related-product-col">
                            <Card
                                hoverable
                                className="related-product-card"
                                onClick={() => navigate(`/product/${p.id}`)}
                                cover={
                                    <div className="related-product-image-wrapper">
                                        <img
                                            alt={p.name}
                                            src={p.image}
                                            className="related-product-image"
                                        />
                                    </div>
                                }
                            >
                                <Meta
                                    title={
                                        <Text className="related-product-name" >
                                            {p.name}
                                        </Text>
                                    }
                                    description={
                                        <Text className="related-product-price">
                                            {`Giá: ${p.finalPrice.toLocaleString("vi-VN")} VNĐ`}
                                        </Text>
                                    }
                                    className="related-product-meta"
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
        </>
  );
});
