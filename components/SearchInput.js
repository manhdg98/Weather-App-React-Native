import React, { useState }  from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput(props) {
  const [ text, setText ] = useState('');
  const { placeholder, onSubmit } = props;

  const handleChangeText = (value) => {
    // We need to do something with newLocation
    console.log('value', value)
    setText(value);
  }

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={text}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
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