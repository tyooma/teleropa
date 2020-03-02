import React, { useState } from "react";
import { View, Text, Linking } from "react-native";

export default class AmazonLoginWebView extends Component {


    loadInBrowser = () => {
        Linking.openURL('https://eu.account.amazon.com/ap/oa?        client_id=amzn1.application-oa2-client.a51ef97abbbe4844a97431b166b4535a        &redirect_uri=https://api-cdn.amazon.com/sdk/2018-02-08-63k6q26l/topic.html?uri=https%3A%2F%2Fcdpn.io%2Fboomboom%2Fv2%2Findex.html&proxy=amazon-proxy-https-api_cdn_amazon_com&topic=X9ll04e60EYox420&version=1        &response_type=token                &scope=profile%20payments%3Awidget%20payments%3Ashipping_address        &sandbox=true').catch(err => console.error("Couldn't load page", err));
    };

    render() {
        // console.log("this.props.navigation.getParam('CartData')", this.props.navigation.getParam('CartData'))
        return (
            <View style={{ flex: 1 }}>
                {this.loadInBrowser}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 58,
        paddingLeft: 17,
        paddingRight: 3
    }
})