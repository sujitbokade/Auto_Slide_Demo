import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import React, {useRef, useState,useEffect} from 'react';

const Carousel = () => {
  const flatListRef = useRef() 
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
   const interval = setInterval(() => {
        if(activeIndex === carouselData.length-1) {
            flatListRef.current.scrollToIndex({
                index: 0,
                animation: true
            })        
        } else {
            flatListRef.current.scrollToIndex({
                index: activeIndex+1,
                animation: true
            })
        }
    }, 2000);
  
    return () => {
      clearInterval(interval)
    }
  })
   
  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // where the item should be positioned on X
    index: index
  })

  const carouselData = [
    {
      id: '01',
      image: require('../assets/slide1.png'),
    },
    {
      id: '02',
      image: require('../assets/slide2.png'),
    },
    {
      id: '03',
      image: require('../assets/slide3.png'),
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={item.image} style={{width: screenWidth, height: 200}} />
      </View>
    );
  };

  const renderDotIndicators = () => {
    return carouselData.map((_, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#F79D20',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#D0D0D0", 
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}></View>
        );
      }
    });
  };

  const handleScroll = event => {
    //Get Scroll Position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Get Index
    const index = scrollPosition / screenWidth;
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={handleScroll}
      />
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;
