import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import api from '../service/api'
import { Link } from 'react-router-dom'
/*import { FiSearch } from 'react-icons/fi*/
import ProductItem from '../components/ProductItem'

const Product = () => {
  const [product, setProductsList] = useState([])

  useEffect(() => {
    api
      .get(
        'https://my-json-server.typicode.com/GiseleCorreia/mycoffe-api/product'
      )
      .then(response => {
        console.log(response)
        setProductsList(response.data)
      })
  })

  return (
    <Container>
      <Row className="d-flex justify-content-evenly">
        {product
          .reverse()
          .slice(0, 50)
          .map(productItem => (
            <ProductItem
              key={productItem.id}
              id={productItem.id}
              title={productItem.title}
              value={productItem.value}
              image_url={productItem.image_url}
            />
          ))}
      </Row>

      <div className="d-flex justify-content-end">
        <Link to={`/home`}>
          <Button
            md="auto"
            style={{ marginTop: 16 }}
            variant="secondary"
            className="me-5"
          >
            Cancelar
          </Button>
        </Link>
        <Link to={`/cart`}>
          <Button md="auto" style={{ marginTop: 16 }} variant="primary">
            Adicionar ao carrinho
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default Product
