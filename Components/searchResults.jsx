import { Button, Flex, Text } from "@react-native-material/core";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../util";

export default function SearchResults({ results, navigation }) {
  return (
    <Flex style={styles.resultsContainer}>
      <ScrollView horizontal>
        {Array.isArray(results) &&
          results.length > 0 &&
          results.map((result) => (
            <View key={result.id} style={styles.result}>
              <Button
                style={styles.resultButton}
                title={result.name}
                onPress={() => {
                  navigation.navigate("forecastPage", { name: result.url });
                }}
                trailing={() => (
                  <Text variant="subtitle1">{result.country}</Text>
                )}
              />
            </View>
          ))}
      </ScrollView>
    </Flex>
  );
}

const styles = StyleSheet.create({
  resultButton: {
    backgroundColor: Colors.main,
    elevation: 5,
    height: 50,
    justifyContent: "center"
  },

  resultsContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  result: {
    flex: 1,
    marginHorizontal: 5,
  },
});
