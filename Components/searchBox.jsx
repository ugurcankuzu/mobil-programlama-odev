import {
  Box,
  Button,
  Flex,
  Text
} from "@react-native-material/core";

import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TextInput, View } from "react-native";
import bg from "../assets/bg.jpeg";
import { Colors } from "../util";

export default function SearchBox({handleResults,results,navigation}) {
  const [searchQuery,setSearchQuery] = useState("");
  useEffect(()=>{
    handleResults(searchQuery);
  },[searchQuery])
  return (
    <Flex style={styles.searchContainer}>
      <ImageBackground source={bg} style={styles.background} blurRadius={5}>
        <Box style={styles.blackFilter} />
        <Flex style={styles.searchContent} direction="column">
          <Text variant="h2" color={Colors.main}>
            SkySense
          </Text>
          <Text variant="subtitle1" color={Colors.main}>
            Anywhere, Anytime...
          </Text>
          <Flex style={styles.searchSection} direction="column">
            <Flex direction="row" style={styles.searchController}>
              <View style={{backgroundColor: Colors.background,width:"70%",borderRadius: 5,paddingHorizontal:10}}><TextInput value={searchQuery} onChangeText={setSearchQuery} style={styles.searchInput} placeholder="Enter a city name..." /></View>
              <Button style={styles.searchButton} title="GO" onPress={ async ()=>{
                if(Array.isArray(results) && results.length > 0){
                  navigation.navigate("forecastPage", {name: results[0].name})
                }
              }} />
            </Flex>
          </Flex>
        </Flex>
      </ImageBackground>
    </Flex>
  );
}

const styles = StyleSheet.create({
  scrollResults:{
    position:"absolute",
    bottom: -65,
    width: "100%",
    maxHeight: 250,
    backgroundColor: Colors.background
  },
  searchController: {
    width: "100%",
    height: 50,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    
  },
  searchButton: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.main
  },
  searchSection: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  searchInput: {
    width: "100%",
    height: "100%",
  },
  blackFilter: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },

  searchContent: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingHorizontal: 15,
    paddingVertical: 30,
    zIndex: 2,
  },
  searchContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
    left: 0,
    top: 0,
  },
});
