import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const NameRest = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const serverUrl = "https://luislda-cautious-space-waddle-xx56rvvg475c9977-3000.preview.app.github.dev";

    const fetchData = async () => {
        try {
            const response = await fetch(`${serverUrl}/hola/:${nombre}/:${apellido}`);
            const jsonData = await response.json();
            console.log(jsonData)
        } catch (e) {
            console.error("error", e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [nombre, apellido]);

    const saludar = () => {
        fetchData();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>
                Conexión con el servidor 
            </Text>
            <View style={styles.serverContainer}>
                <Text style={styles.titleServer}>Ingrese los siguientes datos</Text>
                <TextInput style={styles.inputServer} onChangeText={setNombre} value={nombre} placeholder="Ingrese su nombre" />
                <TextInput style={styles.inputServer} onChangeText={setApellido} value={apellido} placeholder="Ingrese su apellido"/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonServer} onPress={saludar}>
                        <Text>Enviar Datos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    titleContainer: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center"
    },
    serverContainer: {
        margin: 10
    },
    titleServer: {
        fontWeight: "bold",
        paddingBottom: 10
    },
    textServer: {
        textAlign: "center"
    },
    inputServer: {
        height: 40,
        padding: 10,
        margin: 10,
        borderWidth: 1,
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
    },
    buttonServer: {
        backgroundColor: "#DDDDDD",
        padding: 12,
        width: 150,
        textAlign: "center"
    }
})

export default NameRest;
