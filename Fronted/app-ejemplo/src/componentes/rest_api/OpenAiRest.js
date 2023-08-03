import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import DocumentPicker from "react-native-document-picker"


const OpenAiRest = () => {

    const configuration = new Configuration({
        apiKey: "Key",
    });

    const openai = new OpenAIApi(configuration);

    const [pregunta, setPregunta] = useState('');
    const [respuestaModalVisible, setRespuestaModalVisible] = useState(false);
    const [respuestaModalText, setRespuestaModalText] = useState('');
    const [pdfUri, setPdfUri] = useState(null); // Agregar un estado para guardar la uri del pdf seleccionado

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

    // Agregar una función para seleccionar un pdf usando react-native-document-picker
    const selectPdf = async () => {
        try {
            // Abrir el selector de documentos y filtrar solo los archivos pdf
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            // Guardar la uri del pdf seleccionado en el estado
            setPdfUri(res.uri);
        } catch (err) {
            // Manejar cualquier excepción (si la hay)
            if (DocumentPicker.isCancel(err)) {
                // Si el usuario canceló la selección del documento
                console.log('Canceled');
            } else {
                // Por error desconocido
                console.log('Unknown Error: ' + JSON.stringify(err));
            }
        }
    };


    const uploadPdf = async () => {
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: pdfUri,
            name: "file.pdf",
            type: "application/pdf",
          });
          formData.append("question", "¿Cuál es la respuesta a la vida, el universo y todo lo demás?");
          const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.error(err);
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
                    {/* Agregar un botón para seleccionar un pdf */}
                    <TouchableOpacity style={styles.buttonServer} onPress={selectPdf}>
                        <Text>Seleccionar PDF</Text>
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
                        {/* Agregar un componente para mostrar el pdf usando react-native-pdf */}
                        {pdfUri && (
                            <Pdf
                                source={{ uri: pdfUri }}
                                style={{ flex: 1, width: Dimensions.get('window').width }}
                            />
                        )}
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
