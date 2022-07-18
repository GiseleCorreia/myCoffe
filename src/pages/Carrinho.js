import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import api from '../service/api'
import { FiSearch, FiPlus, FiMinus, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ShoppingCart = () => {
  const [productsList, setProductsList] = useState([])
  const [shoppingCartList, setShoppingCartList] = useState([])
  const [paymentType, setPaymentType] = useState('')
  const [totalValue, setTotalValue] = useState(0)
  const [moneyChange, setMoneyChange] = useState(0)
  const [totalMoney, setTotalMoney] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [filterProductsList, setFilterProductsList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/product').then(response => {
      const products = response.list
      setProductsList([...products])
      setFilterProductsList([...products])
    })
  }, [])

  useEffect(() => {
    let totalValue = 0
    shoppingCartList.forEach(item => {
      totalValue += item.value * item.quantity
    })

    if (totalMoney >= totalValue) {
      setMoneyChange(totalMoney - totalValue)
    } else {
      setMoneyChange(0)
    }
    setTotalValue(totalValue)
  }, [shoppingCartList, totalMoney])

  const addItemToCart = product => {
    let isDuplicated = false
    const cartItem = {
      id: product.id,
      name: product.name,
      quantity: 1,
      value: product.value
    }

    shoppingCartList.forEach(item => {
      if (item.id === product.id) {
        isDuplicated = true
        item.quantity++
      }
    })

    if (isDuplicated) {
      setShoppingCartList([...shoppingCartList])
    } else {
      setShoppingCartList([...shoppingCartList, cartItem])
    }
  }

  const changeQuantity = (cartItem, operator) => {
    shoppingCartList.forEach((item, index) => {
      if (item.id === cartItem.id) {
        if (operator === '+') {
          item.quantity++
        } else {
          item.quantity--

          if (item.quantity === 0) {
            shoppingCartList.splice(index, 1)
          }
        }
      }
    })
    setShoppingCartList([...shoppingCartList])
  }

  function selectPaymentType(e) {
    setPaymentType(e.target.value)
  }

  const searchItems = e => {
    const search = e.target.value.toLowerCase()

    if (search === '') {
      setFilterProductsList([...productsList])
    } else {
      const filteredItems = productsList.filter(
        item =>
          item.name.toLowerCase().includes(search) ||
          item.product_id.toLowerCase().includes(search)
      )

      setFilterProductsList([...filteredItems])
    }
  }

  const submitOrder = () => {
    const order = {
      customer_name: customerName,
      notes: notes,
      payment_type: paymentType,
      items: shoppingCartList.map(cartItem => {
        return { quantity: cartItem.quantity, product_id: cartItem.id }
      })
    }

    api.post('/order', order).then(() => {
      navigate.push('/success')
    })
  }

  return (
    <Container>
      <Col>
        <h2 style={{ marginTop: 16 }}>Seja bem-vindo!</h2>
        <div id="input" style={{ marginTop: 16 }}>
          <Form.Control
            iconRight={FiSearch}
            type="text"
            name="search"
            placeholder="Procure seu café :)"
            onChange={e => searchItems(e)}
          />
        </div>
      </Col>
      <Col>
        {filterProductsList.map(product => {
          return (
            <Col key={product.id} onClick={() => addItemToCart(product)}>
              <div id="img_div">
                <img src={product.image_url} alt="" />
              </div>
              <div>
                <strong>{product.name}</strong>
                <p>{product.description}</p>
                <strong>R$ {product.value.toFixed(2)}</strong>
              </div>
            </Col>
          )
        })}
      </Col>

      <Row>
        <div>
          <Col>
            <ul>
              {shoppingCartList.map(cartItem => {
                return (
                  <Col key={cartItem.id}>
                    <span>{cartItem.name}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => changeQuantity(cartItem, '-')}
                      >
                        <FiMinus />
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity(cartItem, '+')}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </Col>
                )
              })}
            </ul>
            <Form
              rows="3"
              placeholder="Alguma observação?"
              name="notes"
              onChange={e => setNotes(e.target.value)}
            ></Form>
          </Col>
          <Col>
            <h1>Resumo do Pedido</h1>
            <Form
              name="customer_name"
              placeholder="Insira seu nome"
              onChange={e => setCustomerName(e.target.value)}
              iconLeft={FiUser}
            ></Form>

            <div>
              <div id="payment-type">
                <select
                  name="payment_type"
                  defaultValue={''}
                  onChange={selectPaymentType}
                >
                  <option value="" disabled>
                    Forma de pagamento
                  </option>
                  <option value="Cartão Crédito">Cartão Crédito</option>
                  <option value="Cartão Débito">Cartão Débito</option>
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
              <Form
                placeholder="Valor a ser pago"
                type="number"
                onChange={e => setTotalMoney(Number(e.target.value))}
              ></Form>
            </div>
            <div id="value-summary">
              <Form>
                <span>Valor Total</span>
                <strong>R$ {totalValue.toFixed(2)}</strong>
              </Form>
              <Form>
                <span>Troco</span>
                <strong>R$ {moneyChange.toFixed(2)}</strong>
              </Form>
            </div>
          </Col>
        </div>
        <div className="d-flex justify-content-end">
          <Link to={`/cart`}>
            <Button
              md="auto"
              style={{ marginTop: 16 }}
              variant="secondary"
              className="me-5"
            >
              Cancelar
            </Button>
          </Link>
          <Link to={`/k`}>
            <Button
              md="auto"
              style={{ marginTop: 16 }}
              id="submit-button"
              onClick={() => submitOrder()}
            >
              Enviar Pedido
            </Button>
          </Link>
        </div>
      </Row>
    </Container>
  )
}

export default ShoppingCart
