import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

export const Button = (props) => {
    return (
        <TouchableOpacity style={[{...props.style}, styles.btn]} onPress={props.onPress} activeOpacity={0.7}>
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 5,
        marginBottom: 5
    }
})
