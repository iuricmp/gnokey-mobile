import Alert from "@/components/alert";
import Spacer from "@/components/spacer";
import TextInput from "@/components/textinput";
import { Button, TextField } from "@/modules/ui-components";
import { useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";

export interface Props {
  onUnlokPress: (password: string) => void;
  error?: string;
}

const SignInView: React.FC<Props> = ({ onUnlokPress, error }) => {

  const inputRef = useRef<RNTextInput>(null);
  const [password, setPassword] = useState("");

  return (
    <>
    <TextField placeholder={`Master password`} secureTextEntry={true} onChangeText={setPassword} />
      <TextInput
        ref={inputRef}
        placeholder={`Master password`}
        error={error}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Alert severity="error" message={error} />
      <Spacer space={8} />
      <Button onPress={() => onUnlokPress(password)} color="primary">Unlock</Button>
    </>
  );
}

export default SignInView;
