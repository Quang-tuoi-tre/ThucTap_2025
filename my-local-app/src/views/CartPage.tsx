import { observer } from "mobx-react-lite";
import { List, Image, Button, Typography, InputNumber, Card, Empty, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Hooks/CustomHooks/useCart";
import { orderStore } from "./Store/OrderStore";
import { toJS } from "mobx";
import { DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { cartStore } from "./Store/CartStore";


export const CartPage = observer(() => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  // useEffect(()=>{
  //   const token = localStorage.getItem('token')
  //   if(token){
  //     cartStore.setToken(token)
  //   }
  // },[])

  const handleQuantityChange = (id: number, value: number | null) => {
    if (value === null || value < 1) return;
    updateQuantity(id, value);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  // const handleSubmit = (token:string)=>{
  //   orderStore.createOrder(token)
  // }

  console.log('Product is:', toJS(items));
  
  const handleClearCart = ()=>{
        clearCart();
  }


  return (
     <div className="cart-page-container">
      <Card className="cart-card" bordered={false}>
        <Typography.Title className="cart-page-title" level={2}>
          <ShoppingOutlined style={{ marginRight: '10px' }} /> Giỏ hàng của bạn
        </Typography.Title>

        {cartStore.items.length === 0 ? (
          <Empty
            description="Giỏ hàng của bạn đang trống"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="cart-empty-state"
          >
            <Button
              type="primary"
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/')} // Điều hướng về trang chủ hoặc trang sản phẩm
            >
              Tiếp tục mua sắm
            </Button>
          </Empty>
        ) : (
          <>
            <List
              className="cart-item-list"
              itemLayout="vertical" // Thay đổi layout để hiển thị thông tin rõ ràng hơn
              dataSource={cartStore.items}
              renderItem={(item) => (
                <List.Item
                  className="cart-item"
                  key={item.id}
                  actions={[
                    <Space key="actions-space">
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => handleQuantityChange(item.id, value)}
                        className="item-quantity-input"
                      />
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Xóa
                      </Button>
                    </Space>,
                  ]}
                  extra={
                    <div className="item-total-price">
                      **{(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ**
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        width={100}
                        height={100}
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                        preview={false} // Tắt tính năng xem trước ảnh
                      />
                    }
                    title={<div className="cart-item-name">{item.name}</div>}
                    description={
                      <div className="cart-item-price">
                        Đơn giá: {item.price.toLocaleString("vi-VN")} VNĐ
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <div className="cart-summary">
              <Typography.Title level={4} className="cart-total-price">
                Tổng cộng: <span className="total-amount">{totalPrice.toLocaleString("vi-VN")} VNĐ</span>
              </Typography.Title>
              <Space className="cart-actions-bottom">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  onClick={() => navigate('/order')}
                >
                  Tiến hành đặt hàng
                </Button>
                <Button
                  type="default"
                  size="large"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleClearCart}
                >
                  Xóa toàn bộ giỏ hàng
                </Button>
              </Space>
            </div>
          </>
        )}

        <Button
          className="cart-back-button"
          type="default"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </Button>
      </Card>
    </div>
  );
});
