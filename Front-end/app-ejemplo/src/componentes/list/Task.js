import React from "react";
import { StyleSheet, View, Image, Text} from "react-native";

const Task = ({task}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image style={styles.image} source={{uri: task.urls.raw}} />
                <Text style={styles.itemText}>{task.alt_description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",


    }
})

export default Task;