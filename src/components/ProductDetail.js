import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();  // Pega o ID do produto da URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fazer requisição para obter os detalhes do produto
    axios.get(`http://localhost/api/products/${id}`)  // URL da sua API no Laravel
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Houve um erro ao buscar o produto!', error);
      });
  }, [id]);

  if (!product) {
    return (
      <Container className="mt-5">
        <h3>Carregando...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              {/* Exibindo nome e descrição */}
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>

              {/* Exibindo preço */}
              <h5>
                <strong>Preço:</strong> R${product.price}
              </h5>
              <h6>
                <strong>Quantidade:</strong> {product.quantity}
              </h6>

              {/* Exibindo status do produto */}
              <h6>
                <strong>Status: </strong>
                <Badge bg={product.active ? 'success' : 'danger'}>
                  {product.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </h6>

              {/* Botões */}
              <div className="mt-4">
                <Button variant="primary" as={Link} to="/products">
                  Voltar para a Lista de Produtos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
