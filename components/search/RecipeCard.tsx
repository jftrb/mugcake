import { Image, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrepCard from "../recipe/PrepCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedList } from "../ThemedList";

type CardProps = {
    title: string,
    totalTime: string,
    tags: string[],
    imageSource: string,
}

export default function RecipeCard({title, totalTime, tags, imageSource}: CardProps) {
    const borderColor = useThemeColor({}, 'text')

    const dynamicStyle = StyleSheet.create({
        border: {
            borderColor: borderColor
        }
    })

    return (
        <ThemedView style={[styles.horizontal, dynamicStyle.border, styles.border]}>
            <ThemedView style={[styles.horizontal, , {flex: 1, padding: 4}]}>
            <Image 
                style={styles.image}
                source={{uri: imageSource}}/>
            <ThemedView style={styles.descriptionContainer}>
                <ThemedText type='subtitle' style={{minHeight: 48}}>{title}</ThemedText>
                <ThemedView>
                    <ThemedList 
                        style={styles.tagContainer}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={tags}
                        renderItem={({item}) => 
                            <ThemedText style={[styles.tag, dynamicStyle.border]}>{item}</ThemedText>
                        }
                    />
                </ThemedView>
            </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.timeContainer, dynamicStyle.border]}>
                <PrepCard label="Total Time" value={totalTime}></PrepCard>
            </ThemedView>
        </ThemedView>
    )
}

const imgSize = 110

const styles = StyleSheet.create({
    horizontal : {
        flexDirection: 'row',
    },
    border: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 4,
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
        borderRadius: 10,
        alignSelf: 'center',
        width: imgSize,
        height: imgSize,  
    },
    timeContainer: {
        justifyContent: 'center', 
        borderLeftWidth: 1,
        padding: 8,
        margin: -4,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    },
})