import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import fonts from "../styles/fonts";
import Feather from "@expo/vector-icons/Feather";

interface Props extends TouchableOpacityProps {
  title: string;
  typeButton: string;
}

const ButtonCalculator = ({ title, typeButton, ...rest }: Props) => {
  const handleIconsOperations = () => {
    if (typeButton === "backspace") {
      return <Feather name="arrow-left" size={30} />;
    }
    if (title === "*") {
      return <Feather name="x" size={30} />;
    }
    if (title === "/") {
      return <Feather name="divide" size={30} />;
    }
    if (title === "+") {
      return <Feather name="plus" size={30} />;
    }
    if (title === "%") {
      return <Feather name="percent" size={30} />;
    }
    if (title === "-") {
      return <Feather name="minus" size={30} />;
    } else {
      return title;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        typeButton === "equal" && { minWidth: 180, backgroundColor: "#7F45E2" },
        typeButton === "operator" && { backgroundColor: "#462878" },
      ]}
      {...rest}
    >
      <Text
        style={[styles.text, typeButton === "clear" && { color: "#975DFA" }]}
      >
        {handleIconsOperations()}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCalculator;

const styles = StyleSheet.create({
  container: {
    minWidth: 85,
    minHeight: 85,
    flex: 2,
    backgroundColor: "#393643",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#2D2A37",
  },
  text: {
    fontSize: 26,
    color: "#EBEBEB",
    fontFamily: fonts.regular,
  },
});
