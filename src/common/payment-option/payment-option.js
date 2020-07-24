import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const PaymentOption = ({ imageSource, text, selected, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={s.container}>
        <View style={selected ? s.selectedDotStyle : s.dotStyle}></View>
          <Image style={s.imageStyle} source={imageSource} key={imageSource} />
          <Text style={s.textStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 10 },
  imageStyle: { width: 120, height: 25, resizeMode: 'contain', marginBottom: 10 },
  textStyle: { fontSize: 16, lineHeight: 16, color: '#a0a0a0' },
  dotStyle: { height: 25, width: 25, marginRight: 15, borderRadius: 19, borderWidth: 0.7, borderColor: '#a0a0a0' },
  selectedDotStyle: { height: 25, width: 25, marginRight: 15, borderRadius: 19, borderWidth: 3.5, borderColor: '#c00017' },
});

export default PaymentOption;
