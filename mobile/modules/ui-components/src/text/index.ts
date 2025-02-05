import { TextProps } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'
import { ButtonColor } from '../../index'

export const H1 = styled.Text`
	font-weight: 400;
	font-size: 64px;
	line-height: 64px;
	letter-spacing: -0.32px;
	color: ${(props: DefaultTheme) => props.theme.colors.black};
`

export const H2 = styled.Text`
	font-weight: 400;
	font-size: 22px;
	letter-spacing: -0.32px;
	color: ${(props: DefaultTheme) => props.theme.colors.primary};
`
export type H2 = typeof H2

export const Body = styled.Text<TextProps>`
	font-weight: 400;
	font-size: 16px;
	letter-spacing: -0.32px;
	color: ${(props: DefaultTheme) => props.theme.colors.black};
`

export const ButtonLabel = styled.Text<{ $color?: ButtonColor }>`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.32px;
	color: ${(props: DefaultTheme) => (props.$color ? props.theme.buttons.label[props.$color] : props.theme.buttons.label.primary)};
`
