import React from 'react'
import { Card, Button, Col } from 'react-bootstrap'
import addItem from '../pages/Carrinho'

const ProductItem = ({ id, title, value, image_url }) => {
  return (
    <Col md="auto" style={{ marginTop: 16 }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image_url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title>{id}</Card.Title>
          <Button variant="primary" onClick={() => addItem()}>
            {value}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
export default ProductItem
