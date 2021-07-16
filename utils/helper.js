import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyle";

export const generateInterestLabel = (interests) => {
  if (interests.length === 0) return "";

  return interests.map((interest, index) => (
    <View style={globalStyles.flexRow} key={index}>
      <Text style={globalStyles.smallCategoryLabel} key={index}>
        {categoryTable[interest.category]}
      </Text>
      <Text style={globalStyles.smallHobbyLabel} key={index}>
        {interestTable[interest.category][interest.hobby]}
      </Text>
    </View>
  ));
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
