import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { fetchOrders, fetchUserProfile } from "../constants/Api";
import { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { UserContext } from "../../UserContext";
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserContext);
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const fetchUserProfileData = async () => {
    await fetchUserProfile({ userId, setUser });
  };

  useEffect(() => {
    fetchUserProfileData();
  }, [userId]);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    await fetchOrders({ userId, setOrders });
    setLoading(false);
  }

  const logout = async () => {
    clearAuthToken();
    await AsyncStorage.removeItem("authToken");
    setUserId(null);
    navigation.replace("Login");
  }

  return (
    loading ?
      <ActivityIndicator size={'large'} style={{
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
      }} />
      :
      <ScrollView style={styles.container}>
        <Text style={styles.welcomeTxt}>Welcome {user?.name}</Text>

        <View style={styles.btnContainer}>
          <Pressable style={styles.buttons}>
            <Text>Your Orders</Text>
          </Pressable>
          <Pressable style={styles.buttons}>
            <Text>Your Account</Text>
          </Pressable>
        </View>

        <View style={styles.btnContainer}>
          <Pressable style={styles.buttons}>
            <Text>Buy Again</Text>
          </Pressable>
          <Pressable
            onPress={logout}
            style={styles.buttons}>
            <Text>Logout</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size={'large'} style={{
              alignContent: 'center',
              justifyContent: 'center',
              flex: 1,
            }} />
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={order._id}
              >
                {/* Render the order information here */}
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />

                    <Text
                      numberOfLines={2}
                      style={{
                        width: 100,
                        fontWeight: "800",
                      }}>{product.name}</Text>

                    <Text style={{ fontWeight: "bold" }}>${product.price}</Text>
                    <Text>Quantity: {product.quantity}</Text>
                    <Text>Total: ₹{product.price * product.quantity}</Text>
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  welcomeTxt: {
    fontSize: 16,
    fontWeight: "800"
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  buttons: {
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    alignItems: 'center',
  }
})