import React from 'react';
import './index.css';

const CustomAddToCartButton = ({
    show, onShow, quantity, onIncrement, onDecrement,
}) => {
    return (
        <>
            {show === false && (
                <div onClick={
                    () => {
                        onShow();
                        onIncrement();
                    }
                } className="Add_to_cart_btn">
                    <button>ADD</button>
                </div>
            )}
            {show === true && (
                <div className="full_view_incre_btn">
                    {quantity === 1 ? (
                        <p>-</p>
                    ) : (
                        <p onClick={onDecrement}>-</p>
                    )}
                    <p>{quantity}</p>
                    <p onClick={onIncrement}>+</p>
                </div>
            )}
        </>
    );
};

export default CustomAddToCartButton;
