import React from 'react';
import IconWithBadge from '../cart/IconWithBadge'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from '../../app/app'

class CartIconWithBadge extends React.Component {
    state = {
        cartItemCount: 0,
        cartItemFlag: false
    };

    badgeCountChecker() {
        var sum = 0;
        AsyncStorage.getItem('Cart', (err, res) => {
            let arr = JSON.parse(res);
            arr.forEach(element => sum += element.count);
            this.setState({
                cartItemCount: sum,
                cartItemFlag: true
            })
        });
    };


    render() {
        if (!this.state.cartItemFlag) {
            this.badgeCountChecker();
        }
        return (
            <Provider store={store}>
                <IconWithBadge {...this.props} badgeCount={this.state.cartItemCount} />
            </Provider>

        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         badgeCountChecker();
//     }
// }

export default connect()(CartIconWithBadge)