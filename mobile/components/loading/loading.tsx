import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Text from "../text";
import { Layout } from "..";

type Props = {
  message: string;
};

export const Loading: React.FC<Props> = ({ message }) => {
  return (
    <Layout.Container>
      <Layout.Body>
        <ViewCenter>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text.Body>{message}</Text.Body>
        </ViewCenter>
      </Layout.Body>
    </Layout.Container>
  );
};

const ViewCenter = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default Loading;
