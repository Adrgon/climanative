import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const {pais, ciudad} = busqueda;
  const [animacionboton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }

    // Consultar la api
    guardarConsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Completar todos los campos de busqueda', [
      {text: 'Ok'},
    ]);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.75,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };

  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
          value={ciudad}
          onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
          placeholder="Ciudad"
          placeholderTextColor="#666"
          style={styles.input}
        />
      </View>
      <View>
        <Picker
          selectedValue={pais}
          onValueChange={pais => guardarBusqueda({...busqueda, pais})}>
          <Picker.Item label="-- Seleccione un pais --" value="" />
          <Picker.Item label="-- Estados Unidos --" value="US" />
          <Picker.Item label="-- Mexico --" value="MX" />
          <Picker.Item label="-- Argentina --" value="AR" />
          <Picker.Item label="-- Colombia --" value="CO" />
          <Picker.Item label="-- Costa Rica --" value="CR" />
          <Picker.Item label="-- España --" value="ES" />
          <Picker.Item label="-- Peru --" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        // eslint-disable-next-line no-undef
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => consultarClima()}>
        <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Formulario;
