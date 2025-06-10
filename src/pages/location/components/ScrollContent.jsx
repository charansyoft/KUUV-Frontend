import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useAppTheme } from "../../../../themeContext";

function GroupItem({
  item,
  isJoinedNow,
  isPreviouslyJoined,
  handleJoin,
  initialsMap,
}) {
  const scaleAnim = useRef(new Animated.Value(isJoinedNow ? 1.08 : 1)).current;
  const { theme } = useAppTheme();
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isJoinedNow ? 1.08 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isJoinedNow]);

  return (
    <Animated.View
      style={{
        margin: 10,
        borderRadius: 20,
        transform: [{ scale: scaleAnim }],
        zIndex: isJoinedNow ? 20 : 4,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginHorizontal: 10,
          borderRadius: 20,
          borderWidth: isPreviouslyJoined ? 1 : 1,
          borderColor: theme.LineColor,
          backgroundColor: theme.BackGround,
        }}
        onPress={() => handleJoin(item)}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 10,
              borderWidth: 1,
              borderColor: theme.LineColor,
            }}
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
              // shadowColor: "#0ff",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 0.6,
              // shadowRadius: 6,
              // elevation: 5,
            }}
          >
            <Text
              style={{
                color: theme.ModeText1,
                fontWeight: "900",
                fontSize: 26,
              }}
            >
              {initialsMap[item._id]}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 18,
              marginBottom: 4,
              letterSpacing: 0.5,
              color: theme.ModeText1,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              marginBottom: 4,
              color: theme.ModeText3,
            }}
          >
            Joined Users: {item.joinedUsers.length}
          </Text>

          {!isPreviouslyJoined && !isJoinedNow && (
            <Text
              style={{
                fontWeight: "800",
                fontSize: 13,
                letterSpacing: 0.7,
                color: theme.ModeText3,
              }}
            >
              Select
            </Text>
          )}
          {isPreviouslyJoined && (
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                letterSpacing: 0.7,
                color: theme.SpecialText,
              }}
            >
              Already Joined
            </Text>
          )}
          {isJoinedNow && !isPreviouslyJoined && (
            <Text
              style={{
                fontWeight: "900",
                fontSize: 13,
                letterSpacing: 0.7,

                color: theme.ModeText1,
              }}
            >
              Selected to Join
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ScrollContent({
  groups,
  joinedGroups,
  handleJoin,
  initialsMap,
  userId,
  loggedInPhone,
  previouslyJoinedGroupIds,
}) {
  const renderItem = ({ item }) => {
    const isJoinedNow = joinedGroups.includes(item._id);
    const isPreviouslyJoined = previouslyJoinedGroupIds.includes(item._id);

    return (
      <GroupItem
        item={item}
        isJoinedNow={isJoinedNow}
        isPreviouslyJoined={isPreviouslyJoined}
        handleJoin={handleJoin}
        initialsMap={initialsMap}
      />
    );
  };

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingBottom: 10,
        // backgroundColor: "#000", // optional page bg
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
