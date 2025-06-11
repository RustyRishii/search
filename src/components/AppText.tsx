import { Text, TextProps } from "react-native";

export default function AppText(props: TextProps) {
  return <Text style={[{ fontFamily: "Inter" }, props.style]} {...props} />;
}
