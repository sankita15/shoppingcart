/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Table, Media, Label } from 'reactstrap';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ContainerPage from './ContainerPage';

export default class Cart extends ContainerPage {
    constructor(props) {
        super(props);

        this.state = {
            cartDetails: {},
        };
    }

    getProductLink = productId => `/products/${productId}`;

    getProduct({ id, imageUrl, productName, price }, productQuantity) {
        return (
            <tr key={id}>
                <td>
                    <a target="_blank" href={this.getProductLink(id)}>
                        <Media className="cart-image" src={imageUrl} />
                    </a>
                </td>
                <td>
                    <a target="_blank" className="cart-product-name" href={this.getProductLink(id)}>
                        {productName}
                    </a>
                </td>
                <td>
                    <Label>
                    Rs.
                        {' '}
                        {price}
                    </Label>
                </td>
                <td>
                    <FaMinusSquare className="cart-minus" onClick={() => this.updateProductInCart(id, 'DELETE')} />
                    <Label className="cart-quantity-label">
                        {productQuantity}
                    </Label>
                    <FaPlusSquare className="cart-plus" onClick={() => this.updateProductInCart(id, 'POST')} />
                </td>
            </tr>
        );
    }

    render() {
        const { cartDetails } = this.state;

        if (!this.isCartEmpty(cartDetails)) {
            return <Label>Your Cart is empty.Please add item to your cart</Label>;
        }

        return (
            <div>
                <Label>Your Shopping cart</Label>
                <Table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>{this.getCartProducts()}</tbody>
                </Table>
                <div className="table-row">
                    <Label className="table-final-row">
                        {`SubTotal: ${this.getTotalPrice()}`}
                    </Label>
                </div>
            </div>
        );
    }

    updateProductInCart(productId, methodName) {
        const { cartDetails: { id: cartId } } = this.state;

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            credentials: 'include',
            method: methodName,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => (res.ok ? res.json() : Promise.reject(res.status)))
            .then(cartDetails => this.setState({ cartDetails }))
            .catch(status => console.warn(status));
    }
}

Cart.propTypes = {
    user: PropTypes.string.isRequired,
};
