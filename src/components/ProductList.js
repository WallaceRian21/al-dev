import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fazer requisição para listar todos os produtos
    axios.get('http://localhost/api/products')  // URL da sua API no Laravel
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Houve um erro ao buscar os produtos!', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4 text-center">Lista de Produtos</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description.length > 100
                    ? product.description.substring(0, 100) + '...'
                    : product.description}
                </Card.Text>
                <Card.Text>
                  <strong>Preço:</strong> R${product.price}
                </Card.Text>
                <Button variant="primary" as={Link} to={`/product/${product.id}`}>
                  Ver Detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
