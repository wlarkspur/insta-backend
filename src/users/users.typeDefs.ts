import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

//
//isMe: Boolean!
//-- isFollowing은 특정 유저의 팔로우 여부를 체크.
//-- isMe 는 사용자가 본인의 프로필을 보는지 체크.
