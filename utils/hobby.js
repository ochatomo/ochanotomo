// cat0 音楽系
//   hob0 音楽ライブ
//   hob1 カラオケ
//   hob2 ジャズ
//   hob3 クラシック
//   hob4 楽器

// cat1 鑑賞系
//   hob0 映画
//   hob1 ドラマ
//   hob2 アニメ
//   hob3 歌舞伎
//   hob4 バレエ
//   hob5 オペラ
//   hob6 美術館
//   hob7 博物館

// cat2 美容系
//   hob0 メイク・スキンケア
//   hob1 瞑想
//   hob2 ヨガ
//   hob3 アロマテラピー
//   hob4 ネイルアート

// cat3 旅行系
//   hob0 温泉巡り
//   hob1 動物園巡り
//   hob2 水族館巡り
//   hob3 バー巡り
//   hob4 寺巡り
//   hob5 パワースポット巡り
//   hob6 カフェ巡り

// cat4 スポーツ系
//   hob0 ランニング（ジョギング）
//   hob1 ゴルフ
//   hob2 サーフィン
//   hob3 ダンス
//   hob4 野球
//   hob5 サッカー
//   hob6 バスケットボール
//   hob7 バレーボール
//   hob8 スポーツ観戦
//   hob9 ビリヤード
//   hob10 筋トレ
//   hob11 ゲートボール

// cat5 アウトドア系
//   hob0 登山
//   hob1 キャンプ
//   hob2 海
//   hob3 散歩
//   hob4 釣り

// cat6 ゲーム系
//   hob0 テレビゲーム
//   hob1 携帯ゲーム
//   hob2 トランプ
//   hob3 チェス
//   hob4 将棋
//   hob5 囲碁
//   hob6 オセロ
//   hob7 ボードゲーム
//   hob8 百人一首
//   hob9 花札

// cat7 制作系
//   hob0 DIY
//   hob1 裁縫
//   hob2 料理
//   hob3 イラスト
//   hob4 ハンドメイド（ものづくり）
//   hob5 プラモデル

// cat8 育成系
//   hob0 栽培
//   hob1 ガーデニング（園芸）
//   hob2 アクアリウム（熱帯魚等）
//   hob3 ペット

// cat9 飲食系
//   hob0 酒
//   hob1 和食
//   hob2 洋食
//   hob3 グルメ
//   hob4 スイーツ

// cat10 スキル系
//   hob0 外国語
//   hob1 プログラミング
//   hob2 マジック
//   hob3 占い
//   hob4 ブログ
//   hob5 投資

// cat11 乗り物系
//   hob0 車
//   hob1 バイク
//   hob2 電車
//   hob3 飛行機

// cat12 芸術系
//   hob0 折り紙
//   hob1 絵画
//   hob2 書道（習字）
//   hob3 俳句・川柳
//   hob4 生花
//   hob5 彫刻
//   hob6 茶道
//   hob7 写真

const cat0 = {
  hob0: {
    hob1: 0.5255978,
    hob2: 0.44604325,
    hob3: 0.33569548,
    hob4: 0.3274076,
  },
  hob1: {
    hob2: 0.42204642,
    hob3: 0.36943266,
    hob4: 0.34317958,
  },
  hob2: {
    hob3: 0.65393555,
    hob4: 0.53552353,
  },
  hob3: {
    hob4: 0.37821883,
  },
};

const cat1 = {
  hob0: {
    hob1: 0.67801034,
    hob2: 0.6084819,
    hob3: 0.39838642,
    hob4: 0.5081558,
    hob5: 0.5494599,
    hob6: 0.33062002,
    hob7: 0.19672626,
  },
  hob1: {
    hob2: 0.66946375,
    hob3: 0.34478405,
    hob4: 0.3592724,
    hob5: 0.4036603,
    hob6: 0.17284048,
    hob7: 0.04273441,
  },
  hob2: {
    hob3: 0.28921285,
    hob4: 0.33863297,
    hob5: 0.3281287,
    hob6: 0.1679415,
    hob7: 0.053176217,
  },
  hob3: {
    hob4: 0.49880165,
    hob5: 0.5302275,
    hob6: 0.22277136,
    hob7: 0.054442454,
  },
  hob4: {
    hob5: 0.80769885,
    hob6: 0.38803783,
    hob7: 0.22000735,
  },
  hob5: {
    hob6: 0.4351108,
    hob7: 0.26412407,
  },
  hob6: {
    hob7: 0.7949991,
  },
};

const cat2 = {
  hob0: {
    hob1: 0.22649731392850875,
    hob2: 0.2852728255054474,
    hob3: 0.41258740498100277,
    hob4: 0.490218105376091,
  },
  hob1: {
    hob2: 0.4989651,
    hob3: 0.20953977,
    hob4: 0.08392889,
  },
  hob2: {
    hob3: 0.45290974,
    hob4: 0.3879399,
  },
  hob3: {
    hob4: 0.5645913,
  },
};

