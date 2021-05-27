import React, { useEffect, useState, useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Input } from "react-native-elements";
import Map from "../components/Map";
import * as Location from "expo-location";
import { Context as LocationContext } from "../context/LocationContext";
import api from "../services/api";
import { AntDesign } from "@expo/vector-icons";

const TrackCreateScreen = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("NoStart");
  const { addLocation, startRecording, stopRecording, resetTracks, state } =
    useContext(LocationContext);

  const startWatchingCurrent = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      addLocation(location, false);
    } catch (e) {
      setError(e);
    }
  };

  const startWatching = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      addLocation(location, true);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    startWatchingCurrent();
  }, []);

  const saveTrack = async () => {
    let locs = state.locations;
    console.log(locs);
    await api.post("/tracks", { name, locations: locs });
    console.log("saved");
    resetTracks();
    setRecordingStatus("NoStart");
    setName("");
  };
  return (
    <SafeAreaProvider>
      <Text h3 style={{ marginLeft: 10, marginTop: 10 }}>
        Create Track
      </Text>
      <Map />
      {error ? <Text>Please grant location perimission</Text> : null}
      {recordingStatus === "NoStart" ? (
        <Button
          title="Start Recording"
          buttonStyle={{ marginVertical: 20, marginHorizontal: 10 }}
          onPress={() => {
            setRecordingStatus("Recording");
            startWatching();
            startRecording();
          }}
        />
      ) : null}
      {recordingStatus === "Recording" ? (
        <Button
          title="Stop Recording"
          buttonStyle={{ marginVertical: 20, marginHorizontal: 10 }}
          onPress={() => {
            setRecordingStatus("RecordStop");
            stopRecording();
            startWatchingCurrent();
          }}
        />
      ) : null}
      {recordingStatus === "RecordStop" ? (
        <Input
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          label="Track Name"
        />
      ) : null}
      {recordingStatus === "RecordStop" ? (
        <Button
          title="Save Track"
          buttonStyle={{ marginVertical: 20, marginHorizontal: 10 }}
          onPress={() => {
            saveTrack();
          }}
        />
      ) : null}
      {recordingStatus === "RecordStop" ? (
        <Button
          title="Discard"
          buttonStyle={{ marginVertical: 5, marginHorizontal: 10 }}
          onPress={() => {
            resetTracks();
            setRecordingStatus("NoStart");
          }}
        />
      ) : null}
    </SafeAreaProvider>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <AntDesign name="pluscircleo" size={24} color="black" />,
};

export default TrackCreateScreen;
