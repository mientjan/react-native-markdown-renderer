import React from "react";
import { StyleSheet, Text, View, ScrollView, Picker } from "react-native";

const rules = {
  checkbox: (node, children, parents, style) => {
    return (
      <View
        style={{ flexDirection: "row", borderWidth: 1, borderColor: "#000000" }}
        key={node.key}
      >
        {children}
      </View>
    );
  },
  checkbox_input: (node, children, parents, style) => {
    return (
      <View
        key={node.key}
        style={{
          borderRadius: 20,
          backgroundColor: "blue",
          width: 20,
          height: 20,
          marginRight: 10
        }}
      />
    );
  },
  label: (node, children, parents, style) => {
    return <Text key={node.key}>{children}</Text>;
  }
};
export default rules;
