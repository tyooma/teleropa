import React from 'react';
import IconWithBadge from '../cart/IconWithBadge'

const CartIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={17} />;
  };

  export default CartIconWithBadge