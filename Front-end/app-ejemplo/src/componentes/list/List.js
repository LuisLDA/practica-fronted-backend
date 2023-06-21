import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import Task from "./Task";

const ListComponent = () => {

    const [taskItem, setTaskItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4');
            const jsonData = await response.json();
            setTaskItems(jsonData)
        } catch (e) {
            console.error("error", e)
        }
    }

    const Item = ({item, i}) => {
        return (
            <TouchableOpacity style={styles.peritem} key={i} onPress={() => {getProfile(item)}}>
                <Task task={item} />
            </TouchableOpacity>
        )
    }

    return (taskItem &&
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Se listan los perfiles</Text>
                <View style={styles.items}>
                    <FlatList
                        data={taskItem}
                        renderItem={({item, i}) => <item task={item} i={i} />}
                    >

                    </FlatList>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

})

export default ListComponent;