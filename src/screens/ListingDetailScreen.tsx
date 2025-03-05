import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Pressable,
  Dimensions,
  FlatList,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Snowmobile } from '../types/listing';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface Props {
  route: {
    params: {
      listing: Snowmobile;
    };
  };
}

export const ListingDetailScreen = ({ route }: Props) => {
  const { listing } = route.params;
  const navigation = useNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContactPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Chat', { listing });
  };

  const toggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsFavorite(!isFavorite);
  };

  const renderImageIndicator = () => (
    <View style={styles.imageIndicator}>
      {listing.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicatorDot,
            index === currentImageIndex && styles.indicatorDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <FlatList
            data={listing.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / width
              );
              setCurrentImageIndex(newIndex);
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          {renderImageIndicator()}
          <Pressable 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <MaterialCommunityIcons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF3B30" : colors.primary} 
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {listing.year} {listing.make} {listing.model}
          </Text>
          <Text style={styles.price}>${listing.price.toLocaleString()}</Text>

          <View style={styles.specifications}>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="snowflake" size={24} color={colors.accent} />
              <Text style={styles.specLabel}>Condition</Text>
              <Text style={styles.specValue}>{listing.condition}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="gauge" size={24} color={colors.accent} />
              <Text style={styles.specLabel}>Mileage</Text>
              <Text style={styles.specValue}>{listing.mileage} mi</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.accent} />
              <Text style={styles.specLabel}>Location</Text>
              <Text style={styles.specValue}>{listing.location.address}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{listing.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: listing.location.latitude,
                  longitude: listing.location.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                scrollEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: listing.location.latitude,
                    longitude: listing.location.longitude,
                  }}
                />
              </MapView>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsList}>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Engine</Text>
                <Text style={styles.specDetail}>{listing.specifications.engine}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Power</Text>
                <Text style={styles.specDetail}>{listing.specifications.power}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Suspension</Text>
                <Text style={styles.specDetail}>{listing.specifications.suspension}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Track</Text>
                <Text style={styles.specDetail}>{listing.specifications.track}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sellerSection}>
            <Image source={{ uri: listing.seller.avatar }} style={styles.sellerAvatar} />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{listing.seller.name}</Text>
              <View style={styles.ratingContainer}>
                <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{listing.seller.rating}</Text>
              </View>
            </View>
            <Pressable 
              style={styles.contactButton} 
              onPress={handleContactPress}
            >
              <Text style={styles.contactButtonText}>Contact Seller</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  indicatorDotActive: {
    backgroundColor: colors.primary,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 16,
  },
  specifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specItem: {
    alignItems: 'center',
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  specsList: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  specKey: {
    fontSize: 16,
    color: colors.textLight,
  },
  specDetail: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  sellerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sellerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    color: colors.textLight,
  },
  contactButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});