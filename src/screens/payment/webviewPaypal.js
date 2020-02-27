import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebviewPaypal extends Component {
    state = {
        showModal: false,
      }
    render() {
        return (
            <View>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: "http://localhost:3000" }}
                    // onNavigationStateChange={data =>
                    // this.handleResponse(data)
                    // }
                    // injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <TouchableOpacity
                    style={{ width: 300, height: 100 }}
                    onPress={() => this.setState({ showModal: true })}
                >
                    <Text>Pay with Paypal</Text>
                </TouchableOpacity>
                <Text>Payment Status: {this.state.status}</Text>
            </View>
        )
    }
}