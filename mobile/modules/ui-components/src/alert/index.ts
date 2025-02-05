import { Text } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'

export const ErrorBox = styled(Text)`
	display: flex;
	text-align: center;
	font-size: 14px;
	border-radius: ${(props: DefaultTheme) => props.theme.borderRadius || 40}px;
	padding: 12px;
	color: black;
	background-color: ${({ theme }: { theme: DefaultTheme }) => theme.error.background};
`
