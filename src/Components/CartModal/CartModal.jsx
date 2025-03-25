import React from "react";
import { Modal, List, Typography, Button,message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/productSlice.js";

const { Title, Paragraph } = Typography;

const CartModal = ({ visible, onClose }) => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
        messageApi.open({
          type: 'error',
          content: 'Removed from cart! 🛒',
        });
      };

  return (

    <>
    {contextHolder}

    <Modal title="Shopping Cart 🛒" open={visible} onCancel={onClose} footer={null}>
      {cart.length === 0 ? (
        <Paragraph>Your cart is empty!</Paragraph>
      ) : (
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button danger  onClick={() => {
                    dispatch(removeFromCart(item.id)); // ✅ Dispatch action
                    error(); // ✅ Show error message immediately
                  }}
                >
                  Remove ❌
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<img src={item.image} alt={item.title} style={{ width: 50, height: 50 }} />}
                title={item.title}
                description={`$${item.price} x ${item.quantity}`}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
    </>
  );
};

export default CartModal;
