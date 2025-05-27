// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Spin } from "antd";
// import { Card, Row, Col, Typography } from "antd";
// import { productApi } from "../../api/product.api";



// const { Meta } = Card;
// const { Title, Text } = Typography;

// interface Product{
//     id:string;
//     name:string;
//     image:string;
//     finalPrice:string;    
// }
// export const SearchResultPage =() =>{
//     const {productName}=useParams();
//     const token = localStorage.getItem('token')||''
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading,setLoading]= useState(false)
//     const navigate= useNavigate();
//     useEffect(()=>{
//         const fetchProduct = async ()=>{
//             setLoading(true)
//             try{
//                 const res = await productApi.getProduct(token);
//                 const allProducts :Product[]= res.data.data.products || []
//                 const filteredProducts = allProducts.filter((p) =>
//                 p.name.toLowerCase().includes((productName || "").toLowerCase())
//               );

//                 setProducts(filteredProducts )
//                 console.log("Product is: ", filteredProducts);
                
//             }catch(error){
//                 console.log("Error is:",error);
//                 setProducts([])
//             }finally{
//                 setLoading(false)
//             }
//         };
//         fetchProduct();
//     },[productName,token])

//       if (loading) return <Spin tip="Loading Product..." />;


//     return(
// <div className="p-4">
//       <Title level={2}>
//         Kết quả tìm kiếm: "{decodeURIComponent(productName||"")}"
//       </Title>

//       {products.length > 0 ? (
//         <Row gutter={[16, 16]}>
//           {products.map((product, index) => (
//             <Col key={index} xs={24} sm={10} md={8} lg={8}>
//               <Card
//                 hoverable
//                 onClick={() => navigate(`/product/${product.id}`)}
//                 cover={
//                   <img
//                     alt={product.name}
//                     src={product.image}
//                     style={{ height: 200, objectFit: "contain", padding: 8 }}
//                   />
//                 }
//               >
//                 <Meta style={{textAlign:'center'}}
//                   title={product.name}
//                   description={`Giá: ${product.finalPrice.toLocaleString(
//                   )} VNĐ`}
//                 />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <Text>Không tìm thấy sản phẩm phù hợp.</Text>
//       )}
//     </div>
//     )
// }

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Card, Row, Col, Typography, Select } from "antd";
import { observer } from "mobx-react-lite";
import { searchResultStore } from "../Store/SearchResultStore ";

const { Meta } = Card;
const { Title, Text } = Typography;

export const SearchResultPage: React.FC = observer(() => {
  const { productName } = useParams();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    searchResultStore.fetchProducts(token, productName);
  }, [token, productName]);

   const handleSortChange = (value: "asc" | "desc" | undefined) => {
        searchResultStore.setSortOrder(value);
      };

  if (searchResultStore.loading) return <Spin tip="Loading Product..." />;

  return (

     <div className="product-list-page-container">

            <div className="product-list-header">
                <Title level={2} className="product-list-title">
                    Kết quả tìm kiếm: "{decodeURIComponent(productName || "")}"
                </Title>

                <Select
                    placeholder="Sắp xếp theo giá"
                    className="product-sort-select"
                    onChange={handleSortChange}
                    value={searchResultStore.sortOrder}
                    allowClear
                >
                    <Select.Option value="asc">Giá: Thấp đến Cao</Select.Option>
                    <Select.Option value="desc">Giá: Cao đến Thấp</Select.Option>
                </Select>
            </div>

            {searchResultStore.sortedProducts.length > 0 ? (
                <Row gutter={[24, 24]} className="product-grid"> 
                    {searchResultStore.sortedProducts.map((product, index) => (
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
    
    // <div className="p-4">
    //   <Title level={2}>
    //     Kết quả tìm kiếm: "{decodeURIComponent(productName || "")}"
    //   </Title>

    //   <Select
    //       placeholder="Sắp xếp theo giá"
    //       className="product-sort-select"
    //       onChange={handleSortChange}
    //       value={searchResultStore.sortOrder}
    //       allowClear
    //   >
    //       <Select.Option value="asc">Giá: Thấp đến Cao</Select.Option>
    //       <Select.Option value="desc">Giá: Cao đến Thấp</Select.Option>
    //   </Select>      

    //   {searchResultStore.sortedProducts.length > 0 ? (
    //     <Row gutter={[16, 16]}>
    //       {searchResultStore.sortedProducts.map((product) => (
    //         <Col key={product.id} xs={24} sm={10} md={8} lg={8}>
    //           <Card
    //             hoverable
    //             onClick={() => navigate(`/product/${product.id}`)}
    //             cover={
    //               <img
    //                 alt={product.name}
    //                 src={product.image}
    //                 style={{ height: 200, objectFit: "contain", padding: 8 }}
    //               />
    //             }
    //           >
    //             <Meta
    //               style={{ textAlign: "center" }}
    //               title={product.name}
    //               description={`Giá: ${product.finalPrice.toLocaleString()} VNĐ`}
    //             />
    //           </Card>
    //         </Col>
    //       ))}
    //     </Row>
    //   ) : (
    //     <Text>Không tìm thấy sản phẩm phù hợp.</Text>
    //   )}
    // </div>
  );
});
