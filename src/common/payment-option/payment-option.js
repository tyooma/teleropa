import React from 'react';

import { View, Image, TouchableWithoutFeedback, Text } from 'react-native';

const PaymentOption = ({ imageSource, text, selected, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={s.container} >
        <View style={selected ? s.selectedDotStyle : s.dotStyle}></View>
        <View style={s.contentStyle}>
          <Image style={s.imageStyle} source={imageSource} key={imageSource} />
        </View>
        <Text style={s.textStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = {
  container: { flex: 1, flexDirection: 'row', marginTop: 20 },
  contentStyle: { marginLeft: 15, flexDirection: 'column', justifyContent: 'flex-start' },

  // imageStyle: { width: 90, height: 26, resizeMode: 'contain', marginBottom: 10 },
  imageStyle: { width: 90, height: 30, resizeMode: 'contain', marginBottom: 0 },

  textStyle: { fontSize: 16, lineHeight: 16, color: '#a0a0a0' },

  dotStyle: { height: 18, width: 18, borderRadius: 9, borderWidth: 0.7, borderColor: '#a0a0a0' },
  selectedDotStyle: { height: 18, width: 18, borderRadius: 9, borderWidth: 3.5, borderColor: '#c00017' },
}

export default PaymentOption;
