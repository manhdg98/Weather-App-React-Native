import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput(props) {
  const handleChangeText = (newLocation) => {
    // We need to do something with newLocation
    console.log("manh");
  }
    
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  }
});