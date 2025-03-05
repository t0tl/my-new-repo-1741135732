import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Snowmobile } from '../types/listing';
import { colors } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ListingCardProps {
  listing: Snowmobile;
  onPress: (listing: Snowmobile) => void;
}

export const ListingCard = ({ listing, onPress }: ListingCardProps) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(listing)}
    >
      <Image
        source={{ uri: listing.images[0] }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {listing.year} {listing.make} {listing.model}
        </Text>
        <Text style={styles.price}>${listing.price.toLocaleString()}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="snowmobile" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{listing.mileage} mi</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{listing.location.address}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textLight,
  },
});