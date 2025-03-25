import React from "react";
import { Modal, Typography } from "antd";

const { Title, Paragraph } = Typography;

const ProductModal = ({ product, visible, onClose }) => {
    const handleAddToCart = (add) => {
        add(product);
    };
   

  return (
    <Modal
      title={product?.title}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {product && (
        <div style={{ textAlign: "center" ,  }}>
          <img src={product.image} alt={product.title} style={{ width: 150, height: 150, objectFit: "contain" }} />
        
          <Title level={4}>${product.price}</Title>
          <Paragraph>{product.category}</Paragraph>
          <Paragraph>{product.description}</Paragraph>
          <button onClick={onClose}>Close</button>
          <button   onClick={handleAddToCart}>Add to Cart</button>
          
        </div>
      )}
    </Modal>
  );
};

export default ProductModal;
