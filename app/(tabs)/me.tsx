import { View, Text, StyleSheet } from 'react-native';

export default function Me() {
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.website}>{user.website}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.address}>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.company}>{user.company.name}</Text>
        <Text style={styles.catchPhrase}>{user.company.catchPhrase}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    width: '80%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  username: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  phone: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  website: {
    fontSize: 16,
    marginTop: 5,
    color: 'blue',
    textAlign: 'center',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  catchPhrase: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
  },
});
    