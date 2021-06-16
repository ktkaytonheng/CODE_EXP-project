import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
    return ( <
        PaperButton style = {
            [
                styles.button,
                mode === 'outlined' && { backgroundColor: '#ffffff' },
                style,
            ]
        }
        labelStyle = { styles.text }
        mode = { mode } {...props }
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: '5%',
        backgroundColor: '#000000',
        marginVertical: 10,
        paddingVertical: 2,
        borderRadius: 0
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 26,
        // textAlign: 'center'
    },
})