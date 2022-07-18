import React, { useState, useEffect } from 'react'
import { Container, Button, Col } from 'react-bootstrap'
import api from '../service/api'
import { parseISO, format } from 'date-fns'
import utcToZonedTime from 'date-fns-tz'

const KitchenPage = () => {
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    api.get('/order').then(response => {
      const orders = response.data
      setOrderList([...orders])
    })
  }, [])

  const displayTime = dateString => {
    const parsedDate = parseISO(`${dateString}Z`)
    const znDate = utcToZonedTime(parsedDate, 'Brasília')

    return format(znDate, 'H:mm')
  }

  const closeOrder = orderId => {
    const status = {
      status: 'pronto'
    }

    api.put(`/order/${orderId}`, status).then(response => {
      orderList.forEach((order, index) => {
        if (order.id === orderId) {
          orderList.splice(index, 1)
        }
      })

      setOrderList([...orderList])
    })
  }

  return (
    <Container>
      <Col>
        <ul>
          {orderList.map((order, index) => {
            return (
              <div>
                <h1>{index + 1}</h1>
                <h3>{order.customer_name}</h3>
                <ul>
                  {order.orderItems.map(item => {
                    return (
                      <div>
                        <span>{item.product.product_id}</span>
                        <span id="name">{item.product.name}</span>
                        <span>{item.quantity}</span>
                      </div>
                    )
                  })}
                </ul>
                <p>{order.notes}</p>
                <h1>{displayTime(order.created_at)}</h1>
                <div id="button">
                  <Button onClick={() => closeOrder(order.id)}>Pronto</Button>
                </div>
              </div>
            )
          })}
        </ul>
      </Col>
    </Container>
  )
}

export default KitchenPage
