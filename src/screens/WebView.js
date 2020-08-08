import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import _ from "lodash";
import React from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import OrderServices from "../services/OrderServices";
import { valueFromId } from "../utils/Form";

export default function WebView() {
  const [data, setData] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const [prodType, setProdType] = React.useState("All");
  const [modal, setModal] = React.useState(false);
  const [paidAmount, setPaidAmount] = React.useState(0);

  async function start() {
    try {
      let response = await OrderServices.getProduct();
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    start();
  }, []);

  const addToCart = (item) => {
    let _data = _.cloneDeep(data);
    let { product_name, cost_per_item } = item;
    let index = _.findIndex(_data, function (o) {
      return o.product === product_name;
    });
    if (index !== -1) {
      let { quantity, price } = _data[index];
      let newQuantity = quantity + 1;
      _data[index] = {
        ..._data[index],
        quantity: newQuantity,
        cost: newQuantity * price
      };
    } else {
      _data.push({
        product: product_name,
        price: cost_per_item,
        quantity: 1,
        cost: 1 * cost_per_item
      });
    }
    setData(_data);
  };

  const increment = (index, amount) => {
    let _data = _.cloneDeep(data);
    let d = _data[index];
    let { quantity, price } = d;
    let newQuantity = quantity + amount;
    if (newQuantity === 0) {
      _data.splice(index, 1);
    } else if (newQuantity > 0) {
      _data[index] = { ...d, quantity: newQuantity, cost: newQuantity * price };
    }
    setData(_data);
  };

  const handleClose = () => {
    setModal(false);
  };

  const paidOnChange = (e) => {
    if (/^[0-9]*(?:.[0-9]{0,2})?$/.test(e.target.value)) {
      let paid = parseFloat(e.target.value);
      setPaidAmount(paid);
    } else {
      setPaidAmount(0);
    }
  };

  const checkout = (e) => {
    e.preventDefault();
    let totalPaid = parseFloat(valueFromId("total-paid-amount"));
    let paymentMtd = valueFromId("payment-method");
    console.log(totalPaid);
    console.log(paymentMtd);

    let { subtotal, quantity, tax, total, round, grandTotal } = setValue();
    if (paidAmount - grandTotal >= 0) {
      alert("Payment successfully!");
      handleClose();
    } else {
      alert("Insufficient total paid amount!");
    }
  };

  const setValue = () => {
    let subtotal = 0;
    let _quantity = 0;
    for (let d of data) {
      let { cost, quantity } = d;
      subtotal += cost;
      _quantity += quantity;
    }

    let tax = subtotal * 0.06;
    let total = subtotal + tax;
    let grandTotal = parseFloat(total.toFixed(1));
    let round = grandTotal - total;

    return { subtotal, quantity: _quantity, tax, total, round, grandTotal };
  };

  let { subtotal, quantity, tax, total, round, grandTotal } = setValue();
  return (
    <div className="App">
      <Row className={"web-view"}>
        <Col md={6} className={"mt-2"}>
          <h1>Cart</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (RM)</th>
                <th>Quantity</th>
                <th>Cost (RM)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                let { product, price, quantity, cost } = item;
                return (
                  <tr key={"table-data-" + index}>
                    <td>{product}</td>
                    <td>{price}</td>
                    <td
                      className={
                        "d-flex justify-content-between align-items-center"
                      }
                    >
                      <IoIosRemoveCircle onClick={() => increment(index, -1)} />
                      {quantity}
                      <IoIosAddCircle onClick={() => increment(index, 1)} />
                    </td>
                    <td>{cost}</td>
                  </tr>
                );
              })}
              <tr>
                <td colspan={3}>SubTotal</td>
                <td align={"right"}>{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan={3}>No. of Items</td>
                <td align={"right"}>{quantity}</td>
              </tr>
              <tr>
                <td colspan={3}>Tax (6%)</td>
                <td align={"right"}>{tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan={3}>Total</td>
                <td align={"right"}>{total.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan={3}>Rounding</td>
                <td align={"right"}>{round.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan={3}>Grand Total</td>
                <td align={"right"}>{grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
          <div className={"d-flex align-items-center justify-content-between"}>
            <Button onClick={() => setData([])}>Cancel</Button>
            <Button
              onClick={() => {
                if (data.length > 0) setModal(true);
                else alert("Please add products into your cart!");
              }}
            >
              Check Out
            </Button>
          </div>
        </Col>
        <Col md={6} className={"mt-2"}>
          <div className={"d-flex align-items-center justify-content-between"}>
            <Button onClick={() => setProdType("All")}>All</Button>
            <Button onClick={() => setProdType("Drinks")}>Drinks</Button>
            <Button onClick={() => setProdType("Food")}>Food</Button>
            <Button onClick={() => setProdType("Dessert")}>Dessert</Button>
          </div>
          <hr />
          <div className={"d-flex flex-wrap mw-100"}>
            {product.map((item, index) => {
              let { product_name: pName, type } = item;
              if (prodType !== "All" && type !== prodType) {
                return null;
              } else {
                return (
                  <div
                    style={{
                      width: "50%",
                      padding: "10px",
                      textAlign: "center",
                      maxWidth: 150
                    }}
                  >
                    <Button
                      key={"product-" + index}
                      onClick={() => addToCart(item)}
                    >
                      {pName}
                    </Button>
                  </div>
                );
              }
            })}
          </div>
        </Col>
      </Row>

      <Modal show={modal} onHide={handleClose}>
        <Form onSubmit={checkout}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Total Paid Amount</td>
                  <td>
                    RM{" "}
                    <Form.Control
                      id={"total-paid-amount"}
                      onChange={paidOnChange}
                      placeholder="0.00"
                      pattern={"^[0-9]*(?:.[0-9]{0,2})?$"}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>RM {grandTotal}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td>
                    <Form.Control as="select" required id={"payment-method"}>
                      <option value={"Cash"}>Cash</option>
                      <option value={"Others"}>Others</option>
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td>Change</td>
                  <td>RM {(paidAmount - grandTotal).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type={"submit"}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
