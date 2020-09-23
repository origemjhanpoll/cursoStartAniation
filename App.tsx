import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Animated, {
  timing,
  Value,
  Easing,
  cond,
  interpolate,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const CARD_ASPECT_RATIO = width / height;
export const CARD_WIDTH = width - 64;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  const [press, setPress] = useState(false);
  const ref = useRef(new Value(0)).current;

  const Card = useCallback(() => {
    return (
      <Animated.Image
        source={require("./assets/card1.png")}
        style={{
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          borderRadius: 18,
          aspectRatio: CARD_ASPECT_RATIO,
          transform: [
            // {
            //   translateY: interpolate(ref, {
            //     inputRange: [0, 1],
            //     outputRange: [0, 100],
            //   }),
            // },
            {
              translateY: ref,
            },
          ],
        }}
        resizeMode="contain"
      />
    );
  }, []);

  const Button = () => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#3884ff",
          width: "100%",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPress={() => {
          setPress((prev) => !prev);
          // ref.setValue(1);
          if (!press) {
            timing(ref, {
              toValue: 0,
              duration: 200,
              easing: Easing.inOut(Easing.ease),
            }).start();
          }
          timing(ref, {
            toValue: 100,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          }).start();
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          {press ? "Baixo" : "Cima"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Card />
      </View>
      <Button />
    </>
  );
}