const cat3 = {
  hob0: {
    hob1: 0.35516953,
    hob2: 0.47313768,
    hob3: 0.25066593,
    hob4: 0.26757595,
    hob5: 0.46404094,
    hob6: 0.35249645,
  },
  hob1: {
    hob2: 0.7965042,
    hob3: 0.27659103,
    hob4: 0.20297107,
    hob5: 0.23098555,
    hob6: 0.4405636,
  },
  hob2: {
    hob3: 0.30486825,
    hob4: 0.16810031,
    hob5: 0.4018068,
    hob6: 0.5401584,
  },
  hob3: {
    hob4: 0,
    hob5: 0.25412282,
    hob6: 0.6714847,
  },
  hob4: {
    hob5: 0.2253286,
    hob6: 0.024178823,
  },
  hob5: {
    hob6: 0.3558858,
  },
};

const cat4 = {
  hob0: {
    hob1: 0.6557404,
    hob2: 0.59893197,
    hob3: 0.49850202,
    hob4: 0.5124646,
    hob5: 0.46374696,
    hob6: 0.5352419,
    hob7: 0.50103444,
    hob8: 0.4250065,
    hob9: 0.51636815,
    hob10: 0.56341994,
    hob11: 0.356464,
  },
  hob1: {
    hob2: 0.69679374,
    hob3: 0.5225894,
    hob4: 0.6213392,
    hob5: 0.5664524,
    hob6: 0.6752299,
    hob7: 0.6095917,
    hob8: 0.6415127,
    hob9: 0.7105544,
    hob10: 0.6047361,
    hob11: 0.45966244,
  },
  hob2: {
    hob3: 0.6241454,
    hob4: 0.44117668,
    hob5: 0.46199194,
    hob6: 0.5481093,
    hob7: 0.4749878,
    hob8: 0.5697191,
    hob9: 0.6217057,
    hob10: 0.5865836,
    hob11: 0.42236188,
  },
  hob3: {
    hob4: 0.42254937,
    hob5: 0.44382003,
    hob6: 0.5064338,
    hob7: 0.44603598,
    hob8: 0.37433013,
    hob9: 0.4819205,
    hob10: 0.5487839,
    hob11: 0.34957248,
  },
  hob4: {
    hob5: 0.7451848,
    hob6: 0.6521906,
    hob7: 0.5834787,
    hob8: 0.4054137,
    hob9: 0.46734977,
    hob10: 0.48888087,
    hob11: 0.32283276,
  },
  hob5: {
    hob6: 0.6772579,
    hob7: 0.65265733,
    hob8: 0.36779195,
    hob9: 0.4557804,
    hob10: 0.40458313,
    hob11: 0.3773547,
  },
  hob6: {
    hob7: 0.8063553,
    hob8: 0.546192,
    hob9: 0.55863416,
    hob10: 0.49763057,
    hob11: 0.45589867,
  },
  hob7: {
    hob8: 0.50638103,
    hob9: 0.4875998,
    hob10: 0.46277222,
    hob11: 0.4761555,
  },
  hob8: {
    hob9: 0.56600606,
    hob10: 0.68650633,
    hob11: 0.43613192,
  },
  hob9: {
    hob10: 0.5496267,
    hob11: 0.6844719,
  },
  hob10: {
    hob11: 0.40209514,
  },
};

const cat5 = {
  hob0: {
    hob1: 0.39690068,
    hob2: 0.22166084,
    hob3: 0.44889998,
    hob4: 0.56799865,
  },
  hob1: {
    hob2: 0.16103896,
    hob3: 0.32058635,
    hob4: 0.33765623,
  },
  hob2: {
    hob3: 0.27843955,
    hob4: 0.3733125,
  },
  hob3: {
    hob4: 0.54527515,
  },
};

const cat6 = {
  hob0: {
    hob1: 0.67137814,
    hob2: 0.34988758,
    hob3: 0.28479585,
    hob4: 0.35740635,
    hob5: 0.34837085,
    hob6: 0.46833798,
    hob7: 0.754883,
    hob8: 0.2265483,
    hob9: 0.40410554,
  },
  hob1: {
    hob2: 0.24573165,
    hob3: 0.11417998,
    hob4: 0.22183037,
    hob5: 0.19741604,
    hob6: 0.31044036,
    hob7: 0.57905287,
    hob8: 0.18943022,
    hob9: 0.3029169,
  },
  hob2: {
    hob3: 0.46341488,
    hob4: 0.279685,
    hob5: 0.20681682,
    hob6: 0.36576658,
    hob7: 0.40817416,
    hob8: 0.122546226,
    hob9: 0.46509948,
  },
  hob3: {
    hob4: 0.35015386,
    hob5: 0.368508,
    hob6: 0.49509603,
    hob7: 0.4193022,
    hob8: 0.15582983,
    hob9: 0.2796884,
  },
  hob4: {
    hob5: 0.81526667,
    hob6: 0.4873475,
    hob7: 0.38448176,
    hob8: 0.52817446,
    hob9: 0.48719737,
  },
  hob5: {
    hob6: 0.49925843,
    hob7: 0.33976492,
    hob8: 0.47141105,
    hob9: 0.44485956,
  },
  hob6: {
    hob7: 0.46511975,
    hob8: 0.4361738,
    hob9: 0.47992116,
  },
  hob7: {
    hob8: 0.3415958,
    hob9: 0.47786942,
  },
  hob8: {
    hob9: 0.4166439,
  },
};

