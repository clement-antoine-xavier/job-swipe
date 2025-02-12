import React, { useState, useEffect, memo } from 'react';
import { 
  FlatList, StyleSheet, ActivityIndicator, Dimensions, View, Text, Image, TouchableOpacity, Linking, Animated, PanResponder
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Define Job Offer Type
interface JobOffer {
  id: number;
  company: string;
  logo: string;
  title: string;
  skills: string[];
  location: string;
  remote: boolean;
  description: string;
  application_url: string;
}

const jobOffers: JobOffer[] = [
  {
    "id": 1,
    "company": "Spotify",
    "logo": "https://logo.clearbit.com/spotify.com",
    "title": "Backend Developer",
    "skills": ["Java", "Kotlin", "Microservices", "AWS", "SQL"],
    "location": "Stockholm, Sweden",
    "description": "Develop scalable backend services to power music streaming applications.",
    "application_url": "https://www.spotify.com/jobs/backend-developer",
    "remote": false
  },
  {
    "id": 2,
    "company": "Netflix",
    "logo": "https://logo.clearbit.com/netflix.com",
    "title": "Content Strategist",
    "skills": ["Content Strategy", "SEO", "Marketing", "Data Analysis"],
    "location": "Remote",
    "description": "Create and execute content strategies for global markets to enhance audience engagement.",
    "application_url": "https://www.netflix.com/jobs/content-strategist",
    "remote": false
  },
  {
    "id": 3,
    "company": "IBM",
    "logo": "https://logo.clearbit.com/ibm.com",
    "title": "Security Analyst",
    "skills": ["Cybersecurity", "Threat Detection", "Network Security", "Incident Response"],
    "location": "New York, USA",
    "description": "Monitor and safeguard corporate systems against cybersecurity threats and breaches.",
    "application_url": "https://www.ibm.com/jobs/security-analyst",
    "remote": false
  },
  {
    "id": 4,
    "company": "Meta",
    "logo": "https://logo.clearbit.com/meta.com",
    "title": "AI Research Scientist",
    "skills": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Python"],
    "location": "Menlo Park, USA",
    "description": "Research and develop AI algorithms for social media and virtual reality applications.",
    "application_url": "https://www.meta.com/jobs/ai-research-scientist",
    "remote": false
  },
  {
    "id": 5,
    "company": "Tesla",
    "logo": "https://logo.clearbit.com/tesla.com",
    "title": "Mechanical Engineer",
    "skills": ["Mechanical Design", "CAD", "Material Science", "Automotive Engineering"],
    "location": "Austin, USA",
    "description": "Work on cutting-edge automotive designs and systems for electric vehicles.",
    "application_url": "https://www.tesla.com/jobs/mechanical-engineer",
    "remote": false
  },
  {
    "id": 6,
    "company": "Amazon",
    "logo": "https://logo.clearbit.com/amazon.com",
    "title": "Data Scientist",
    "skills": ["Python", "R", "Machine Learning", "Big Data", "SQL"],
    "location": "Seattle, USA",
    "description": "Analyze large datasets to derive insights and optimize business decisions.",
    "application_url": "https://www.amazon.com/jobs/data-scientist",
    "remote": false
  },
  {
    "id": 7,
    "company": "Apple",
    "logo": "https://logo.clearbit.com/apple.com",
    "title": "Product Designer",
    "skills": ["UI/UX Design", "Sketch", "Figma", "Adobe Creative Suite"],
    "location": "Cupertino, USA",
    "description": "Lead the design of innovative hardware and software products to enhance user experience.",
    "application_url": "https://www.apple.com/jobs/product-designer",
    "remote": false
  },
  {
    "id": 8,
    "company": "Microsoft",
    "logo": "https://logo.clearbit.com/microsoft.com",
    "title": "Cloud Solutions Architect",
    "skills": ["Azure", "Cloud Computing", "DevOps", "Networking", "Security"],
    "location": "Redmond, USA",
    "description": "Design and implement scalable cloud architectures using Azure services.",
    "application_url": "https://www.microsoft.com/jobs/cloud-solutions-architect",
    "remote": false
  },
  {
    "id": 9,
    "company": "Google",
    "logo": "https://logo.clearbit.com/google.com",
    "title": "Software Engineer",
    "skills": ["Java", "C++", "Go", "Distributed Systems", "Cloud"],
    "location": "Mountain View, USA",
    "description": "Develop, test, and maintain software solutions to enhance user experience.",
    "application_url": "https://www.google.com/jobs/software-engineer",
    "remote": false
  }
];
export default function JobList() {
  const [data, setData] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(jobOffers);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <JobCard job={item} />}
      pagingEnabled
      snapToAlignment="start"
      snapToInterval={height}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <Text style={styles.noDataText}>No job offers found</Text>
        )
      }
    />
  );
}

const JobCard = memo(({ job }: { job: JobOffer }) => {
  const openJobLink = () => {
    Linking.openURL(job.application_url);
  };

  const pan = new Animated.ValueXY();

  const resetPosition = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        handleSwipeRight();
      } else if (gesture.dx < -120) {
        handleSwipeLeft();
      } else {
        resetPosition();
      }
    },
  });

  const handleSwipeRight = () => {
    console.log("Swiped Right - Liked");
    resetPosition();
  };

  const handleSwipeLeft = () => {
    console.log("Swiped Left - Disliked");
    resetPosition();
  };

  return (
    <Animated.View style={[styles.card, pan.getLayout()]} {...panResponder.panHandlers}>
      <Image source={{ uri: job.logo }} style={styles.logo} />
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job.remote ? 'Remote' : job.location}</Text>
      <Text style={styles.description}>{job.description}</Text>

      {/* Render skill badges */}
      <View style={styles.skillsContainer}>
        {job.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={openJobLink}>
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  loader: {
    marginTop: height / 2 - 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: height / 2,
    fontSize: 18,
    color: '#555',
  },
  card: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    color: '#777',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  applyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'center',
  },
  skillBadge: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
  },
});