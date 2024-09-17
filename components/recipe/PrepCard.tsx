import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView, ThemedViewProps } from "../ThemedView";

export type PrepCardProps = ThemedViewProps & {
    label: string, 
    value: string,
}

export default function PrepCard({label, value, ...otherProps} : PrepCardProps){
    return (
        <ThemedView {...otherProps}>
            <ThemedText style={styles.cardLabel}>{label}</ThemedText>
            <ThemedText style={styles.cardValue}>{value}</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    cardValue : {
        textAlign: "center",
        fontWeight: "bold",
    },
    cardLabel : {
        textAlign: "center",
    },
})