const cat7 = {
  hob0: {
    hob1: 0.23397192,
    hob2: 0.1682953,
    hob3: 0.18395258,
    hob4: 0.47993535,
    hob5: 0.3381428,
  },
  hob1: {
    hob2: 0.41114163,
    hob3: 0.12242089,
    hob4: 0.40361106,
    hob5: 0.11500405,
  },
  hob2: {
    hob3: 0.2819556,
    hob4: 0.22454442,
    hob5: 0.14989142,
  },
  hob3: {
    hob4: 0.11446999,
    hob5: 0.5062137,
  },
  hob4: {
    hob5: 0.50770813,
  },
};

const cat8 = {
  hob0: {
    hob1: 0.61638445,
    hob2: 0.24148136,
    hob3: 0.24957861,
  },
  hob1: {
    hob2: 0.46879697,
    hob3: 0.35289836,
  },
  hob2: {
    hob3: 0.43462184,
  },
};

const cat9 = {
  hob0: {
    hob1: 0.51794505,
    hob2: 0.51678574,
    hob3: 0.30408806,
    hob4: 0.45341507,
  },
  hob1: {
    hob2: 0.8750135,
    hob3: 0.61492264,
    hob4: 0.7743473,
  },
  hob2: {
    hob3: 0.5576084,
    hob4: 0.7587448,
  },
  hob3: {
    hob4: 0.7395211,
  },
};

const cat10 = {
  hob0: {
    hob1: 0.39594027,
    hob2: 0.1221758,
    hob3: 0.229906,
    hob4: 0.1040463,
    hob5: 0.15304823,
  },
  hob1: {
    hob2: 0.27188355,
    hob3: 0.24084975,
    hob4: 0.21255656,
    hob5: 0.2748126,
  },
  hob2: {
    hob3: 0.42417702,
    hob4: 0.19885708,
    hob5: 0.06899712,
  },
  hob3: {
    hob4: 0.3292268,
    hob5: 0.074499495,
  },
  hob4: {
    hob5: 0.070364945,
  },
};

const cat11 = {
  hob0: {
    hob1: 0.5264584,
    hob2: 0.650542,
    hob3: 0.34081137,
  },
  hob1: {
    hob2: 0.48261058,
    hob3: 0.57307386,
  },
  hob2: {
    hob3: 0.46847674,
  },
};

const cat12 = {
  hob0: {
    hob1: 0.31106728,
    hob2: 0.4395376443862915,
    hob3: 0.4307889938354492,
    hob4: 0.36862537,
    hob5: 0.34906304,
    hob6: 0.36986202,
    hob7: 0.32733342,
  },
  hob1: {
    hob2: 0.44020453095436096,
    hob3: 0.3399878740310669,
    hob4: 0.28046227,
    hob5: 0.76369417,
    hob6: 0.45714295,
    hob7: 0.48954505,
  },
  hob2: {
    hob3: 0.5149026215076447,
    hob4: 0.292293735,
    hob5: 0.388398155,
    hob6: 0.7272919,
    hob7: 0.234422125,
  },
  hob3: {
    hob4: 0.24476117,
    hob5: 0.22281378,
    hob6: 0.50234456,
    hob7: 0.246557475,
  },
  hob4: {
    hob5: 0.29915217,
    hob6: 0.40109435,
    hob7: 0.2510335,
  },
  hob5: {
    hob6: 0.35771373,
    hob7: 0.3981981,
  },
  hob6: {
    hob7: 0.17336237,
  },
};

export const calcHobby = (category, hobby1, hobby2) => {
  let cat = Number(category);
  let hob1 = Number(hobby1);
  let hob2 = Number(hobby2);
  // console.log("CATTTTTTTTTTTT", { cat, hob1, hob2 });
  if (hob1 === hob2) return 1;
  if (hob1 > hob2) [hob1, hob2] = [hob2, hob1];
  return eval("cat" + cat)["hob" + hob1]["hob" + hob2] || 0;
};

// console.log(hobby(0, 1, 3));
// console.log(hobby(0, 3, 1));
// console.log(hobby(0, 1, 1));
// console.log(hobby(1, 3, 9));
// console.log(hobby(12, 1, 5));
