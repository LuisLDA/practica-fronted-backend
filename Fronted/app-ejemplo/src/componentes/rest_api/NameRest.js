import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";

const NameRest = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const serverUrl = "https://luislda-cautious-space-waddle-xx56rvvg475c9977-3000.preview.app.github.dev";

    const fetchData = async () => {
        try {
            const response = await fetch(`${serverUrl}/hola/:${nombre}/:${apellido}`);
            const jsonData = await response.json();
            console.log("jsonData", jsonData);
            setData(jsonData);
        } catch (e) {
            console.error("error", e);
        }
    };


    const imprimirEnConsola = () => {
        fetchData();
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>
                Conexión con el servidor
            </Text>
            <View style={styles.serverContainer}>
                <Text style={styles.titleServer}>Ingrese los siguientes datos</Text>
                <TextInput style={styles.inputServer} onChangeText={setNombre} value={nombre} placeholder="Ingrese su nombre" />
                <TextInput style={styles.inputServer} onChangeText={setApellido} value={apellido} placeholder="Ingrese su apellido" />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonServer} onPress={imprimirEnConsola}>
                        <Text>Enviar Datos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Información recibida</Text>
                        {data && (
                            <Text style={styles.modalText}>Nombre{data.nombre}</Text>
                        )}

                        {data && (
                            <Text style={styles.modalText}>Apellido{data.apellido}</Text>
                        )}
                        <TouchableOpacity
                            style={[styles.buttonServer, styles.modalButton]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    modalText: {
        marginTop: 10
    },
    modalButton: {
        marginTop: 20
    }
})

export default NameRest;
