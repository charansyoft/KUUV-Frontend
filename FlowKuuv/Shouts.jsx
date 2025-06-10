import React from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";

const peopleData = [
  {
    id: 1,
    name: "John Doe",
    status: "connected",
    date: "2025-04-25", // today
    profilePic: "https://previews.123rf.com/images/iaroslavtymonko/iaroslavtymonko2304/iaroslavtymonko230400799/202813895-3d-icon-avatar-business-woman-illustration-of-smiling-happy-girl-cartoon-close-up-portrait-of.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "liked",
    date: "2025-04-24", // yesterday
    profilePic: "https://previews.123rf.com/images/iaroslavtymonko/iaroslavtymonko2304/iaroslavtymonko230400640/202354057-3d-icon-avatar-business-woman-illustration-of-smiling-happy-girl-cartoon-close-up-portrait-of.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    status: "booked",
    date: "2025-04-23", // last week
    profilePic: "https://thumbs.dreamstime.com/b/d-icon-avatar-woman-illustration-smiling-happy-girl-cartoon-close-up-portrait-people-standing-teenager-isolated-transparent-274955116.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    status: "liked",
    date: "2025-04-25", // today
    profilePic: "https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-character-teenager-stylish-man-people-close-up-portrait-isolated-transparent-png-background-generative-ai-274955075.jpg",
  },
  {
    id: 5,
    name: "Sarah Wilson",
    status: "connected",
    date: "2025-04-24", // yesterday
    profilePic: "https://thumbs.dreamstime.com/b/d-icon-avatar-cartoon-character-stylish-man-beard-cartoon-close-up-portrait-isolated-transparent-png-background-d-icon-274469478.jpg",
  },
  {
    id: 6,
    name: "David Lee",
    status: "booked",
    date: "2025-04-23", // last week
    profilePic: "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-103130.jpg?w=360",
  },
  {
    id: 7,
    name: "Chris Miller",
    status: "liked",
    date: "2025-04-25", // today
    profilePic: "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-96392.jpg?w=360",
  },
  {
    id: 8,
    name: "Anna Taylor",
    status: "liked",
    date: "2025-04-24", // yesterday
    profilePic: "https://img.freepik.com/premium-photo/3d-cartoon-avatar_113255-5521.jpg?w=360",
  },
  {
    id: 9,
    name: "Jason White",
    status: "connected",
    date: "2025-04-23", // last week
    profilePic: "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-93124.jpg",
  },
  {
    id: 10,
    name: "Olivia Harris",
    status: "booked",
    date: "2025-04-25", // today
    profilePic: "https://img.freepik.com/premium-photo/3d-model-animation-cartooninspired-pop-selfportrait-with-adobe-illustrator_899449-65646.jpg?semt=ais_hybrid&w=740",
  },
];

const getCategory = (date) => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

  if (date === today) return "Today";
  if (date === yesterday) return "Yesterday";
  if (date >= lastWeek) return "This Week";
  return "Last Week";
};

export default function PeopleList() {

  const categorizedData = peopleData.reduce((acc, person) => {
    const category = getCategory(person.date);
    if (!acc[category]) acc[category] = [];
    acc[category].push(person);
    return acc;
  }, {});

  const getStatusMessage = (status, name) => {
    if (status === "liked") {
      return `${name} has liked your post`;
    } else if (status === "booked") {
      return `${name} booked your product`;
    } else if (status === "connected") {
      return `${name} sent a connection request to you`;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={Object.entries(categorizedData)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const [category, people] = item;
          return (
            <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  marginBottom: 10,
                  opacity: 0.5,
                  marginLeft: 15,
                }}
              >
                {category}
              </Text>
              <FlatList
                data={people}
                keyExtractor={(person) => person.id.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: "#000",
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{ uri: item.profilePic }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 18,
                        marginRight: 15,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        color: "#000",
                      }}
                    >
                      {getStatusMessage(item.status, item.name)}
                    </Text>

                    {/* Only show button for 'connected' and 'booked' */}
                    {item.status !== "liked" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "white",
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {item.status === "connected" ? "Connect" : "Book"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
