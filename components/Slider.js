import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, ScrollView, Dimensions } from 'react-native';
import Profile from '../Screens/Profile';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Custom swipeable carousel component
const SwipeCarousel = ({ cards }) => {


  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;  // Opacity value for fade animation
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const isHorizontalSwipe = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      return isHorizontalSwipe && Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, { dx }) => {
      // Swipe right
      if (dx > 120) {
        Animated.parallel([
          Animated.timing(pan, { toValue: { x: 500, y: 0 }, duration: 100, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true })  // Fade out
        ]).start(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);  // Move to next card
          pan.setValue({ x: 0, y: 0 });  // Reset position
          opacity.setValue(1);  // Reset opacity for the new card
        });
      } 
      // Swipe left
      else if (dx < -120) {
        Animated.parallel([
          Animated.timing(pan, { toValue: { x: -500, y: 0 }, duration: 100, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true })  // Fade out
        ]).start(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);  // Move to next card
          pan.setValue({ x: 0, y: 0 });  // Reset position
          opacity.setValue(1);  // Reset opacity for the new card
        });
      } 
      // Not swiped enough, reset
      else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();  // Reset opacity
      }
    },
  });

  return (
    <View style={styles.container}>
      {cards?.map((card, index) => {
        if (index === currentIndex) {
          return (
            <Animated.View
              key={card.id}
              {...panResponder.panHandlers}
              style={[
                {
                  transform: [
                    { translateX: pan.x },  // Swipe movement
                  ],
                  opacity: opacity,  // Fade effect
                },
                styles.card
              ]}
            >
              <Profile profile={card?.text} />
            </Animated.View>
          );
        }
        return null;  // Only render the current card
      })}
    </View>
  );
};

// // Example Profile component with scrollable content
// const Profile = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.profileContent}>
//       {/* Replace with your scrollable content */}
//       <View style={styles.dummyContent} />
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  profileContent: {
    padding: 20,
  },
  dummyContent: {
    height: 1000, // Dummy content for scroll
    backgroundColor: '#f0f0f0',
  },
});

export default SwipeCarousel;
