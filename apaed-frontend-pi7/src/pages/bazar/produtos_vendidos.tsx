import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { makeTransfer, resetSuccessTransfer } from '../../shared/reducers/transfer.reducer';
import { ITransferPostPut } from '../../shared/model/transfer.model';
import { getLocals } from '../../shared/reducers/local.reducer';
import { AUTHORITIES } from '../../config/constants';

interface ITransferirProps extends StateProps, DispatchProps, RouteComponentProps {}

class Transferir extends React.Component<ITransferirProps> {

  handleValidSubmit = (event, { total_amount_transfered }) => {
    event.persist();
    const newTransfer: ITransferPostPut = {
      product_id: this.props.toTransferProduct.product_id,
      total_amount_transfered: Number(total_amount_transfered),
      active: true,
      product_name: this.props.toTransferProduct.product.name,
      product_brand: this.props.toTransferProduct.product.brand,
      product_ncm_code: this.props.toTransferProduct.product.ncm.ncm_code,
    };
    this.props.makeTransfer(newTransfer);
  };

  render() {
    const { toTransferProduct, user } = this.props;

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Alterar Valor do Produto</CardHeader>
          <CardBody>
            <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup row>
                    <Label for="exampleEmail">Codigo NCM</Label>
                    <Input readOnly name="ncm_code" value={toTransferProduct.product?.ncm?.ncm_code} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup row>
                    <Label for="exampleEmail">Nome</Label>
                    <Input readOnly name="name" value={toTransferProduct.product?.name} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
                  <FormGroup className="mr-4">
                    <Label for="amount">
                      Quantidade (Max: {this.props.amount}){' '}
                      {toTransferProduct.product?.ncm?.unity_measurement?.unity_measurement}
                    </Label>
                    <AvField
                      className="form-control"
                      name="total_amount_transfered"
                      id="total_amount_transfered"
                      type="number"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: 'Esse campo é obrigatório!',
                        },
                        max: {
                          value: this.props.amount,
                          errorMessage: `O limite de transferência é ${this.props.amount}`,
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
              </Row>
              <br />
              <Button className="mb-4 float-right float-down" color="success" type="submit">
                Vendido
              </Button>
              <Button
                tag={Link}
                to={`/${user.role.name === AUTHORITIES.BAZAR ? 'bazar' : 'bazar' }/bazar`}
                className="mb-8 float-left"
                type="button"
                color="danger"
              >
                Cancelar
              </Button>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  toTransferProduct: store.transfer.toTransferProduct,
  user: store.authentication.account,
  amount: store.transfer.amount,
});

const mapDispatchToProps = {
  makeTransfer,
  getLocals,
  resetSuccessTransfer,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Transferir);
