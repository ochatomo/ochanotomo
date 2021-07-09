const locationValue = {
  北海道:0,
  東北:1,
  関東:2,
  中部:3,
  近畿:4,
  中国:5,
  四国:5,
  九州:6,
}

const location = (myLocation,partnerLocation) => {
  const myLocationValue = locationValue[myLocation]
  const partnerLocationValue = locationValue[partnerLocation]
  return 1-Math.abs(myLocationValue-partnerLocationValue)/6
}

console.log(location("北海道","中国"))