import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getToken } from "../services/TokenService";
import Foundation from 'react-native-vector-icons/Foundation';
import Styles from "../styles/Styles"

export default function Logo({ navigation }) {

    const [visibleActivityIndicator, setVisibleActivityIndicator] = useState(true)

    useEffect(() => {
        
         navigation.addListener('focus', () => {
             asToken()
         });
 
         asToken()

    }, [navigation])

    async function asToken() {
        setVisibleActivityIndicator(true)
        const token = await getToken()
        setVisibleActivityIndicator(false)
        navigation.navigate(token ? "Home" : "Login")
    }

    return (
        <View style={styles.container}>

            <View
                style={styles.logo}>
                <Foundation name="bookmark" color="#3694FF" size={100} />
                <Text
                    style={{
                        fontSize: 40
                    }}
                >
                    Favorite Links
                </Text>
                {visibleActivityIndicator &&
                    <ActivityIndicator size="large" />}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Styles.container,
        justifyContent: 'center'
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 500,
        height: 350,
        width: 350,
        borderColor: '#3694FF',
    }
})