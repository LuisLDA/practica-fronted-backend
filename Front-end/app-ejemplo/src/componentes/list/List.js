import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import Task from "./Task";

const ListComponent = () => {

    const [taskItems, setTaskItems] = useState([]);

    // Para notificar al componente que existe un cambio
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4');
            const jsonData = await response.json();
            console.log(jsonData)
            setTaskItems(jsonData)
        } catch (e) {
            console.error("error", e)
        }
    }

    const Item = ({task, i}) => {
        return (
            <TouchableOpacity style={styles.peritem} key={i} onPress={() => {getProfile(task)}}>
                <Task task={task} />
            </TouchableOpacity>
        )
    }

    return (taskItems &&
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Se listan los perfiles</Text>
                <View style={styles.items}>
                    <FlatList
                        data={taskItems}
                        renderItem={({item, i}) => <Item task={item} i={i} />}
                    >
                    </FlatList>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 15
    }
})

export default ListComponent;