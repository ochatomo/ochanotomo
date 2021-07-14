//   北海道:0,
//   東北:1,
//   関東:2,
//   中部:3,
//   近畿:4,
//   中国:5,
//   四国:5,
//   九州:6,

const locationValue = (num) => {
  switch (true) {
    case num === 1:
      return 0;
    case num >= 2 && num < 8:
      return 1;
    case num >= 8 && num < 15:
      return 2;
    case num >= 15 && num < 24:
      return 3;
    case num >= 24 && num < 31:
      return 4;
    case num >= 31 && num < 40:
      return 5;
    case num >= 40 && num < 48:
      return 6;
  }
};

export const calcLocation = (myLocation, partnerLocation) => {
  let myloc = Number(myLocation);
  let partnerLoc = Number(partnerLocation);
  const myLocationValue = locationValue(myloc);
  const partnerLocationValue = locationValue(partnerLoc);
  return 1 - Math.abs(myLocationValue - partnerLocationValue) / 6;
};

// location("北海道","沖縄")
// console.log(location(1, 47));
