import React, { useState, useContext, useEffect } from "react";
import * as Linking from "expo-linking";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
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

export default function Payment() {
  const { premiumData, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isPremium, setIsPremium] = premiumData;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [price, setPrice] = useState();
  const [publishableKey, setPublishableKey] = useState("");

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

  const cancelSubscription = async () => {
    if (!userData.subscriptionID) return;
    const response = await API.post("ochatomoStripe", "/payment/cancel-subscription", {
      body: { subscriptionID: userData.subscriptionID },
    });
    console.log(response);
    if (response.status === "canceled") {
      const query = {
        id: userId,
        subscriptionID: null,
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
      alert("subscriptionが中止されました。");
    }
  };

  const createSubscription = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const result = await createPaymentMethod({
      type: "Card",
      card: cardDetails,
      billing_details: {
        email: email,
      },
    });

    try {
      const response = await API.post("ochatomoStripe", "/payment/create-subscription", {
        body: {
          payment_method: result.paymentMethod.id,
          email,
        },
      });
      const { client_secret, status, subscription_id, invoiceUrl } = response;
      if (subscription_id) {
        // add subscription id to customer table
        const query = {
          id: userId,
          subscriptionID: subscription_id,
        };
        await API.graphql(graphqlOperation(updateCustomer, { input: query }));
        console.log({ invoiceUrl });
        Alert.alert("お支払い完了", "領収書を確認しますか？", () =>
          Linking.openURL(invoiceUrl)
        );
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
            console.log("You got the money!");
            alert("Payment Successful");
            // Show a success message to your customer
          }
        });
      } else {
        console.log("You got the money!");
        alert("Payment Successful");
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
      Alert.alert("Please enter Complete card details and Email");
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
      <View style={styles.container}>
        <Text>Price: {price}</Text>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setPrice(500);
            }}
          >
            <Text style={[globalStyles.textBtn, { backgroundColor: "#EC5E56" }]}>
              500円（1ヶ月）
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // view my profile page
              setPrice(2000);
            }}
          >
            <Text style={[globalStyles.textBtn, { backgroundColor: "#27AE60" }]}>
              2000円（6ヶ月）
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <Button onPress={createSubscription} title="Pay" disabled={loading} />
        <TouchableOpacity onPress={cancelSubscription}>
          <Text style={globalStyles.textLink}>サブスクリプションを中止する</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
