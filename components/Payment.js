import React, { useState, useContext, useEffect } from "react";
import * as Linking from "expo-linking";

import { Colors } from "../styles/color";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  CardField,
  useConfirmPayment,
  StripeProvider,
  createPaymentMethod,
} from "@stripe/stripe-react-native";
import { globalStyles } from "../styles/globalStyle";
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import { updateCustomer } from "../src/graphql/mutations";
import { AntDesign } from "@expo/vector-icons";

export default function Payment({ navigation }) {
  const { premiumData, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isPremium, setIsPremium] = premiumData;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment } = useConfirmPayment();
  const [price, setPrice] = useState();
  const [publishableKey, setPublishableKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKey();
  }, []);

  const fetchKey = async () => {
    const response = await API.get("ochatomoStripe", "/payment/pk");
    const { pk } = response;
    setPublishableKey(pk);
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await API.post("ochatomoStripe", "/payment/create-payment-intent", {
      body: { price: price },
    });
    const { clientSecret, error } = response;
    return { clientSecret, error };
  };

  const createSubscription = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("入力エラー", "カード情報とメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    const result = await createPaymentMethod({
      type: "Card",
      card: cardDetails,
      billing_details: {
        email: email,
      },
    });
    console.log({ result });

    try {
      const response = await API.post("ochatomoStripe", "/payment/create-subscription", {
        body: {
          payment_method: result.paymentMethod.id,
          email,
        },
      });
      const { client_secret, status, subscription_id, invoiceUrl } = response;
      if (subscription_id) {
        setIsPremium(true);
        // add subscription id to customer table
        const query = {
          id: userId,
          subscriptionID: subscription_id,
        };

        await API.graphql(graphqlOperation(updateCustomer, { input: query }));
        Alert.alert("お支払い完了", "領収書を確認しますか？", [
          {
            text: "いいえ",
            style: "cancel",
            onPress: () => {
              navigation.navigate("ProfilePage");
            },
          },
          {
            text: "はい",
            onPress: () => {
              Linking.openURL(invoiceUrl);
              navigation.navigate("ProfilePage");
            },
          },
        ]);

        setLoading(false);
      }

      if (status === "requires_action") {
        console.log("if statement running");
        confirmPayment(client_secret, {
          type: "Card",
          billing_details: {
            email: email,
          },
        }).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log("Payment successful");
            // alert("Payment Successful");
            // Show a success message to your customer
          }
        });
      } else {
        console.log("Payment successful");
        // alert("Payment Successful");
        // No additional information was needed
        // Show a success message to your customer
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("入力エラー", "カード情報とメールアドレスを入力してください。");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          addPremiumMembership();
          setIsPremium(true);
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  async function addPremiumMembership() {
    let premiumUntil;
    if (price === 500) {
      premiumUntil = moment().add(1, "M").format("YYYY-MM-DD");
    } else {
      premiumUntil = moment().add(6, "M").format("YYYY-MM-DD");
    }

    console.log("premium Until", premiumUntil);

    const query = {
      id: userId,
      premiumUntil,
    };
    await API.graphql(graphqlOperation(updateCustomer, { input: query }));
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={globalStyles.viewContainer}>
        <View style={[styles.container, globalStyles.boxShadow]}>
          <TouchableOpacity
            style={[globalStyles.flexColumn, { alignItems: "flex-start" }]}
            onPress={() => navigation.navigate("MatchPage")}
          >
            <AntDesign
              name="logout"
              size={30}
              color="#F3B614"
              style={globalStyles.logo}
            />
            <Text style={globalStyles.iconLabel}>戻る</Text>
          </TouchableOpacity>
          <View style={globalStyles.imgContainer}>
            <Image
              style={globalStyles.largeLogo}
              source={require("../assets/premium-user-g.png")}
            />
          </View>
          <Text style={[globalStyles.header]}>{`御茶ノ友\nプレミアム会員になる`}</Text>
          <View style={styles.ulContainer}>
            <Text style={styles.ul}>* 広告の非表示</Text>
            <Text style={styles.ul}>* プレミアムバッジ</Text>
          </View>
          <View style={globalStyles.flexRow}>
            <Text style={[globalStyles.textBtn, styles.btn]}>500円 / 月</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            placeholder="メールアドレス"
            keyboardType="email-address"
            onChange={(value) => setEmail(value.nativeEvent.text)}
            style={styles.input}
          />
          <Text style={styles.label}>クレジットカード番号</Text>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
          <View style={globalStyles.flexRow}>
            <TouchableOpacity
              onPress={createSubscription}
              disabled={loading}
              activeOpacity={!loading ? 1 : 0.7}
            >
              <Text
                style={[
                  globalStyles.textBtn,
                  { backgroundColor: Colors.primary1, width: 150 },
                ]}
              >
                支払う
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: 10,
    backgroundColor: Colors.primary2,
    width: 150,
  },
  label: {
    color: Colors.primary1,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: Colors.bg1,
    borderRadius: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
  },
  cardContainer: {
    height: 50,
    marginBottom: 30,
  },
  ulContainer: {
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  ul: {
    fontSize: 20,
    color: Colors.primary1,
    // fontWeight: "bold",
    fontFamily: "KosugiMaru_400Regular",
  },
});
