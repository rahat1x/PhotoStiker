import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const IconButton = ({ icon, label, onPress }) => {
    return (
        <View>
            <Pressable style={styles.IconButton} onPress={onPress}>
                <MaterialIcons name={icon} size={24}  color="#fff"/>
                <Text style={styles.IconButtonLabel} >{label}</Text>
            </Pressable>
        </View>
    )
}

export default IconButton

const styles = StyleSheet.create({
    IconButton: {
        justifyContent:"center",
        alignItems:"center",
    },
    IconButtonLabel: {
        color:"#fff",
        marginTop:12,
    },
})