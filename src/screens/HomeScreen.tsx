import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ListingCard } from '../components/ListingCard';
import { colors } from '../theme/colors';
import { Snowmobile } from '../types/listing';
import { StatusBar } from 'expo-status-bar';

const MOCK_LISTINGS: Snowmobile[] = [
  {
    id: '1',
    title: '2023 Ski-Doo Summit X',
    price: 14999,
    make: 'Ski-Doo',
    model: 'Summit X',
    year: 2023,
    condition: 'New',
    mileage: 0,
    location: {
      latitude: 45.5155,
      longitude: -122.6789,
      address: 'Portland, OR'
    },
    description: 'Brand new Summit X with 165" track',
    images: ['https://images.unsplash.com/photo-1517495306984-f84210f9daa8'],
    specifications: {
      engine: '850 E-TEC',
      power: '165hp',
      suspension: 'rMotion X',
      track: '165" x 16" x 3"'
    },
    seller: {
      id: 'seller1',
      name: 'John Doe',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Arctic Cat ZR 8000',
    price: 12500,
    make: 'Arctic Cat',
    model: 'ZR 8000',
    year: 2022,
    condition: 'Used',
    mileage: 1200,
    location: {
      latitude: 44.0682,
      longitude: -121.3153,
      address: 'Bend, OR'
    },
    description: 'Great condition ZR 8000 with upgrades',
    images: ['https://images.unsplash.com/photo-1612880797746-c16bc04ab204'],
    specifications: {
      engine: '800cc 2-stroke',
      power: '160hp',
      suspension: 'ARS II',
      track: '137" x 15" x 1.25"'
    },
    seller: {
      id: 'seller2',
      name: 'Mike Smith',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Polaris PRO-RMK 850',
    price: 15999,
    make: 'Polaris',
    model: 'PRO-RMK 850',
    year: 2023,
    condition: 'New',
    mileage: 0,
    location: {
      latitude: 43.6034,
      longitude: -110.7363,
      address: 'Jackson, WY'
    },
    description: 'Brand new PRO-RMK 850, mountain ready',
    images: ['https://images.unsplash.com/photo-1551698618-1dafe1138c6e'],
    specifications: {
      engine: '850 Patriot',
      power: '155hp',
      suspension: 'Walker Evans',
      track: '155" x 15" x 2.75"'
    },
    seller: {
      id: 'seller3',
      name: 'Sarah Johnson',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Yamaha Sidewinder SRX LE',
    price: 11500,
    make: 'Yamaha',
    model: 'Sidewinder SRX LE',
    year: 2021,
    condition: 'Used',
    mileage: 2500,
    location: {
      latitude: 45.6785,
      longitude: -111.0391,
      address: 'Bozeman, MT'
    },
    description: 'Well maintained Sidewinder, ready for trails',
    images: ['https://images.unsplash.com/photo-1516199423456-1f88f3482f68'],
    specifications: {
      engine: '998cc Turbo',
      power: '200hp',
      suspension: 'Fox QS3',
      track: '137" x 15" x 1.25"'
    },
    seller: {
      id: 'seller4',
      name: 'Tom Wilson',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Ski-Doo MXZ X-RS',
    price: 13750,
    make: 'Ski-Doo',
    model: 'MXZ X-RS',
    year: 2022,
    condition: 'Used',
    mileage: 800,
    location: {
      latitude: 44.4759,
      longitude: -73.2121,
      address: 'Burlington, VT'
    },
    description: 'Performance trail sled with low miles',
    images: ['https://images.unsplash.com/photo-1518891336619-86a3b0956131'],
    specifications: {
      engine: '850 E-TEC',
      power: '165hp',
      suspension: 'RAS X',
      track: '129" x 15" x 1.5"'
    },
    seller: {
      id: 'seller5',
      name: 'Chris Brown',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Arctic Cat Riot X',
    price: 10999,
    make: 'Arctic Cat',
    model: 'Riot X',
    year: 2021,
    condition: 'Used',
    mileage: 1800,
    location: {
      latitude: 43.8791,
      longitude: -110.9577,
      address: 'Alta, WY'
    },
    description: 'Versatile crossover sled, perfect condition',
    images: ['https://images.unsplash.com/photo-1517495306984-f84210f9daa8'],
    specifications: {
      engine: '800 C-TEC2',
      power: '150hp',
      suspension: 'ALPHA ONE',
      track: '146" x 15" x 2.6"'
    },
    seller: {
      id: 'seller6',
      name: 'Lisa Anderson',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    createdAt: new Date().toISOString()
  }
];

export const HomeScreen = ({ navigation }: any) => {
  const [listings] = useState<Snowmobile[]>(MOCK_LISTINGS);

  const handleListingPress = (listing: Snowmobile) => {
    navigation.navigate('ListingDetail', { listing });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onPress={handleListingPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 16,
  },
});