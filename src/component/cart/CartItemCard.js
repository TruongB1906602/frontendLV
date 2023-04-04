import React from 'react';
import { Link } from 'react-router-dom';
import "./CartItemCard.css";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="#" />
          
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              
            </div>
            <div>

                <   span>{`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                   'VND'}).format(item.price)}`}</span> 
</div>
            <div>
            <p onClick={() => deleteCartItems(item.product)}><DeleteSweepIcon/></p>
            </div>
         
        </div>
    ) 
}

export default CartItemCard
