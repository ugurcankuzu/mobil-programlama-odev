import {
    Avatar,
    Divider,
    Flex,
    Surface,
    Text,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors, createQueryCurrent, createQueryForecast } from "../util";

export default function ForecastPage({ route }) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  function formatDate(dateString) {
    var parts = dateString.split("-");

    var year = parts[0];
    var month = parts[1];
    var day = parts[2];

    var formattedDate = day + "/" + month + "/" + year;

    return formattedDate;
  }
  const getCurrent = async () => {
    const result = await fetch(createQueryCurrent(route.params.name));
    const data = await result.json();
    setCurrent(data);
    return data;
  };
  const getForecast = async () => {
    const result = await fetch(createQueryForecast(route.params.name, 3));
    const data = await result.json();
    setForecast(data);
    return data;
  };
  const parallelFetcher = async () => {
    const requests = [getCurrent(), getForecast()];
    const data = await Promise.all(requests);
  };
  useEffect(() => {
    parallelFetcher();
  }, []);
  return (
    <ScrollView style={styles.forecastPage}>
      <View style={styles.pageContainer}>
        {current && (
          <Flex style={styles.current}>
            <Surface elevation={10} style={styles.currentCard}>
              <Flex>
                <Text variant="h2" color={Colors.background}>
                  {current.location.name}{" "}
                  <Text variant="h3" color={Colors.transition}>
                    {current.current.temp_c}°
                  </Text>
                </Text>
                <Flex
                  direction="row"
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    color={Colors.main}
                    image={{ uri: `https:${current.current.condition.icon}` }}
                  />
                  <Divider style={{ marginLeft: 10 }} />
                  <Text color={Colors.background} variant="subtitle1">
                    {current.current.condition.text}
                  </Text>
                </Flex>
              </Flex>
            </Surface>
          </Flex>
        )}
        {forecast && (
          <>
            <Text variant="h2">Forecasts</Text>
            <Flex style={{ flex: 1, gap: 20 }}>
              {forecast.forecast.forecastday.map((day,index) => (
                <Surface key={index} elevation={10} style={styles.forecastCard}>
                  <Flex style={{ flex: 1 }}>
                    <Text variant="h4" color={Colors.background}>
                      {formatDate(day.date)}
                    </Text>
                    <Flex direction="row" style={{ alignItems: "center" }}>
                      <Avatar
                        color={Colors.main}
                        image={{ uri: `https:${day.day.condition.icon}` }}
                      />
                      <Flex style={{ flex: 1, justifyContent: "center" }}>
                        <Text variant="subtitle1" color={Colors.background}>
                          {day.day.mintemp_c}° - {day.day.maxtemp_c}°
                        </Text>
                        <Text variant="subtitle1" color={Colors.background}>
                          {day.day.condition.text}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Surface>
              ))}
            </Flex>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  forecastCard: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.main,
    borderRadius: 5,
  },
  currentCard: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.main,
  },
  current: {
    width: "100%",
  },
  pageContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  forecastPage: {
    flexGrow: 1,
  },
});
