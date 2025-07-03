import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import CustomButton from '../../../Components/CustomButton';
import {windowHeight} from '../../../Constants/Dimensions';
import {ProductCard} from './ProductList';
import {products} from '../../../Constants/Data';
import {COLOR} from '../../../Constants/Colors';

const {width} = Dimensions.get('window');

const product = {
  images: [
    'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=60',
  ],
  title: 'Wireless Headphones',
  description:
    'High-quality wireless headphones with noise cancellation and long battery life.',
  price: 89,
  actualPrice: 120,
  infoList: [
    'Bluetooth 5.0 connectivity',
    '20 hours battery life',
    'Built-in microphone',
    'Comfort-fit ear cushions',
    'Available in black and white',
  ],
  deliveryType: 'Deliverable', // or 'Self Pickup'
};

const ProductDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const onScroll = event => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View style={styles.container}>
      <Header showBack title="Product Details" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        {/* Images Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            {product.images.map((img, i) => (
              <Image
                key={i.toString()}
                source={{uri: img}}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {product.images.map((_, i) => (
              <View
                key={i.toString()}
                style={[
                  styles.dot,
                  i === activeIndex ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryLabel}>Delivery Type:</Text>
          <Text style={styles.deliveryValue}>{product.deliveryType}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.actualPrice}>${product.actualPrice}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        <View style={styles.infoList}>
          {product.infoList.map((info, idx) => (
            <View key={idx.toString()} style={styles.infoItem}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.infoText}>{info}</Text>
            </View>
          ))}
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOR.black,
            fontWeight: '500',
            borderTopWidth: 1,
            borderTopColor: COLOR.royalBlue,
          }}>
          Similar products
        </Text>
        <FlatList
          contentContainerStyle={{}}
          data={products.slice(0, 4)} // Show only the first 4 products
          renderItem={ProductCard}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>

      {/* Sticky Add to Cart Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={loading}
          title="Add to Cart"
          onPress={handleAddToCart}
          style={{marginTop: 0}}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    height: windowHeight / 3,
    marginBottom: 16,
  },
  image: {
    width: width,
    height: windowHeight / 3,
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  deliveryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  deliveryLabel: {
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  deliveryValue: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 16,
    marginRight: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
  },
  infoList: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 6,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    flexShrink: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    bottom: 35,
  },
});
