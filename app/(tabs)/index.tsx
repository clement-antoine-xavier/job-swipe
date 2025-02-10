import { FlatList, StyleSheet, ActivityIndicator, Dimensions, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');
const API_URL = 'https://jsonplaceholder.typicode.com/users?_limit=10';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function HomeScreen() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json: User[] = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <Text style={styles.noDataText}>No users found</Text>
        )
      }
    />
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <View style={styles.userContainer}>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name} (@{user.username})</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>
        <Text>Website: {user.website}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Address</Text>
        <Text>{user.address.street}, {user.address.suite}</Text>
        <Text>{user.address.city}, {user.address.zipcode}</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(user.address.geo.lat),
            longitude: parseFloat(user.address.geo.lng),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(user.address.geo.lat),
              longitude: parseFloat(user.address.geo.lng),
            }}
            title={user.name}
            description={user.address.city}
          />
        </MapView>
      </View>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Company</Text>
        <Text>Name: {user.company.name}</Text>
        <Text>Catchphrase: {user.company.catchPhrase}</Text>
        <Text>Business: {user.company.bs}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: height / 2 - 20,
  },
  userContainer: {
    flex: 1,
    height, // Ensure the container takes up full screen height
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: width - 40, // Adjust width for padding
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: height / 2,
    fontSize: 18,
    color: '#555',
  },
});