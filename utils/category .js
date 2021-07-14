// cat0 音楽系
// cat1 鑑賞系
// cat2 美容系
// cat3 旅行系
// cat4 スポーツ系
// cat5 アウトドア系
// cat6 ゲーム系
// cat7 制作系
// cat8 育成系
// cat9 飲食系
// cat10 スキル系
// cat11 乗り物系
// cat12 芸術系

const cat0 = {
  cat1: 0.34034958,
  cat2: 0.3049489,
  cat3: 0.25333217,
  cat4: 0.35372204,
  cat5: 0.2835041,
  cat6: 0.3118858,
  cat7: 0.4077417,
  cat8: 0.19353345,
  cat9: 0.19350494,
  cat10: 0.21205221,
  cat11: 0.10163341,
  cat12: 0.65752375,
};

const cat1 = {
  cat2: 0.2479095,
  cat3: 0.29462805,
  cat4: 0.18965802,
  cat5: 0.35167843,
  cat6: 0.24413598,
  cat7: 0.41080546,
  cat8: 0.28989923,
  cat9: 0.4281283,
  cat10: 0.15539111,
  cat11: 0.26761606,
  cat12: 0.36283025,
};

const cat2 = {
  cat3: 0.20901269,
  cat4: 0.46356702,
  cat5: 0.5135606,
  cat6: 0.13089912,
  cat7: 0.1173005,
  cat8: 0.3643679,
  cat9: 0.5012256,
  cat10: 0.28502554,
  cat11: 0.157638,
  cat12: 0.3771328,
};

const cat3 = {
  cat4: 0.18645394,
  cat5: 0.24678273,
  cat6: 0.084277615,
  cat7: 0.14094768,
  cat8: 0.036051955,
  cat9: 0.2610823,
  cat10: 0.04082824,
  cat11: 0.2250298,
  cat12: 0.24511468,
};

const cat4 = {
  cat5: 0.66900283,
  cat6: 0.27526352,
  cat7: 0.17224677,
  cat8: 0.37836212,
  cat9: 0.29385585,
  cat10: 0.27420872,
  cat11: 0.27425286,
  cat12: 0.41755763,
};

const cat5 = {
  cat6: 0.2929002,
  cat7: 0.14195105,
  cat8: 0.3293536,
  cat9: 0.43383628,
  cat10: 0.31177878,
  cat11: 0.39333794,
  cat12: 0.30258667,
};

const cat6 = {
  cat7: 0.27543896,
  cat8: 0.19452125,
  cat9: 0.24309032,
  cat10: 0.48534805,
  cat11: 0.3554285,
  cat12: 0.047809128,
};

const cat7 = {
  cat8: 0.28527465,
  cat9: 0.121106274,
  cat10: 0.022478364,
  cat11: 0,
  cat12: 0.23815732,
};

const cat8 = {
  cat9: 0.17405926,
  cat10: 0.2859349,
  cat11: 0.061600197,
  cat12: 0.2556715,
};

const cat9 = {
  cat10: 0.22232543,
  cat11: 0.34384057,
  cat12: 0.21115689,
};

const cat10 = {
  cat11: 0.32962734,
  cat12: 0.16911806,
};

const cat11 = {
  cat12: 0.119218275,
};

export const calcCategory = (category1, category2) => {
  console.log({ myCat: category1, customerCat: category2 });
  let cat1 = Number(category1);
  let cat2 = Number(category2);
  if (cat1 === cat2) return 1;
  if (cat1 > cat2) [cat1, cat2] = [cat2, cat1];
  return eval("cat" + cat1)["cat" + cat2] || 0;
};

// console.log(category(0, 3));
// console.log(category(3, 0));
// console.log(category(3, 3));
// console.log(category(10, 3));
// console.log(category(10, 12));
// console.log(category(0, 99));
