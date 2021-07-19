import React from "react";
import { View, Text, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyle";

export const generateInterestLabel = (interests) => {
  if (interests.length === 0) return "";

  return interests.map((interest, index) => (
    <View style={globalStyles.flexRow} key={index}>
      <Text style={globalStyles.smallCategoryLabel}>
        {categoryTable[interest.category]}
      </Text>
      <Text style={globalStyles.smallHobbyLabel}>
        {interestTable[interest.category][interest.hobby] || "その他"}
      </Text>
    </View>
  ));
};

export const createAlert = (
  title,
  message,
  callback = () => console.log("alert closed")
) => {
  Alert.alert(title, message, [{ text: "OK", onPress: callback }]);
};

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const categoryTable = {
  0: "音楽系",
  1: "鑑賞系",
  2: "美容系",
  3: "旅行系",
  4: "スポーツ系",
  5: "アウトドア系",
  6: "ゲーム系",
  7: "制作系",
  8: "育成系",
  9: "飲食系",
  10: "スキル系",
  11: "乗り物系",
  12: "芸術系",
};

export const interestTable = {
  0: ["音楽ライブ", "カラオケ", "ジャズ", "クラシック", "楽器", "その他"],
  1: [
    "映画",
    "ドラマ",
    "アニメ",
    "歌舞伎",
    "バレエ",
    "オペラ",
    "美術館",
    "博物館",
    "その他",
  ],
  2: ["メイク・スキンケア", "瞑想", "ヨガ ", "アロマテラピー", "ネイルアート ", "その他"],
  3: [
    "温泉巡り",
    "動物園巡り",
    "水族館巡り",
    "バー巡り",
    "寺巡り",
    "パワースポット巡り",
    "カフェ巡り",
    "その他",
  ],
  4: [
    "ランニング（ジョギング）",
    "ゴルフ",
    "サーフィン",
    "ダンス",
    "野球",
    "サッカー",
    "バスケットボール",
    "バレーボール",
    "スポーツ観戦",
    "ビリヤード",
    "筋トレ",
    "ゲートボール",
    "その他",
  ],
  5: ["登山", "キャンプ", "海", "散歩", "釣り", "その他"],
  6: [
    "テレビゲーム",
    "携帯ゲーム",
    "トランプ",
    "チェス",
    "将棋",
    "囲碁",
    "オセロ",
    "ボードゲーム",
    "百人一首",
    "花札",
    "その他",
  ],
  7: [
    "DIY",
    "裁縫",
    "料理",
    "イラスト",
    "ハンドメイド（ものづくり）",
    "プラモデル",
    "その他",
  ],
  8: ["栽培", "ガーデニング（園芸）", "アクアリウム（熱帯魚等）", "ペット", "その他"],
  9: ["酒", "和食", "洋食", "グルメ", "スイーツ", "その他"],
  10: ["外国語", "プログラミング", "マジック", "占い", "ブログ", "投資", "その他"],
  11: ["車", "バイク", "電車", "飛行機", "その他"],

  12: [
    "折り紙",
    "絵画",
    "書道（習字）",
    "俳句・川柳",
    "生花",
    "彫刻",
    "茶道",
    "写真",
    "その他",
  ],
};

export const prefectureList = {
  1: "北海道",
  2: "青森県",
  3: "岩手県",
  4: "宮城県",
  5: "秋田県",
  6: "山形県",
  7: "福島県",
  8: "茨城県",
  9: "栃木県",
  10: "群馬県",
  11: "埼玉県",
  12: "千葉県",
  13: "東京都",
  14: "神奈川",
  15: "新潟県",
  16: "富山県",
  17: "石川県",
  18: "福井県",
  19: "山梨県",
  20: "長野県",
  21: "岐阜県",
  22: "静岡県",
  23: "愛知県",
  24: "三重県",
  25: "滋賀県",
  26: "京都府",
  27: "大阪府",
  28: "兵庫県",
  29: "奈良県",
  30: "和歌山",
  31: "鳥取県",
  32: "島根県",
  33: "岡山県",
  34: "広島県",
  35: "山口県",
  36: "徳島県",
  37: "香川県",
  38: "愛媛県",
  39: "高知県",
  40: "福岡県",
  41: "佐賀県",
  42: "長崎県",
  43: "熊本県",
  44: "大分県",
  45: "宮崎県",
  46: "鹿児島",
  47: "沖縄県",
};
