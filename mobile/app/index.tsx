import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/components/index";
import { getInitialState, selectAction, selectInitialized, selectMasterPassword, changeMasterPass, useAppDispatch, useAppSelector, createMasterPass } from "@/redux";
import * as Application from "expo-application";
import SignInView from "@/views/signin";
import SignUpView from "@/views/signup";
import { Container, Text } from "@/modules/ui-components";

export default function Root() {
  const route = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();

  const appVersion = Application.nativeBuildVersion;

  const appInitialized = useAppSelector(selectInitialized)
  const hasMasterPassword = useAppSelector(selectMasterPassword)
  const action = useAppSelector(selectAction);

  useEffect(() => {
    dispatch(getInitialState())
  }, []);

  const onCreateMasterPass = async (masterPassword: string) => {
    try {
      await dispatch(createMasterPass({ masterPassword })).unwrap()

      naviateTo()

    } catch (error: any) {
      console.log("error", error.message);
      setError(error?.message);
    }
  }

  const onUnlokPress = async (masterPassword: string) => {
    try {
      await dispatch(changeMasterPass({ masterPassword })).unwrap()

      naviateTo()

    } catch (error: any) {
      console.log("error", error.message);
      setError(error?.message);
    }
  };

  const naviateTo = () => {
    if (action) {
      route.replace(action);
    } else {
      route.replace("/home");
    }
  }

  if (!appInitialized) {
    return (
      // TODO: avoid flickering
      <Layout.Container>
        <Layout.Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text.Body>Loading App...</Text.Body>
        </Layout.Body>
      </Layout.Container>
    );
  }

  return (
    <Container>
      <Layout.Container>
        <Layout.BodyAlignedBotton>
          <View style={{ alignItems: "center" }}>
            <Text.H1  style={{textAlign: "center" }} >GnoKey Mobile</Text.H1>
            <Text.Body>The Gno Key Management Tool</Text.Body>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              style={{ flex: 1 }}>
              {hasMasterPassword ? <SignInView onUnlokPress={onUnlokPress} error={error} /> : null}
              {!hasMasterPassword ? <SignUpView onCreateMasterPress={onCreateMasterPass} error={error} /> : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </Layout.BodyAlignedBotton>
      </Layout.Container>
    </Container>
  );
}
