import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { Configuration, OpenAIApi } from "openai";

const OpenAiRest = () => {

    const configuration = new Configuration({
        apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const [pregunta, setPregunta] = useState('');
    const [respuestaModalVisible, setRespuestaModalVisible] = useState(false);
    const [respuestaModalText, setRespuestaModalText] = useState('');

    const fetchData = async () => {
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": "Eres un convertidor binario todos los textos que te den tu daras su equivalente en binario" },
                    { "role": "user", "content": pregunta },
                ],
                temperature: 0.6,
            });
            console.log(completion.data.choices[0].text);
            setRespuestaModalText(completion.data.choices[0].message.content + "- Tokens:" + completion.data.usage.total_tokens);
            setRespuestaModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleContainer}>
                Conexión con el servidor
            </Text>
            <View style={styles.serverContainer}>
                <Text style={styles.titleServer}>Ingrese los siguientes datos</Text>
                <TextInput style={styles.inputServer} onChangeText={setPregunta} value={pregunta} placeholder="Ingrese su pregunta" />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonServer} onPress={fetchData}>
                        <Text>Enviar Datos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={respuestaModalVisible}
                onRequestClose={() => {
                    setRespuestaModalVisible(!respuestaModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Información recibida</Text>
                        <Text style={styles.titleModal}>Respuesta</Text>
                        <Text>{respuestaModalText}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonServer} onPress={() => setRespuestaModalVisible(!respuestaModalVisible)}>
                                <Text>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    titleContainer: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    serverContainer: {
        marginTop: 20,
    },
    titleServer: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputServer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        alignItems: "center",
    },
    buttonServer: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 3,
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
});
export default OpenAiRest;