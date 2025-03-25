

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Typography, Badge, Button } from "antd";
import { fetchProducts } from "../../redux/productSlice.js";
import ProductCard from "../ProductCard/ProductCard.jsx";
import ProductModal from "../ProductModal/ProductModal.jsx";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartModal from "../CartModal/CartModal.jsx";

const { Title } = Typography;

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, cart } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [cartVisible, setCartVisible] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: "20px" }}>
     <div style={{ padding: "20px" }}>
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: 20 }}>
      <Title level={2}> Products</Title>

      <Badge count={cart.length} showZero style={{ backgroundColor: "#52c41a" }}>
        <Button type="default" icon={<ShoppingCartOutlined />} size="large" onClick={() => setCartVisible(true)}>
          Cart
        </Button>
      </Badge>
    </div>

    <CartModal visible={cartVisible} onClose={() => setCartVisible(false)} />
  </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} onClick={showProductDetails} />
            </Col>
          ))}
        </Row>
      )}

      <ProductModal
        product={selectedProduct}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>

  );
};

export default ProductList;

