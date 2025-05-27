import { observer } from "mobx-react-lite";
import { List, Image, Button, Typography, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { cartStore } from "./Store/CartStore";
import { orderStore } from "./Store/OrderStore";
import { toJS } from "mobx";

export const CartPage = observer(() => {
  const navigate = useNavigate();

  // useEffect(()=>{
  //   const token = localStorage.getItem('token')
  //   if(token){
  //     cartStore.setToken(token)
  //   }
  // },[])

  const totalPrice = cartStore.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

    const handleQuantityChange = (id: number, value: number | null) => {
    if (value ===null||value < 1) return;
    cartStore.updateQuantity(id, value);
  };

  const handleRemoveItem = (id: number) => {
    cartStore.removeItem(id);
  };

  // const handleSubmit = (token:string)=>{
  //   orderStore.createOrder(token)
  // }

  console.log('Product is:', toJS(orderStore.order));
  

  return (
     <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
        
      <Typography.Title level={2}>Giỏ hàng của bạn</Typography.Title>
      {cartStore.items.length === 0 ? (
        <Typography.Text>Giỏ hàng trống</Typography.Text>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartStore.items}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                    key="input-number"
                  />,
                  <Button
                    danger
                    onClick={() => handleRemoveItem(item.id)}
                    key="remove-button"
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Image width={80} src={item.image} />}
                  title={item.name}
                  description={`Giá: ${(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ`}
                />
              </List.Item>
            )}
          />
          <Typography.Title level={4} style={{ marginTop: 20 }}>
            Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/order')}
          >
            Mua hàng
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={()=>{cartStore.clear()}}
            danger
          >
            Xóa giỏ hàng
          </Button>
        </>
      )}
      <Button type="default" style={{ marginTop: 16 }} onClick={() => navigate(-1)}>
        Quay lại trang trước
      </Button>
    </div>
  );
});
