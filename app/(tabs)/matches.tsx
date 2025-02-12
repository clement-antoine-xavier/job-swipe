import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const JobMatchPage = () => {
  // Sample user skills
  const userSkills = ["React", "Node.js", "AWS", "GraphQL"];

  // Sample job offers with additional details
  const jobOffers = [
    { id: 1, title: "Frontend Developer", skills: ["React", "CSS", "JavaScript"], company: "Company A", location: "San Francisco, CA", description: "Build responsive user interfaces with React." },
    { id: 2, title: "Backend Developer", skills: ["Node.js", "AWS", "MongoDB"], company: "Company B", location: "Austin, TX", description: "Work on scalable backend services and APIs." },
    { id: 3, title: "Data Scientist", skills: ["Python", "Machine Learning"], company: "Company C", location: "New York, NY", description: "Analyze data and build machine learning models." },
    { id: 4, title: "Full Stack Developer", skills: ["React", "Node.js", "GraphQL"], company: "Company D", location: "Seattle, WA", description: "Develop full-stack applications with React and Node.js." },
    { id: 5, title: "DevOps Engineer", skills: ["AWS", "Docker", "CI/CD"], company: "Company E", location: "Chicago, IL", description: "Automate infrastructure and CI/CD pipelines." }
  ];

  // State for job matches
  const [matches, setMatches] = useState<any[]>([]);

  // Effect hook to filter job matches based on user skills
  useEffect(() => {
    const matchedJobs = jobOffers.map((job) => ({
      ...job,
      matchingSkills: job.skills.filter(skill => userSkills.includes(skill))
    }));

    setMatches(matchedJobs);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Job Matches</Text>
      <ScrollView contentContainerStyle={styles.matchesList}>
        {matches.length === 0 ? (
          <Text>No matches found</Text>
        ) : (
          matches.map((match) => (
            <View key={match.id} style={styles.card}>
              <Text style={styles.jobTitle}>{match.title}</Text>
              <Text style={styles.companyName}>{match.company}</Text>
              <Text style={styles.jobLocation}>{match.location}</Text>
              <Text style={styles.jobDescription}>{match.description}</Text>
              <Text style={styles.skillsTitle}>Skills Required:</Text>
              <View style={styles.skillsContainer}>
                {match.skills.map((skill: string, index: number) => {
                  const isMatched = match.matchingSkills.includes(skill);
                  return (
                    <Text
                      key={index}
                      style={[styles.skill, isMatched && styles.skillBadge]}
                    >
                      {isMatched ? `✔ ${skill}` : skill}
                    </Text>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff8f8', // Default Background Color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  matchesList: {
    width: '100%',
    padding: 10,
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
    marginBottom: 20,
    width: '100%',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  jobLocation: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  jobDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    fontStyle: 'italic',
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  skillsContainer: {
    marginTop: 5,
  },
  skill: {
    fontSize: 14,
    color: '#444',
  },
  skillBadge: {
    backgroundColor: '#ef8537', // Primary Color
    color: '#fff8f8', // Default Background Color
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default JobMatchPage;