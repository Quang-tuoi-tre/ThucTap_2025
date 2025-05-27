import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "./Store/CartStore";
import { Typography, List, Image, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { orderStore } from "./Store/OrderStore";

const { Title, Text } = Typography;

export const OrderPage = observer(() => {
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    orderStore.fetchProfile(token)

  }, []);

  const totalPrice = cartStore.items.reduce(
    (sum, item) => sum + item.price * item.quantity,0
  );


console.log("Profile in store:", orderStore.profile);
  

  if (orderStore.isLoadingProfile) {
    return <Spin tip="Đang tải thông tin người dùng..." />;
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
      <Title level={2}>Xác nhận đơn hàng</Title>

      <div style={{ marginBottom: 24 }}>
        <Title level={4}>Thông tin người mua</Title>
        <Text><b>Họ và tên:</b> {orderStore.profile.fullName || "Chưa có dữ liệu"}</Text><br />
        <Text><b>Số điện thoại:</b> {orderStore.profile.phone || "Chưa có dữ liệu"}</Text><br />
        <Text><b>Địa chỉ:</b> {orderStore.profile.address || "Chưa có dữ liệu"}</Text>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Title level={4}>Sản phẩm trong giỏ hàng</Title>
        <List
          dataSource={cartStore.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Image width={80} src={item.image} />}
                title={item.name}
                description={`Số lượng: ${item.quantity}  - Giá: ${(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ`}
              />
            </List.Item>
          )}
        />
        <Title level={5} style={{ marginTop: 16 }}>
          Tổng thanh toán: {totalPrice.toLocaleString("vi-VN")} VNĐ
        </Title>
      </div>

      <Button type="primary" size="large"
    
       >
       Mua Ngay
      </Button>
    </div>
  );
});

  // Khi xác nhận đơn hàng, bạn có thể gọi orderStore.createOrder(token) ở đây
//   const handleConfirmOrder = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Vui lòng đăng nhập để đặt hàng");
//       navigate("/login");
//       return;
//     }
//     // Cập nhật order details trong orderStore từ cartStore.items
//     orderStore.setOrderDetails(cartStore.items);
//     orderStore.createOrder(token).then(() => {
//       alert("Đặt hàng thành công!");
//       cartStore.clear(); 
//       navigate("/"); 
//     });
//   };

//    onClick={handleConfirmOrder}