import React from "react";
import { View } from "react-native";

import NotesComponent from "./notes/Notes";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <NotesComponent />
    </View>
  );
}
