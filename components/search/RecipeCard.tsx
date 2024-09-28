import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrepCard from "../recipe/PrepCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedList } from "../ThemedList";
import { Link } from "expo-router";
import { TagProps } from "../recipe/Tags";
import { Tag } from "../Tag";

type CardProps = {
  recipeId: string,
  title: string,
  totalTime: string,
  tags: string[],
  imageSource: string,
}

export default function RecipeCard({recipeId, title, totalTime, tags, imageSource}: CardProps) {
  const borderColor = useThemeColor({}, 'text')

  const dynamicStyle = StyleSheet.create({
    border: {
      borderColor: borderColor
    }
  })

  return (
    <ThemedView style={[styles.horizontal, dynamicStyle.border, styles.border]}>
      <ThemedView style={[styles.horizontal, , {flex: 1, padding: 4}]}>
        
        {/* Image */}
        <Link href={`/recipe/${recipeId}`} asChild style={{alignSelf: 'center'}}>
          <Pressable>
            <Image 
              style={styles.image}
              source={{uri: imageSource}}/>
          </Pressable>
        </Link>

        {/* Middle part */}
        <ThemedView style={styles.descriptionContainer}>
          <Link href={`/recipe/${recipeId}`} asChild>
            <Pressable>
              <ThemedText type='defaultSemiBold' style={{height: 48}}>{title}</ThemedText>
            </Pressable>
          </Link>
          <ThemedView>
            <ThemedList 
              style={styles.tagContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={tags}
              renderItem={({item}) => 
                <Link href="/" asChild> 
                  <Pressable>
                    <Tag item={item}/>
                  </Pressable>
                </Link>
              }
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Prep time info */}
      <Link href={`/recipe/${recipeId}`} 
        asChild 
        style={[{alignSelf: 'stretch'}, styles.timeContainer, dynamicStyle.border]}>
        <Pressable>
          <ThemedView>
            <PrepCard label="Total Time" value={totalTime}></PrepCard>
          </ThemedView>
        </Pressable>
      </Link>
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