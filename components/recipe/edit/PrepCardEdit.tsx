import { StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { PrepCardProps } from "../PrepCard";

export default function PrepCardEdit({label, value, ...otherProps} : PrepCardProps){
    return (
        <ThemedView {...otherProps}>
            <ThemedText style={styles.cardLabel}>{label}</ThemedText>
            <ThemedTextInput style={[styles.cardValue, styles.input]} defaultValue={value}></ThemedTextInput>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    cardValue : {
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        maxWidth: 75,
    },
    cardLabel : {
        textAlign: "center",
    },
})