

import React from "react";
import { Card, Typography, Button,message } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/productSlice.js";


const { Title, Paragraph } = Typography;

const ProductCard = ({ product, onClick }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
    

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Added to cart successfully! 🛒",
      duration: 2,
    });
  };
  return (
   <>
    {contextHolder}
    
    
    <Card
      hoverable
      cover={<img alt={product.title} src={product.image} style={{ height: 200, objectFit: "contain" }} />}
      onClick={() => onClick(product)}
      
      actions={[
        <Button style={{backgroundColor:"#ACC8E5",color:"black"}}  onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening
          dispatch(addToCart(product));
          success();
        }
        }>

          Add to Cart 🛒
        </Button>,
      ]}
    >

      <Title level={5}>{product.title}</Title>
      <Paragraph strong>${product.price}</Paragraph>
      <Paragraph>
        {product
            .description
            .split(" ")
            .slice(0, 6)
            .join(" ") + "..."}
      </Paragraph>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Paragraph>Rating: {product.rating.rate}</Paragraph>
           <Paragraph>Count: {product.rating.count}</Paragraph>
       </div>
    </Card>
   </>
  );
};

export default ProductCard;
