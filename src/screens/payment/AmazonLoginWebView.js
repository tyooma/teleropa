import React, { Component } from 'react';
import { View, Platform } from 'react-native'
import { WebView } from 'react-native-webview';

// import Constants from './Constants'
// import NavigationBar from './scenesNavBar'
// import LocalStorageSettingApi from './LocalStorageSettingsApi'

export default class AmazonLoginWebView extends Component {
    constructor(props) {
        super(props)
        state = {
            url: ''
        }
    }
    onNavigationStateChange = (webViewState) => {
        if (webViewState.url == "https://sellercentral.amazon.com/merchant-picker/status") {
            LocalStorageSettingApi.setIsAmazonSellerLoggedIn(Constants.kTrue)
            this.props.navigator.popToTop()
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: Platform.OS == 'ios' ? 75 : 60 }}><NavigationBar navigator={this.props.navigator} route={this.props.route} /></View>
                <WebView
                    scalesPageToFit={true}
                    source={{ uri: 'https://sellercentral.amazon.com/' }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        );
    }
}
