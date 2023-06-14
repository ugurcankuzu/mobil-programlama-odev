import { Avatar, Flex, Pressable, Text } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, createQueryCurrent } from "../util";

export default function TopCities({navigation}) {
  const topCities = [
    "London",
    "Paris",
    "Istanbul",
    "Tokyo",
    "Washington",
    "Moscow",
  ];
  const [citiesCurrent, setCitiesCurrent] = useState([]);
  const fetchCityData = async (city) => {
    const result = await fetch(createQueryCurrent(city));
    const data = await result.json();
    return data;
  };
  const fetchAllCities = async () => {
    const cityDatas = topCities.map((city) => fetchCityData(city));
    const parallelRequest = await Promise.all(cityDatas);
    setCitiesCurrent(parallelRequest);
  };
  useEffect(() => {
    fetchAllCities();
  }, []);
  return (
    <Flex style={{ flex: 1 }}>
      <Text variant="h2">Top Cities</Text>
      <Text style={{ marginBottom: 30 }} variant="subtitle1">
        From all over the world...
      </Text>
      {Array.isArray(citiesCurrent) &&
        citiesCurrent.length > 0 &&
        citiesCurrent.map((city, index) => (
          <View key={index} style={{ width: "100%", marginBottom: 10 }}>
            <Pressable style={styles.topCitiesCard} onPress={()=>{
                navigation.navigate("forecastPage",{name: city.location.name})
            }}>
              <Flex style={{ justifyContent: "center" }}>
                <Text variant="h4" color={Colors.background}>
                  {city.location.name}
                </Text>
                <Flex style={{ alignItems: "center",gap:10 }} direction="row">
                  <Avatar
                    color={Colors.main}
                    image={{ uri: `https:${city.current.condition.icon}` }}
                  />
                  <Flex style={{ justifyContent: "center",gap:5 }}>
                    <Text variant="subtitle1" color={Colors.background}>
                      {city.current.temp_c}°
                    </Text>
                    <Text variant="subtitle1" color={Colors.background}>
                      {city.current.condition.text}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Pressable>
          </View>
        ))}
    </Flex>
  );
}

const styles = StyleSheet.create({
  topCitiesCard: {
    backgroundColor: Colors.main,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
