import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_SCREEN, API, API_LOGIN } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    try {
      const response = await axios.post(API + API_LOGIN, {
        username,
        password
      });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.access_token);
      navigation.navigate(PROFILE_SCREEN);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account</Text>

      <TextInput
        style={styles.inputView}
        placeholder="Email"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />

      <TextInput
        style={styles.inputView}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />

      <TouchableOpacity style={styles.button} onPress={() => login()}>
        {loading ? <ActivityIndicator style={styles.buttonText} /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

export const LOGIN_SCREEN = "LOGIN_SCREEN";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});