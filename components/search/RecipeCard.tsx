import { Image, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrepCard from "../recipe/PrepCard";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function RecipeCard() {
    const borderColor = useThemeColor({}, 'text')

    const dynamicStyle = StyleSheet.create({
        border: {
            borderColor: borderColor
        }
    })

    return (
        <ThemedView style={[styles.horizontal, dynamicStyle.border, styles.border]}>
            <Image 
                style={styles.image}
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
            <ThemedView style={styles.descriptionContainer}>
                <ThemedText type='subtitle' style={{}}>Mugcake au Chocolat</ThemedText>
                <ThemedView style={[styles.horizontal, styles.tagContainer]}>
                    <ThemedText style={[styles.tag, dynamicStyle.border]}>Tag 1</ThemedText>
                    <ThemedText style={[styles.tag, dynamicStyle.border]}>Tag 2</ThemedText>
                    <ThemedText style={[styles.tag, dynamicStyle.border]}>Really Long Tag 3</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={{justifyContent: 'center'}}>
                <PrepCard label="Total Time" value="5 min"></PrepCard>
            </ThemedView>
        </ThemedView>
    )
}

const imgSize = 80

const styles = StyleSheet.create({
    horizontal : {
        flexDirection: 'row',
    },
    border: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 8
    },
    tagContainer : {
        columnGap: 8,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 4,
        paddingLeft: 8,
        paddingRight: 8,
    },
    tag: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: "solid",
        userSelect: 'none',
    },
    image: {
        width: imgSize,
        height: imgSize,  
    },
})