import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

import ButtonCalculator from "./src/components/ButtonCalculator";
import buttons from "./src/resources/buttons";
import fonts from "./src/styles/fonts";

type ButtonProps = {
  value: string;
  type: string;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });
  const [result, setResult] = useState("");
  const [countDisplay, setCountDisplay] = useState("");
  const [viewResult, setViewResult] = useState(false);

  const calculateResult = () => {
    const text = result;
    const calc = eval(text);
    setCountDisplay(result);
    setResult((calc || "") + "");
    setViewResult(true);
  };

  const handleClear = () => {
    setCountDisplay("");
    setResult("");
  };

  const handleBackspace = () => {
    if (!viewResult) {
      setResult(result.slice(0, -1));
    }
  };

  const handlePercentage = () => {
    const arrayResults = result.split(" ");
    let percentageNumber;
    let countPercentage;

    for (let i = 0; i <= arrayResults.length; i++) {
      if (arrayResults[i].includes("%")) {
        let number = arrayResults[i].split("%");
        percentageNumber = Number(number[0]) / 100;
        arrayResults.splice(i, 1);
        arrayResults.push(String(percentageNumber));
        countPercentage = arrayResults.join(" ");
        break;
      } else {
        i++;
      }
    }

    setCountDisplay(result);
    setResult(eval(String(countPercentage)));
  };

  const handleClickButtons = ({ type, value }: ButtonProps) => {
    switch (type) {
      case "input":
        setViewResult(false);
        setCountDisplay("");
        if (viewResult) {
          setResult(value);
        } else {
          if (result.length > 10) {
            Alert.alert("You are going over the character limit!");
          } else {
            setResult(result + value);
          }
        }
        break;
      case "operator":
        setViewResult(false);
        setCountDisplay("");
        setResult(result + ` ${value} `);
        break;
      case "percentage":
        setResult(result + value);
        break;
      case "equal":
        if (result.includes("%")) {
          handlePercentage();
        } else if (result[result.length - 1] === " ") {
          Alert.alert(
            "You are trying to make an invalid account, please try again!"
          );
        } else if (result[result.length - 1] === "+") {
          Alert.alert(
            "You are trying to make an invalid account, please try again!"
          );
        } else if (result[result.length - 1] === "-") {
          Alert.alert(
            "You are trying to make an invalid account, please try again!"
          );
        } else if (result[result.length - 1] === "*") {
          Alert.alert(
            "You are trying to make an invalid account, please try again!"
          );
        } else if (result[result.length - 1] === "/") {
          Alert.alert(
            "You are trying to make an invalid account, please try again!"
          );
        } else {
          calculateResult();
        }
        break;
      case "clear":
        handleClear();
        break;
      case "backspace":
        handleBackspace();
        break;
      default:
        break;
    }
  };

  if (!fontsLoaded) {
    return;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.countContainer}>
        <Text style={styles.countText}>{countDisplay}</Text>
        <View style={styles.resultContainer}>
          {result ? (
            <>
              <Text style={styles.resultTextEqual}>=</Text>
              <Text style={styles.resultText}>{result}</Text>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((button) => (
          <ButtonCalculator
            key={button.value}
            typeButton={button.type}
            title={button.value}
            onPress={() => handleClickButtons(button)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2A37",
    justifyContent: "flex-end",
  },
  countContainer: {
    alignSelf: "flex-end",
    marginBottom: 35,
    marginRight: 40,
  },
  countText: {
    color: "#6B6B6B",
    fontSize: 25,
    alignSelf: "flex-end",
  },
  resultContainer: {
    width: 345,
    height: 65,
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  resultTextEqual: {
    color: "#EBEBEB",
    fontSize: 42,
    fontFamily: fonts.regular,
    alignSelf: "flex-end",
  },
  resultText: {
    color: "#EBEBEB",
    fontSize: 42,
    marginLeft: 15,
    fontFamily: fonts.regular,
    alignSelf: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
