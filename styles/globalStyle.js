import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./color";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

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
    color: "#0094CE",
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
    maxHeight: HEIGHT * 0.65,
    marginVertical: 5,
  },
  textBtn: {
    borderRadius: 44,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    color: "#004DA9",
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
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0094CE",
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
    color: "#004DA9",
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 3,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: "#004DA9",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
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
    borderColor: "#0093ED",
    color: "#0093ED",
    fontSize: 20,
    borderRadius: 16,
  },
  inputLabel: {
    margin: 5,
    color: "#0094CE",
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
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 5,
  },
  categoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0094CE",
    borderRadius: 44,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  selectedCategoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#004DA9",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
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
  },
  smallCategoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0094CE",
    borderRadius: 44,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 5,
  },

  hobbyLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  smallHobbyLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  selectedLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#004DA9",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
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
    paddingHorizontal: 5,
    paddingVertical: 10,
    // borderWidth: 10,
    // borderColor: "pink",
  },
});
