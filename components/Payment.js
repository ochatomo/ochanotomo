import React, { useState, useContext } from "react";
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
} from "@stripe/stripe-react-native";
import { globalStyles } from "../styles/globalStyle";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import { updateCustomer } from "../src/graphql/mutations";

export default function Payment() {
  const { premiumData, userIdInfo } = useContext(UserContext);
  const [isPremium, setIsPremium] = premiumData;
  const [userId] = userIdInfo;

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [price, setPrice] = useState();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await API.post("ochatomoStripe", "/create-payment-intent", {
      body: { price: price },
    });
    const { clientSecret, error } = response;
    return { clientSecret, error };
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
    <StripeProvider publishableKey="pk_test_51JDipHEb3m5UkCpe9HwHakLr3PblRlTUlz3Wfa9mHHjc4vfMRHID4rVbBWX9j9dzVh0bXbUuvlBqW1pwoZsRIK6h00mImJTLWj">
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
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
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
