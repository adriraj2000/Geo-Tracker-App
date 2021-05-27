import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { state, signIn, clearErrorMessage, tryLocalSignIn } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text h2 style={styles.text}>
          Sign in
        </Text>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        {state.errorMessage ? (
          <Text style={{ marginLeft: 10, color: "red", marginBottom: 10 }}>
            {state.errorMessage}
          </Text>
        ) : null}

        <Button title="Sign in" onPress={() => signIn({ email, password })} />
        <TouchableOpacity
          onPress={() => {
            clearErrorMessage();
            navigation.navigate("SignupScreen");
          }}
        >
          <Text
            h5
            style={{
              marginTop: 15,
              marginLeft: 5,
              color: "#1976D2",
              fontWeight: "bold",
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 180,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    marginLeft: 10,
    marginBottom: 20,
  },
});

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
