import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import SearchBox from "../Components/searchBox";
import SearchResults from "../Components/searchResults";
import TopCities from "../Components/topCities";
import { createQuerySearch } from "../util";
export default function HomeScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const handleResults = async (searchQuery) => {
    try {
      const result = await fetch(createQuerySearch(searchQuery));
      const data = await result.json();
      setResults(data);
    } catch (error) {
      console.log("something went wrong: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={false}
      style={styles.homeScreen}
    >
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <SearchBox
              handleResults={handleResults}
              results={results}
              navigation={navigation}
            />
          </View>

          <View style={{ width: "100%",height:80, paddingHorizontal: 15, paddingVertical: 15 }}>
            <SearchResults navigation={navigation} results={results} />
          </View>
          <View style={{ width:"100%",height:"100%",paddingHorizontal:15}}>
            <TopCities navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
});
