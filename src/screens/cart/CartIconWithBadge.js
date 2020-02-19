import React from 'react';
import IconWithBadge from '../cart/IconWithBadge'
import AsyncStorage from '@react-native-community/async-storage'


// const CartIconWithBadge = props => {
//     state = { temp: 0 }
//     async function badgeCountChecker() {
//         var sum = 0;
//         await AsyncStorage.getItem('Cart', (err, res) => {
//             let arr = JSON.parse(res);
//             arr.forEach(element => sum += element.count);

//             console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", sum)
//         });
//         return sum;
//     };
//     badgeCountChecker().then((kkk) => {
//         console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB", kkk)
//         temp = kkk;
//         this.setState({temp:kkk})
//     }).catch((error) => { console.log("SASDKASDJASHDJHADFHJGADSHFJGAJGHFHA", error) });


//     // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
//     return <IconWithBadge {...props} badgeCount={this.state.temp} />;
// };

class CartIconWithBadge extends React.Component {
    state = {
        temp: 0,
        flag: false
    };

    badgeCountChecker() {
        var sum = 0;
        AsyncStorage.getItem('Cart', (err, res) => {
            let arr = JSON.parse(res);
            arr.forEach(element => sum += element.count);
            this.setState({
                temp: sum,
                flag: true
            })
        });
    };


    render() {
        if (!this.state.flag) {
            this.badgeCountChecker();
        }
        return (
            <IconWithBadge {...this.props} badgeCount={this.state.temp} />
        )
    }
}

export default CartIconWithBadge