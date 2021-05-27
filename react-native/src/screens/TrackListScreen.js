import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ListItem } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";

import api from "../services/api";

const TrackListScreen = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <Text h3 style={{ marginLeft: 10, marginVertical: 10 }}>
        My Tracks
      </Text>
      <NavigationEvents
        onWillFocus={async () => {
          const res = await api.get("/tracks");
          setTracks(res.data);
        }}
      />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("TrackDetailScreen", { item })}
            >
              <ListItem
                style={{
                  borderBottomColor: "#c0c4c2",
                  borderBottomWidth: 0.7,
                  borderTopColor: "#c0c4c2",
                  borderTopWidth: 0.7,
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

TrackListScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
export default TrackListScreen;
