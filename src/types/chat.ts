export interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  listingId: string;
  lastMessage?: Message;
}