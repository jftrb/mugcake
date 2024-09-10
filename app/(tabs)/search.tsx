import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RecipeCard from '@/components/search/RecipeCard';
import { ThemedList } from '@/components/ThemedList';

const props = {
    title: 'Mugcake au Chocolat',
    totalTime: '5 min',
    tags: ['Tag 1', 'Tag 2', 'Tag 2', 'Tag 2', 'Tag 2', 'Really Long Tag 3'],
    imageSource: 'https://reactnative.dev/img/tiny_logo.png',
}

const recipes = [props, props, props, props, ]

export default function SearchTabScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Search</ThemedText>
      </ThemedView>
      <ThemedText>{recipes.length} result{recipes.length != 1 ? 's' : ''}</ThemedText>
      <ThemedList
        style={{rowGap: 12}}
        data={recipes}
        renderItem={({item}) => 
          <RecipeCard 
            title={item.title} 
            totalTime={item.totalTime} 
            tags={item.tags} 
            imageSource={item.imageSource}/>}>
      </ThemedList>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
