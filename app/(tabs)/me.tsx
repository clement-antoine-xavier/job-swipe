import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

export default function Me() {
  const user = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    address: {
      street: "123 Main St",
      suite: "Apt. 4B",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: "40.7128",
        lng: "-74.0060",
      },
    },
    phone: "1-800-555-1234",
    website: "https://www.johndoe.com",
    company: {
      name: "Doe Enterprises",
      catchPhrase: "Innovating the future",
      bs: "Disrupting markets with technology",
    },
    skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL", "Docker"],
    profilePicture: "https://www.w3schools.com/w3images/avatar2.png", // Fake profile picture URL
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />

      {/* User Information Card */}
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(user.website)}>
          <Text style={styles.website}>{user.website}</Text>
        </TouchableOpacity>
      </View>

      {/* Skills Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {user.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Location Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.address}>
          {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        </Text>
      </View>

      {/* Company Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.company}>{user.company.name}</Text>
        <Text style={styles.catchPhrase}>{user.company.catchPhrase}</Text>
        <Text style={styles.bs}>{user.company.bs}</Text>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  card: {
    backgroundColor: '#fff8f8', // Default Background Color
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
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
  bs: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  skillBadge: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
  },
});