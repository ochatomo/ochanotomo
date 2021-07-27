import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const FONT = "KosugiMaru_400Regular";

export const globalStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  iconLabel: {
    fontSize: 14,
    color: "#D54E31",
    fontWeight: "bold",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    width: "80%",
    maxHeight: HEIGHT * 0.6,
    marginVertical: 5,
  },
  textBtn: {
    borderRadius: 44,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontFamily: FONT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    color: Colors.primary1,
    fontWeight: "bold",
  },
  photo: {
    width: 236,
    height: 195,
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary1,
    fontFamily: FONT,
    marginBottom: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rightContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  smallTextLabel: {
    color: Colors.primary2,
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 3,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: Colors.primary1,
    fontWeight: "bold",
    paddingVertical: 10,
    fontFamily: FONT,
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  largeLogo: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
  },
  extraLargeLogo: {
    width: 200,
    height: 200,
  },
  input: {
    // width: 283,
    height: 40,
    marginBottom: 12,
    // marginHorizontal: 50,
    borderWidth: 2,
    padding: 8,
    paddingHorizontal: 20,
    borderColor: Colors.primary1,
    color: Colors.primary1,
    fontSize: 20,
    borderRadius: 16,
  },
  profileText: {
    fontSize: 20,
    color: Colors.primary1,
    fontFamily: FONT,
  },
  inputLabel: {
    margin: 5,
    color: Colors.primary2,
    fontSize: 20,
    fontWeight: "bold",
  },
  multiInput: {
    height: 200,
    // backgroundColor: "pink",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary2,
    borderRadius: 44,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  categoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary2,
    borderRadius: 44,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedCategoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary1,
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    borderRadius: 44,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  smallCategoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary1,
    borderRadius: 44,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 5,
  },

  hobbyLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary1,
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  smallHobbyLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.secondary4,
    borderRadius: 44,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: Colors.primary2,
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  iconRight: {
    marginHorizontal: 15,
    alignSelf: "flex-end",
  },
  textLink: {
    fontSize: 18,
    color: "black",
    textDecorationLine: "underline",
    paddingVertical: 10,
    marginTop: 5,
  },
  profilePhoto: {
    aspectRatio: 4 / 3,
    width: WIDTH * 0.6,
  },
  viewContainer: {
    paddingTop: 25,
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderWidth: 10,
    // borderColor: "pink",
  },
});
