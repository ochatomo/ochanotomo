import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import MatchList from "./MatchList";

export default function MatchPage({ userInfo, setNewUser, navigation }) {
  const [allUsers, setAllUsers] = useState([
    {
      name: "tanuki",
    },
    {
      name: "kitsune",
    },
  ]);
  const [currentIdx, setIdx] = useState(0);

  const handleLike = () => {
    // save like

    // check user2's likes

    // あれば、お互いのマッチに相手のidを追記

    setIdx(currentIdx + 1);
  };
  const handleDislike = () => {
    setIdx(currentIdx + 1);
  };
  useEffect(() => {
    // MVP: get all users
    // setUsersする
    // 最終的には趣味＋ロケーションでスコア付けする
    //　高い順に並び替え
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="プロフィールを編集する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
      <Button
        onPress={() => {
          navigation.navigate("MatchList");
        }}
        title="マッチを確認する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
      <Text>{allUsers[currentIdx].name} </Text>
      <Button onPress={handleLike} title="○" color="#841584" />
      <Button onPress={handleDislike} title="X" color="#841584" />
    </View>
  );
}
