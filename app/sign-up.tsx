import { StyleSheet, Text, View, Button as RNButton, ScrollView, TextInput as RNTextInput, Alert as RNAlert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useNavigation } from "expo-router";
import TextInput from "components/textinput";
import Button from "components/button";
import Spacer from "components/spacer";
import * as Clipboard from "expo-clipboard";
import { useAppDispatch, loggedIn } from "@gno/redux";
import Alert from "@gno/components/alert";
import useOnboarding from "@gno/hooks/use-onboarding";
import Layout from "@gno/components/layout";
import { useGnoNativeContext } from "@gnolang/gnonative";

export default function Page() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phrase, setPhrase] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  const navigation = useNavigation();
  const { gnonative } = useGnoNativeContext();
  const dispatch = useAppDispatch();
  const onboarding = useOnboarding();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setName("");
      setPassword("");
      setConfirmPassword("");
      inputRef.current?.focus();
      try {
        setPhrase(await gnonative.generateRecoveryPhrase());
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(phrase || "");
  };

  const onCreate = async () => {
    setError(undefined);
    if (!name || !password) {
      setError("Please fill out all fields");
      return;
    }

    // Use the same regex and error message as r/demo/users
    if (!name.match(/^[a-z]+[_a-z0-9]{5,16}$/)) {
      setError("Account name must be at least 6 characters, lowercase alphanumeric with underscore");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const newAccount = await gnonative.createAccount(name, phrase, password);
      if (!newAccount) throw new Error("Failed to create account");
      console.log("createAccount response: " + JSON.stringify(newAccount));

      await gnonative.selectAccount(name);
      await gnonative.setPassword(password);
      await onboarding.onboard(newAccount.name, newAccount.address);
      await dispatch(loggedIn({ keyInfo: newAccount }));
      router.push("/home");
    } catch (error) {
      RNAlert.alert("Error", "" + error);
      setError("" + error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Container>
      <Layout.Body>
        <ScrollView>
          <View style={styles.main}>
            <Text style={styles.title}>Create your account</Text>
            <View style={{ minWidth: 200, paddingTop: 8 }}>
              <Spacer />
              <TextInput
                ref={inputRef}
                placeholder="Account Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                error={error}
              />
            </View>
            <View style={{ minWidth: 200, paddingTop: 8 }}>
              <Text>Your seed phrase:</Text>
              <Spacer />
              <Text>{phrase}</Text>
              <RNButton title="copy" onPress={copyToClipboard} />
              <Spacer />
              <Alert severity="error" message={error} />
              <Spacer />
              <Button.TouchableOpacity title="Create" onPress={onCreate} variant="primary" loading={loading} />
              <Spacer space={16} />
              <Button.TouchableOpacity title="Back" onPress={() => router.back()} variant="secondary" disabled={loading} />
            </View>
          </View>
        </ScrollView>
      </Layout.Body>
    </Layout.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
